// utils/cleanAIResponse.ts

/**
 * AI가 잘못 생성한 응답을 정리합니다.
 * 
 * 문제: AI가 styleRanges 안에 annotation을 넣는 경우
 * 해결: annotation을 styleRanges에서 제거하고 문단 레벨로 이동
 */

interface StyleRange {
    start: number;
    end: number;
    bold?: boolean;
    underline?: boolean;
    box?: boolean;
    highlight?: boolean;
    annotation?: string;  // 잘못 들어온 경우
  }
  
  interface RawParagraph {
    text: string;
    styleRanges?: StyleRange[];
    annotation?: string;
    indent?: number;
  }
  
  interface RawPassage {
    title?: string;
    author?: string;
    source?: string;
    paragraphs: RawParagraph[];
    footnotes?: { [key: string]: string };
  }
  
  export function cleanAIResponse(rawData: any) {
    if (!rawData || !rawData.passage) {
      return rawData;
    }
  
    return {
      ...rawData,
      passage: cleanPassage(rawData.passage),
      problems: rawData.problems?.map(cleanProblem) || []
    };
  }
  
  function cleanPassage(passage: RawPassage) {
    return {
      ...passage,
      paragraphs: passage.paragraphs.map(cleanParagraph)
    };
  }
  
  function cleanParagraph(paragraph: RawParagraph) {
    const styleRanges = paragraph.styleRanges || [];
    
    // styleRanges에서 annotation 찾기
    const annotationFromStyle = styleRanges
      .find((sr: any) => 'annotation' in sr && sr.annotation);
    
    // styleRanges에서 annotation 제거
    const cleanedStyleRanges = styleRanges.map((sr: any) => {
      const { annotation, ...rest } = sr;
      return rest;
    });
    
    // annotation 결정: 문단 레벨 > styleRanges에서 추출
    const finalAnnotation = paragraph.annotation || annotationFromStyle?.annotation;
    
    return {
      text: paragraph.text,
      styleRanges: cleanedStyleRanges,
      annotation: finalAnnotation || undefined,
      indent: paragraph.indent || 0
    };
  }
  
  function cleanProblem(problem: any) {
    // 문제의 premise도 정리
    if (problem.premise && problem.premise.styleRanges) {
      const cleanedPremiseStyleRanges = problem.premise.styleRanges.map((sr: any) => {
        const { annotation, ...rest } = sr;
        return rest;
      });
      
      return {
        ...problem,
        premise: {
          ...problem.premise,
          styleRanges: cleanedPremiseStyleRanges
        }
      };
    }
    
    return problem;
  }
  
  /**
   * AI 응답 검증 - 잘못된 형식이 있는지 확인
   */
  export function validateAIResponse(rawData: any): {
    valid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    if (!rawData) {
      errors.push('응답 데이터가 없습니다');
      return { valid: false, errors, warnings };
    }
    
    if (!rawData.passage) {
      errors.push('passage가 없습니다');
      return { valid: false, errors, warnings };
    }
    
    if (!rawData.passage.paragraphs || !Array.isArray(rawData.passage.paragraphs)) {
      errors.push('paragraphs가 배열이 아닙니다');
      return { valid: false, errors, warnings };
    }
    
    // 각 문단 검증
    rawData.passage.paragraphs.forEach((p: any, idx: number) => {
      if (!p.text) {
        errors.push(`문단 ${idx + 1}: text가 없습니다`);
      }
      
      if (p.styleRanges && Array.isArray(p.styleRanges)) {
        p.styleRanges.forEach((sr: any, srIdx: number) => {
          // ❌ styleRanges에 annotation이 있으면 경고
          if ('annotation' in sr && sr.annotation) {
            warnings.push(
              `문단 ${idx + 1}, styleRange ${srIdx + 1}: ` +
              `annotation이 styleRanges에 있습니다. 문단 레벨로 이동합니다.`
            );
          }
          
          // start, end 검증
          if (typeof sr.start !== 'number' || typeof sr.end !== 'number') {
            errors.push(
              `문단 ${idx + 1}, styleRange ${srIdx + 1}: ` +
              `start와 end가 숫자가 아닙니다`
            );
          }
          
          if (sr.start >= sr.end) {
            errors.push(
              `문단 ${idx + 1}, styleRange ${srIdx + 1}: ` +
              `start(${sr.start})가 end(${sr.end})보다 크거나 같습니다`
            );
          }
          
          if (sr.end > p.text.length) {
            errors.push(
              `문단 ${idx + 1}, styleRange ${srIdx + 1}: ` +
              `end(${sr.end})가 텍스트 길이(${p.text.length})를 초과합니다`
            );
          }
        });
      }
    });
    
    // 문제 검증
    if (!rawData.problems || !Array.isArray(rawData.problems)) {
      errors.push('problems가 배열이 아닙니다');
    } else if (rawData.problems.length === 0) {
      warnings.push('문제가 하나도 없습니다');
    } else {
      // 각 문제 검증
      rawData.problems.forEach((problem: any, pIdx: number) => {
        // 선택지 개수 검증 (5지선다)
        if (!problem.options || !Array.isArray(problem.options)) {
          errors.push(`문제 ${pIdx + 1}: options가 배열이 아닙니다`);
        } else if (problem.options.length !== 5) {
          errors.push(
            `문제 ${pIdx + 1}: 선택지가 ${problem.options.length}개입니다. ` +
            `5지선다형이어야 합니다 (5개 필요)`
          );
        }
        
        // answer 검증
        if (typeof problem.answer !== 'number' || problem.answer < 0 || problem.answer > 4) {
          errors.push(
            `문제 ${pIdx + 1}: answer가 ${problem.answer}입니다. ` +
            `0~4 사이여야 합니다`
          );
        }
        
        // 보기(premise) 검증
        if (problem.type === 'with-premise') {
          if (!problem.premise) {
            errors.push(`문제 ${pIdx + 1}: with-premise 타입인데 premise가 없습니다`);
          } else {
            const hasText = problem.premise.text && problem.premise.text.trim().length > 0;
            const hasItems = problem.premise.items && Array.isArray(problem.premise.items) && problem.premise.items.length > 0;
            
            if (!hasText && !hasItems) {
              errors.push(
                `문제 ${pIdx + 1}: premise가 비어있습니다. ` +
                `text 또는 items 중 하나는 반드시 있어야 합니다`
              );
            }
            
            if (hasText && problem.premise.text.length < 10) {
              warnings.push(
                `문제 ${pIdx + 1}: premise.text가 너무 짧습니다 (${problem.premise.text.length}자). ` +
                `최소 10자 이상 권장`
              );
            }
            
            if (hasItems && problem.premise.items.length < 3) {
              warnings.push(
                `문제 ${pIdx + 1}: premise.items가 ${problem.premise.items.length}개입니다. ` +
                `최소 3개 이상 권장`
              );
            }
          }
        }
      });
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }
  
  /**
   * 디버깅용 - 응답 구조 출력
   */
  export function debugAIResponse(rawData: any) {
    console.log('=== AI Response Debug ===');
    
    const validation = validateAIResponse(rawData);
    
    if (validation.errors.length > 0) {
      console.error('❌ Errors:', validation.errors);
    }
    
    if (validation.warnings.length > 0) {
      console.warn('⚠️ Warnings:', validation.warnings);
    }
    
    if (validation.valid && validation.warnings.length === 0) {
      console.log('✅ 응답이 올바른 형식입니다');
    }
    
    // 문단별 annotation 체크
    rawData?.passage?.paragraphs?.forEach((p: any, idx: number) => {
      console.log(`\n문단 ${idx + 1}:`);
      console.log('  - Text length:', p.text?.length);
      console.log('  - Annotation (paragraph):', p.annotation || 'none');
      console.log('  - StyleRanges count:', p.styleRanges?.length || 0);
      
      p.styleRanges?.forEach((sr: any, srIdx: number) => {
        if ('annotation' in sr) {
          console.error(`  ❌ StyleRange ${srIdx + 1} has annotation:`, sr.annotation);
        }
      });
    });
    
    console.log('\n=========================');
  }