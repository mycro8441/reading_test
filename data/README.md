# 📚 데이터 디렉토리

이 디렉토리는 앱의 모든 학습 데이터를 관리합니다.

## 📁 디렉토리 구조

```
data/
├── past-exams/          # 기출문제
│   ├── README.md        # 📖 기출문제 추가 가이드
│   ├── 2024-suneung.ts  # 개별 시험 파일
│   └── index.ts         # 통합 export
└── vocabulary/          # 단어장
    ├── README.md        # 📖 단어장 추가 가이드
    ├── suneung-essential.ts
    ├── hanja-advanced.ts
    ├── idioms.ts
    ├── literature-terms.ts
    └── index.ts         # 통합 export
```

## ✨ 특징

### 1. 모듈화된 구조
각 시험과 단어장이 독립적인 파일로 분리되어 있어 관리가 쉽습니다.

### 2. 쉬운 확장
새 파일을 만들고 index.ts에 등록만 하면 자동으로 앱에 반영됩니다.

### 3. 타입 안정성
TypeScript로 작성되어 컴파일 타임에 오류를 잡을 수 있습니다.

### 4. 유틸리티 함수
ID로 검색, 카테고리별 필터링 등 편리한 함수를 제공합니다.

## 🚀 빠른 시작

### 기출문제 추가하기
1. `past-exams/README.md` 읽기
2. 기존 파일(2024-suneung.ts) 복사
3. 내용 수정
4. `past-exams/index.ts`에 등록

### 단어장 추가하기
1. `vocabulary/README.md` 읽기
2. 기존 파일 복사
3. 카드 작성
4. `vocabulary/index.ts`에 등록

## 📖 자세한 가이드

- **기출문제**: [past-exams/README.md](./past-exams/README.md)
- **단어장**: [vocabulary/README.md](./vocabulary/README.md)
- **마이그레이션**: [../MIGRATION_GUIDE.md](../MIGRATION_GUIDE.md)

## 💡 사용 예시

```typescript
// 기출문제 사용
import { PAST_EXAM_PROBLEMS, getPastExamById } from './data/past-exams';

const exam = getPastExamById('suneung-2024');

// 단어장 사용
import { VOCABULARY_DECKS, getDecksByCategory } from './data/vocabulary';

const hanjaDecks = getDecksByCategory('hanja');
```

## ⚠️ 주의사항

- **ID 중복 방지**: 모든 ID는 고유해야 합니다
- **타입 일치**: 정의된 타입(Problem, VocabularyCard 등)을 따라야 합니다
- **Index 업데이트**: 새 파일을 만들면 반드시 index.ts에 등록하세요

## 🤝 기여 가이드

1. 새 데이터 파일 작성
2. 형식 검증 (TypeScript 컴파일 에러 확인)
3. index.ts에 등록
4. 앱에서 테스트
5. 커밋 & 푸시!
