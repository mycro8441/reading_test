import { createParagraph, LearningSession } from '../../types/problem';

// 2026학년도 수능 - 양자역학과 불확정성 원리
export const QUANTUM_PHYSICS_2026: LearningSession = {
  topic: '양자역학과 불확정성 원리',
  difficulty: 'suneung',
  problemCount: 4,
  passage: {
    title: '양자역학과 불확정성 원리',
    source: '2026학년도 대학수학능력시험 국어 영역',
    paragraphs: [
      createParagraph(
        '고전 물리학에서는 입자의 위치와 운동량을 동시에 정확히 측정할 수 있다고 가정한다. 그러나 하이젠베르크가 제시한 불확정성 원리에 따르면, 미시 세계에서는 입자의 위치를 정확히 측정하려 할수록 운동량의 불확실성이 커지고, 반대로 운동량을 정확히 측정하려 할수록 위치의 불확실성이 커진다. 이는 측정 기술의 한계가 아니라 자연의 본질적인 특성이다.',
        [
          { start: 0, end: 6, bold: true },        // "고전 물리학"
          { start: 43, end: 54, box: true },       // "불확정성 원리"
          { start: 132, end: 143, underline: true }, // "자연의 본질적인 특성"
        ]
      ),

      createParagraph(
        '불확정성 원리는 양자역학의 핵심 개념 중 하나로, 입자가 파동의 성질도 함께 갖기 때문에 나타나는 현상이다. 빛이 입자인 광자의 흐름이면서 동시에 파동이듯이, 전자와 같은 미시 입자도 입자성과 파동성을 모두 지닌다. 이러한 이중성을 \'파동-입자 이중성\'이라 한다. 파동으로 기술될 때 입자의 위치는 확률적으로만 예측 가능하며, 정확한 위치를 특정할 수 없다.',
        [
          { start: 8, end: 12, bold: true },       // "양자역학"
          { start: 119, end: 133, box: true },     // "파동-입자 이중성"
          { start: 153, end: 166, highlight: true }, // "확률적으로만 예측 가능"
        ]
      ),

      createParagraph(
        '양자역학에서 입자의 상태는 파동 함수로 표현되며, 이 함수의 제곱은 특정 위치에서 입자를 발견할 확률을 나타낸다. 측정 전까지 입자는 여러 가능한 상태의 중첩으로 존재하다가, 측정하는 순간 하나의 확정된 상태로 \'붕괴\'한다. 이를 \'파동 함수의 붕괴\'라고 한다. 예를 들어, 상자 안의 전자는 측정 전까지는 상자 전체에 확률적으로 분포하지만, 측정하는 순간 특정 위치에서 발견된다.',
        [
          { start: 16, end: 21, bold: true },      // "파동 함수"
          { start: 93, end: 95, underline: true }, // "중첩"
          { start: 122, end: 133, box: true },     // "파동 함수의 붕괴"
        ]
      ),

      createParagraph(
        '불확정성 원리의 영향은 일상 세계에서는 무시할 수 있을 만큼 작지만, 원자나 전자 같은 미시 세계에서는 결정적이다. 이 원리는 원자 구조의 안정성을 설명하는 데도 중요하다. 만약 전자의 위치와 운동량을 동시에 정확히 알 수 있다면, 전자는 원자핵으로 끌려 들어가 붕괴할 것이다. 그러나 불확정성 원리 때문에 전자는 원자핵 주변의 특정 영역에 확률적으로 분포하며, 이것이 원자를 안정적으로 유지시킨다.',
        [
          { start: 8, end: 13, underline: true },  // "일상 세계"
          { start: 30, end: 35, bold: true },      // "미시 세계"
          { start: 198, end: 210, highlight: true }, // "확률적으로 분포"
        ]
      ),
    ],
  },
  problems: [
    {
      id: 1,
      type: 'multiple-choice',
      category: '내용 이해',
      questionText: '윗글을 통해 알 수 있는 내용으로 적절하지 않은 것은?',
      questionSegments: [{ text: '윗글을 통해 알 수 있는 내용으로 적절하지 않은 것은?' }],
      options: [
        {
          id: 0,
          text: '고전 물리학과 양자역학은 입자의 측정 가능성에 대해 다른 입장을 취한다.',
          segments: [{ text: '고전 물리학과 양자역학은 입자의 측정 가능성에 대해 다른 입장을 취한다.' }],
        },
        {
          id: 1,
          text: '불확정성 원리는 측정 기술이 발전하면 극복할 수 있는 한계이다.',
          segments: [
            { text: '불확정성 원리는 측정 기술이 발전하면 ' },
            { text: '극복할 수 있는 한계', bold: true },
            { text: '이다.' },
          ],
          explanation: '본문에서 "측정 기술의 한계가 아니라 자연의 본질적인 특성"이라고 명시했습니다.',
        },
        {
          id: 2,
          text: '미시 입자는 입자성과 파동성을 동시에 지닌다.',
          segments: [{ text: '미시 입자는 입자성과 파동성을 동시에 지닌다.' }],
        },
        {
          id: 3,
          text: '파동 함수의 제곱은 입자를 발견할 확률을 나타낸다.',
          segments: [{ text: '파동 함수의 제곱은 입자를 발견할 확률을 나타낸다.' }],
        },
        {
          id: 4,
          text: '불확정성 원리는 원자 구조의 안정성을 설명하는 데 활용된다.',
          segments: [{ text: '불확정성 원리는 원자 구조의 안정성을 설명하는 데 활용된다.' }],
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
      category: '추론',
      questionText: '윗글을 바탕으로 <보기>의 상황을 이해한 것으로 가장 적절한 것은?',
      questionSegments: [
        { text: '윗글을 바탕으로 <보기>의 상황을 이해한 것으로 가장 적절한 것은?' },
      ],
      premise: '전자 현미경으로 전자의 위치를 정밀하게 측정하려고 한다. 이를 위해 파장이 짧은 빛을 사용하여 전자를 관찰한다.',
      options: [
        {
          id: 0,
          text: '파장이 짧은 빛을 사용하면 전자의 위치와 운동량을 동시에 정확히 측정할 수 있다.',
          segments: [{ text: '파장이 짧은 빛을 사용하면 전자의 위치와 운동량을 동시에 정확히 측정할 수 있다.' }],
        },
        {
          id: 1,
          text: '파장이 짧은 빛을 사용하면 전자의 위치는 정밀해지지만 운동량의 불확실성은 커진다.',
          segments: [
            { text: '파장이 짧은 빛을 사용하면 전자의 ' },
            { text: '위치는 정밀해지지만 운동량의 불확실성은 커진다', bold: true },
            { text: '.' },
          ],
          explanation: '불확정성 원리에 따르면 위치를 정확히 측정할수록 운동량의 불확실성이 커집니다.',
        },
        {
          id: 2,
          text: '전자는 측정 전까지 확정된 위치에 있다가 측정 후 중첩 상태가 된다.',
          segments: [{ text: '전자는 측정 전까지 확정된 위치에 있다가 측정 후 중첩 상태가 된다.' }],
        },
        {
          id: 3,
          text: '전자의 파동 함수는 측정 후에도 여러 상태의 중첩으로 남아 있다.',
          segments: [{ text: '전자의 파동 함수는 측정 후에도 여러 상태의 중첩으로 남아 있다.' }],
        },
      ],
      answer: 1,
      difficulty: 'hard',
      points: 3,
      timeEstimate: 120,
    },
    {
      id: 3,
      type: 'multiple-choice',
      category: '어휘',
      questionText: '문맥상 의미가 ㉠과 가장 가까운 것은?',
      questionSegments: [
        { text: '문맥상 의미가 ' },
        { text: '㉠', box: true },
        { text: '과 가장 가까운 것은?' },
      ],
      options: [
        {
          id: 0,
          text: '건물이 무너져 붕괴되었다.',
          segments: [{ text: '건물이 무너져 붕괴되었다.' }],
        },
        {
          id: 1,
          text: '파동 함수가 하나의 상태로 붕괴한다.',
          segments: [
            { text: '파동 함수가 ' },
            { text: '하나의 상태로 붕괴', bold: true },
            { text: '한다.' },
          ],
          explanation: '양자역학에서 측정에 의해 중첩 상태가 특정 상태로 확정되는 것을 의미합니다.',
        },
        {
          id: 2,
          text: '경제 체제가 붕괴될 위기에 처했다.',
          segments: [{ text: '경제 체제가 붕괴될 위기에 처했다.' }],
        },
        {
          id: 3,
          text: '제국이 내부 분열로 붕괴했다.',
          segments: [{ text: '제국이 내부 분열로 붕괴했다.' }],
        },
      ],
      answer: 1,
      difficulty: 'easy',
      points: 2,
      timeEstimate: 60,
    },
    {
      id: 4,
      type: 'multiple-choice',
      category: '내용 일치',
      questionText: '윗글의 내용과 일치하는 것을 <보기>에서 모두 고른 것은?',
      questionSegments: [
        { text: '윗글의 내용과 일치하는 것을 <보기>에서 모두 고른 것은?' },
      ],
      premise: 'ㄱ. 빛은 입자성과 파동성을 모두 갖는다.\nㄴ. 파동 함수는 측정 후에 중첩 상태가 된다.\nㄷ. 전자는 원자핵 주변에 확률적으로 분포한다.\nㄹ. 불확정성 원리는 일상 세계에서도 큰 영향을 미친다.',
      options: [
        {
          id: 0,
          text: 'ㄱ, ㄴ',
          segments: [{ text: 'ㄱ, ㄴ' }],
        },
        {
          id: 1,
          text: 'ㄱ, ㄷ',
          segments: [{ text: 'ㄱ, ㄷ', bold: true }],
          explanation: 'ㄱ은 2문단, ㄷ은 4문단에서 확인할 수 있습니다. ㄴ은 측정 후 붕괴하므로 틀렸고, ㄹ은 일상 세계에서 영향이 작다고 했으므로 틀렸습니다.',
        },
        {
          id: 2,
          text: 'ㄴ, ㄷ',
          segments: [{ text: 'ㄴ, ㄷ' }],
        },
        {
          id: 3,
          text: 'ㄴ, ㄹ',
          segments: [{ text: 'ㄴ, ㄹ' }],
        },
        {
          id: 4,
          text: 'ㄷ, ㄹ',
          segments: [{ text: 'ㄷ, ㄹ' }],
        },
      ],
      answer: 1,
      difficulty: 'medium',
      points: 2,
      timeEstimate: 90,
    },
  ],
};
