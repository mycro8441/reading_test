import { createParagraph, LearningSession } from '../types/problem';

export const SAMPLE_SESSION: LearningSession = {
  topic: 'literature',
  difficulty: 'suneung',
  problemCount: 3,
  passage: {
    title: '시간의 체험',
    author: '김철수',
    source: '2024학년도 수능 국어 영역',
    paragraphs: [
      createParagraph(
        '우리는 종종 시간이 모든 사람에게 공평하게 주어진다고 말한다. 하루 24시간, 1년 365일이라는 물리적 시간은 누구에게나 동일하다. 하지만 시간의 체험은 사람마다 다르다.',
        [
          { start: 19, end: 24, bold: true },           // "공평하게"
          { start: 55, end: 61, box: true },            // "물리적 시간"
          { start: 83, end: 85, underline: true },      // "체험"
        ],
        '㉠'
      ),
      
      createParagraph(
        '이러한 현상은 \'비례 이론\'으로 설명할 수 있다. 10살 아이에게 1년은 인생의 10분의 1이지만, 50살 어른에게 1년은 인생의 50분의 1에 불과하다.',
        [
          { start: 9, end: 15, bold: true, underline: true },  // "비례 이론"
        ],
        '㉡'
      ),
      
      createParagraph(
        '또 다른 설명은 \'새로움의 정도\'와 관련이 있다. 어린 시절에는 모든 것이 새롭고 신선하기 때문에 뇌가 더 많은 정보를 처리하고 기억한다.',
        [
          { start: 9, end: 17, highlight: true },  // "새로움의 정도"
        ],
        '㉢'
      ),
      
      createParagraph(
        '결국 시간의 속도는 우리의 경험과 기억에 의해 결정된다고 할 수 있다. 새로운 경험을 많이 하고, 다양한 활동을 할수록 시간은 천천히 흐르는 것처럼 느껴진다.',
        [
          { start: 18, end: 26, bold: true },  // "경험과 기억"
        ],
        '㉣',
        1  // 들여쓰기
      ),
    ],
    footnotes: {
      '*': '물리적 시간: 시계로 측정할 수 있는 객관적인 시간',
      '**': '비례 이론: 자네(Janet, 1877)가 제안한 시간 지각 이론',
    },
  },
  problems: [
    {
      id: 1,
      type: 'multiple-choice',
      category: '내용 이해',
      questionText: '이 글의 중심 내용으로 가장 적절한 것은?',
      questionSegments: [{ text: '이 글의 중심 내용으로 가장 적절한 것은?' }],
      options: [
        {
          id: 0,
          text: '시간은 모든 사람에게 공평하게 주어진다.',
          segments: [{ text: '시간은 모든 사람에게 공평하게 주어진다.' }],
        },
        {
          id: 1,
          text: '나이가 들수록 시간이 빠르게 느껴지는 이유',
          segments: [
            { text: '나이가 들수록 시간이 빠르게 느껴지는 ' },
            { text: '이유', bold: true },
          ],
          explanation: '글의 ㉠~㉣ 문단이 모두 이 주제를 설명하고 있습니다.',
        },
        {
          id: 2,
          text: '어린 시절의 기억이 더 선명한 이유',
          segments: [{ text: '어린 시절의 기억이 더 선명한 이유' }],
        },
        {
          id: 3,
          text: '시간을 효율적으로 사용하는 방법',
          segments: [{ text: '시간을 효율적으로 사용하는 방법' }],
        },
      ],
      answer: 1,
      difficulty: 'medium',
      points: 2,
      timeEstimate: 90,
    },

    {
      id: 2,
      type: 'with-premise',
      category: '추론',
      questionText: '<보기>는 이 글을 읽은 학생의 반응이다. ㉠~㉣ 중 <보기>의 반응과 가장 관련이 깊은 것은?',
      questionSegments: [
        { text: '<보기>는 이 글을 읽은 학생의 반응이다. ' },
        { text: '㉠~㉣', bold: true },
        { text: ' 중 <보기>의 반응과 가장 관련이 깊은 것은?' },
      ],
      premise: {
        title: '< 보 기 >',
        text: '나는 최근 여행을 다녀온 후 시간이 천천히 흘러가는 것처럼 느껴졌다. 새로운 장소에서의 경험이 뇌에 많은 정보를 각인시켰기 때문일 것이다.',
        segments: [
          { text: '나는 최근 여행을 다녀온 후 시간이 천천히 흘러가는 것처럼 느껴졌다. ' },
          { text: '새로운 장소에서의 경험', underline: true },
          { text: '이 뇌에 많은 정보를 각인시켰기 때문일 것이다.' },
        ],
      },
      options: [
        { id: 0, text: '㉠', segments: [{ text: '㉠' }] },
        { id: 1, text: '㉡', segments: [{ text: '㉡' }] },
        { 
          id: 2, 
          text: '㉢', 
          segments: [{ text: '㉢' }],
          explanation: '새로움의 정도와 경험에 대한 내용입니다.' 
        },
        { id: 3, text: '㉣', segments: [{ text: '㉣' }] },
      ],
      answer: 2,
      difficulty: 'hard',
      points: 3,
      timeEstimate: 120,
    },

    {
      id: 3,
      type: 'with-premise',
      category: '적용',
      questionText: '이 글을 바탕으로 <보기>의 ㄱ~ㄹ 중 시간을 더 느리게 체험할 수 있는 방법을 모두 고른 것은?',
      questionSegments: [
        { text: '이 글을 바탕으로 <보기>의 ' },
        { text: 'ㄱ~ㄹ', bold: true },
        { text: ' 중 시간을 더 느리게 체험할 수 있는 방법을 모두 고른 것은?' },
      ],
      premise: {
        title: '< 보 기 >',
        text: '',
        segments: [],
        items: [
          '새로운 취미를 배운다',
          '같은 길로 출퇴근한다',
          '다양한 사람들을 만난다',
          '익숙한 장소에서 휴식한다',
        ],
      },
      options: [
        { id: 0, text: 'ㄱ, ㄴ', segments: [{ text: 'ㄱ, ㄴ' }] },
        { 
          id: 1, 
          text: 'ㄱ, ㄷ', 
          segments: [{ text: 'ㄱ, ㄷ' }],
          explanation: '새로운 경험과 다양성이 핵심입니다.' 
        },
        { id: 2, text: 'ㄴ, ㄷ', segments: [{ text: 'ㄴ, ㄷ' }] },
        { id: 3, text: 'ㄷ, ㄹ', segments: [{ text: 'ㄷ, ㄹ' }] },
      ],
      answer: 1,
      difficulty: 'medium',
      points: 3,
      timeEstimate: 100,
    },
  ],
};

// AI 생성 가이드
export const AI_GENERATION_GUIDE = `
# AI 문제 생성 가이드 (인라인 스타일링)

## 스타일 범위 지정 방식

텍스트 에디터처럼 특정 구간(start, end 인덱스)을 선택하여 스타일을 적용합니다.

### 예시 1: 단일 스타일
\`\`\`
텍스트: "우리는 시간이 공평하게 주어진다고 말한다."
"공평하게"를 굵게 → { start: 8, end: 12, bold: true }
\`\`\`

### 예시 2: 박스 처리
\`\`\`
텍스트: "물리적 시간은 누구에게나 동일하다."
"물리적 시간"을 박스 → { start: 0, end: 6, box: true }
\`\`\`

### 예시 3: 복합 스타일
\`\`\`
텍스트: "비례 이론으로 설명할 수 있다."
"비례 이론"을 굵게+밑줄 → { start: 0, end: 5, bold: true, underline: true }
\`\`\`

### 예시 4: 여러 구간
\`\`\`
텍스트: "시간의 속도는 경험과 기억에 달려있다."
[
  { start: 0, end: 6, underline: true },   // "시간의 속도"
  { start: 9, end: 17, bold: true }        // "경험과 기억"
]
\`\`\`

## JSON 응답 형식

\`\`\`json
{
  "passage": {
    "title": "지문 제목",
    "author": "저자명",
    "source": "출처",
    "paragraphs": [
      {
        "text": "전체 문단 텍스트입니다. 여기에는 스타일이 적용될 부분이 포함됩니다.",
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
      "questionText": "질문 텍스트",
      "questionStyleRanges": [],
      "options": [
        {
          "text": "선택지 텍스트",
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

## 스타일 사용 원칙

- **bold**: 핵심 개념 2-3개 (문단당)
- **box**: 전문 용어 1-2개
- **underline**: 강조 포인트 1-2개
- **highlight**: 특별 주의 구절 0-1개

❌ 너무 많은 스타일 사용 지양!
✅ 문단당 3-5개 스타일 포인트가 적당

## 문자 인덱스 계산 주의사항

- 한글은 1글자 = 인덱스 1
- 공백도 포함
- 시작 인덱스는 0부터
- end는 exclusive (포함하지 않음)

예: "안녕하세요 반갑습니다"
- "하세" → start: 2, end: 4
- "반갑" → start: 6, end: 8
`;