import { StatusBarStyle } from 'react-native';

export const themes = {
  vocabulary: {
    id: 'vocabulary',
    name: 'Vocabulary',
    fonts: {
      title: 'System',
      body: 'System',
      number: 'System',
      subText: 'System',
    },
    colors: {
      background: '#E8E4DC',
      surface: '#F5F2ED',
      surfaceSecondary: '#EBE7DF',
      primary: '#2C2C2C',
      text: '#1A1A1A',
      textSecondary: '#666666',
      textTertiary: '#999999',
      border: '#D4CFC4',
      borderLight: '#E0DCD4',
      success: '#4A7C59',
      warning: '#C17D4A',
      error: '#B85C5C',
      accent: '#5C7C9A',
      badge: '#EBE7DF',
      badgeText: '#4A4A4A',
    },
    shadows: {
      small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1,
      },
      medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
      },
      large: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 3,
      },
    },
    statusBar: 'dark-content' as StatusBarStyle,
  },

  claudeLight: {
    id: 'claudeLight',
    name: 'Claude Light',
    fonts: {
      title: 'System',
      body: 'System',
      number: 'System',
      subText: ' System',
    },
    colors: {
      background: '#FAFAFA',
      surface: '#FFFFFF',
      surfaceSecondary: '#F9FAFB',
      primary: '#191919',
      text: '#111827',
      textSecondary: '#6B7280',
      textTertiary: '#9CA3AF',
      border: '#E5E7EB',
      borderLight: '#F3F4F6',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      accent: '#3B82F6',
      badge: '#F3F4F6',
      badgeText: '#4B5563',
    },
    shadows: {
      small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      },
      medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
      },
      large: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
      },
    },
    statusBar: 'dark-content' as StatusBarStyle,
  },

  claudeDark: {
    id: 'claudeDark',
    name: 'Claude Dark',
    fonts: {
      title: 'System',
      body: 'System',
      number: 'System',
      subText: 'System',
    },
    colors: {
      background: '#0F0F0F',
      surface: '#1A1A1A',
      surfaceSecondary: '#262626',
      primary: '#FFFFFF',
      text: '#F5F5F5',
      textSecondary: '#A3A3A3',
      textTertiary: '#737373',
      border: '#404040',
      borderLight: '#2A2A2A',
      success: '#22C55E',
      warning: '#FBBF24',
      error: '#F87171',
      accent: '#60A5FA',
      badge: '#2A2A2A',
      badgeText: '#D4D4D4',
    },
    shadows: {
      small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 1,
      },
      medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 2,
      },
      large: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 4,
      },
    },
    statusBar: 'light-content' as StatusBarStyle,
  },

  pyeonggawon: {
    id: 'pyeonggawon',
    name: '평가원',
    fonts: {
      // 수능 공식 폰트 매핑
      title: 'ADinaru',              // 시험 제목 (신명 디나루 역할)
      body: 'AJungmyungjo',          // 문제 본문 (신명 중명조 역할)
      number: 'HYGyeonmyungjo',      // 문항 번호, 쪽 번호 (한양 견명조 역할)
      heading: 'ShinGraphic',        // 섹션 제목 (신그래픽)
      subText: 'TeGothic'
    },
    fontSizes: {
      // 수능 규격 폰트 크기 (pt)
      examTitle: 18,               // 시험 주제 (17.85pt)
      pageNumber: 30,              // 쪽 번호 (29.7pt)
      examType: 14,                // (5지선다형) (14.25pt)
      period: 18,                  // 제 2교시 (17.6pt)
      pageFooter: 11,              // 하단 쪽수 (11.4pt)
      questionNumber: 13,          // 문항번호 (12.83pt)
      body: 11,                    // 문제 본문 (10.91pt)
      choice: 11,                  // 선지 (10.91pt)
      formula: 11,                 // 수식/숫자 (11.04pt)
    },
    colors: {
      background: '#FFFFFF',       // 순백색 용지
      surface: '#FAFAFA',
      surfaceSecondary: '#F5F5F5',
      primary: '#000000',          // 완전 검정
      text: '#000000',
      textSecondary: '#333333',
      textTertiary: '#666666',
      border: '#E0E0E0',
      borderLight: '#EEEEEE',
      success: '#2C5F2D',
      warning: '#D97706',
      error: '#DC2626',
      accent: '#000000',
      badge: '#F5F5F5',
      badgeText: '#333333',
    },
    shadows: {
      // 수능은 그림자 없음 (평면적)
      small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
      },
      medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
      },
      large: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
      },
    },
    statusBar: 'dark-content' as StatusBarStyle,
  },
};

export type ThemeType = typeof themes.vocabulary;
export type ThemeId = keyof typeof themes;