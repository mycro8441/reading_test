import { LearningSession, Problem } from '../../types/problem';

// ===== 모든 기출문제 import =====
export { exam2024Suneung } from './2024-suneung';
export { LAW_INTERPRETATION_GUARANTEE_2026 } from './2026-suneung-law-guarantee';
export { READING_SIMPLE_VIEW_2026 } from './2026-suneung-reading-simple-view';
export { QUANTUM_PHYSICS_2026 } from './2026-suneung-quantum-physics';
export { HAN_RIVER_ECOLOGY_2026 } from './2026-suneung-han-river-ecology';

// 여기에 새로운 기출문제를 추가하세요
// export { exam2025Suneung } from './2025-suneung';

import { exam2024Suneung } from './2024-suneung';
import { LAW_INTERPRETATION_GUARANTEE_2026 } from './2026-suneung-law-guarantee';
import { READING_SIMPLE_VIEW_2026 } from './2026-suneung-reading-simple-view';
import { QUANTUM_PHYSICS_2026 } from './2026-suneung-quantum-physics';
import { HAN_RIVER_ECOLOGY_2026 } from './2026-suneung-han-river-ecology';

// ===== 지문 정보 타입 정의 =====
export interface PassageInfo {
  id: string;                    // 지문 고유 ID
  title: string;                 // 지문 제목
  source: string;                // 출처 (시험명)
  year: string;                  // 연도
  examType: string;              // 시험 종류 (suneung, mock-6, mock-9)
  category: string;              // 분야 (문학, 독서, 과학, 법, 사회 등)
  difficulty: string;            // 난이도
  problemCount: number;          // 문제 수
  session: LearningSession;      // 실제 세션 데이터
}

// ===== 문제 정보 타입 정의 =====
export interface ProblemInfo {
  passageId: string;             // 소속 지문 ID
  passageTitle: string;          // 지문 제목
  problem: Problem;              // 문제 데이터
  examYear: string;              // 시험 연도
  examType: string;              // 시험 종류
}

// ===== 지문별 접근: 모든 지문 목록 =====
export const ALL_PASSAGES: PassageInfo[] = [
  {
    id: 'passage-2024-suneung-bom',
    title: '봄봄',
    source: '2024학년도 대학수학능력시험 국어 영역',
    year: '2024',
    examType: 'suneung',
    category: '문학',
    difficulty: 'suneung',
    problemCount: exam2024Suneung.problemCount,
    session: exam2024Suneung,
  },
  {
    id: 'passage-2026-suneung-law',
    title: '법 해석과 보증 계약',
    source: '2026학년도 대학수학능력시험 국어 영역',
    year: '2026',
    examType: 'suneung',
    category: '독서-법',
    difficulty: 'suneung',
    problemCount: LAW_INTERPRETATION_GUARANTEE_2026.problemCount,
    session: LAW_INTERPRETATION_GUARANTEE_2026,
  },
  {
    id: 'passage-2026-suneung-reading',
    title: '독해 능력의 단순 관점',
    source: '2026학년도 대학수학능력시험 국어 영역',
    year: '2026',
    examType: 'suneung',
    category: '독서-교육',
    difficulty: 'suneung',
    problemCount: READING_SIMPLE_VIEW_2026.problemCount,
    session: READING_SIMPLE_VIEW_2026,
  },
  {
    id: 'passage-2026-suneung-quantum',
    title: '양자역학과 불확정성 원리',
    source: '2026학년도 대학수학능력시험 국어 영역',
    year: '2026',
    examType: 'suneung',
    category: '독서-과학',
    difficulty: 'suneung',
    problemCount: QUANTUM_PHYSICS_2026.problemCount,
    session: QUANTUM_PHYSICS_2026,
  },
  {
    id: 'passage-2026-suneung-ecology',
    title: '한강의 생태계 복원',
    source: '2026학년도 대학수학능력시험 국어 영역',
    year: '2026',
    examType: 'suneung',
    category: '독서-생태',
    difficulty: 'suneung',
    problemCount: HAN_RIVER_ECOLOGY_2026.problemCount,
    session: HAN_RIVER_ECOLOGY_2026,
  },
  // 여기에 새로운 지문 정보를 추가하세요
];

// ===== 문제별 접근: 모든 문제를 평면화 =====
export const ALL_PROBLEMS: ProblemInfo[] = ALL_PASSAGES.flatMap((passage) =>
  passage.session.problems.map((problem) => ({
    passageId: passage.id,
    passageTitle: passage.title,
    problem: problem,
    examYear: passage.year,
    examType: passage.examType,
  }))
);

// ===== 기존 호환성: 시험별 매핑 =====
export const PAST_EXAM_PROBLEMS: Record<string, LearningSession> = {
  'suneung-2024': exam2024Suneung,
  'suneung-2026-law': LAW_INTERPRETATION_GUARANTEE_2026,
  'suneung-2026-reading': READING_SIMPLE_VIEW_2026,
  'suneung-2026-quantum': QUANTUM_PHYSICS_2026,
  'suneung-2026-ecology': HAN_RIVER_ECOLOGY_2026,
  // 여기에 새로운 매핑을 추가하세요
};

// ===== 유틸리티 함수들 =====

/**
 * ID로 지문 가져오기
 */
export function getPassageById(passageId: string): PassageInfo | undefined {
  return ALL_PASSAGES.find((p) => p.id === passageId);
}

/**
 * 연도별 지문 필터링
 */
export function getPassagesByYear(year: string): PassageInfo[] {
  return ALL_PASSAGES.filter((p) => p.year === year);
}

/**
 * 카테고리별 지문 필터링
 */
export function getPassagesByCategory(category: string): PassageInfo[] {
  return ALL_PASSAGES.filter((p) => p.category === category);
}

/**
 * 시험 종류별 지문 필터링
 */
export function getPassagesByExamType(examType: string): PassageInfo[] {
  return ALL_PASSAGES.filter((p) => p.examType === examType);
}

/**
 * 난이도별 지문 필터링
 */
export function getPassagesByDifficulty(difficulty: string): PassageInfo[] {
  return ALL_PASSAGES.filter((p) => p.difficulty === difficulty);
}

/**
 * 카테고리별 문제 필터링
 */
export function getProblemsByCategory(category: string): ProblemInfo[] {
  return ALL_PROBLEMS.filter((p) => p.problem.category === category);
}

/**
 * 난이도별 문제 필터링
 */
export function getProblemsByDifficulty(difficulty: string): ProblemInfo[] {
  return ALL_PROBLEMS.filter((p) => p.problem.difficulty === difficulty);
}

/**
 * 문제 유형별 필터링
 */
export function getProblemsByType(type: string): ProblemInfo[] {
  return ALL_PROBLEMS.filter((p) => p.problem.type === type);
}

/**
 * 지문 ID로 해당 지문의 모든 문제 가져오기
 */
export function getProblemsByPassageId(passageId: string): ProblemInfo[] {
  return ALL_PROBLEMS.filter((p) => p.passageId === passageId);
}

/**
 * 연도별 모든 문제 가져오기
 */
export function getProblemsByYear(year: string): ProblemInfo[] {
  return ALL_PROBLEMS.filter((p) => p.examYear === year);
}

/**
 * 시험 종류별 모든 문제 가져오기
 */
export function getProblemsByExamType(examType: string): ProblemInfo[] {
  return ALL_PROBLEMS.filter((p) => p.examType === examType);
}

/**
 * [기존 호환] ID로 기출문제 가져오기
 */
export function getPastExamById(examId: string): LearningSession | undefined {
  return PAST_EXAM_PROBLEMS[examId];
}

/**
 * [기존 호환] 모든 기출문제 ID 목록 가져오기
 */
export function getAllPastExamIds(): string[] {
  return Object.keys(PAST_EXAM_PROBLEMS);
}

/**
 * [기존 호환] 연도별 기출문제 필터링
 */
export function getPastExamsByYear(year: string): Record<string, LearningSession> {
  return Object.entries(PAST_EXAM_PROBLEMS)
    .filter(([id]) => id.includes(year))
    .reduce((acc, [id, exam]) => ({ ...acc, [id]: exam }), {});
}

// ===== 통계 함수 =====

/**
 * 전체 통계 정보
 */
export function getStatistics() {
  return {
    totalPassages: ALL_PASSAGES.length,
    totalProblems: ALL_PROBLEMS.length,
    byYear: getYearStatistics(),
    byCategory: getCategoryStatistics(),
    byDifficulty: getDifficultyStatistics(),
  };
}

/**
 * 연도별 통계
 */
export function getYearStatistics() {
  const stats: Record<string, { passages: number; problems: number }> = {};

  ALL_PASSAGES.forEach((passage) => {
    if (!stats[passage.year]) {
      stats[passage.year] = { passages: 0, problems: 0 };
    }
    stats[passage.year].passages++;
    stats[passage.year].problems += passage.problemCount;
  });

  return stats;
}

/**
 * 카테고리별 통계
 */
export function getCategoryStatistics() {
  const stats: Record<string, { passages: number; problems: number }> = {};

  ALL_PASSAGES.forEach((passage) => {
    if (!stats[passage.category]) {
      stats[passage.category] = { passages: 0, problems: 0 };
    }
    stats[passage.category].passages++;
    stats[passage.category].problems += passage.problemCount;
  });

  return stats;
}

/**
 * 난이도별 통계
 */
export function getDifficultyStatistics() {
  const stats: Record<string, number> = {};

  ALL_PROBLEMS.forEach((problemInfo) => {
    const diff = problemInfo.problem.difficulty || 'unknown';
    stats[diff] = (stats[diff] || 0) + 1;
  });

  return stats;
}

/**
 * 사용 가능한 모든 카테고리 목록
 */
export function getAllCategories(): string[] {
  const categories = new Set(ALL_PASSAGES.map((p) => p.category));
  return Array.from(categories).sort();
}

/**
 * 사용 가능한 모든 연도 목록
 */
export function getAllYears(): string[] {
  const years = new Set(ALL_PASSAGES.map((p) => p.year));
  return Array.from(years).sort().reverse(); // 최신순
}

/**
 * 사용 가능한 모든 시험 종류 목록
 */
export function getAllExamTypes(): string[] {
  const types = new Set(ALL_PASSAGES.map((p) => p.examType));
  return Array.from(types).sort();
}
