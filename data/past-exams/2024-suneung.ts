import { createParagraph, LearningSession } from '../../types/problem';

// 2024학년도 수능 국어 - 문학 (실제 기출 예시)
export const exam2024Suneung: LearningSession = {
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
  ],
};
