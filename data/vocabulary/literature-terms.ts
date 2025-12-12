import { VocabularyCard } from '../../types/vocabulary';

// 문학 용어 카드
export const literatureTermCards: VocabularyCard[] = [
  {
    id: 'card-301',
    word: '은유',
    meaning: '원관념과 보조관념을 직접 연결하여 표현하는 비유법',
    hanja: '隱喩',
    examples: [
      '"내 마음은 호수"는 은유적 표현이다.',
      '시인은 삶을 여행에 은유했다.',
    ],
    synonyms: ['암유'],
    category: 'literature',
    level: 'intermediate',
    tags: ['수능', '문학개념'],
  },
  {
    id: 'card-302',
    word: '직유',
    meaning: '"~처럼", "~같이"를 사용하여 비유하는 표현법',
    hanja: '直喩',
    examples: [
      '"꽃처럼 아름답다"는 직유법이다.',
      '직유는 은유보다 명확한 비유법이다.',
    ],
    category: 'literature',
    level: 'intermediate',
    tags: ['수능', '문학개념'],
  },
  {
    id: 'card-303',
    word: '복선',
    meaning: '앞으로 일어날 일을 미리 암시하는 서술 방법',
    hanja: '伏線',
    examples: [
      '작가는 교묘한 복선을 깔아두었다.',
      '이 장면이 결말의 복선이 되었다.',
    ],
    category: 'literature',
    level: 'advanced',
    tags: ['소설'],
  },
];
