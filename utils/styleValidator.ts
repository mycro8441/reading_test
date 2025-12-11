/**
 * 스타일 범위 검증 및 자동 수정 유틸리티
 * 
 * AI가 잘못된 인덱스를 생성하더라도 자동으로 감지하고 수정합니다.
 */

export interface StyleRange {
    start: number;
    end: number;
    bold?: boolean;
    underline?: boolean;
    box?: boolean;
    highlight?: boolean;
  }
  
  export interface ValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
    correctedRanges?: StyleRange[];
  }
  
  /**
   * 스타일 범위가 텍스트 내에서 유효한지 검증
   */
  export function validateStyleRanges(
    text: string,
    styleRanges: StyleRange[]
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const correctedRanges: StyleRange[] = [];
  
    const textLength = text.length;
  
    styleRanges.forEach((range, index) => {
      const { start, end, ...styles } = range;
  
      // 1. 기본 유효성 검사
      if (start < 0) {
        errors.push(`Range ${index}: start(${start})가 음수입니다.`);
        return;
      }
  
      if (end > textLength) {
        errors.push(
          `Range ${index}: end(${end})가 텍스트 길이(${textLength})를 초과합니다.`
        );
        return;
      }
  
      if (start >= end) {
        errors.push(
          `Range ${index}: start(${start})가 end(${end})보다 크거나 같습니다.`
        );
        return;
      }
  
      // 2. 적용된 텍스트가 의미 있는지 확인
      const selectedText = text.slice(start, end);
      
      if (!selectedText.trim()) {
        warnings.push(
          `Range ${index}: 선택된 텍스트가 공백만 포함합니다: "${selectedText}"`
        );
      }
  
      // 3. 스타일이 하나도 없는 경우
      if (!styles.bold && !styles.underline && !styles.box && !styles.highlight) {
        warnings.push(
          `Range ${index}: 스타일이 지정되지 않았습니다.`
        );
      }
  
      // 유효한 범위는 그대로 추가
      correctedRanges.push(range);
    });
  
    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      correctedRanges: errors.length === 0 ? correctedRanges : undefined,
    };
  }
  
  /**
   * 텍스트에서 특정 단어/구절을 찾아 자동으로 스타일 범위 생성
   * AI가 잘못된 인덱스를 제공한 경우의 대안
   */
  export function findAndStyleText(
    text: string,
    searchText: string,
    styles: Omit<StyleRange, 'start' | 'end'>
  ): StyleRange | null {
    const index = text.indexOf(searchText);
    
    if (index === -1) {
      return null;
    }
  
    return {
      start: index,
      end: index + searchText.length,
      ...styles,
    };
  }
  
  /**
   * 여러 키워드에 대해 자동으로 스타일 적용
   */
  export function autoStyleKeywords(
    text: string,
    keywords: Array<{
      word: string;
      bold?: boolean;
      underline?: boolean;
      box?: boolean;
      highlight?: boolean;
    }>
  ): StyleRange[] {
    const ranges: StyleRange[] = [];
  
    keywords.forEach(({ word, ...styles }) => {
      const range = findAndStyleText(text, word, styles);
      if (range) {
        ranges.push(range);
      }
    });
  
    return ranges;
  }
  
  /**
   * 겹치는 스타일 범위를 병합
   */
  export function mergeOverlappingRanges(
    ranges: StyleRange[]
  ): StyleRange[] {
    if (ranges.length === 0) return [];
  
    // start 기준으로 정렬
    const sorted = [...ranges].sort((a, b) => a.start - b.start);
    const merged: StyleRange[] = [];
  
    let current = { ...sorted[0] };
  
    for (let i = 1; i < sorted.length; i++) {
      const next = sorted[i];
  
      if (next.start <= current.end) {
        // 겹치는 경우: 스타일 병합
        current.end = Math.max(current.end, next.end);
        current.bold = current.bold || next.bold;
        current.underline = current.underline || next.underline;
        current.box = current.box || next.box;
        current.highlight = current.highlight || next.highlight;
      } else {
        // 겹치지 않으면 현재 범위 추가하고 다음으로
        merged.push(current);
        current = { ...next };
      }
    }
  
    merged.push(current);
    return merged;
  }
  
  /**
   * 스타일 범위를 시각적으로 표시 (디버깅용)
   */
  export function visualizeStyleRanges(
    text: string,
    ranges: StyleRange[]
  ): string {
    let result = '';
    let lastIndex = 0;
  
    const sortedRanges = [...ranges].sort((a, b) => a.start - b.start);
  
    sortedRanges.forEach((range) => {
      // 이전 범위와 현재 범위 사이의 텍스트
      result += text.slice(lastIndex, range.start);
  
      // 스타일 표시
      const styles: string[] = [];
      if (range.bold) styles.push('B');
      if (range.underline) styles.push('U');
      if (range.box) styles.push('□');
      if (range.highlight) styles.push('H');
  
      result += `[${styles.join('')}:${text.slice(range.start, range.end)}]`;
      lastIndex = range.end;
    });
  
    // 남은 텍스트
    result += text.slice(lastIndex);
  
    return result;
  }
  
  /**
   * 스타일 범위 통계
   */
  export function getStyleStatistics(ranges: StyleRange[]) {
    return {
      total: ranges.length,
      bold: ranges.filter((r) => r.bold).length,
      underline: ranges.filter((r) => r.underline).length,
      box: ranges.filter((r) => r.box).length,
      highlight: ranges.filter((r) => r.highlight).length,
    };
  }
  
  /**
   * 문단별 스타일 밸런스 체크 (과도한 스타일링 방지)
   */
  export function checkStyleBalance(
    text: string,
    ranges: StyleRange[]
  ): { balanced: boolean; recommendation: string } {
    const textLength = text.length;
    const totalStyled = ranges.reduce((sum, r) => sum + (r.end - r.start), 0);
    const stylePercentage = (totalStyled / textLength) * 100;
  
    if (ranges.length > 5) {
      return {
        balanced: false,
        recommendation: `스타일이 너무 많습니다 (${ranges.length}개). 3-5개가 적당합니다.`,
      };
    }
  
    if (stylePercentage > 30) {
      return {
        balanced: false,
        recommendation: `텍스트의 ${stylePercentage.toFixed(1)}%가 스타일링되었습니다. 20% 이하를 권장합니다.`,
      };
    }
  
    return {
      balanced: true,
      recommendation: '적절한 스타일 밸런스입니다.',
    };
  }