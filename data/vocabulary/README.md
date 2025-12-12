# 단어장 데이터 추가 가이드

이 디렉토리에 새로운 단어장을 쉽게 추가할 수 있습니다.

## 📁 파일 구조

```
data/vocabulary/
├── suneung-essential.ts     # 수능 필수 어휘
├── hanja-advanced.ts        # 고급 한자어
├── idioms.ts                # 관용구
├── literature-terms.ts      # 문학 용어
├── proverbs.ts              # 속담 (예정)
└── index.ts                 # 모든 단어장을 한곳에서 export
```

## ✨ 새 단어장 추가 방법

### 1단계: 새 파일 생성

파일명 규칙: `{카테고리}-{레벨}.ts` 또는 `{주제}.ts`

예시:
- `grammar-basic.ts` (기초 문법 용어)
- `hanja-beginner.ts` (기초 한자어)
- `reading-comprehension.ts` (독서 어휘)

### 2단계: 단어 카드 작성

```typescript
import { VocabularyCard } from '../../types/vocabulary';

export const grammarBasicCards: VocabularyCard[] = [
  {
    id: 'card-unique-id',        // 고유 ID (card-XXX 형식)
    word: '주어',                 // 단어
    meaning: '문장에서 동작이나 상태의 주체가 되는 말',  // 뜻
    hanja: '主語',                // 한자 (선택)
    examples: [                   // 예문 (1개 이상)
      '이 문장의 주어는 "나"이다.',
      '주어와 서술어가 호응해야 한다.',
    ],
    synonyms: ['주체'],           // 유의어 (선택)
    antonyms: ['목적어'],         // 반의어 (선택)
    category: 'grammar',          // 카테고리 (필수)
    level: 'beginner',           // 난이도 (필수)
    tags: ['문법', '기초'],       // 태그 (선택)
  },
  // 더 많은 카드 추가...
];
```

### 3단계: index.ts에 등록

`data/vocabulary/index.ts` 파일을 열고:

```typescript
// 1. import 추가
export { grammarBasicCards } from './grammar-basic';

// 2. 덱에 추가
export const VOCABULARY_DECKS: VocabularyDeck[] = [
  {
    id: 'deck-grammar-basic',
    title: '기초 문법 용어',
    description: '문법 학습에 필요한 기본 용어',
    category: 'grammar',
    level: 'beginner',
    cardCount: grammarBasicCards.length,
    cards: grammarBasicCards,
  },
  // ... 기존 덱들
];
```

## 📝 필드 설명

### 필수 필드
- `id`: 고유 식별자 (예: 'card-001', 'card-grammar-01')
- `word`: 단어/표현
- `meaning`: 뜻풀이
- `examples`: 예문 배열 (최소 1개)
- `category`: 카테고리
- `level`: 난이도

### 선택 필드
- `hanja`: 한자 표기
- `synonyms`: 유의어 배열
- `antonyms`: 반의어 배열
- `tags`: 태그 배열

## 🏷️ 카테고리 종류

- `hanja`: 한자어
- `pure`: 순우리말
- `idiom`: 관용구
- `proverb`: 속담
- `grammar`: 문법 용어
- `literature`: 문학 용어

## 📊 난이도 레벨

- `beginner`: 초급
- `intermediate`: 중급
- `advanced`: 고급
- `suneung`: 수능급

## 💡 작성 팁

### 1. ID 규칙
- 카테고리별로 번호 범위 지정하면 관리 편함
  - `card-001~099`: 수능 필수
  - `card-101~199`: 한자어 고급
  - `card-201~299`: 관용구
  - `card-301~399`: 문학 용어

### 2. 좋은 예문 작성법
```typescript
examples: [
  '구체적인 사용 예시를 보여주는 문장',
  '다른 맥락에서의 사용 예시',
]
```

### 3. 태그 활용
```typescript
tags: ['수능빈출', '독서', '논술']  // 검색과 필터링에 유용
```

### 4. 유의어/반의어
```typescript
synonyms: ['비슷한 의미의 단어1', '단어2'],
antonyms: ['반대 의미의 단어'],
```

## 📦 덱(Deck) 구성

여러 카드를 묶어서 하나의 덱으로 만들 수 있습니다:

```typescript
{
  id: 'deck-unique-id',
  title: '덱 제목 (앱에 표시됨)',
  description: '덱에 대한 설명',
  category: 'hanja',
  level: 'intermediate',
  cardCount: cards.length,  // 자동 계산
  cards: cards,             // 위에서 만든 카드 배열
}
```

## ⚠️ 주의사항

1. **ID 중복 방지**: 모든 카드의 `id`는 전체에서 유일해야 합니다
2. **예문 필수**: 최소 1개 이상의 예문이 있어야 합니다
3. **카테고리 일치**: 카드의 `category`와 덱의 `category`가 일치해야 합니다
4. **cardCount 업데이트**: 카드를 추가/삭제할 때 `cardCount`도 업데이트하세요

## 🎯 실전 예시

### 예시 1: 속담 단어장 추가

```typescript
// data/vocabulary/proverbs.ts
import { VocabularyCard } from '../../types/vocabulary';

export const proverbCards: VocabularyCard[] = [
  {
    id: 'card-401',
    word: '가는 날이 장날',
    meaning: '뜻하지 않게 어떤 일이 공교롭게 겹쳐서 일어남',
    examples: [
      '가는 날이 장날이라고, 오늘 휴무일이네.',
      '정말 가는 날이 장날이구나.',
    ],
    category: 'proverb',
    level: 'intermediate',
    tags: ['일상', '수능'],
  },
];
```

### 예시 2: 순우리말 단어장 추가

```typescript
// data/vocabulary/pure-korean.ts
import { VocabularyCard } from '../../types/vocabulary';

export const pureKoreanCards: VocabularyCard[] = [
  {
    id: 'card-501',
    word: '애틋하다',
    meaning: '마음이 저리도록 간절하고 안타깝다',
    examples: [
      '고향에 대한 애틋한 그리움',
      '애틋한 사랑 이야기',
    ],
    category: 'pure',
    level: 'intermediate',
    tags: ['감정', '문학'],
  },
];
```

## 🚀 빠른 시작

1. 기존 파일(예: `suneung-essential.ts`) 복사
2. 파일명 변경
3. 카드 내용 수정
4. `index.ts`에 등록
5. 앱에서 테스트!
