# 기출문제 데이터 추가 가이드

이 디렉토리에 새로운 기출문제를 쉽게 추가할 수 있습니다.

## 📁 파일 구조

```
data/past-exams/
├── 2024-suneung.ts          # 2024학년도 수능
├── 2024-mock-09.ts          # 2024학년도 9월 모의평가
├── 2024-mock-06.ts          # 2024학년도 6월 모의평가
├── 2023-suneung.ts          # 2023학년도 수능
└── index.ts                 # 모든 기출문제를 한곳에서 export
```

## ✨ 새 기출문제 추가 방법

### 1단계: 새 파일 생성

파일명 규칙: `{연도}-{시험종류}.ts`

예시:
- `2025-suneung.ts` (2025 수능)
- `2024-mock-09.ts` (2024년 9월 모평)

### 2단계: 파일 작성

```typescript
import { createParagraph, LearningSession } from '../../types/problem';

// 메타데이터와 함께 export
export const exam2025Suneung: LearningSession = {
  topic: '2025학년도 수능',
  difficulty: 'suneung',
  problemCount: 5,
  passage: {
    title: '작품 제목',
    author: '작가명',
    source: '2025학년도 대학수학능력시험 국어 영역',
    paragraphs: [
      createParagraph(
        '지문 내용...',
        [
          { start: 0, end: 5, bold: true },  // 볼드 처리
        ]
      ),
      // 더 많은 문단 추가...
    ],
    footnotes: {
      '*': '주석 내용',
    },
  },
  problems: [
    {
      id: 1,
      type: 'multiple-choice',
      category: '작품 이해',
      questionText: '질문 내용...',
      questionSegments: [{ text: '질문 내용...' }],
      options: [
        {
          id: 0,
          text: '선택지 1',
          segments: [{ text: '선택지 1' }],
        },
        // 더 많은 선택지...
      ],
      answer: 1,  // 정답 번호 (0부터 시작)
      difficulty: 'medium',
      points: 2,
      timeEstimate: 90,
    },
    // 더 많은 문제...
  ],
};
```

### 3단계: index.ts에 등록

`data/past-exams/index.ts` 파일을 열고:

```typescript
// 1. import 추가
export { exam2025Suneung } from './2025-suneung';

// 2. 매핑 추가
export const PAST_EXAM_PROBLEMS: Record<string, LearningSession> = {
  'suneung-2025': exam2025Suneung,
  // ... 기존 항목들
};
```

### 4단계: 메타데이터 등록 (선택)

`constants/pastExams.ts`의 `PAST_EXAMS` 배열에 추가:

```typescript
{
  id: 'suneung-2025',
  year: '2025',
  type: 'suneung',
  date: '2025-11-14',
  title: '2025학년도 대학수학능력시험',
  problemCount: 45,
  totalPoints: 100,
  timeLimit: 80,
  averageScore: 0,  // 아직 모를 경우 0
  difficulty: 'medium',
}
```

## 📝 스타일 옵션

문단의 텍스트 스타일링:

```typescript
createParagraph(
  '텍스트 내용',
  [
    { start: 0, end: 5, bold: true },       // 볼드
    { start: 10, end: 15, underline: true }, // 밑줄
    { start: 20, end: 25, highlight: true }, // 형광펜
    { start: 30, end: 35, box: true },      // 박스
  ],
  '㉠',  // 주석 기호 (선택)
  1      // 들여쓰기 레벨 (선택, 기본값 0)
)
```

## 🎯 문제 유형

- `'multiple-choice'`: 일반 선택형
- `'with-premise'`: 보기 포함
- `'matching'`: 짝짓기
- `'sequence'`: 순서 배열
- `'fill-blank'`: 빈칸 채우기

## 🔍 난이도 설정

- `'easy'`: 쉬움
- `'medium'`: 보통
- `'hard'`: 어려움
- `'suneung'`: 수능급

## ⚠️ 주의사항

1. **변수명 규칙**: `exam{연도}{시험종류}` (예: `exam2025Suneung`, `exam2024Mock09`)
2. **ID 규칙**: `{시험종류}-{연도}` (예: `suneung-2025`, `mock-2024-09`)
3. **스타일 인덱스**: 텍스트의 실제 문자 인덱스를 정확히 계산
4. **정답 번호**: 0부터 시작 (첫 번째 선택지 = 0)

## 💡 팁

- 먼저 간단한 예시(2024-suneung.ts)를 복사해서 시작하세요
- 스타일 인덱스가 맞는지 확인하려면 앱에서 직접 테스트해보세요
- 문제가 많다면 여러 파일로 나누어도 됩니다 (예: 2024-suneung-part1.ts)
