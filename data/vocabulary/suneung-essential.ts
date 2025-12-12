import { VocabularyCard } from '../../types/vocabulary';

// 수능 필수 어휘 카드
export const suneungEssentialCards: VocabularyCard[] = [
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
