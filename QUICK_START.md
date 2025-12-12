# 🚀 빠른 시작 가이드 - 데이터 추가하기

## 📋 목차
1. [기출문제 추가하기](#기출문제-추가하기)
2. [단어장 추가하기](#단어장-추가하기)

---

## 기출문제 추가하기

### ⏱️ 5분이면 완료!

#### 1단계: 파일 복사
```bash
cd data/past-exams
cp 2024-suneung.ts 2025-suneung.ts
```

#### 2단계: 내용 수정
`2025-suneung.ts` 파일을 열고:

```typescript
// 변수명 변경
export const exam2025Suneung: LearningSession = {
  topic: '2025학년도 수능',  // 제목 수정
  // ... 지문과 문제 수정
};
```

#### 3단계: 등록
`data/past-exams/index.ts` 열고:

```typescript
// 1. import 추가
export { exam2025Suneung } from './2025-suneung';

// 2. 매핑 추가
export const PAST_EXAM_PROBLEMS: Record<string, LearningSession> = {
  'suneung-2025': exam2025Suneung,  // 👈 추가
  'suneung-2024': exam2024Suneung,
};
```

#### ✅ 완료!
앱을 다시 실행하면 자동으로 반영됩니다.

---

## 단어장 추가하기

### ⏱️ 3분이면 완료!

#### 1단계: 파일 복사
```bash
cd data/vocabulary
cp idioms.ts proverbs.ts
```

#### 2단계: 카드 작성
`proverbs.ts` 파일을 열고:

```typescript
import { VocabularyCard } from '../../types/vocabulary';

// 변수명 변경
export const proverbCards: VocabularyCard[] = [
  {
    id: 'card-401',  // 고유 ID
    word: '가는 날이 장날',
    meaning: '뜻하지 않게 어떤 일이 공교롭게 겹쳐서 일어남',
    examples: [
      '가는 날이 장날이라고, 오늘 휴무일이네.',
    ],
    category: 'proverb',
    level: 'intermediate',
    tags: ['일상'],
  },
  // 더 많은 카드 추가...
];
```

#### 3단계: 등록
`data/vocabulary/index.ts` 열고:

```typescript
// 1. import 추가
export { proverbCards } from './proverbs';
import { proverbCards } from './proverbs';

// 2. 덱 추가
export const VOCABULARY_DECKS: VocabularyDeck[] = [
  {
    id: 'deck-proverb',
    title: '필수 속담',
    description: '자주 나오는 속담 모음',
    category: 'proverb',
    level: 'intermediate',
    cardCount: proverbCards.length,
    cards: proverbCards,
  },
  // ... 기존 덱들
];
```

#### ✅ 완료!

---

## 💡 꿀팁

### ID 규칙
- 기출문제: `{시험종류}-{연도}` (예: `suneung-2025`, `mock-2024-09`)
- 단어장 덱: `deck-{주제}` (예: `deck-proverb`, `deck-grammar`)
- 단어 카드: `card-{번호}` (예: `card-001`, `card-401`)

### 카테고리 종류
- **기출문제**: 자동 (시험에서 추출)
- **단어장**: `hanja`, `pure`, `idiom`, `proverb`, `grammar`, `literature`

### 난이도 레벨
- `beginner`: 초급
- `intermediate`: 중급
- `advanced`: 고급
- `suneung`: 수능급

---

## 📚 더 자세한 가이드

- **기출문제 상세 가이드**: [data/past-exams/README.md](./data/past-exams/README.md)
- **단어장 상세 가이드**: [data/vocabulary/README.md](./data/vocabulary/README.md)
- **마이그레이션 가이드**: [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)

---

## 🆘 문제 해결

### TypeScript 에러가 나요
- 타입 정의 확인: `types/problem.ts`, `types/vocabulary.ts`
- 필수 필드가 모두 있는지 확인

### 앱에 안 보여요
1. index.ts에 제대로 등록했는지 확인
2. ID가 중복되지 않았는지 확인
3. 앱을 재시작했는지 확인

### ID 중복 확인하는 법
```bash
# 기출문제 ID 확인
grep -h "id:" data/past-exams/*.ts | sort

# 단어 카드 ID 확인
grep -h "id:" data/vocabulary/*.ts | sort
```

---

## 🎉 다음 단계

1. ✅ 데이터 추가 완료
2. 📱 앱에서 테스트
3. 🔄 Git 커밋
4. 🚀 배포!

```bash
git add data/
git commit -m "Add new exam/vocabulary data"
git push
```
