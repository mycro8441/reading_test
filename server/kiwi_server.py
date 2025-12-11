"""
Kiwi 형태소 분석 Flask 서버

설치:
    pip install kiwipiepy flask flask-cors

실행:
    python kiwi_server.py

사용:
    curl -X POST http://localhost:5000/analyze \
      -H "Content-Type: application/json" \
      -d '{"text": "안녕하세요 형태소 분석기입니다"}'
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from kiwipiepy import Kiwi
import logging

# Flask 앱 생성
app = Flask(__name__)
CORS(app)  # React Native에서 접근 가능하도록 CORS 설정

# Kiwi 인스턴스 생성 (서버 시작 시 한 번만)
print("Kiwi 로딩 중...")
kiwi = Kiwi()
print("Kiwi 로딩 완료!")

# 로깅 설정
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.route('/health', methods=['GET'])
def health_check():
    """서버 상태 확인"""
    return jsonify({"status": "healthy", "service": "Kiwi Morpheme Analyzer"})


@app.route('/analyze', methods=['POST'])
def analyze():
    """
    형태소 분석 엔드포인트
    
    Request:
        {
            "text": "분석할 문장"
        }
    
    Response:
        {
            "words": [
                {
                    "word": "원본어절",
                    "morphemes": [
                        {
                            "surface": "형태소",
                            "tag": "품사태그",
                            "start": 0,
                            "end": 2
                        }
                    ]
                }
            ]
        }
    """
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({"error": "text 필드가 필요합니다"}), 400
        
        text = data['text']
        
        if not text.strip():
            return jsonify({"error": "빈 문자열은 분석할 수 없습니다"}), 400
        
        # Kiwi로 형태소 분석
        result = kiwi.tokenize(text)
        
        # 어절 단위로 그룹화
        words = []
        current_word_pos = 0
        current_morphemes = []
        
        for token in result:
            # 새로운 어절 시작
            if token.word_position != current_word_pos:
                if current_morphemes:
                    # 현재 어절 완성
                    word_text = text[current_morphemes[0]['start']:current_morphemes[-1]['end']]
                    words.append({
                        "word": word_text,
                        "morphemes": current_morphemes
                    })
                current_word_pos = token.word_position
                current_morphemes = []
            
            # 형태소 추가
            current_morphemes.append({
                "surface": token.form,
                "tag": token.tag,
                "start": token.start,
                "end": token.start + token.len
            })
        
        # 마지막 어절 추가
        if current_morphemes:
            word_text = text[current_morphemes[0]['start']:current_morphemes[-1]['end']]
            words.append({
                "word": word_text,
                "morphemes": current_morphemes
            })
        
        logger.info(f"분석 완료: {len(words)}개 어절")
        
        return jsonify({"words": words})
    
    except Exception as e:
        logger.error(f"분석 오류: {str(e)}")
        return jsonify({"error": f"분석 중 오류 발생: {str(e)}"}), 500


@app.route('/batch-analyze', methods=['POST'])
def batch_analyze():
    """
    일괄 형태소 분석 엔드포인트
    
    Request:
        {
            "texts": ["문장1", "문장2", "문장3"]
        }
    
    Response:
        {
            "results": [
                { "text": "문장1", "words": [...] },
                { "text": "문장2", "words": [...] }
            ]
        }
    """
    try:
        data = request.get_json()
        
        if not data or 'texts' not in data:
            return jsonify({"error": "texts 필드가 필요합니다"}), 400
        
        texts = data['texts']
        
        if not isinstance(texts, list):
            return jsonify({"error": "texts는 배열이어야 합니다"}), 400
        
        results = []
        
        for text in texts:
            if not text.strip():
                continue
            
            # 각 텍스트 분석
            tokens = kiwi.tokenize(text)
            
            # 어절 단위로 그룹화
            words = []
            current_word_pos = 0
            current_morphemes = []
            
            for token in tokens:
                if token.word_position != current_word_pos:
                    if current_morphemes:
                        word_text = text[current_morphemes[0]['start']:current_morphemes[-1]['end']]
                        words.append({
                            "word": word_text,
                            "morphemes": current_morphemes
                        })
                    current_word_pos = token.word_position
                    current_morphemes = []
                
                current_morphemes.append({
                    "surface": token.form,
                    "tag": token.tag,
                    "start": token.start,
                    "end": token.start + token.len
                })
            
            if current_morphemes:
                word_text = text[current_morphemes[0]['start']:current_morphemes[-1]['end']]
                words.append({
                    "word": word_text,
                    "morphemes": current_morphemes
                })
            
            results.append({
                "text": text,
                "words": words
            })
        
        logger.info(f"일괄 분석 완료: {len(results)}개 문장")
        
        return jsonify({"results": results})
    
    except Exception as e:
        logger.error(f"일괄 분석 오류: {str(e)}")
        return jsonify({"error": f"분석 중 오류 발생: {str(e)}"}), 500


if __name__ == '__main__':
    print("\n" + "="*50)
    print("🥝 Kiwi 형태소 분석 서버 시작")
    print("="*50)
    print("\n사용 가능한 엔드포인트:")
    print("  GET  /health          - 서버 상태 확인")
    print("  POST /analyze         - 단일 문장 분석")
    print("  POST /batch-analyze   - 여러 문장 일괄 분석")
    print("\n서버 주소: http://localhost:5000")
    print("="*50 + "\n")
    
    # 서버 실행
    # 0.0.0.0으로 하면 외부에서도 접근 가능 (실제 기기 테스트 시 필요)
    app.run(host='0.0.0.0', port=5000, debug=True)