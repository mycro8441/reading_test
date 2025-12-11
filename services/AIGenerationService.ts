import { GoogleGenAI } from '@google/genai';
import { LearningSession, parseStyledText } from '../types/problem';
import {
  checkStyleBalance,
  mergeOverlappingRanges,
  validateStyleRanges,
  visualizeStyleRanges
} from '../utils/styleValidator';

interface GenerationParams {
  topic: string;
  difficulty: string;
  problemCount: number;
}

// 개선된 AI 시스템 프롬프트
const SYSTEM_PROMPT = `당신은 한국 평가원 수능 국어 영역 문제를 생성하는 전문가입니다.

# ⚠️ 중요: 인덱스 계산 규칙
**한글 1글자 = 인덱스 1, 공백/구두점도 1**
- 시작: 0부터 카운트
- end는 exclusive (포함하지 않음)
- 예: "안녕하세요"에서 "하세" → start: 2, end: 4

# 인덱스 계산 예시 (반드시 따르세요!)

텍스트: "우리는 종종 시간이 공평하게 주어진다고 말한다."
위치:    012345678901234567890123456789

"종종" 선택 (위치 4-6):
→ { "start": 4, "end": 6, "bold": true }

"공평하게" 선택 (위치 11-15):
→ { "start": 11, "end": 15, "bold": true }

# 정확한 인덱스 계산 방법
1. 텍스트를 먼저 완전히 작성
2. 스타일 적용할 단어를 정확히 선택
3. 처음부터 한 글자씩 세기 (0, 1, 2, 3...)
4. 시작 위치와 끝 위치+1을 기록

# 출력 형식
반드시 JSON 형식으로만 응답하세요. 주석, 서문, 마크다운 코드블록 등의 추가 문장은 절대 포함하지 마세요.

{
  "passage": {
    "title": "지문 제목",
    "author": "저자명",
    "source": "출처",
    "paragraphs": [
      {
        "text": "전체 문단 텍스트를 먼저 작성합니다.",
        "styleRanges": [
          { "start": 5, "end": 9, "bold": true }
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
      "questionText": "질문 텍스트",
      "questionStyleRanges": [],
      "options": [
        {
          "text": "선택지 텍스트",
          "styleRanges": [],
          "explanation": "정답인 경우에만 해설 추가"
        }
      ],
      "answer": 0,
      "difficulty": "medium",
      "points": 2,
      "timeEstimate": 90
    }
  ]
}

# 스타일 종류 (보수적으로 사용)
- **bold**: 핵심 개념만 (문단당 1-2개)
- **underline**: 강조 (문단당 0-1개)
- **box**: 전문 용어 (문단당 0-1개)
- **highlight**: 특별 주의 (전체에 0-1개)

# 문제 유형
- **multiple-choice**: 일반 선택형
- **with-premise**: 보기 포함
  * items: ["ㄱ 항목", "ㄴ 항목"] (나열형)
  * text + styleRanges: 서술형

# 품질 체크리스트
✅ 지문 600-800자
✅ 문단당 스타일 2-3개 이하
✅ 인덱스 정확히 계산
✅ 정답 선택지에만 해설
✅ 자연스러운 선택지`;

export class AIGenerationService {
  private debugMode = true; // 개발 중에는 true

  async generateProblems(params: GenerationParams): Promise<LearningSession> {
    const userPrompt = this.buildUserPrompt(params);

    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.EXPO_PUBLIC_GOOGLE_AI_API_KEY || '',
      });

      const { topic, difficulty, problemCount } = params;

      if (!topic || !difficulty || !problemCount) {
        throw new Error('필수 정보가 누락되었습니다');
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
          thinkingConfig: {
            thinkingBudget: 0,
          },
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.8,
        },
      });

      // Extract text from response
      if (!response.candidates || response.candidates.length === 0) {
        throw new Error('AI 응답을 받을 수 없습니다');
      }

      const candidate = response.candidates[0];

      if (!candidate.content) {
        console.error('No content in candidate:', candidate);
        throw new Error('AI 응답 형식이 올바르지 않습니다');
      }

      const text = candidate.content.parts?.[0]?.text;

      if (!text) {
        console.error('No text in response:', candidate);
        throw new Error('AI 문제 생성 중 오류가 발생했습니다');
      }

      // Clean markdown code blocks
      let cleanedText = text.trim();
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/```\n?/g, '');
      }

      const rawData = JSON.parse(cleanedText);

      // 검증 및 변환
      const session = this.transformAndValidate(rawData, params);

      return session;
    } catch (error) {
      console.error('AI Generation Error:', error);
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

⚠️ 중요 요구사항:
1. 지문은 600-800자 분량
2. 스타일 범위의 인덱스를 정확히 계산할 것
   - 텍스트를 먼저 작성하고
   - 한 글자씩 세어서 인덱스 확인
3. 문단당 스타일은 2-3개만 사용
4. 정답 선택지에만 해설 추가
5. 자연스럽고 실제적인 문제

JSON 형식으로만 응답해주세요.`;
  }

  private transformAndValidate(
    rawData: any,
    params: GenerationParams
  ): LearningSession {
    if (this.debugMode) {
      console.log('\n=== AI 생성 데이터 검증 시작 ===');
    }

    // 지문 검증 및 변환
    const passage = {
      title: rawData.passage.title,
      author: rawData.passage.author,
      source: rawData.passage.source,
      paragraphs: rawData.passage.paragraphs.map((p: any, idx: number) => {
        // 스타일 범위 검증
        const validation = validateStyleRanges(p.text, p.styleRanges || []);

        if (this.debugMode) {
          console.log(`\n--- 문단 ${idx + 1} ---`);
          console.log(`텍스트: "${p.text}"`);
          console.log(`텍스트 길이: ${p.text.length}`);
          
          if (!validation.isValid) {
            console.log('❌ 에러:', validation.errors);
          }
          
          if (validation.warnings.length > 0) {
            console.log('⚠️ 경고:', validation.warnings);
          }

          // 시각화
          if (validation.correctedRanges && validation.correctedRanges.length > 0) {
            console.log('스타일 시각화:');
            console.log(visualizeStyleRanges(p.text, validation.correctedRanges));
          }

          // 밸런스 체크
          const balance = checkStyleBalance(p.text, p.styleRanges || []);
          console.log(`밸런스: ${balance.balanced ? '✅' : '⚠️'} ${balance.recommendation}`);
        }

        // 에러가 있으면 스타일 제거하거나 수정 시도
        let finalRanges = p.styleRanges || [];
        
        if (!validation.isValid) {
          console.warn(`문단 ${idx + 1}의 스타일 범위가 유효하지 않습니다. 스타일을 제거합니다.`);
          finalRanges = [];
        } else if (validation.correctedRanges) {
          finalRanges = mergeOverlappingRanges(validation.correctedRanges);
        }

        return {
          id: Math.random().toString(36).substr(2, 9),
          text: p.text,
          segments: parseStyledText(p.text, finalRanges),
          annotation: p.annotation,
          indent: p.indent || 0,
        };
      }),
      footnotes: rawData.passage.footnotes,
    };

    // 문제 검증 및 변환
    const problems = rawData.problems.map((p: any) => {
      // 질문 검증
      const questionValidation = validateStyleRanges(
        p.questionText,
        p.questionStyleRanges || []
      );

      if (this.debugMode && !questionValidation.isValid) {
        console.log(`\n❌ 문제 ${p.id} 질문 스타일 에러:`, questionValidation.errors);
      }

      // 선택지 검증
      const validatedOptions = p.options.map((o: any, idx: number) => {
        const optionValidation = validateStyleRanges(o.text, o.styleRanges || []);
        
        if (this.debugMode && !optionValidation.isValid) {
          console.log(`❌ 문제 ${p.id} 선택지 ${idx + 1} 에러:`, optionValidation.errors);
        }

        return {
          id: idx,
          text: o.text,
          segments: parseStyledText(
            o.text,
            optionValidation.isValid ? (o.styleRanges || []) : []
          ),
          explanation: o.explanation,
        };
      });

      return {
        id: p.id,
        type: p.type,
        category: p.category,
        questionText: p.questionText,
        questionSegments: parseStyledText(
          p.questionText,
          questionValidation.isValid ? (p.questionStyleRanges || []) : []
        ),
        premise: p.premise
          ? {
              title: p.premise.title,
              text: p.premise.text || '',
              segments: p.premise.text
                ? parseStyledText(p.premise.text, p.premise.styleRanges || [])
                : [],
              items: p.premise.items,
            }
          : undefined,
        options: validatedOptions,
        answer: p.answer,
        difficulty: p.difficulty,
        points: p.points,
        timeEstimate: p.timeEstimate,
      };
    });

    if (this.debugMode) {
      console.log('\n=== 검증 완료 ===\n');
    }

    return {
      topic: params.topic,
      difficulty: params.difficulty,
      problemCount: params.problemCount,
      passage,
      problems,
    };
  }

  private getFallbackData(params: GenerationParams): LearningSession {
    // 기존 SAMPLE_SESSION 데이터 반환
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
                { start: 21, end: 26, bold: true }, // "공평하게"
                { start: 56, end: 62, box: true },  // "물리적 시간"
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
          questionSegments: parseStyledText(
            '이 글의 중심 내용으로 가장 적절한 것은?',
            []
          ),
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