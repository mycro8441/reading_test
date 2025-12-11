import { LearningSession } from './problem';

export type ExamYear = 
  | '2024' | '2023' | '2022' | '2021' | '2020'
  | '2019' | '2018' | '2017' | '2016' | '2015';

export type ExamType = 
  | 'suneung'      // 수능
  | 'mock-6'       // 6월 모의평가
  | 'mock-9';      // 9월 모의평가

export type ProblemCategory =
  | 'literature'        // 문학
  | 'reading'          // 독서 (비문학)
  | 'grammar'          // 문법
  | 'writing'          // 화법과 작문
  | 'classic';         // 고전

export interface PastExamInfo {
  id: string;
  year: ExamYear;
  type: ExamType;
  date: string;              // '2024-11-14'
  title: string;             // '2024학년도 대학수학능력시험'
  problemCount: number;      // 45
  totalPoints: number;       // 100
  timeLimit: number;         // 80분
  averageScore?: number;     // 평균 점수
  difficulty?: 'easy' | 'medium' | 'hard';
  thumbnail?: string;
}

export interface PastExamProblem {
  examId: string;
  problemNumber: number;     // 1-45
  category: ProblemCategory;
  points: number;
  correctRate?: number;      // 정답률 (%)
  session: LearningSession;  // 실제 문제 데이터
}

export interface PastExamFilter {
  years?: ExamYear[];
  types?: ExamType[];
  categories?: ProblemCategory[];
  difficulty?: ('easy' | 'medium' | 'hard')[];
}

export interface UserExamHistory {
  examId: string;
  completedAt: Date;
  score: number;
  totalProblems: number;
  correctAnswers: number;
  timeSpent: number;         // 초
}