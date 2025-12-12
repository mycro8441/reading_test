# 데이터 구조 개선 - 마이그레이션 가이드

## 🎯 목적

기출문제와 단어장 데이터를 쉽게 추가할 수 있도록 파일 구조를 개선했습니다.

## 📂 새로운 구조

```
reading_test/
├── data/                          # 🆕 새로운 데이터 디렉토리
│   ├── past-exams/               # 기출문제
│   │   ├── README.md             # 추가 가이드
│   │   ├── 2024-suneung.ts       # 개별 시험 파일
│   │   ├── 2024-mock-09.ts       # (추가 예정)
│   │   └── index.ts              # 모든 시험 export
│   └── vocabulary/               # 단어장
│       ├── README.md             # 추가 가이드
│       ├── suneung-essential.ts  # 개별 단어장 파일
│       ├── hanja-advanced.ts
│       ├── idioms.ts
│       ├── literature-terms.ts
│       └── index.ts              # 모든 단어장 export
└── constants/                     # 기존 파일들 (하위 호환성 유지)
    ├── pastExamProblems.ts       # → data/past-exams로 연결
    └── vocabularyData.ts         # → data/vocabulary로 연결
```

## ✨ 주요 개선 사항

### 1. 파일 분리
- **이전**: 하나의 큰 파일에 모든 데이터
- **이후**: 시험/단어장별로 개별 파일

### 2. 쉬운 추가
- **이전**: 큰 파일을 열어서 배열에 추가
- **이후**: 새 파일만 만들고 index.ts에 등록

### 3. 유틸리티 함수
- ID로 검색, 필터링 등 편리한 함수 제공

## 🔄 사용 방법 변경

### 기출문제

#### 이전 방식 (여전히 작동함)
```typescript
import { SUNEUNG_2024 } from '../constants/pastExamProblems';
```

#### 새로운 방식 (권장)
```typescript
// 전체 목록
import { PAST_EXAM_PROBLEMS } from '../data/past-exams';

// 유틸리티 사용
import { getPastExamById } from '../data/past-exams';
const exam = getPastExamById('suneung-2024');

// 특정 시험만
import { exam2024Suneung } from '../data/past-exams/2024-suneung';
```

### 단어장

#### 이전 방식 (여전히 작동함)
```typescript
import { VOCABULARY_DECKS } from '../constants/vocabularyData';
```

#### 새로운 방식 (권장)
```typescript
// 전체 덱 목록
import { VOCABULARY_DECKS } from '../data/vocabulary';

// 유틸리티 사용
import { getDeckById, getDecksByCategory } from '../data/vocabulary';
const deck = getDeckById('deck-suneung-essential');
const hanjaDecks = getDecksByCategory('hanja');

// 특정 카드만
import { suneungEssentialCards } from '../data/vocabulary/suneung-essential';
```

## 📝 새 데이터 추가 방법

### 기출문제 추가

1. `data/past-exams/2025-suneung.ts` 파일 생성:
```typescript
import { createParagraph, LearningSession } from '../../types/problem';

export const exam2025Suneung: LearningSession = {
  // 데이터 작성...
};
```

2. `data/past-exams/index.ts`에 등록:
```typescript
export { exam2025Suneung } from './2025-suneung';

export const PAST_EXAM_PROBLEMS: Record<string, LearningSession> = {
  'suneung-2025': exam2025Suneung,
  'suneung-2024': exam2024Suneung,
  // ...
};
```

3. (선택) 메타데이터 추가: `constants/pastExams.ts`

자세한 내용은 `data/past-exams/README.md` 참조

### 단어장 추가

1. `data/vocabulary/grammar-basic.ts` 파일 생성:
```typescript
import { VocabularyCard } from '../../types/vocabulary';

export const grammarBasicCards: VocabularyCard[] = [
  {
    id: 'card-401',
    word: '주어',
    meaning: '문장에서 동작이나 상태의 주체가 되는 말',
    // ...
  },
];
```

2. `data/vocabulary/index.ts`에 등록:
```typescript
export { grammarBasicCards } from './grammar-basic';
import { grammarBasicCards } from './grammar-basic';

export const VOCABULARY_DECKS: VocabularyDeck[] = [
  {
    id: 'deck-grammar-basic',
    title: '기초 문법 용어',
    cardCount: grammarBasicCards.length,
    cards: grammarBasicCards,
    // ...
  },
];
```

자세한 내용은 `data/vocabulary/README.md` 참조

## 🔧 기존 코드 수정 필요?

**아니요!** 기존 코드는 그대로 작동합니다.

`constants/pastExamProblems.ts`와 `constants/vocabularyData.ts`는 자동으로 새 데이터 구조를 참조합니다.

하지만 새 코드를 작성할 때는 `data/` 디렉토리를 직접 사용하는 것을 권장합니다.

## 💡 장점

1. **확장성**: 시험/단어장별로 파일이 분리되어 관리가 쉬움
2. **협업**: 여러 사람이 동시에 다른 파일 작업 가능
3. **가독성**: 작은 파일들이라 찾기 쉽고 읽기 편함
4. **유지보수**: 특정 시험/단어장만 수정하기 쉬움
5. **문서화**: 각 디렉토리에 README.md로 가이드 제공

## 📚 참고 문서

- **기출문제 추가 가이드**: `data/past-exams/README.md`
- **단어장 추가 가이드**: `data/vocabulary/README.md`

## ⚠️ 주의사항

- **백업 파일**: 기존 파일은 `.backup` 확장자로 백업됨
  - `constants/pastExamProblems.ts.backup`
  - `constants/vocabularyData.ts.backup`
- **Git**: 백업 파일은 커밋하지 말 것 (이미 `.gitignore`에 추가됨)

## 🚀 다음 단계

1. 새 기출문제 추가하기
2. 새 단어장 추가하기
3. 기존 앱 코드를 새 import 방식으로 점진적 업데이트 (선택)
