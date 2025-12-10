import { LearningSession, parseStyledText } from '../types/problem';

interface GenerationParams {
  topic: string;
  difficulty: string;
  problemCount: number;
}

// AI에게 보낼 시스템 프롬프트
const SYSTEM_PROMPT = `당신은 한국 수능 국어 영역 문제를 생성하는 전문가입니다.

# 출력 형식
반드시 다음 JSON 구조로 응답하세요. 스타일 범위는 문자 인덱스로 지정합니다.

\`\`\`json
{
  "passage": {
    "title": "지문 제목",
    "author": "저자명",
    "source": "출처",
    "paragraphs": [
      {
        "text": "우리는 종종 시간이 공평하게 주어진다고 말한다.",
        "styleRanges": [
          { "start": 10, "end": 15, "bold": true },
          { "start": 20, "end": 30, "box": true }
        ],
        "annotation": "㉠",
        "indent": 0
      }
    ],
    "footnotes": {
      "*": "각주 설명"
    }
  },
  "problems": [
    {
      "id": 1,
      "type": "multiple-choice",
      "category": "내용 이해",
      "questionText": "이 글의 중심 내용은?",
      "questionStyleRanges": [],
      "options": [
        {
          "text": "시간은 공평하다",
          "styleRanges": [],
          "explanation": "해설"
        }
      ],
      "answer": 0,
      "difficulty": "medium",
      "points": 2,
      "timeEstimate": 90
    }
  ]
}
\`\`\`

# 스타일링 가이드
styleRanges 배열에 스타일을 지정하세요:
- **bold**: 중요 개념, 핵심 키워드
- **underline**: 강조하고 싶은 부분  
- **box**: 전문 용어, 고유명사 (박스로 감싸기)
- **highlight**: 특별히 주목해야 할 구절 (형광펜 효과)

예시:
- "시간은 공평하게 주어진다" 에서 "공평하게"를 굵게
  → { "start": 4, "end": 8, "bold": true }
- "물리적 시간"을 박스 처리
  → { "start": 10, "end": 15, "box": true }

여러 스타일 중첩 가능:
{ "start": 0, "end": 5, "bold": true, "underline": true }

# 문단 표시
- 주요 문단마다 annotation: "㉠", "㉡", "㉢", "㉣"
- 인용문이나 예시는 indent: 1

# 문제 유형
- **multiple-choice**: 일반 선택형
- **with-premise**: 보기 포함
  * items 배열: 나열형 ["항목1", "항목2", "항목3"]
  * text + styleRanges: 서술형

# 품질 기준
1. 지문: 600-800자, 3-5 문단
2. 문제: 명확한 정답, 매력적인 오답
3. 스타일: 문단당 2-5개 스타일 포인트
4. 해설: 정답 선택지에만 필수`;

export class AIGenerationService {
  async generateProblems(params: GenerationParams): Promise<LearningSession> {
    const userPrompt = this.buildUserPrompt(params);

    try {
      // Claude API 호출
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          messages: [
            {
              role: 'user',
              content: userPrompt,
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const content = data.content[0].text;

      // JSON 파싱 (마크다운 코드블록 제거)
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || 
                       content.match(/```\n([\s\S]*?)\n```/) ||
                       [null, content];
      
      const jsonStr = jsonMatch[1] || content;
      const rawData = JSON.parse(jsonStr.trim());

      // 데이터 변환
      return this.transformToLearningSession(rawData, params);
    } catch (error) {
      console.error('AI Generation Error:', error);
      
      // 에러 시 더미 데이터 반환
      return this.getFallbackData(params);
    }
  }

  private buildUserPrompt(params: GenerationParams): string {
    const topicNames: Record<string, string> = {
      literature: '문학 (소설, 시, 수필)',
      nonliterature: '비문학 (설명문, 논설문)',
      classic: '고전 (한문, 고전문학)',
      poetry: '현대시 (시의 이해와 감상)',
    };

    const difficultyNames: Record<string, string> = {
      elementary: '초등 수준 (기초)',
      middle: '중등 수준 (중급)',
      high: '고등 수준 (심화)',
      suneung: '수능 수준 (최고 난이도)',
    };

    const topic = topicNames[params.topic] || params.topic;
    const difficulty = difficultyNames[params.difficulty] || params.difficulty;

    return `다음 조건으로 수능 국어 문제를 생성해주세요:

**주제**: ${topic}
**난이도**: ${difficulty}
**문제 수**: ${params.problemCount}개

요구사항:
1. 지문은 600-800자 분량으로 작성
2. 문단마다 중요한 부분에 스타일 적용 (bold, box, underline, highlight)
3. 주요 문단에 ㉠, ㉡, ㉢, ㉣ 표시
4. 문제는 다양한 유형 포함 (일반 선택형, 보기 포함)
5. 각 선택지에 간단한 해설 추가 (정답은 필수)
6. 실제 수능과 유사한 수준과 형식 유지

JSON 형식으로만 응답해주세요.`;
  }

  private transformToLearningSession(rawData: any, params: GenerationParams): LearningSession {
    return {
      topic: params.topic,
      difficulty: params.difficulty,
      problemCount: params.problemCount,
      passage: {
        title: rawData.passage.title,
        author: rawData.passage.author,
        source: rawData.passage.source,
        paragraphs: rawData.passage.paragraphs.map((p: any) => ({
          id: Math.random().toString(36).substr(2, 9),
          text: p.text,
          segments: parseStyledText(p.text, p.styleRanges || []),
          annotation: p.annotation,
          indent: p.indent || 0,
        })),
        footnotes: rawData.passage.footnotes,
      },
      problems: rawData.problems.map((p: any) => ({
        id: p.id,
        type: p.type,
        category: p.category,
        questionText: p.questionText,
        questionSegments: parseStyledText(p.questionText, p.questionStyleRanges || []),
        premise: p.premise ? {
          title: p.premise.title,
          text: p.premise.text || '',
          segments: p.premise.text ? parseStyledText(p.premise.text, p.premise.styleRanges || []) : [],
          items: p.premise.items,
        } : undefined,
        options: p.options.map((o: any, idx: number) => ({
          id: idx,
          text: o.text,
          segments: parseStyledText(o.text, o.styleRanges || []),
          explanation: o.explanation,
        })),
        answer: p.answer,
        difficulty: p.difficulty,
        points: p.points,
        timeEstimate: p.timeEstimate,
      })),
    };
  }

  private getFallbackData(params: GenerationParams): LearningSession {
    // 에러 시 표시할 더미 데이터
    return {
      topic: params.topic,
      difficulty: params.difficulty,
      problemCount: params.problemCount,
      passage: {
        title: '시간의 체험',
        paragraphs: [
          {
            id: '1',
            text: '우리는 종종 시간이 모든 사람에게 공평하게 주어진다고 말한다. 하루 24시간, 1년 365일이라는 물리적 시간은 누구에게나 동일하다.',
            segments: parseStyledText(
              '우리는 종종 시간이 모든 사람에게 공평하게 주어진다고 말한다. 하루 24시간, 1년 365일이라는 물리적 시간은 누구에게나 동일하다.',
              [
                { start: 21, end: 26, bold: true },
                { start: 48, end: 54, box: true },
              ]
            ),
            annotation: '㉠',
          },
        ],
      },
      problems: [
        {
          id: 1,
          type: 'multiple-choice',
          category: '내용 이해',
          questionText: '이 글의 중심 내용으로 가장 적절한 것은?',
          questionSegments: parseStyledText('이 글의 중심 내용으로 가장 적절한 것은?', []),
          options: [
            {
              id: 0,
              text: '시간은 공평하게 주어진다',
              segments: parseStyledText('시간은 공평하게 주어진다', []),
            },
            {
              id: 1,
              text: '시간 지각의 개인차',
              segments: parseStyledText('시간 지각의 개인차', []),
              explanation: '정답입니다',
            },
          ],
          answer: 1,
          difficulty: 'medium',
          points: 2,
        },
      ],
    };
  }
}