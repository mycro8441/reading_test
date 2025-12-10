// 지문 스타일링 타입
export type TextStyle = 'bold' | 'underline' | 'box' | 'highlight';

// 인라인 스타일 적용된 텍스트 세그먼트
export interface TextSegment {
  text: string;
  bold?: boolean;
  underline?: boolean;
  box?: boolean;
  highlight?: boolean;
}

export interface Paragraph {
  id: string;
  text: string; // 원본 텍스트
  segments: TextSegment[]; // 스타일 적용된 세그먼트들
  annotation?: string; // 문단 옆 표시 (예: ㉠, ㉡)
  indent?: number; // 들여쓰기 레벨 (0, 1, 2)
}

export interface Passage {
  title?: string;
  author?: string;
  source?: string;
  paragraphs: Paragraph[];
  footnotes?: { [key: string]: string }; // 각주
}

// 문제 타입
export type ProblemType = 
  | 'multiple-choice'      // 일반 선택형
  | 'with-premise'         // 보기 포함
  | 'matching'             // 짝짓기
  | 'sequence'             // 순서 배열
  | 'fill-blank';          // 빈칸 채우기

export interface Premise {
  title?: string; // "보기", "<보기>"
  text: string; // 원본 텍스트
  segments: TextSegment[]; // 스타일 적용된 세그먼트들
  items?: string[]; // 나열형 보기 (ㄱ, ㄴ, ㄷ 등)
}

export interface Option {
  id: number;
  text: string; // 원본 텍스트
  segments: TextSegment[]; // 스타일 적용된 세그먼트들
  explanation?: string; // 해설
}

export interface Problem {
  id: number;
  type: ProblemType;
  category: string; // '내용 이해', '추론', '적용' 등
  questionText: string; // 원본 질문
  questionSegments: TextSegment[]; // 스타일 적용된 질문
  premise?: Premise; // 보기
  options: Option[];
  answer: number; // 정답 인덱스
  difficulty?: 'easy' | 'medium' | 'hard';
  points?: number; // 배점
  timeEstimate?: number; // 예상 풀이 시간(초)
}

export interface LearningSession {
  topic: string;
  difficulty: string;
  problemCount: number;
  passage: Passage;
  problems: Problem[];
}

// 헬퍼 함수들
export const parseStyledText = (text: string, styleRanges: Array<{
  start: number;
  end: number;
  bold?: boolean;
  underline?: boolean;
  box?: boolean;
  highlight?: boolean;
}>): TextSegment[] => {
  // 스타일 범위를 정렬하고 세그먼트로 변환
  const segments: TextSegment[] = [];
  let lastIndex = 0;

  // 모든 스타일 범위의 시작/끝 지점을 수집
  const breakpoints = new Set<number>([0, text.length]);
  styleRanges.forEach(range => {
    breakpoints.add(range.start);
    breakpoints.add(range.end);
  });

  const sortedBreakpoints = Array.from(breakpoints).sort((a, b) => a - b);

  // 각 구간마다 적용된 스타일 확인
  for (let i = 0; i < sortedBreakpoints.length - 1; i++) {
    const start = sortedBreakpoints[i];
    const end = sortedBreakpoints[i + 1];
    const segmentText = text.slice(start, end);

    if (segmentText.length === 0) continue;

    // 이 구간에 적용된 모든 스타일 찾기
    const styles: TextSegment = { text: segmentText };
    
    styleRanges.forEach(range => {
      if (range.start <= start && range.end >= end) {
        if (range.bold) styles.bold = true;
        if (range.underline) styles.underline = true;
        if (range.box) styles.box = true;
        if (range.highlight) styles.highlight = true;
      }
    });

    segments.push(styles);
  }

  return segments;
};

export const createParagraph = (
  text: string,
  styleRanges: Array<{
    start: number;
    end: number;
    bold?: boolean;
    underline?: boolean;
    box?: boolean;
    highlight?: boolean;
  }> = [],
  annotation?: string,
  indent: number = 0
): Paragraph => ({
  id: Math.random().toString(36).substr(2, 9),
  text,
  segments: parseStyledText(text, styleRanges),
  annotation,
  indent,
});

export const createOption = (
  text: string,
  styleRanges: Array<{
    start: number;
    end: number;
    bold?: boolean;
    underline?: boolean;
    box?: boolean;
    highlight?: boolean;
  }> = [],
  explanation?: string
): Omit<Option, 'id'> => ({
  text,
  segments: parseStyledText(text, styleRanges),
  explanation,
});

export const createProblem = (data: Partial<Problem> & {
  questionText: string;
  questionStyleRanges?: Array<{
    start: number;
    end: number;
    bold?: boolean;
    underline?: boolean;
    box?: boolean;
    highlight?: boolean;
  }>;
}): Problem => ({
  id: data.id || 1,
  type: data.type || 'multiple-choice',
  category: data.category || '내용 이해',
  questionText: data.questionText,
  questionSegments: parseStyledText(data.questionText, data.questionStyleRanges || []),
  options: data.options || [],
  answer: data.answer || 0,
  ...data,
});