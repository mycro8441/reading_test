import { VocabularyCard, VocabularyDeck } from '../types/vocabulary';

// 수능 필수 어휘 카드
const SUNEUNG_ESSENTIAL_CARDS: VocabularyCard[] = [
  {
    id: 'card-001',
    word: '간과하다',
    meaning: '대수롭지 않게 여겨 그냥 넘기다',
    hanja: '看過',
    examples: [
      '그는 중요한 사실을 간과하고 말았다.',
      '사소한 문제라고 간과해서는 안 된다.',
    ],
    synonyms: ['무시하다', '등한시하다'],
    category: 'hanja',
    level: 'suneung',
    tags: ['수능빈출', '한자어'],
  },
  {
    id: 'card-002',
    word: '고찰하다',
    meaning: '깊이 생각하여 살펴보다',
    hanja: '考察',
    examples: [
      '이 논문은 현대 사회의 문제점을 고찰한다.',
      '역사적 배경을 고찰해야 한다.',
    ],
    synonyms: ['관찰하다', '살피다', '연구하다'],
    category: 'hanja',
    level: 'suneung',
    tags: ['수능빈출', '논술'],
  },
  {
    id: 'card-003',
    word: '귀결되다',
    meaning: '결국 어떤 결과에 이르다',
    hanja: '歸結',
    examples: [
      '모든 논의가 같은 결론으로 귀결되었다.',
      '이 문제는 결국 교육의 문제로 귀결된다.',
    ],
    synonyms: ['귀착되다', '도달하다'],
    category: 'hanja',
    level: 'suneung',
    tags: ['수능빈출'],
  },
  {
    id: 'card-004',
    word: '내포하다',
    meaning: '속에 어떤 뜻이나 내용을 품다',
    hanja: '內包',
    examples: [
      '이 문장은 깊은 의미를 내포하고 있다.',
      '그의 말에는 비판의 뜻이 내포되어 있다.',
    ],
    synonyms: ['포함하다', '담다'],
    antonyms: ['드러내다'],
    category: 'hanja',
    level: 'suneung',
    tags: ['수능빈출', '독서'],
  },
  {
    id: 'card-005',
    word: '대두되다',
    meaning: '어떤 문제나 현상이 새롭게 나타나다',
    hanja: '擡頭',
    examples: [
      '환경 문제가 심각하게 대두되고 있다.',
      '새로운 이슈가 대두되었다.',
    ],
    synonyms: ['부상하다', '제기되다'],
    category: 'hanja',
    level: 'suneung',
    tags: ['수능빈출'],
  },
];

// 한자어 고급 카드
const HANJA_ADVANCED_CARDS: VocabularyCard[] = [
  {
    id: 'card-101',
    word: '역설적',
    meaning: '겉으로 보기에는 모순되는 것 같지만 실제로는 진리를 담고 있는',
    hanja: '逆說的',
    examples: [
      '역설적이게도 그의 실패가 성공의 밑거름이 되었다.',
      '이것은 역설적인 상황이다.',
    ],
    category: 'hanja',
    level: 'advanced',
    tags: ['논술', '문학'],
  },
  {
    id: 'card-102',
    word: '함의',
    meaning: '겉으로 드러나지 않고 속에 품고 있는 뜻',
    hanja: '含意',
    examples: [
      '이 표현의 함의를 이해해야 한다.',
      '그의 말에는 깊은 함의가 담겨 있다.',
    ],
    synonyms: ['내포', '함축'],
    category: 'hanja',
    level: 'advanced',
    tags: ['논술'],
  },
  {
    id: 'card-103',
    word: '상충하다',
    meaning: '서로 모순되거나 어긋나다',
    hanja: '相衝',
    examples: [
      '두 주장이 서로 상충한다.',
      '이익이 상충하는 경우가 많다.',
    ],
    synonyms: ['모순되다', '충돌하다'],
    category: 'hanja',
    level: 'advanced',
    tags: ['논술'],
  },
];

// 관용구 카드
const IDIOM_CARDS: VocabularyCard[] = [
  {
    id: 'card-201',
    word: '가슴에 못을 박다',
    meaning: '몹시 안타깝고 슬프게 하다',
    examples: [
      '그 소식은 부모님 가슴에 못을 박는 일이었다.',
      '자식의 잘못된 행동이 가슴에 못을 박는다.',
    ],
    category: 'idiom',
    level: 'intermediate',
    tags: ['감정'],
  },
  {
    id: 'card-202',
    word: '발등에 불이 떨어지다',
    meaning: '일이 매우 급하고 위급하게 되다',
    examples: [
      '시험이 코앞이라 이제야 발등에 불이 떨어졌다.',
      '발등에 불이 떨어져야 움직이는 사람이다.',
    ],
    category: 'idiom',
    level: 'intermediate',
    tags: ['상황'],
  },
  {
    id: 'card-203',
    word: '손에 땀을 쥐다',
    meaning: '긴장하거나 초조하여 몹시 조마조마하다',
    examples: [
      '그의 연설을 듣고 손에 땀을 쥐었다.',
      '경기가 너무 박진감 넘쳐 손에 땀을 쥐게 했다.',
    ],
    category: 'idiom',
    level: 'beginner',
    tags: ['감정'],
  },
];

// 문학 용어 카드
const LITERATURE_CARDS: VocabularyCard[] = [
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

// 덱 구성
export const VOCABULARY_DECKS: VocabularyDeck[] = [
  {
    id: 'deck-suneung-essential',
    title: '수능 필수 어휘',
    description: '수능에 자주 출제되는 핵심 어휘 200개',
    category: 'hanja',
    level: 'suneung',
    cardCount: SUNEUNG_ESSENTIAL_CARDS.length,
    cards: SUNEUNG_ESSENTIAL_CARDS,
  },
  {
    id: 'deck-hanja-advanced',
    title: '고급 한자어',
    description: '논술과 독서에 필요한 고급 한자어',
    category: 'hanja',
    level: 'advanced',
    cardCount: HANJA_ADVANCED_CARDS.length,
    cards: HANJA_ADVANCED_CARDS,
  },
  {
    id: 'deck-idiom',
    title: '필수 관용구',
    description: '일상과 시험에 자주 나오는 관용구',
    category: 'idiom',
    level: 'intermediate',
    cardCount: IDIOM_CARDS.length,
    cards: IDIOM_CARDS,
  },
  {
    id: 'deck-literature',
    title: '문학 용어',
    description: '문학 작품 감상에 필요한 핵심 용어',
    category: 'literature',
    level: 'intermediate',
    cardCount: LITERATURE_CARDS.length,
    cards: LITERATURE_CARDS,
  },
];

// 레이블
export const LEVEL_LABELS = {
  beginner: '초급',
  intermediate: '중급',
  advanced: '고급',
  suneung: '수능',
};

export const CATEGORY_LABELS = {
  hanja: '한자어',
  pure: '순우리말',
  idiom: '관용구',
  proverb: '속담',
  grammar: '문법 용어',
  literature: '문학 용어',
};
