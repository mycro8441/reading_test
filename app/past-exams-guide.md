# past-exams.tsx 개선 가이드

## 현재 상태
- ✅ 파일은 정상 작동합니다 (`app/past-exams.tsx`)
- ✅ 기존 "시험별" 방식으로 표시 중

## 🚀 새로운 데이터 구조 사용하기

### 1단계: Import 추가

기존 import 아래에 추가:
```typescript
// 기존
import {
    DIFFICULTY_COLORS,
    DIFFICULTY_LABELS,
    EXAM_TYPE_LABELS,
    PAST_EXAMS,
} from '../constants/pastExams';

// ✨ 새로 추가
import {
  ALL_PASSAGES,      // 5개 지문
  ALL_PROBLEMS,      // 17개 문제
  getAllYears,       // 연도 목록
  getAllCategories,  // 카테고리 목록
} from '../data/past-exams';
```

### 2단계: 지문별 탭 추가

```typescript
// 상태 추가
const [activeTab, setActiveTab] = useState<'exam' | 'passage' | 'problem'>('passage');

// 지문 렌더링
const renderPassageTab = () => (
  <View>
    {ALL_PASSAGES.map((passage) => (
      <TouchableOpacity
        key={passage.id}
        onPress={() => {
          // 학습 시작
          router.push({
            pathname: '/learning',
            params: {
              topic: passage.title,
              sessionData: JSON.stringify(passage.session),
            },
          });
        }}
      >
        <Text>{passage.title}</Text>
        <Text>{passage.category} · {passage.year}</Text>
        <Text>{passage.problemCount}문제</Text>
      </TouchableOpacity>
    ))}
  </View>
);
```

### 3단계: 문제별 탭 추가

```typescript
const renderProblemTab = () => (
  <View>
    {ALL_PROBLEMS.map((problemInfo, index) => (
      <TouchableOpacity
        key={`${problemInfo.passageId}-${problemInfo.problem.id}`}
        onPress={() => {
          // 해당 지문 찾기
          const passage = ALL_PASSAGES.find(p => p.id === problemInfo.passageId);
          if (passage) {
            router.push({
              pathname: '/learning',
              params: {
                topic: passage.title,
                sessionData: JSON.stringify(passage.session),
              },
            });
          }
        }}
      >
        <Text>#{index + 1}</Text>
        <Text>{problemInfo.passageTitle}</Text>
        <Text>{problemInfo.problem.category}</Text>
        <Text>{problemInfo.problem.questionText}</Text>
      </TouchableOpacity>
    ))}
  </View>
);
```

## 📋 전체 예시 코드

`data/past-exams/USAGE.md` 파일에 완전한 UI 구현 예시가 있습니다.

주요 내용:
- 3개 탭 UI (지문별/문제별/시험별)
- 각 탭별 필터링 (연도, 카테고리, 난이도)
- 카드 디자인
- 통계 표시

## 🎯 빠른 테스트

최소한의 변경으로 새 데이터 확인:

```typescript
// past-exams.tsx 상단에 추가
import { ALL_PASSAGES, ALL_PROBLEMS } from '../data/past-exams';

// 컴포넌트 내부에 로그 추가 (개발용)
console.log('총 지문:', ALL_PASSAGES.length);  // 5개
console.log('총 문제:', ALL_PROBLEMS.length);  // 17개
console.log('지문 목록:', ALL_PASSAGES.map(p => p.title));
```

## 📚 참고 문서

- **상세 사용법**: `data/past-exams/USAGE.md`
- **작업 요약**: `PAST_EXAMS_SUMMARY.md`
- **빠른 시작**: `QUICK_START.md`

---

**현재는 기존 코드가 그대로 작동합니다.**
새 기능을 원하시면 위 가이드를 참고하여 점진적으로 추가하시면 됩니다!
