import { VocabularyCard } from '../../types/vocabulary';

// 한자어 고급 카드
export const hanjaAdvancedCards: VocabularyCard[] = [
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
