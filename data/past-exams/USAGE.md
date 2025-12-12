# 기출문제 데이터 사용 가이드

## 📊 접근 방식

이제 기출문제 데이터를 **3가지 방식**으로 접근할 수 있습니다:

1. **지문별** - 지문을 중심으로 탐색
2. **문제별** - 문제를 중심으로 탐색
3. **시험별** - 시험 전체를 중심으로 탐색

---

## 1️⃣ 지문별 접근

### 모든 지문 목록 가져오기

```typescript
import { ALL_PASSAGES } from '../data/past-exams';

// 전체 지문 목록
console.log(ALL_PASSAGES);
// 출력: [{ id, title, source, year, examType, category, difficulty, problemCount, session }, ...]
```

### 특정 지문 찾기

```typescript
import { getPassageById } from '../data/past-exams';

const passage = getPassageById('passage-2026-suneung-law');
console.log(passage.title); // "법 해석과 보증 계약"
console.log(passage.year);  // "2026"
console.log(passage.category); // "독서-법"
```

### 필터링

```typescript
import {
  getPassagesByYear,
  getPassagesByCategory,
  getPassagesByExamType
} from '../data/past-exams';

// 2026년 모든 지문
const passages2026 = getPassagesByYear('2026');

// 독서-과학 카테고리 지문만
const sciencePassages = getPassagesByCategory('독서-과학');

// 수능 지문만
const suneungPassages = getPassagesByExamType('suneung');
```

### UI 예시: 지문 목록 화면

```tsx
import { ALL_PASSAGES } from '../data/past-exams';

function PassageListScreen() {
  return (
    <View>
      {ALL_PASSAGES.map((passage) => (
        <TouchableOpacity
          key={passage.id}
          onPress={() => startLearning(passage.session)}
        >
          <Text>{passage.title}</Text>
          <Text>{passage.year} / {passage.category}</Text>
          <Text>{passage.problemCount}문제</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
```

---

## 2️⃣ 문제별 접근

### 모든 문제 평면화

```typescript
import { ALL_PROBLEMS } from '../data/past-exams';

// 전체 문제 목록 (모든 지문의 문제를 하나의 배열로)
console.log(ALL_PROBLEMS.length); // 예: 15개
// 출력: [{ passageId, passageTitle, problem, examYear, examType }, ...]
```

### 문제 필터링

```typescript
import {
  getProblemsByCategory,
  getProblemsByDifficulty,
  getProblemsByType,
  getProblemsByPassageId
} from '../data/past-exams';

// "추론" 유형 문제만
const reasoningProblems = getProblemsByCategory('추론');

// 어려운 문제만
const hardProblems = getProblemsByDifficulty('hard');

// 선택형 문제만
const mcProblems = getProblemsByType('multiple-choice');

// 특정 지문의 모든 문제
const lawProblems = getProblemsByPassageId('passage-2026-suneung-law');
```

### UI 예시: 유형별 문제 풀기

```tsx
import { getProblemsByCategory } from '../data/past-exams';

function ProblemsByTypeScreen({ category }: { category: string }) {
  const problems = getProblemsByCategory(category);

  return (
    <View>
      <Text>{category} 유형 - 총 {problems.length}문제</Text>
      {problems.map((problemInfo, index) => (
        <View key={index}>
          <Text>지문: {problemInfo.passageTitle}</Text>
          <Text>문제 {problemInfo.problem.id}번</Text>
          <Text>{problemInfo.problem.questionText}</Text>
        </View>
      ))}
    </View>
  );
}
```

---

## 3️⃣ 시험별 접근 (기존 방식)

```typescript
import { PAST_EXAM_PROBLEMS, getPastExamById } from '../data/past-exams';

// 전체 시험 목록
console.log(Object.keys(PAST_EXAM_PROBLEMS));
// 출력: ['suneung-2024', 'suneung-2026-law', ...]

// 특정 시험 가져오기
const exam = getPastExamById('suneung-2026-quantum');
console.log(exam.topic); // "양자역학과 불확정성 원리"
```

---

## 🔍 고급 기능

### 통계 정보 확인

```typescript
import {
  getStatistics,
  getYearStatistics,
  getCategoryStatistics
} from '../data/past-exams';

// 전체 통계
const stats = getStatistics();
console.log(stats.totalPassages);  // 5개
console.log(stats.totalProblems);  // 15개

// 연도별 통계
const yearStats = getYearStatistics();
console.log(yearStats);
// {
//   '2024': { passages: 1, problems: 5 },
//   '2026': { passages: 4, problems: 10 }
// }

// 카테고리별 통계
const categoryStats = getCategoryStatistics();
console.log(categoryStats);
// {
//   '문학': { passages: 1, problems: 5 },
//   '독서-법': { passages: 1, problems: 6 },
//   ...
// }
```

### 사용 가능한 필터 옵션 가져오기

```typescript
import {
  getAllYears,
  getAllCategories,
  getAllExamTypes
} from '../data/past-exams';

// 모든 연도 (최신순)
const years = getAllYears();
console.log(years); // ['2026', '2024']

// 모든 카테고리
const categories = getAllCategories();
console.log(categories); // ['문학', '독서-법', '독서-교육', ...]

// 모든 시험 종류
const examTypes = getAllExamTypes();
console.log(examTypes); // ['suneung']
```

---

## 💡 실전 활용 예시

### 예시 1: 연도별 + 카테고리별 필터링

```tsx
import { ALL_PASSAGES } from '../data/past-exams';

function FilteredPassages({ year, category }: { year?: string, category?: string }) {
  let passages = ALL_PASSAGES;

  if (year) {
    passages = passages.filter(p => p.year === year);
  }

  if (category) {
    passages = passages.filter(p => p.category === category);
  }

  return (
    <View>
      <Text>검색 결과: {passages.length}개</Text>
      {passages.map(p => <PassageCard key={p.id} passage={p} />)}
    </View>
  );
}
```

### 예시 2: 나만의 문제집 만들기

```tsx
import { ALL_PROBLEMS } from '../data/past-exams';

function MyCustomWorkbook() {
  // 어려운 추론 문제만 모은 문제집
  const customProblems = ALL_PROBLEMS.filter(p =>
    p.problem.category === '추론' &&
    p.problem.difficulty === 'hard'
  );

  return (
    <View>
      <Text>고난도 추론 문제집 ({customProblems.length}문제)</Text>
      {/* 문제 풀이 UI */}
    </View>
  );
}
```

### 예시 3: 학습 진도 대시보드

```tsx
import { getStatistics, getAllCategories } from '../data/past-exams';

function StudyDashboard({ solvedProblemIds }: { solvedProblemIds: string[] }) {
  const stats = getStatistics();
  const categories = getAllCategories();

  return (
    <View>
      <Text>전체 진도: {solvedProblemIds.length} / {stats.totalProblems}</Text>
      <Text>전체 지문: {stats.totalPassages}개</Text>

      <Text>카테고리별 현황:</Text>
      {Object.entries(stats.byCategory).map(([cat, data]) => (
        <Text key={cat}>
          {cat}: {data.problems}문제
        </Text>
      ))}
    </View>
  );
}
```

### 예시 4: 검색 기능

```tsx
import { ALL_PASSAGES, ALL_PROBLEMS } from '../data/past-exams';

function SearchScreen({ query }: { query: string }) {
  const searchResults = ALL_PASSAGES.filter(passage =>
    passage.title.includes(query) ||
    passage.category.includes(query) ||
    passage.source.includes(query)
  );

  return (
    <View>
      <Text>"{query}" 검색 결과: {searchResults.length}개</Text>
      {searchResults.map(p => <PassageCard key={p.id} passage={p} />)}
    </View>
  );
}
```

---

## 📋 타입 정의

### PassageInfo

```typescript
interface PassageInfo {
  id: string;                    // 지문 고유 ID
  title: string;                 // 지문 제목
  source: string;                // 출처 (시험명)
  year: string;                  // 연도
  examType: string;              // 시험 종류
  category: string;              // 분야
  difficulty: string;            // 난이도
  problemCount: number;          // 문제 수
  session: LearningSession;      // 실제 세션 데이터
}
```

### ProblemInfo

```typescript
interface ProblemInfo {
  passageId: string;             // 소속 지문 ID
  passageTitle: string;          // 지문 제목
  problem: Problem;              // 문제 데이터
  examYear: string;              // 시험 연도
  examType: string;              // 시험 종류
}
```

---

## 🎯 권장 사용 패턴

| 화면/기능 | 권장 접근 방식 | 사용 함수 |
|----------|--------------|---------|
| 기출문제 목록 | 지문별 | `ALL_PASSAGES` |
| 유형별 문제 풀이 | 문제별 | `getProblemsByCategory()` |
| 난이도별 연습 | 문제별 | `getProblemsByDifficulty()` |
| 특정 시험 전체 풀이 | 시험별 | `getPastExamById()` |
| 검색 기능 | 지문별 | `ALL_PASSAGES.filter()` |
| 통계 대시보드 | 통계 | `getStatistics()` |

---

## ⚡ 성능 팁

- `ALL_PASSAGES`와 `ALL_PROBLEMS`는 미리 계산된 배열이므로 빠릅니다
- 복잡한 필터링이 필요하면 여러 함수를 조합하세요
- 자주 사용하는 필터 결과는 상태로 캐싱하세요

```tsx
const [filteredPassages, setFilteredPassages] = useState<PassageInfo[]>([]);

useEffect(() => {
  const result = getPassagesByYear(selectedYear);
  setFilteredPassages(result);
}, [selectedYear]);
```
