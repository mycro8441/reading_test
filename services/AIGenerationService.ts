// services/generateProblems.ts
import { GoogleGenAI } from '@google/genai';
import { cleanAIResponse, debugAIResponse, validateAIResponse } from '../utils/cleanAIResponse';

interface GenerationParams {
  topic: string;
  difficulty: string;
  problemCount: number;
}

export async function generateText(params: GenerationParams) {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.EXPO_PUBLIC_GOOGLE_AI_API_KEY || '',
    });

    const { topic, difficulty, problemCount } = params;

    if (!topic || !difficulty || !problemCount) {
      throw new Error('필수 정보가 누락되었습니다');
    }

    const systemInstruction = `당신은 한국 평가원 수능 국어 영역 문제를 생성하는 전문가입니다.
반드시 JSON 형식으로만 응답하세요. 주석, 서문, 마크다운 코드블록 등의 추가 문장은 절대 포함하지 마세요.`;

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

    const topicName = topicNames[topic] || topic;
    const difficultyName = difficultyNames[difficulty] || difficulty;

    const prompt = `다음 조건으로 평가원 스타일 수능 국어 문제를 생성해주세요:

**주제**: ${topicName}
**난이도**: ${difficultyName}
**문제 수**: ${problemCount}개

[출력 형식 - 정확히 따라주세요]

{
  "passage": {
    "title": "지문 제목",
    "author": "저자명 (선택)",
    "source": "출처 (선택)",
    "paragraphs": [
      {
        "text": "전체 문단 텍스트입니다. 우리는 시간이 공평하게 주어진다고 말한다.",
        "styleRanges": [
          { "start": 19, "end": 24, "bold": true },
          { "start": 35, "end": 41, "box": true }
        ],
        "annotation": "㉠",
        "indent": 0
      }
    ],
    "footnotes": {
      "*": "각주 내용"
    }
  },
  "problems": [
    {
      "id": 1,
      "type": "multiple-choice",
      "category": "내용 이해",
      "questionText": "이 글의 중심 내용으로 가장 적절한 것은?",
      "questionStyleRanges": [],
      "options": [
        {
          "text": "선택지 내용",
          "styleRanges": [],
          "explanation": "정답 해설 (정답만)"
        }
      ],
      "answer": 1,
      "difficulty": "medium",
      "points": 2,
      "timeEstimate": 90
    }
  ]
}

[중요: styleRanges vs annotation 구분]

❌ 잘못된 예 (절대 하지 마세요):
{
  "text": "우리는 시간이 공평하게 주어진다고 말한다.",
  "styleRanges": [
    { "start": 8, "end": 12, "bold": true },
    { "start": 15, "end": 16, "annotation": "㉠" }  // ❌ 틀림!
  ],
  "annotation": "㉠"
}

✅ 올바른 예:
{
  "text": "우리는 시간이 공평하게 주어진다고 말한다.",
  "styleRanges": [
    { "start": 8, "end": 12, "bold": true },
    { "start": 19, "end": 24, "box": true }
  ],
  "annotation": "㉠",  // ✅ 문단 레벨에만!
  "indent": 0
}

핵심 규칙:
1. **annotation은 문단(paragraph) 레벨 속성** - ㉠, ㉡, ㉢, ㉣
2. **styleRanges는 텍스트 스타일만** - bold, underline, box, highlight
3. **styleRanges 안에 annotation을 절대 넣지 마세요!**

[평가원 스타일 가이드]

1. **지문 구성**
   - 600-800자, 3-5개 문단
   - 각 주요 문단에 annotation: "㉠", "㉡", "㉢", "㉣"
   - annotation은 문단의 별도 속성으로 지정
   - 들여쓰기가 필요하면 indent: 1
   
2. **Annotation 활용 전략**
   
   ✅ **annotation을 사용하는 경우:**
   - 4-5개 문단 중 3-4개에 ㉠, ㉡, ㉢, ㉣ 부여
   - 문제에서 반드시 활용: "㉠~㉣ 중..."
   - 예: "㉠~㉣ 중 <보기>의 반응과 가장 관련이 깊은 것은?"
   - 선택지: "㉠", "㉡", "㉢", "㉣"
   
   ✅ **annotation을 사용하지 않는 경우:**
   - 일반 질문 형태
   - 예: "이 글의 중심 내용으로 가장 적절한 것은?"

3. **스타일링 (styleRanges만 사용)**
   - **bold**: 핵심 개념 (문단당 1-2개)
   - **box**: 전문 용어, 고유명사 (문단당 0-1개)
   - **underline**: 강조 구절 (문단당 0-1개)
   - **highlight**: 특별 주목 부분 (전체 0-2개)
   
   **중요: 인덱스 계산**
   - 한글 1글자 = 인덱스 1
   - 공백, 구두점도 1씩 증가
   - start는 포함, end는 **미포함** (exclusive)
   
   예시:
   "text": "물리적 시간은 누구에게나 동일하다.",
   인덱스:   0123456789...
   
   "물리적" (0~3) → { "start": 0, "end": 3, "box": true }
   "시간" (4~6) → { "start": 4, "end": 6, "bold": true }
   
   정확한 계산:
   "styleRanges": [
     { "start": 0, "end": 3, "box": true },      // "물리적"
     { "start": 4, "end": 6, "bold": true }      // "시간"
   ]
   
   ❌ 잘못된 예:
   { "start": 0, "end": 6, "box": true }  // "물리적 시" (너무 김)
   
   ✅ 올바른 예:
   { "start": 0, "end": 3, "box": true }  // "물리적" (정확)

4. **문제 유형**

   **중요: 모든 문제는 5지선다형입니다!**
   - 선택지는 반드시 5개 (①, ②, ③, ④, ⑤)
   - answer는 0~4 사이의 숫자 (0=첫번째, 4=다섯번째)

   **A. multiple-choice (일반 선택형)**
   {
     "type": "multiple-choice",
     "questionText": "이 글의 중심 내용으로 가장 적절한 것은?",
     "questionStyleRanges": [],
     "options": [
       { "text": "선택지1", "styleRanges": [] },
       { "text": "선택지2", "styleRanges": [] },
       { "text": "선택지3", "styleRanges": [], "explanation": "정답 해설" },
       { "text": "선택지4", "styleRanges": [] },
       { "text": "선택지5", "styleRanges": [] }
     ],
     "answer": 2  // 0~4 사이
   }
   
   **B. with-premise (보기 포함)**
   
   B-1. 서술형 보기 (반드시 text에 내용이 있어야 함):
   {
     "type": "with-premise",
     "questionText": "㉠~㉣ 중 <보기>의 반응과 가장 관련이 깊은 것은?",
     "questionStyleRanges": [
       { "start": 0, "end": 5, "bold": true }  // "㉠~㉣"
     ],
     "premise": {
       "title": "< 보 기 >",
       "text": "나는 최근 여행을 다녀온 후 시간이 천천히 흘러가는 것처럼 느껴졌다.",
       "styleRanges": [
         { "start": 20, "end": 30, "underline": true }
       ],
       "items": []
     },
     "options": [
       { "text": "㉠", "styleRanges": [] },
       { "text": "㉡", "styleRanges": [], "explanation": "정답" },
       { "text": "㉢", "styleRanges": [] },
       { "text": "㉣", "styleRanges": [] },
       { "text": "없음", "styleRanges": [] }
     ],
     "answer": 1
   }
   
   B-2. 나열형 보기 (items 사용):
   {
     "type": "with-premise",
     "questionText": "ㄱ~ㄹ 중 적절한 것을 모두 고른 것은?",
     "premise": {
       "title": "< 보 기 >",
       "text": "",
       "styleRanges": [],
       "items": ["ㄱ. 항목1", "ㄴ. 항목2", "ㄷ. 항목3", "ㄹ. 항목4"]
     },
     "options": [
       { "text": "ㄱ, ㄴ", "styleRanges": [] },
       { "text": "ㄱ, ㄷ", "styleRanges": [], "explanation": "정답" },
       { "text": "ㄴ, ㄷ", "styleRanges": [] },
       { "text": "ㄴ, ㄹ", "styleRanges": [] },
       { "text": "ㄷ, ㄹ", "styleRanges": [] }
     ],
     "answer": 1
   }
   
   **⚠️ 보기(premise) 사용 규칙:**
   - 서술형 보기: text에 최소 10자 이상의 내용 필수
   - 나열형 보기: items에 최소 3개 이상의 항목 필수
   - text와 items 둘 다 비어있으면 안 됨!

5. **문제 난이도 배분**
   - 첫 문제: 내용 이해 (medium)
   - 중간: annotation 활용 추론 (hard)
   - 마지막: 적용 (medium)

6. **자주하는 질문 형식**
   - "이 글의 중심 내용으로 가장 적절한 것은?"
   - "윗글에 대한 설명으로 적절하지 않은 것은?"
   - "㉠~㉣ 중 <보기>의 상황에 해당하는 것은?"
   - "<보기>를 바탕으로 ㄱ~ㄹ을 이해한 것으로 적절한 것은?"

7. **품질 기준**
   - 명확한 정답, 매력적인 오답
   - 정답에만 explanation 필수
   - 평가원 스타일 유지
   - 교육적 가치

8. **문제 구성**
   - ${problemCount}개 중 1-2개는 annotation 활용
   - with-premise 유형 1-2개 포함
   - 다양한 사고력 평가

주의: styleRanges 배열 안에는 start, end, bold, underline, box, highlight만 사용하세요. annotation은 절대 넣지 마세요!`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
        systemInstruction: systemInstruction,
        temperature: 0.8,
      }
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

    const aiResponse = JSON.parse(cleanedText);

    // 🔍 디버깅 (개발 중)
    if (__DEV__) {
      console.log('=== Raw AI Response ===');
      debugAIResponse(aiResponse);
    }

    // ✅ 응답 검증
    const validation = validateAIResponse(aiResponse);
    if (!validation.valid) {
      console.error('AI 응답 검증 실패:', validation.errors);
      throw new Error('AI 응답 형식이 올바르지 않습니다: ' + validation.errors.join(', '));
    }

    // ⚠️ 경고가 있으면 로그 출력
    if (validation.warnings.length > 0) {
      console.warn('AI 응답 경고:', validation.warnings);
    }

    // 🧹 응답 정리 (annotation을 styleRanges에서 제거)
    const cleanedResponse = cleanAIResponse(aiResponse);

    // 🔍 정리 후 디버깅 (개발 중)
    if (__DEV__) {
      console.log('=== Cleaned AI Response ===');
      debugAIResponse(cleanedResponse);
    }

    const result = {
      topic,
      difficulty,
      problemCount,
      passage: cleanedResponse.passage,
      problems: cleanedResponse.problems,
    };

    return result;

  } catch (error) {
    console.error('문제 생성 오류:', error);
    throw error;
  }
}