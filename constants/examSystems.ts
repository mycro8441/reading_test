// 시험 시스템 타입 정의
export type CountryCode = 'KR' | 'CN' | 'JP' | 'US' | 'INTL';

export interface LocalizedText {
  ko: string;
  en: string;
  native: string;
  zh?: string;
  ja?: string;
}

export interface Subject {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  icon: string;
  color: string;
  gradient: string[];
}

export interface Feature {
  id: string;
  name: LocalizedText;
  icon: string;
  route: string;
}

export interface ExamSystem {
  id: string;
  country: CountryCode;
  name: LocalizedText;
  description: LocalizedText;
  flag: string;
  icon: string;
  color: string;
  subjects: Subject[];
  features: Feature[];
  stats?: {
    totalUsers?: number;
    totalProblems?: number;
  };
}

// 시험 시스템 데이터
export const EXAM_SYSTEMS: ExamSystem[] = [
  {
    id: 'kr-suneung',
    country: 'KR',
    name: {
      ko: '대학수학능력시험',
      en: 'College Scholastic Ability Test',
      native: '수능',
      zh: '大学修学能力考试',
      ja: '大学修学能力試験',
    },
    description: {
      ko: '대한민국 대학 입학 시험',
      en: 'Korean University Entrance Exam',
      native: '한국 대입 시험',
    },
    flag: '🇰🇷',
    icon: '📚',
    color: '#0052A3',
    subjects: [
      {
        id: 'korean',
        name: {
          ko: '국어',
          en: 'Korean Language',
          native: '국어',
          zh: '语文',
          ja: '国語',
        },
        description: {
          ko: '독해, 문학, 화법과 작문',
          en: 'Reading, Literature, Speaking & Writing',
          native: '독해, 문학, 화법과 작문',
        },
        icon: '📖',
        color: '#FF6B6B',
        gradient: ['#FF6B6B', '#FF8E8E'],
      },
    ],
    features: [
      {
        id: 'ai-practice',
        name: {
          ko: 'AI 문제 생성',
          en: 'AI Practice',
          native: 'AI 맞춤 학습',
        },
        icon: '🤖',
        route: '/korea/ai-practice',
      },
      {
        id: 'past-exams',
        name: {
          ko: '기출문제',
          en: 'Past Exams',
          native: '기출문제',
        },
        icon: '📝',
        route: '/korea/past-exams',
      },
      {
        id: 'vocabulary',
        name: {
          ko: '어휘 학습',
          en: 'Vocabulary',
          native: '단어장',
        },
        icon: '📚',
        route: '/korea/vocabulary',
      },
      {
        id: 'morpheme',
        name: {
          ko: '형태소 분석',
          en: 'Morpheme Analysis',
          native: '형태소 분석기',
        },
        icon: '🔍',
        route: '/korea/morpheme',
      },
    ],
    stats: {
      totalUsers: 150000,
      totalProblems: 5000,
    },
  },
  {
    id: 'cn-gaokao',
    country: 'CN',
    name: {
      ko: '가오카오',
      en: 'Gaokao',
      native: '高考',
      zh: '高考',
      ja: '高考',
    },
    description: {
      ko: '중국 대학 입학 시험',
      en: 'Chinese University Entrance Exam',
      native: '中国高等教育入学考试',
      zh: '全国普通高等学校招生统一考试',
    },
    flag: '🇨🇳',
    icon: '📕',
    color: '#DE2910',
    subjects: [
      {
        id: 'yuwen',
        name: {
          ko: '어문',
          en: 'Chinese Language',
          native: '语文',
          zh: '语文',
          ja: '語文',
        },
        description: {
          ko: '문학, 고전, 작문',
          en: 'Literature, Classics, Composition',
          native: '文学、古文、写作',
          zh: '语文考试包括现代文、古文、作文',
        },
        icon: '🏮',
        color: '#DC143C',
        gradient: ['#DC143C', '#FF6347'],
      },
    ],
    features: [
      {
        id: 'ai-practice',
        name: {
          ko: 'AI 문제 생성',
          en: 'AI Practice',
          native: 'AI练习',
          zh: 'AI练习',
        },
        icon: '🤖',
        route: '/china/ai-practice',
      },
      {
        id: 'past-exams',
        name: {
          ko: '기출문제',
          en: 'Past Exams',
          native: '历年真题',
          zh: '历年真题',
        },
        icon: '📝',
        route: '/china/past-exams',
      },
      {
        id: 'chengyu',
        name: {
          ko: '성어 사전',
          en: 'Idiom Dictionary',
          native: '成语词典',
          zh: '成语词典',
        },
        icon: '📖',
        route: '/china/chengyu',
      },
      {
        id: 'guwen',
        name: {
          ko: '고문 해석',
          en: 'Classical Chinese',
          native: '古文翻译',
          zh: '古文翻译',
        },
        icon: '📜',
        route: '/china/guwen',
      },
    ],
    stats: {
      totalUsers: 1000000,
      totalProblems: 10000,
    },
  },
  {
    id: 'jp-kyotsu',
    country: 'JP',
    name: {
      ko: '대학입시공통테스트',
      en: 'Common Test for University Admissions',
      native: '共通テスト',
      zh: '共通考试',
      ja: '大学入学共通テスト',
    },
    description: {
      ko: '일본 대학 입학 공통 시험',
      en: 'Japanese University Common Entrance Exam',
      native: '日本の大学入試',
      ja: '日本の大学入学共通テスト',
    },
    flag: '🇯🇵',
    icon: '🎌',
    color: '#BC002D',
    subjects: [
      {
        id: 'kokugo',
        name: {
          ko: '국어',
          en: 'Japanese Language',
          native: '国語',
          ja: '国語',
          zh: '国语',
        },
        description: {
          ko: '현대문, 고문, 한문',
          en: 'Modern Text, Classical, Chinese Classics',
          native: '現代文・古文・漢文',
          ja: '現代文・古文・漢文',
        },
        icon: '🗾',
        color: '#D32F2F',
        gradient: ['#D32F2F', '#F44336'],
      },
    ],
    features: [
      {
        id: 'ai-practice',
        name: {
          ko: 'AI 문제 생성',
          en: 'AI Practice',
          native: 'AI練習',
          ja: 'AI練習問題',
        },
        icon: '🤖',
        route: '/japan/ai-practice',
      },
      {
        id: 'past-exams',
        name: {
          ko: '기출문제',
          en: 'Past Exams',
          native: '過去問',
          ja: '過去問題',
        },
        icon: '📝',
        route: '/japan/past-exams',
      },
      {
        id: 'kanji',
        name: {
          ko: '한자 학습',
          en: 'Kanji Learning',
          native: '漢字学習',
          ja: '漢字学習',
        },
        icon: '㊗️',
        route: '/japan/kanji',
      },
      {
        id: 'kobun',
        name: {
          ko: '고문 해석',
          en: 'Classical Japanese',
          native: '古文解釈',
          ja: '古文解釈',
        },
        icon: '📜',
        route: '/japan/kobun',
      },
    ],
    stats: {
      totalUsers: 500000,
      totalProblems: 8000,
    },
  },
  {
    id: 'intl-toeic',
    country: 'INTL',
    name: {
      ko: 'TOEIC',
      en: 'TOEIC',
      native: 'TOEIC',
      zh: 'TOEIC',
      ja: 'TOEIC',
    },
    description: {
      ko: '국제 영어 능력 평가',
      en: 'Test of English for International Communication',
      native: 'International English Test',
      zh: '国际英语交流考试',
      ja: '国際コミュニケーション英語能力テスト',
    },
    flag: '🌐',
    icon: '📘',
    color: '#0066CC',
    subjects: [
      {
        id: 'reading',
        name: {
          ko: '독해',
          en: 'Reading Comprehension',
          native: 'Reading',
          zh: '阅读',
          ja: 'リーディング',
        },
        description: {
          ko: 'Part 5-7 독해 문제',
          en: 'Parts 5-7 Reading Questions',
          native: 'Reading Comprehension',
        },
        icon: '📖',
        color: '#1976D2',
        gradient: ['#1976D2', '#42A5F5'],
      },
      {
        id: 'listening',
        name: {
          ko: '듣기',
          en: 'Listening Comprehension',
          native: 'Listening',
          zh: '听力',
          ja: 'リスニング',
        },
        description: {
          ko: 'Part 1-4 듣기 문제',
          en: 'Parts 1-4 Listening Questions',
          native: 'Listening Comprehension',
        },
        icon: '🎧',
        color: '#43A047',
        gradient: ['#43A047', '#66BB6A'],
      },
    ],
    features: [
      {
        id: 'ai-practice',
        name: {
          ko: 'AI 문제 생성',
          en: 'AI Practice',
          native: 'AI Practice',
        },
        icon: '🤖',
        route: '/international/toeic/ai-practice',
      },
      {
        id: 'past-exams',
        name: {
          ko: '기출 유형',
          en: 'Past Question Types',
          native: 'Practice Tests',
        },
        icon: '📝',
        route: '/international/toeic/practice',
      },
      {
        id: 'vocabulary',
        name: {
          ko: '필수 어휘',
          en: 'Essential Vocabulary',
          native: 'Vocabulary Builder',
        },
        icon: '📚',
        route: '/international/toeic/vocabulary',
      },
      {
        id: 'part-strategy',
        name: {
          ko: 'Part별 전략',
          en: 'Part Strategies',
          native: 'Strategy Guide',
        },
        icon: '💡',
        route: '/international/toeic/strategy',
      },
    ],
    stats: {
      totalUsers: 2000000,
      totalProblems: 15000,
    },
  },
  {
    id: 'intl-sat',
    country: 'INTL',
    name: {
      ko: 'SAT',
      en: 'SAT',
      native: 'SAT',
      zh: 'SAT',
      ja: 'SAT',
    },
    description: {
      ko: '미국 대학 입학 시험',
      en: 'Scholastic Assessment Test',
      native: 'US College Entrance Exam',
      zh: '学术能力评估测试',
      ja: 'アメリカ大学進学適性試験',
    },
    flag: '🇺🇸',
    icon: '📗',
    color: '#B22234',
    subjects: [
      {
        id: 'reading-writing',
        name: {
          ko: '독해 및 작문',
          en: 'Reading and Writing',
          native: 'Reading & Writing',
          zh: '阅读与写作',
          ja: 'リーディング＆ライティング',
        },
        description: {
          ko: 'Evidence-Based Reading and Writing',
          en: 'Critical Reading and Grammar',
          native: 'EBRW Section',
        },
        icon: '✍️',
        color: '#1565C0',
        gradient: ['#1565C0', '#1E88E5'],
      },
    ],
    features: [
      {
        id: 'ai-practice',
        name: {
          ko: 'AI 문제 생성',
          en: 'AI Practice',
          native: 'AI Practice',
        },
        icon: '🤖',
        route: '/international/sat/ai-practice',
      },
      {
        id: 'past-exams',
        name: {
          ko: '기출문제',
          en: 'Past Papers',
          native: 'Practice Tests',
        },
        icon: '📝',
        route: '/international/sat/practice',
      },
      {
        id: 'vocabulary',
        name: {
          ko: '필수 어휘',
          en: 'Vocabulary',
          native: 'Word Lists',
        },
        icon: '📚',
        route: '/international/sat/vocabulary',
      },
    ],
    stats: {
      totalUsers: 800000,
      totalProblems: 12000,
    },
  },
];

// 국가별 그룹화
export const COUNTRIES = [
  {
    code: 'KR' as CountryCode,
    name: {
      ko: '한국',
      en: 'South Korea',
      native: '대한민국',
      zh: '韩国',
      ja: '韓国',
    },
    flag: '🇰🇷',
    color: '#0052A3',
  },
  {
    code: 'CN' as CountryCode,
    name: {
      ko: '중국',
      en: 'China',
      native: '中国',
      zh: '中国',
      ja: '中国',
    },
    flag: '🇨🇳',
    color: '#DE2910',
  },
  {
    code: 'JP' as CountryCode,
    name: {
      ko: '일본',
      en: 'Japan',
      native: '日本',
      zh: '日本',
      ja: '日本',
    },
    flag: '🇯🇵',
    color: '#BC002D',
  },
  {
    code: 'INTL' as CountryCode,
    name: {
      ko: '국제 시험',
      en: 'International',
      native: 'Global Exams',
      zh: '国际考试',
      ja: '国際試験',
    },
    flag: '🌍',
    color: '#2196F3',
  },
];

// 국가별 시험 가져오기
export const getExamsByCountry = (countryCode: CountryCode) => {
  return EXAM_SYSTEMS.filter(exam => exam.country === countryCode);
};

// 시험 ID로 찾기
export const getExamById = (examId: string) => {
  return EXAM_SYSTEMS.find(exam => exam.id === examId);
};