import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { analyzeMorpheme, MorphemeAnalysis } from '../services/MorphemeService';

const { width } = Dimensions.get('window');

export default function MorphemeAnalyzerScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState<MorphemeAnalysis[] | null>(null);
  const [loading, setLoading] = useState(false);

  const styles = createStyles(theme);

  const sampleTexts = [
    '아름다운 꽃이 피었습니다.',
    '나는 학교에 갑니다.',
    '그 사람은 책을 읽고 있었다.',
    '비가 오는 날씨가 좋다.',
  ];

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    try {
      const result = await analyzeMorpheme(inputText);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('분석 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSampleClick = (text: string) => {
    setInputText(text);
    setAnalysis(null);
  };

  const getMorphemeColor = (tag: string) => {
    const colorMap: Record<string, string> = {
      // -------------------------
      // 체언 (N)
      // -------------------------
      NNG: '#D7263D',
      NNP: '#E63946',
      NNB: '#F2545B',
      NR:  '#FF6B6B',
      NP:  '#FF8787',
  
      // -------------------------
      // 용언 (V)
      // -------------------------
      VV:  '#1D4ED8', // 강한 블루
      VA:  '#2563EB',
      VX:  '#3B82F6',
      VCP: '#60A5FA',
      VCN: '#93C5FD',
  
      // -------------------------
      // 관형사
      // -------------------------
      MM:  '#2C7A3F',
  
      // -------------------------
      // 부사 (MA)
      // -------------------------
      MAG: '#2F9E44',
      MAJ: '#37B24D',
  
      // -------------------------
      // 감탄사
      // -------------------------
      IC: '#0CA678',
  
      // -------------------------
      // 조사 (J)
      // -------------------------
      JKS: '#E67700',
      JKC: '#F08C00',
      JKG: '#F59F00',
      JKO: '#FAB005',
      JKB: '#FCC419',
      JKV: '#FFD43B',
      JKQ: '#FFE066',
      JX:  '#FFEA7F',
      JC:  '#FFF3B0',
  
      // -------------------------
      // 어미 (E)
      // -------------------------
      EP:  '#862E9C',
      EF:  '#9C36B5',
      EC:  '#AE3EC9',
      ETN: '#BE4BDB',
      ETM: '#CC5DE8',
  
      // -------------------------
      // 접두사 / 접미사 (X)
      // -------------------------
      XPN: '#D9480F',
      XSN: '#E8590C',
      XSV: '#F76707',
      XSA: '#FD7E14',
      XSM: '#FFA94D',
      XR:  '#FFB562',
  
      // -------------------------
      // 기호 / 외국어 / 숫자 (S)
      // -------------------------
      SF:  '#495057',
      SP:  '#60656C',
      SS:  '#868E96',
      SSO: '#ADB5BD',
      SSC: '#ADB5BD',
      SE:  '#CED4DA',
      SO:  '#ADB5BD',
      SW:  '#6D6D6D',
      SL:  '#0B7285',
      SH:  '#087F5B',
      SN:  '#099268',
      SB:  '#40C057',
  
      // -------------------------
      // 분석 불능
      // -------------------------
      UN: '#ADB5BD',
  
      // -------------------------
      // 웹 / 주소 관련
      // -------------------------
      W_URL:     '#364FC7',
      W_EMAIL:   '#4263EB',
      W_HASHTAG: '#4C6EF5',
      W_MENTION: '#5C7CFA',
      W_SERIAL:  '#748FFC',
      W_EMOJI:   '#9775FA',
  
      // -------------------------
      // 기타
      // -------------------------
      Z_CODA: '#ADB5BD',
      Z_SIOT: '#CED4DA',
  
      // 사용자 정의
      USER0: '#12CBC4',
      USER1: '#1289A7',
      USER2: '#B53471',
      USER3: '#833471',
      USER4: '#6D214F',
    };
  
    return colorMap[tag] || '#555'; // fallback: 진한 회색
  };
  

  const getMorphemeLabel = (tag: string) => {
    const labelMap: Record<string, string> = {
      // -------------------------
      // 체언(N)
      // -------------------------
      NNG: '일반명사',
      NNP: '고유명사',
      NNB: '의존명사',
      NR:  '수사',
      NP:  '대명사',
  
      // -------------------------
      // 용언(V)
      // -------------------------
      VV:  '동사',
      VA:  '형용사',
      VX:  '보조용언',
      VCP: '긍정지정사(이다)',
      VCN: '부정지정사(아니다)',
  
      // -------------------------
      // 관형사
      // -------------------------
      MM: '관형사',
  
      // -------------------------
      // 부사(MA)
      // -------------------------
      MAG: '부사',
      MAJ: '접속부사',
  
      // -------------------------
      // 감탄사
      // -------------------------
      IC: '감탄사',
  
      // -------------------------
      // 조사(J)
      // -------------------------
      JKS: '주격조사',
      JKC: '보격조사',
      JKG: '관형격조사',
      JKO: '목적격조사',
      JKB: '부사격조사',
      JKV: '호격조사',
      JKQ: '인용격조사',
      JX:  '보조사',
      JC:  '접속조사',
  
      // -------------------------
      // 어미(E)
      // -------------------------
      EP:  '선어말어미',
      EF:  '종결어미',
      EC:  '연결어미',
      ETN: '명사형전성어미',
      ETM: '관형형전성어미',
  
      // -------------------------
      // 접두사/접미사(X)
      // -------------------------
      XPN: '체언접두사',
      XSN: '명사파생접미사',
      XSV: '동사파생접미사',
      XSA: '형용사파생접미사',
      XSM: '부사파생접미사',
      XR:  '어근',
  
      // -------------------------
      // 부호, 문자(S)
      // -------------------------
      SF:  '종결부호',
      SP:  '구분부호',
      SS:  '인용/괄호부호',
      SSO: '여는부호',
      SSC: '닫는부호',
      SE:  '줄임표',
      SO:  '붙임표',
      SW:  '특수기호',
  
      // -------------------------
      // 외국어/한자/숫자
      // -------------------------
      SL:  '외국어',
      SH:  '한자',
      SN:  '숫자',
      SB:  '순서기호',
  
      // -------------------------
      // 분석 불능
      // -------------------------
      UN: '분석불능',
  
      // -------------------------
      // 웹/주소 관련(W)
      // -------------------------
      W_URL:     'URL',
      W_EMAIL:   '이메일',
      W_HASHTAG: '해시태그',
      W_MENTION: '멘션',
      W_SERIAL:  '일련번호',
      W_EMOJI:   '이모지',
  
      // -------------------------
      // 기타
      // -------------------------
      Z_CODA: '덧붙은받침',
      Z_SIOT: '사이시옷',
  
      // 사용자 정의
      USER0: '사용자정의0',
      USER1: '사용자정의1',
      USER2: '사용자정의2',
      USER3: '사용자정의3',
      USER4: '사용자정의4',
    };
  
    return labelMap[tag] || tag;
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme.statusBar} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>형태소 분석기</Text>
          <Text style={styles.headerSubtitle}>문장 구조 분석</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Input Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>문장 입력</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="분석할 문장을 입력하세요..."
              placeholderTextColor={theme.colors.textTertiary}
              value={inputText}
              onChangeText={setInputText}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            
            {inputText.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  setInputText('');
                  setAnalysis(null);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.clearIcon}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.analyzeButton,
              (!inputText.trim() || loading) && styles.analyzeButtonDisabled,
            ]}
            onPress={handleAnalyze}
            disabled={!inputText.trim() || loading}
            activeOpacity={0.7}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.background} size="small" />
            ) : (
              <>
                <Text style={styles.analyzeButtonText}>분석하기</Text>
                <Text style={styles.analyzeButtonIcon}>→</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Sample Texts */}
        {!analysis && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>예시 문장</Text>
            
            <View style={styles.sampleList}>
              {sampleTexts.map((text, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.sampleCard}
                  onPress={() => handleSampleClick(text)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.sampleIcon}>💬</Text>
                  <Text style={styles.sampleText}>{text}</Text>
                  <Text style={styles.sampleArrow}>→</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Analysis Result */}
        {analysis && (
          <View style={styles.section}>
            <View style={styles.resultHeader}>
              <Text style={styles.sectionTitle}>분석 결과</Text>
              <View style={styles.resultStats}>
                <View style={styles.statChip}>
                  <Text style={styles.statLabel}>어절</Text>
                  <Text style={styles.statValue}>{analysis.length}</Text>
                </View>
                <View style={styles.statChip}>
                  <Text style={styles.statLabel}>형태소</Text>
                  <Text style={styles.statValue}>
                    {analysis.reduce((sum, word) => sum + word.morphemes.length, 0)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Word Cards */}
            <View style={styles.wordList}>
              {analysis.map((word, wordIndex) => (
                <View key={wordIndex} style={styles.wordCard}>
                  {/* Original Word */}
                  <View style={styles.wordHeader}>
                    <Text style={styles.wordIndex}>{wordIndex + 1}</Text>
                    <Text style={styles.wordText}>{word.word}</Text>
                  </View>

                  {/* Morphemes */}
                  <View style={styles.morphemeList}>
                    {word.morphemes.map((morpheme, morphemeIndex) => (
                      <View key={morphemeIndex} style={styles.morphemeRow}>
                        {/* Morpheme Surface */}
                        <View style={styles.morphemeLeft}>
                          <View
                            style={[
                              styles.morphemeChip,
                              { backgroundColor: getMorphemeColor(morpheme.tag) + '20' },
                            ]}
                          >
                            <Text
                              style={[
                                styles.morphemeSurface,
                                { color: getMorphemeColor(morpheme.tag) },
                              ]}
                            >
                              {morpheme.surface}
                            </Text>
                          </View>
                          
                          {/* Tag Badge */}
                          <View
                            style={[
                              styles.tagBadge,
                              { backgroundColor: getMorphemeColor(morpheme.tag) },
                            ]}
                          >
                            <Text style={styles.tagText}>
                              {getMorphemeLabel(morpheme.tag)}
                            </Text>
                          </View>
                        </View>

                        {/* Plus sign between morphemes */}
                        {morphemeIndex < word.morphemes.length - 1 && (
                          <Text style={styles.plusSign}>+</Text>
                        )}
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            {/* Legend */}
            <View style={styles.legendContainer}>
              <Text style={styles.legendTitle}>품사 범례</Text>
              <View style={styles.legendGrid}>
                {[
                  { tag: 'NNG', label: '명사' },
                  { tag: 'VV', label: '동사' },
                  { tag: 'VA', label: '형용사' },
                  { tag: 'MAG', label: '부사' },
                  { tag: 'JKS', label: '조사' },
                  { tag: 'EF', label: '어미' },
                  { tag: 'XSN', label: '접미사' },
                  { tag: 'SF', label: '기호' },
                ].map((item) => (
                  <View key={item.tag} style={styles.legendItem}>
                    <View
                      style={[
                        styles.legendDot,
                        { backgroundColor: getMorphemeColor(item.tag) },
                      ]}
                    />
                    <Text style={styles.legendLabel}>{item.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingTop: Platform.OS === 'ios' ? 8 : 16,
      paddingBottom: 20,
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      ...theme.shadows.small,
    },
    backIcon: {
      fontSize: 24,
      color: theme.colors.text,
    },
    headerCenter: {
      flex: 1,
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      fontFamily: theme.fonts?.heading,
      color: theme.colors.text,
      letterSpacing: -0.3,
    },
    headerSubtitle: {
      fontSize: 13,
      fontFamily: theme.fonts?.subText,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    headerSpacer: {
      width: 44,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 40,
    },
    section: {
      marginBottom: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: '700',
      fontFamily: theme.fonts?.heading || theme.fonts?.title,
      color: theme.colors.textTertiary,
      textTransform: 'uppercase',
      letterSpacing: 1.2,
      marginBottom: 16,
    },
    
    // Input
    inputContainer: {
      position: 'relative',
      marginBottom: 16,
    },
    textInput: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      padding: 20,
      fontSize: 16,
      fontFamily: theme.fonts?.body,
      color: theme.colors.text,
      minHeight: 120,
      ...theme.shadows.medium,
    },
    clearButton: {
      position: 'absolute',
      top: 16,
      right: 16,
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.colors.textTertiary + '20',
      justifyContent: 'center',
      alignItems: 'center',
    },
    clearIcon: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    analyzeButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 16,
      paddingVertical: 18,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      ...theme.shadows.large,
    },
    analyzeButtonDisabled: {
      opacity: 0.4,
    },
    analyzeButtonText: {
      fontSize: 17,
      fontWeight: '700',
      color: theme.colors.background,
      letterSpacing: 0.3,
    },
    analyzeButtonIcon: {
      fontSize: 20,
      color: theme.colors.background,
    },

    // Samples
    sampleList: {
      gap: 12,
    },
    sampleCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      ...theme.shadows.small,
    },
    sampleIcon: {
      fontSize: 20,
    },
    sampleText: {
      flex: 1,
      fontSize: 15,
      fontFamily: theme.fonts?.body,
      color: theme.colors.text,
      fontWeight: '500',
    },
    sampleArrow: {
      fontSize: 18,
      color: theme.colors.textTertiary,
    },

    // Results
    resultHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    resultStats: {
      flexDirection: 'row',
      gap: 8,
    },
    statChip: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      paddingVertical: 6,
      paddingHorizontal: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    statLabel: {
      fontSize: 11,
      fontWeight: '600',
      fontFamily: theme.fonts?.body,
      color: theme.colors.textTertiary,
    },
    statValue: {
      fontSize: 13,
      fontWeight: '700',
      fontFamily: theme.fonts?.number,
      color: theme.colors.primary,
    },

    // Words
    wordList: {
      gap: 16,
    },
    wordCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      padding: 20,
      ...theme.shadows.medium,
    },
    wordHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    wordIndex: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.colors.primary + '20',
      fontSize: 13,
      fontWeight: '700',
      fontFamily: theme.fonts?.number,
      color: theme.colors.primary,
      textAlign: 'center',
      lineHeight: 28,
    },
    wordText: {
      fontSize: 20,
      fontWeight: '600',
      fontFamily: theme.fonts?.body,
      color: theme.colors.text,
    },

    // Morphemes
    morphemeList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 8,
    },
    morphemeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    morphemeLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    morphemeChip: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 12,
    },
    morphemeSurface: {
      fontSize: 15,
      fontWeight: '600',
      fontFamily: theme.fonts?.body,
    },
    tagBadge: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 8,
    },
    tagText: {
      fontSize: 11,
      fontWeight: '700',
      color: '#FFFFFF',
      letterSpacing: 0.5,
    },
    plusSign: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.textTertiary,
    },

    // Legend
    legendContainer: {
      marginTop: 24,
      padding: 20,
      backgroundColor: theme.colors.background,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    legendTitle: {
      fontSize: 13,
      fontWeight: '700',
      fontFamily: theme.fonts?.body,
      color: theme.colors.text,
      marginBottom: 12,
      textAlign: 'center',
    },
    legendGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      justifyContent: 'center',
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    legendDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    legendLabel: {
      fontSize: 12,
      fontFamily: theme.fonts?.body,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },

    spacer: {
      height: 20,
    },
  });