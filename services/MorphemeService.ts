
export interface Morpheme {
    surface: string; // 형태소 표면형
    tag: string;     // 품사 태그
    start: number;   // 시작 위치
    end: number;     // 끝 위치
}

export interface MorphemeAnalysis {
    word: string;           // 원본 어절
    morphemes: Morpheme[];  // 형태소 분석 결과
}

// Kiwi WASM 타입 정의
interface KiwiMorph {
    form: string;
    tag: string;
    start: number;
    len: number;
}

interface KiwiToken {
    str: string;
    morphs: KiwiMorph[];
}

// Flask 응답 타입 정의
interface FlaskToken {
    form: string;
    tag: string;
    start: number;
    len: number;
}

interface FlaskResponse {
    tokens: FlaskToken[];
}

// Flask 서버 URL (개발 환경에 따라 변경)
const KIWI_SERVER_URL = "https://morph-server.vercel.app"

/**
 * 형태소 분석 (Flask 서버 사용)
 */
export async function analyzeMorpheme(text: string): Promise<MorphemeAnalysis[]> {
    try {
        const response = await fetch(`${KIWI_SERVER_URL}/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });
        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: FlaskResponse = await response.json();
        
        // Flask 응답을 MorphemeAnalysis 형식으로 변환
        return transformFlaskResponse(text, data.tokens);
    } catch (error) {
        console.error('형태소 분석 오류:', error);
        throw error;
    }
}

/**
 * Flask 응답을 MorphemeAnalysis 배열로 변환
 */
function transformFlaskResponse(
    originalText: string, 
    tokens: FlaskToken[]
): MorphemeAnalysis[] {
    // 공백으로 어절 분리
    const words = originalText.split(/\s+/);
    const result: MorphemeAnalysis[] = [];
    
    let currentWordStart = 0;
    
    for (const word of words) {
        const wordEnd = currentWordStart + word.length;
        
        // 현재 어절에 속하는 형태소들 찾기
        const wordMorphemes = tokens
            .filter(token => token.start >= currentWordStart && token.start < wordEnd)
            .map(token => ({
                surface: token.form,
                tag: token.tag,
                start: token.start,
                end: token.start + token.len,
            }));
        
        if (wordMorphemes.length > 0) {
            result.push({
                word: word,
                morphemes: wordMorphemes,
            });
        }
        
        // 다음 어절 시작 위치 (공백 포함)
        currentWordStart = wordEnd + 1;
    }
    
    return result;
}


export async function analyzeMorphemeWithFallback(text: string) {
    try {
        return await analyzeMorpheme(text);
    } catch (error) {
        console.warn('서버 분석 실패', error);
       
    }
}