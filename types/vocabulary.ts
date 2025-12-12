// 단어 난이도
export type VocabularyLevel =
  | 'beginner'    // 초급
  | 'intermediate' // 중급
  | 'advanced'    // 고급
  | 'suneung';    // 수능 필수

// 단어 카테고리
export type VocabularyCategory =
  | 'hanja'       // 한자어
  | 'pure'        // 순우리말
  | 'idiom'       // 관용구
  | 'proverb'     // 속담
  | 'grammar'     // 문법 용어
  | 'literature'; // 문학 용어

// 개별 단어 카드
export interface VocabularyCard {
  id: string;
  word: string;              // 단어
  meaning: string;           // 뜻
  hanja?: string;            // 한자 표기 (한자어인 경우)
  pronunciation?: string;    // 발음
  examples: string[];        // 예문
  synonyms?: string[];       // 유의어
  antonyms?: string[];       // 반의어
  category: VocabularyCategory;
  level: VocabularyLevel;
  tags?: string[];           // 태그 (예: '수능빈출', '헷갈리기쉬운' 등)
}

// 단어장 덱
export interface VocabularyDeck {
  id: string;
  title: string;
  description: string;
  category: VocabularyCategory;
  level: VocabularyLevel;
  cardCount: number;
  thumbnail?: string;
  cards: VocabularyCard[];
}

// 학습 기록 (Anki 스타일)
export interface StudyRecord {
  cardId: string;
  lastStudied: Date;
  nextReview: Date;
  easeFactor: number;        // 난이도 계수 (기본 2.5)
  interval: number;          // 복습 간격 (일)
  repetitions: number;       // 복습 횟수
  lapses: number;            // 실패 횟수
}

// 학습 결과 (버튼 선택)
export type StudyResult =
  | 'again'   // 다시 (< 1분)
  | 'hard'    // 어려움 (현재 간격의 1.2배)
  | 'good'    // 보통 (현재 간격의 2.5배)
  | 'easy';   // 쉬움 (현재 간격의 4배)

// 학습 세션
export interface StudySession {
  deckId: string;
  startTime: Date;
  cardsStudied: number;
  cardsCorrect: number;
  cardsIncorrect: number;
  totalTime: number; // 초
}

// 사용자 통계
export interface VocabularyStats {
  totalCards: number;
  masteredCards: number;     // 완전히 외운 카드
  learningCards: number;     // 학습 중인 카드
  newCards: number;          // 새로운 카드
  dueCards: number;          // 오늘 복습할 카드
  streak: number;            // 연속 학습 일수
}
