import { createParagraph, LearningSession } from '../types/problem';

export const SAMPLE_SESSION: LearningSession = {
  topic: 'literature',
  difficulty: 'suneung',
  problemCount: 3,
  passage: {
    title: '법조문의 의미 해석 방법',
    author: 'EBS 연계',
    source: '2026학년도 수능 국어 영역',
    paragraphs: [
      createParagraph(
        "  법조문으로 구성된 법 규범인 성문법의 의미를 파악하는 것을 법 해석이라고 한다. 법은 사회 구성원들에게 보편적으로 적용되는 규범이므로, 성문법을 ⓐ구성하는 단어나 문장은 그 일상적 의미에 충실하게 해석되어야 한다. 이러한 ‘문리 해석’이 법 해석의 출발점이다.\
         \n  그러나 문리 해석으로 그 내용을 제대로 파악하기 어려우면, 그것이 사용된 맥락을 ⓑ고려하여 그 의미를 파악하는 ‘체계적 해석’, 입법 과정에서 논의된 내용을 바탕으로 그 의미를 파악하는 ‘역사적 해석’ 등의 해석 방법을 사용할 수 있다. 그 예로서 ‘담보’를 들 수 있다. 담보의 일상적 의미는 ‘맡아서 보증함’이고, 이런 의미로 사용된 예로 ‘구조물의 안전을 담보하기 위한 검사’를 들 수 있다. 하지만 성문법 조문에서 사용될 때는 그 맥락을 고려하여 다른 의미로 해석되기도 한다.\
         \n  담보는 유상 계약의 맥락에서 거래 대상의 값어치를 보장한다는 의미로 해석된다. 유상 계약이란 그 당사자가 서로 대가를 주고받을 것을 약속하는 계약을 뜻한다. 유상 계약의 일종인 매매 계약에서 목적물이 계약 체결 당시부터 있던 하자 때문에 대금만큼의 값어치를 하지 못하는 상태였다면, 매도인은 그 하자 발생의 원인이 무엇이든 담보 책임을 져야 한다. 그 책임의 내용은 손해 배상이 원칙이지만, 만약 하자로 인해 매수인이 계약의 목적을 달성할 수 없으면 매수인은 계약을 ⓒ파기하고 대금 환불을 청구할 수도 있다. 다만 매수인이 계약 체결 당시 하자의 존재를 알았거나 알 수 있었던 경우에는 담보 책임이 인정되지 않는다. \
         \n  한편, 담보는 채권과 관련된 맥락에서는 채권의 실현 가능성을 보장하기 위한 조치라는 의미로 해석된다. 담보 물권이 그 예이다. 금전 채권은 채권자가 채무자로부터 돈을 받아야 실현되는데, 채무자가 돈을 지급하지 않으면 강제 집행 절차를 거쳐야 한다. 강제 집행의 목적물이 부동산이면 그 부동산을 경매하여 마련된 경매 대금을 배당받음으로써 금전 채권이 실현된다. 이때 경매 대금을 배당받을 금전 채권자가 여럿이면 각 채권자는 각자의 채권액에 비례하여 배당받아야 하는 것이 원칙이다. 그러나 그 채권자 중 담보 물권을 가진 자는 경매 대금에서 자신의 채권액부터 먼저 배당받는다.",
        [
          { start: 84, end: 88, underline: true }, // "구성하는"
          { start: 205, end: 209, underline: true }, // "고려하여여"
          { start: 703, end: 707, underline: true }, // "고려하여여"

        ],
        "(가)"
      ),
      
    ],
    footnotes: {
      '*': '각주 1임',
      '**': '각주 2임ㄷㄷㄷ',
    },
  },
  problems: [
    {
      id: 1,
      type: 'with-premise',
      category: '내용 일치',
      questionText: '(가)를 통해 알 수 있는 내용으로 적절하지 않은 것은?',
      questionSegments: [{ text: '(가)를 통해 알 수 있는 내용으로 적절하지 ' },
        {text:"않은 ",underline:true},
        {text:"것은?"}
      ],
      options: [
        {
          id: 0,
          text: '법은 사회 구성원들에게 보편적으로 적용되어야 하므로 일상적 의미가 해석의 출발점이 되어야 한다.',
          segments: [{ text: '법은 사회 구성원들에게 보편적으로 적용되어야 하므로 일상적 의미가 해석의 출발점이 되어야 한다.' }],
        },
        {
          id: 1,
          text: '법조문에서의 담보에는 채권자의 금전 채권 실현의 가능성을 보장하는 조치라는 법적인 의미가 부여되기도 한다.',
          segments: [
            { text: '법조문에서의 담보에는 채권자의 금전 채권 실현의 가능성을 보장하는 조치라는 법적인 의미가 부여되기도 한다.' }
          ],
          explanation: '그냥 답임ㅋㅋ',
        },
        {
          id: 2,
          text: '금전 채권자가 여럿인 경우에 진행된 경매에서 담보 물권의 존재 여부는 경매 대금의 배당 순위에 영향을 준다.',
          segments: [{ text: '금전 채권자가 여럿인 경우에 진행된 경매에서 담보 물권의 존재 여부는 경매 대금의 배당 순위에 영향을 준다.' }],
        },
        {
          id: 3,
          text: '유상 계약에서의 담보는 당사자 간 거래 대상의 값어치를 보장하는 의미로 해석되므로, 교환 대상 사이의 값어치가 일치해야 계약이 체결된다.',
          segments: [{ text: '유상 계약에서의 담보는 당사자 간 거래 대상의 값어치를 보장하는 의미로 해석되므로, 교환 대상 사이의 값어치가 일치해야 계약이 체결된다.' }],
        },
        {
          id: 4,
          text: '법조문의 의미를 문리 해석만으로 제대로 파악하기 어려운 경우에는 법조문의 입법 과정에서 논의된 내용을 바탕으로 그 의미를 해석하기도 한다.',
          segments: [{ text: '법조문의 의미를 문리 해석만으로 제대로 파악하기 어려운 경우에는 법조문의 입법 과정에서 논의된 내용을 바탕으로 그 의미를 해석하기도 한다.' }],
        },
      ],
      answer: 4,
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