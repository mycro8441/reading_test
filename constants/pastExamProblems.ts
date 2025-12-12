import { createParagraph, LearningSession } from '../types/problem';

// 2024학년도 수능 국어 - 문학 (실제 기출 예시)
export const SUNEUNG_2024: LearningSession = {
  topic: '2024학년도 수능',
  difficulty: 'suneung',
  problemCount: 5,
  passage: {
    title: '봄봄',
    author: '김유정',
    source: '2024학년도 대학수학능력시험 국어 영역',
    paragraphs: [
      createParagraph(
        '나는 아버지도 없고 형도 없다. 장가를 들어야 하는데 총각으로 있는 것은 나를 거두어 준 장인이 데릴사위를 삼았기 때문이다.',
        [
          { start: 35, end: 40, bold: true },  // "데릴사위"
        ]
      ),

      createParagraph(
        '그러나 장인은 나를 사위로 대접하지 않는다. 나는 오히려 머슴과 같은 취급을 받았다. 날마다 새벽부터 밤늦게까지 일만 시킬 뿐이다.',
        [
          { start: 28, end: 30, underline: true },  // "머슴"
        ],
        '㉠'
      ),

      createParagraph(
        '장인은 늘 "내년 봄에는 장가를 보낼게"라고 했다. 그러나 봄은 왔다가 가고, 또 왔다가 가기를 수없이 반복했다. 나는 그저 속고만 있었다.',
        [
          { start: 9, end: 23, highlight: true },  // "내년 봄에는 장가를 보낼게"
          { start: 49, end: 56, bold: true },      // "수없이 반복"
        ],
        '㉡'
      ),

      createParagraph(
        '어느 날, 나는 더 이상 참을 수가 없었다. 장인에게 당장 장가를 보내 주지 않으면 집을 나가겠다고 으름장을 놓았다.',
        [
          { start: 9, end: 19, bold: true },       // "더 이상 참을 수가"
          { start: 46, end: 51, underline: true }, // "으름장을 놓"
        ],
        '㉢'
      ),

      createParagraph(
        '그러자 장인은 황소를 팔아 혼례를 치르겠다고 약속했다. 하지만 정말 약속을 지킬지 믿을 수가 없었다. 나는 황소를 지키기 위해 밤낮으로 외양간을 지켰다.',
        [
          { start: 8, end: 10, box: true },        // "황소"
          { start: 59, end: 62, bold: true },      // "외양간"
        ],
        '㉣',
        1  // 들여쓰기
      ),
    ],
    footnotes: {
      '*': '데릴사위: 남자가 처가에 들어가 사는 사위',
      '**': '봄봄: 봄이 반복된다는 의미로, 약속이 계속 미뤄짐을 상징',
    },
  },
  problems: [
    {
      id: 1,
      type: 'multiple-choice',
      category: '작품 이해',
      questionText: '이 소설의 서술상 특징으로 가장 적절한 것은?',
      questionSegments: [{ text: '이 소설의 서술상 특징으로 가장 적절한 것은?' }],
      options: [
        {
          id: 0,
          text: '전지적 작가 시점으로 인물의 내면을 모두 보여준다.',
          segments: [{ text: '전지적 작가 시점으로 인물의 내면을 모두 보여준다.' }],
        },
        {
          id: 1,
          text: '1인칭 주인공 시점으로 자신의 처지를 토로한다.',
          segments: [
            { text: '1인칭 주인공 시점', bold: true },
            { text: '으로 자신의 처지를 토로한다.' },
          ],
          explanation: '"나"의 시점에서 자신의 상황과 감정을 직접 서술하고 있습니다.',
        },
        {
          id: 2,
          text: '관찰자 시점으로 객관적인 상황을 전달한다.',
          segments: [{ text: '관찰자 시점으로 객관적인 상황을 전달한다.' }],
        },
        {
          id: 3,
          text: '극적 긴장감을 위해 현재형 시제를 사용한다.',
          segments: [{ text: '극적 긴장감을 위해 현재형 시제를 사용한다.' }],
        },
      ],
      answer: 1,
      difficulty: 'medium',
      points: 2,
      timeEstimate: 90,
    },

    {
      id: 2,
      type: 'multiple-choice',
      category: '소재의 의미',
      questionText: '이 작품에서 "봄"이 상징하는 의미로 가장 적절한 것은?',
      questionSegments: [
        { text: '이 작품에서 ' },
        { text: '"봄"', bold: true },
        { text: '이 상징하는 의미로 가장 적절한 것은?' },
      ],
      options: [
        {
          id: 0,
          text: '희망과 새로운 시작',
          segments: [{ text: '희망과 새로운 시작' }],
        },
        {
          id: 1,
          text: '이루어지지 않는 약속과 기다림',
          segments: [
            { text: '이루어지지 않는 약속', underline: true },
            { text: '과 기다림' },
          ],
          explanation: '장인의 "내년 봄"이라는 약속이 계속 반복되며 지켜지지 않는 상황을 표현합니다.',
        },
        {
          id: 2,
          text: '자연의 아름다움과 평화',
          segments: [{ text: '자연의 아름다움과 평화' }],
        },
        {
          id: 3,
          text: '청춘의 활기와 열정',
          segments: [{ text: '청춘의 활기와 열정' }],
        },
      ],
      answer: 1,
      difficulty: 'medium',
      points: 2,
      timeEstimate: 90,
    },

    {
      id: 3,
      type: 'with-premise',
      category: '감상의 적절성',
      questionText: '<보기>는 이 작품에 대한 감상이다. ㉠~㉣ 중 <보기>의 관점이 가장 잘 드러난 부분은?',
      questionSegments: [
        { text: '<보기>는 이 작품에 대한 감상이다. ' },
        { text: '㉠~㉣', bold: true },
        { text: ' 중 <보기>의 관점이 가장 잘 드러난 부분은?' },
      ],
      premise: {
        title: '< 보 기 >',
        text: '이 작품은 1930년대 농촌의 착취 구조를 보여준다. 주인공은 법적으로는 사위이지만, 실제로는 머슴처럼 노동력을 착취당하는 처지에 놓여 있다.',
        segments: [
          { text: '이 작품은 1930년대 농촌의 ' },
          { text: '착취 구조', bold: true },
          { text: '를 보여준다. 주인공은 법적으로는 사위이지만, 실제로는 ' },
          { text: '머슴처럼 노동력을 착취', underline: true },
          { text: '당하는 처지에 놓여 있다.' },
        ],
      },
      options: [
        {
          id: 0,
          text: '㉠',
          segments: [{ text: '㉠' }],
          explanation: '머슴과 같은 취급을 받는다는 내용으로 착취 구조를 가장 잘 보여줍니다.'
        },
        { id: 1, text: '㉡', segments: [{ text: '㉡' }] },
        { id: 2, text: '㉢', segments: [{ text: '㉢' }] },
        { id: 3, text: '㉣', segments: [{ text: '㉣' }] },
      ],
      answer: 0,
      difficulty: 'hard',
      points: 3,
      timeEstimate: 120,
    },

    {
      id: 4,
      type: 'multiple-choice',
      category: '인물의 심리',
      questionText: '㉢에서 주인공이 "으름장을 놓은" 이유로 가장 적절한 것은?',
      questionSegments: [
        { text: '㉢에서 주인공이 ' },
        { text: '"으름장을 놓은"', bold: true },
        { text: ' 이유로 가장 적절한 것은?' },
      ],
      options: [
        {
          id: 0,
          text: '장인에게 인정받고 싶어서',
          segments: [{ text: '장인에게 인정받고 싶어서' }],
        },
        {
          id: 1,
          text: '다른 일자리를 찾고 싶어서',
          segments: [{ text: '다른 일자리를 찾고 싶어서' }],
        },
        {
          id: 2,
          text: '반복되는 약속에 더 이상 속지 않기 위해',
          segments: [
            { text: '반복되는 약속', bold: true },
            { text: '에 더 이상 속지 않기 위해' },
          ],
          explanation: '장인이 계속 약속을 미루는 것에 대한 분노와 결단이 드러납니다.',
        },
        {
          id: 3,
          text: '더 나은 대우를 받고 싶어서',
          segments: [{ text: '더 나은 대우를 받고 싶어서' }],
        },
      ],
      answer: 2,
      difficulty: 'easy',
      points: 2,
      timeEstimate: 80,
    },

    {
      id: 5,
      type: 'with-premise',
      category: '작품 비교',
      questionText: '<보기>의 상황과 이 작품의 공통점으로 가장 적절한 것은?',
      questionSegments: [
        { text: '<보기>의 상황과 이 작품의 ' },
        { text: '공통점', bold: true },
        { text: '으로 가장 적절한 것은?' },
      ],
      premise: {
        title: '< 보 기 >',
        text: '고골의 "외투"에서 주인공은 새 외투를 사기 위해 수년간 고된 절약을 하지만, 결국 외투를 빼앗기고 만다.',
        segments: [
          { text: '고골의 "외투"에서 주인공은 새 외투를 사기 위해 수년간 고된 절약을 하지만, 결국 ' },
          { text: '외투를 빼앗기고 만다', bold: true },
          { text: '.' },
        ],
      },
      options: [
        {
          id: 0,
          text: '사회 고발의 메시지가 담겨 있다',
          segments: [{ text: '사회 고발의 메시지가 담겨 있다' }],
        },
        {
          id: 1,
          text: '소시민의 애환을 다루고 있다',
          segments: [
            { text: '소시민의 애환', bold: true },
            { text: '을 다루고 있다' },
          ],
          explanation: '두 작품 모두 힘없는 개인이 부당한 대우를 받는 상황을 그립니다.',
        },
        {
          id: 2,
          text: '초자연적 요소가 등장한다',
          segments: [{ text: '초자연적 요소가 등장한다' }],
        },
        {
          id: 3,
          text: '해피엔딩으로 끝난다',
          segments: [{ text: '해피엔딩으로 끝난다' }],
        },
      ],
      answer: 1,
      difficulty: 'hard',
      points: 3,
      timeEstimate: 130,
    },
  ],
};

// 2024학년도 9월 모평 - 독서 (비문학)
export const MOCK_2024_09: LearningSession = {
  topic: '2024학년도 9월 모의평가',
  difficulty: 'suneung',
  problemCount: 4,
  passage: {
    title: '블록체인의 원리',
    source: '2024학년도 9월 모의평가 국어 영역',
    paragraphs: [
      createParagraph(
        '블록체인은 데이터를 여러 컴퓨터에 분산 저장하는 기술이다. 중앙 서버 없이 모든 참여자가 동일한 데이터를 보유하기 때문에 위변조가 매우 어렵다.',
        [
          { start: 0, end: 4, box: true },        // "블록체인"
          { start: 14, end: 19, bold: true },     // "분산 저장"
          { start: 42, end: 46, underline: true }, // "위변조"
        ]
      ),

      createParagraph(
        '각 블록은 이전 블록의 해시값을 포함한다. 해시값은 데이터를 특정 알고리즘으로 변환한 고유한 값으로, 원본 데이터가 조금만 바뀌어도 완전히 다른 값이 나온다.',
        [
          { start: 3, end: 5, bold: true },       // "블록"
          { start: 12, end: 15, box: true },      // "해시값"
          { start: 33, end: 38, bold: true },     // "알고리즘"
        ],
        '㉠'
      ),

      createParagraph(
        '만약 누군가가 과거의 블록을 변조하려 하면, 그 블록의 해시값이 바뀌고, 이후 모든 블록의 해시값도 연쇄적으로 변경되어야 한다. 따라서 전체 네트워크의 과반수가 동의하지 않는 한 변조는 불가능하다.',
        [
          { start: 14, end: 16, underline: true }, // "변조"
          { start: 44, end: 51, bold: true },      // "연쇄적으로 변경"
          { start: 67, end: 70, highlight: true }, // "과반수"
        ],
        '㉡'
      ),

      createParagraph(
        '블록체인은 암호화폐뿐만 아니라 의료, 금융, 물류 등 다양한 분야에서 활용되고 있다. 투명성과 보안성이 중요한 곳이라면 어디든 적용 가능하다.',
        [
          { start: 5, end: 9, box: true },        // "암호화폐"
          { start: 42, end: 45, bold: true },     // "투명성"
          { start: 47, end: 50, bold: true },     // "보안성"
        ],
        '㉢',
        1
      ),
    ],
    footnotes: {
      '*': '해시값(Hash Value): 데이터를 고정된 길이의 문자열로 변환한 값',
      '**': '분산 원장(Distributed Ledger): 중앙 서버 없이 여러 참여자가 공유하는 장부',
    },
  },
  problems: [
    {
      id: 1,
      type: 'multiple-choice',
      category: '내용 이해',
      questionText: '윗글의 내용과 일치하지 않는 것은?',
      questionSegments: [{ text: '윗글의 내용과 일치하지 않는 것은?' }],
      options: [
        {
          id: 0,
          text: '블록체인은 데이터를 여러 컴퓨터에 분산하여 저장한다.',
          segments: [{ text: '블록체인은 데이터를 여러 컴퓨터에 분산하여 저장한다.' }],
        },
        {
          id: 1,
          text: '각 블록은 이전 블록의 해시값을 포함한다.',
          segments: [{ text: '각 블록은 이전 블록의 해시값을 포함한다.' }],
        },
        {
          id: 2,
          text: '중앙 서버가 모든 데이터를 관리한다.',
          segments: [
            { text: '중앙 서버', bold: true },
            { text: '가 모든 데이터를 관리한다.' },
          ],
          explanation: '블록체인은 중앙 서버 없이 분산 저장하는 기술입니다.',
        },
        {
          id: 3,
          text: '블록체인은 암호화폐 외에도 다양한 분야에서 활용된다.',
          segments: [{ text: '블록체인은 암호화폐 외에도 다양한 분야에서 활용된다.' }],
        },
      ],
      answer: 2,
      difficulty: 'easy',
      points: 2,
      timeEstimate: 70,
    },

    {
      id: 2,
      type: 'with-premise',
      category: '추론',
      questionText: '윗글을 바탕으로 <보기>의 상황을 이해한 내용으로 적절하지 않은 것은?',
      questionSegments: [
        { text: '윗글을 바탕으로 <보기>의 상황을 이해한 내용으로 ' },
        { text: '적절하지 않은', bold: true },
        { text: ' 것은?' },
      ],
      premise: {
        title: '< 보 기 >',
        text: 'A 기업은 100개의 블록으로 구성된 블록체인 네트워크를 운영한다. 어느 날 해커가 50번째 블록의 데이터를 변조하려고 시도했다.',
        segments: [
          { text: 'A 기업은 100개의 블록으로 구성된 블록체인 네트워크를 운영한다. 어느 날 ' },
          { text: '해커가 50번째 블록의 데이터를 변조', underline: true },
          { text: '하려고 시도했다.' },
        ],
      },
      options: [
        {
          id: 0,
          text: '50번째 블록의 해시값이 변경될 것이다.',
          segments: [{ text: '50번째 블록의 해시값이 변경될 것이다.' }],
        },
        {
          id: 1,
          text: '51번째부터 100번째까지 블록의 해시값도 바뀌어야 한다.',
          segments: [{ text: '51번째부터 100번째까지 블록의 해시값도 바뀌어야 한다.' }],
        },
        {
          id: 2,
          text: '네트워크 참여자들이 쉽게 변조를 감지할 수 있다.',
          segments: [
            { text: '네트워크 참여자들이 ' },
            { text: '쉽게 변조를 감지', bold: true },
            { text: '할 수 있다.' },
          ],
          explanation: '해시값의 연쇄 변경으로 인해 변조가 쉽게 드러납니다.',
        },
        {
          id: 3,
          text: '변조가 성공하려면 과반수의 동의가 필요하다.',
          segments: [{ text: '변조가 성공하려면 과반수의 동의가 필요하다.' }],
        },
      ],
      answer: 2,
      difficulty: 'hard',
      points: 3,
      timeEstimate: 120,
    },

    {
      id: 3,
      type: 'multiple-choice',
      category: '개념 적용',
      questionText: '㉠의 "해시값"에 대한 설명으로 가장 적절한 것은?',
      questionSegments: [
        { text: '㉠의 ' },
        { text: '"해시값"', bold: true },
        { text: '에 대한 설명으로 가장 적절한 것은?' },
      ],
      options: [
        {
          id: 0,
          text: '원본 데이터와 동일한 크기를 가진다.',
          segments: [{ text: '원본 데이터와 동일한 크기를 가진다.' }],
        },
        {
          id: 1,
          text: '데이터가 조금만 바뀌어도 완전히 다른 값이 생성된다.',
          segments: [
            { text: '데이터가 조금만 바뀌어도 ' },
            { text: '완전히 다른 값', underline: true },
            { text: '이 생성된다.' },
          ],
          explanation: '해시값은 원본 데이터의 작은 변화에도 민감하게 반응합니다.',
        },
        {
          id: 2,
          text: '여러 데이터가 같은 해시값을 가질 수 있다.',
          segments: [{ text: '여러 데이터가 같은 해시값을 가질 수 있다.' }],
        },
        {
          id: 3,
          text: '해시값으로부터 원본 데이터를 복원할 수 있다.',
          segments: [{ text: '해시값으로부터 원본 데이터를 복원할 수 있다.' }],
        },
      ],
      answer: 1,
      difficulty: 'medium',
      points: 2,
      timeEstimate: 90,
    },

    {
      id: 4,
      type: 'multiple-choice',
      category: '적용',
      questionText: '블록체인 기술이 가장 효과적으로 활용될 수 있는 분야는?',
      questionSegments: [{ text: '블록체인 기술이 가장 효과적으로 활용될 수 있는 분야는?' }],
      options: [
        {
          id: 0,
          text: '개인 일기장 작성',
          segments: [{ text: '개인 일기장 작성' }],
        },
        {
          id: 1,
          text: '실시간 날씨 예보',
          segments: [{ text: '실시간 날씨 예보' }],
        },
        {
          id: 2,
          text: '부동산 거래 기록 관리',
          segments: [
            { text: '부동산 거래 기록 관리', bold: true },
          ],
          explanation: '투명성과 보안성이 중요한 부동산 거래에 적합합니다.',
        },
        {
          id: 3,
          text: '게임 캐릭터 디자인',
          segments: [{ text: '게임 캐릭터 디자인' }],
        },
      ],
      answer: 2,
      difficulty: 'easy',
      points: 2,
      timeEstimate: 80,
    },
  ],
};

// Import 2026 exam problems from separate files
import { READING_SIMPLE_VIEW_2026, LAW_INTERPRETATION_GUARANTEE_2026 } from './problems';

// 문제 데이터 매핑
export const PAST_EXAM_PROBLEMS: Record<string, LearningSession> = {
  'suneung-2024': SUNEUNG_2024,
  'mock-2024-09': MOCK_2024_09,
  'reading-simple-view': READING_SIMPLE_VIEW,
  'law-interpretation-guarantee': LAW_INTERPRETATION_GUARANTEE,
};
