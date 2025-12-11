# 🌍 글로벌 시험 준비 플랫폼

AI 기반 다국어 시험 학습 플랫폼입니다.

## 🎯 지원 시험

### 🇰🇷 한국
- **수능 (대학수학능력시험)**
  - AI 문제 생성
  - 기출문제
  - 어휘 학습
  - 형태소 분석기

### 🇨🇳 중국  
- **高考 (가오카오)**
  - AI 练习 (AI 연습)
  - 历年真题 (기출문제)
  - 成语词典 (성어 사전)
  - 古文翻译 (고문 번역)

### 🇯🇵 일본
- **共通テスト (공통테스트)**
  - AI練習問題
  - 過去問題 (기출문제)
  - 漢字学習 (한자 학습)
  - 古文解釈 (고문 해석)

### 🌐 국제 시험
- **TOEIC** (Reading & Listening)
- **SAT** (Reading & Writing)
- **TOEFL** (준비 중)
- **IELTS** (준비 중)
- **JLPT** (준비 중)
- **HSK** (준비 중)

## 📁 프로젝트 구조

```
app/
├── index.tsx                    # 글로벌 홈 (국가/시험 선택)
├── topic-selection.tsx          # AI 문제 생성 (주제 선택)
├── learning.tsx                 # 학습 화면
├── result.tsx                   # 결과 화면
├── global.tsx                   # 글로벌 화면

constants/
├── themes.ts                    # 테마 시스템 (4개 테마)
└── examSystems.ts              # 시험 시스템 데이터

contexts/
├── ThemeContext.tsx            # 테마 관리
└── (LanguageContext.tsx)       # 다국어 관리 (예정)

locales/
├── ko.json                     # 한국어
├── en.json                     # 영어 (예정)
├── zh.json                     # 중국어 (예정)
└── ja.json                     # 일본어 (예정)

assets/fonts/
├── A디나루.ttf                 # 수능 제목
├── A중명조.ttf                 # 수능 본문
├── HY견명조.ttf                # 수능 번호
└── 신그래픽.ttf                # 수능 섹션
```

## 🎨 디자인 시스템

### 테마
1. **Vocabulary** (기본) - 베이지 배경, 미니멀
2. **Claude Light** - 깔끔한 라이트 모드
3. **Claude Dark** - 세련된 다크 모드  
4. **평가원** - 수능 스타일 (수능 폰트 적용)

### 스타일 가이드
- **간격**: 섹션 32px, 카드 12-16px
- **둥근 모서리**: 12-20px
- **그림자**: 미세하고 부드러운
- **폰트**: 
  - 제목: 18-28px / 700
  - 본문: 14-16px / 400-600
  - 캡션: 11-13px / 500

## 🚀 기능

### ✅ 완성
- [x] 글로벌 홈 화면 (국가 선택)
- [x] 시험 시스템 데이터 구조
- [x] 국가별 메뉴 화면
- [x] AI 문제 생성 (한국 수능)
- [x] 4개 테마 시스템
- [x] 수능 공식 폰트 적용

### 🚧 진행 중
- [ ] 기출문제 시스템
- [ ] 어휘 학습 (단어장)
- [ ] 형태소 분석기
- [ ] 다국어 i18n 설정

### 📝 계획
- [ ] 중국 성어 사전
- [ ] 일본 한자 학습
- [ ] TOEIC Part별 전략
- [ ] 학습 통계 대시보드
- [ ] 소셜 기능 (점수 공유)

## 📊 데이터 구조

### ExamSystem
```typescript
interface ExamSystem {
  id: string;                    // 'kr-suneung'
  country: CountryCode;          // 'KR' | 'CN' | 'JP' | 'INTL'
  name: LocalizedText;           // 다국어 이름
  description: LocalizedText;    // 설명
  flag: string;                  // 이모지 국기
  subjects: Subject[];           // 과목 목록
  features: Feature[];           // 기능 목록
  stats: { totalUsers, totalProblems };
}
```

### Subject
```typescript
interface Subject {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  icon: string;
  color: string;
  gradient: string[];
}
```

### Feature
```typescript
interface Feature {
  id: string;
  name: LocalizedText;
  icon: string;
  route: string;
}
```

## 🌐 다국어 지원

### 지원 언어
- 🇰🇷 한국어 (ko)
- 🇺🇸 영어 (en) - 예정
- 🇨🇳 중국어 (zh) - 예정
- 🇯🇵 일본어 (ja) - 예정

### LocalizedText 구조
```typescript
interface LocalizedText {
  ko: string;      // 한국어
  en: string;      // 영어
  native: string;  // 현지어
  zh?: string;     // 중국어 (선택)
  ja?: string;     // 일본어 (선택)
}
```

## 🎓 학습 기능

### 한국 수능
- **AI 문제 생성**: 주제/난이도/문제수 선택
- **기출문제**: 역대 수능 문제 풀이
- **어휘 학습**: 한자성어, 속담, 관용구
- **형태소 분석**: 문장 구조 분석

### 중국 가오카오
- **AI练习**: AI 맞춤 문제
- **历年真题**: 기출문제
- **成语词典**: 사자성어 사전
- **古文翻译**: 고전 번역

### 일본 공통테스트
- **AI練習**: AI 문제
- **過去問**: 기출문제
- **漢字学習**: 한자 학습
- **古文解釈**: 고전 해석

### TOEIC
- **AI Practice**: Part별 문제
- **Vocabulary**: 필수 어휘 3000
- **Strategy**: Part별 전략 가이드
- **Mock Test**: 모의고사

## 📱 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# iOS
npm run ios

# Android
npm run android
```

## 🛠 기술 스택

- **Framework**: Expo Router (v51)
- **Language**: TypeScript
- **UI**: React Native
- **State**: React Context API
- **Storage**: AsyncStorage
- **i18n**: i18next, react-i18next
- **Fonts**: expo-font (커스텀 폰트)
- **Navigation**: Expo Router (file-based)

## 📈 통계

- **지원 국가**: 4개 (한국, 중국, 일본, 국제)
- **지원 시험**: 5개 (수능, 가오카오, 공통테스트, TOEIC, SAT)
- **문제 데이터베이스**: 50K+ 문제 (목표)
- **사용자**: 250만+ (목표)

## 🎯 로드맵

### Phase 1 (현재) ✅
- 글로벌 홈 화면
- 국가별 메뉴
- 기본 AI 문제 생성

### Phase 2 (다음)
- 기출문제 시스템
- 어휘 학습 완성
- 형태소/구문 분석기

### Phase 3
- 학습 통계 대시보드
- 소셜 기능
- 푸시 알림

### Phase 4
- 음성 읽기 (TTS)
- 오프라인 모드
- 프리미엄 기능

---

Made with ❤️ for global learners 🌍