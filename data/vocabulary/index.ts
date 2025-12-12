import { VocabularyCard, VocabularyDeck } from '../../types/vocabulary';

// 모든 단어 카드 import
export { suneungEssentialCards } from './suneung-essential';
export { hanjaAdvancedCards } from './hanja-advanced';
export { idiomCards } from './idioms';
export { literatureTermCards } from './literature-terms';
// 여기에 새로운 단어장을 추가하세요
// export { grammarBasicCards } from './grammar-basic';
// export { proverbCards } from './proverbs';

import { suneungEssentialCards } from './suneung-essential';
import { hanjaAdvancedCards } from './hanja-advanced';
import { idiomCards } from './idioms';
import { literatureTermCards } from './literature-terms';

/**
 * 단어장 덱 구성
 *
 * 새 덱을 추가하는 방법:
 * 1. 위에서 카드 배열을 import
 * 2. 아래 배열에 새 덱 추가
 */
export const VOCABULARY_DECKS: VocabularyDeck[] = [
  {
    id: 'deck-suneung-essential',
    title: '수능 필수 어휘',
    description: '수능에 자주 출제되는 핵심 어휘',
    category: 'hanja',
    level: 'suneung',
    cardCount: suneungEssentialCards.length,
    cards: suneungEssentialCards,
  },
  {
    id: 'deck-hanja-advanced',
    title: '고급 한자어',
    description: '논술과 독서에 필요한 고급 한자어',
    category: 'hanja',
    level: 'advanced',
    cardCount: hanjaAdvancedCards.length,
    cards: hanjaAdvancedCards,
  },
  {
    id: 'deck-idiom',
    title: '필수 관용구',
    description: '일상과 시험에 자주 나오는 관용구',
    category: 'idiom',
    level: 'intermediate',
    cardCount: idiomCards.length,
    cards: idiomCards,
  },
  {
    id: 'deck-literature',
    title: '문학 용어',
    description: '문학 작품 감상에 필요한 핵심 용어',
    category: 'literature',
    level: 'intermediate',
    cardCount: literatureTermCards.length,
    cards: literatureTermCards,
  },
  // 여기에 새로운 덱을 추가하세요
];

// 레이블 상수
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

/**
 * ID로 덱 가져오기
 */
export function getDeckById(deckId: string): VocabularyDeck | undefined {
  return VOCABULARY_DECKS.find(deck => deck.id === deckId);
}

/**
 * 카테고리로 덱 필터링
 */
export function getDecksByCategory(category: string): VocabularyDeck[] {
  return VOCABULARY_DECKS.filter(deck => deck.category === category);
}

/**
 * 레벨로 덱 필터링
 */
export function getDecksByLevel(level: string): VocabularyDeck[] {
  return VOCABULARY_DECKS.filter(deck => deck.level === level);
}

/**
 * 모든 카드를 하나의 배열로 가져오기
 */
export function getAllCards(): VocabularyCard[] {
  return VOCABULARY_DECKS.flatMap(deck => deck.cards);
}
