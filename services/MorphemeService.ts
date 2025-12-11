
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
  
  // Flask 서버 URL (개발 환경에 따라 변경)
  const KIWI_SERVER_URL = __DEV__ 
    ? 'http://localhost:5000'  // 개발 모드
    : 'http://YOUR_SERVER_IP:5000';  // 프로덕션
  
  /**
   * 형태소 분석 (단일 문장)
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
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `서버 오류: ${response.status}`);
      }
  
      const data = await response.json();
      return data.words || [];
    } catch (error) {
      console.error('형태소 분석 오류:', error);
      
      // 서버 연결 실패 시 안내 메시지
      if (error instanceof TypeError && error.message.includes('Network request failed')) {
        throw new Error(
          'Kiwi 서버에 연결할 수 없습니다.\n\n' +
          '서버를 실행하세요:\n' +
          '1. pip install kiwipiepy flask flask-cors\n' +
          '2. python kiwi_server.py'
        );
      }
      
      throw error;
    }
  }
  
  /**
   * 일괄 형태소 분석 (여러 문장)
   */
  export async function analyzeMorphemeBatch(texts: string[]): Promise<Array<{
    text: string;
    words: MorphemeAnalysis[];
  }>> {
    try {
      const response = await fetch(`${KIWI_SERVER_URL}/batch-analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texts }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `서버 오류: ${response.status}`);
      }
  
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('일괄 분석 오류:', error);
      throw error;
    }
  }
  
  /**
   * 서버 상태 확인
   */
  export async function checkServerHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${KIWI_SERVER_URL}/health`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        return false;
      }
  
      const data = await response.json();
      return data.status === 'healthy';
    } catch (error) {
      console.error('서버 상태 확인 실패:', error);
      return false;
    }
  }