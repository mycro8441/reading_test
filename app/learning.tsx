import { SAMPLE_SESSION } from '@/constants/sampleData';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PassageView } from '../components/PassageView';
import { ProblemView } from '../components/ProblemView';
import { useTheme } from '../contexts/ThemeContext';
import { LearningSession } from '../types/problem';

export default function LearningScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { theme } = useTheme();
  
  const [session, setSession] = useState<LearningSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showPassage, setShowPassage] = useState(true);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // AI 생성 서비스 초기화
  //const aiService = new AIGenerationService();

  // 컴포넌트 마운트 시 문제 생성
  useEffect(() => {
    generateProblems();
  }, []);

  const generateProblems = async () => {
    setLoading(true);
    setError(null);

    try {
      const generationParams = {
        topic: params.topic as string,
        difficulty: params.difficulty as string,
        problemCount: parseInt(params.problemCount as string) || 5,
      };

      //const generatedSession = await aiService.generateProblems(generationParams);
      const generatedSession = SAMPLE_SESSION;
      setSession(generatedSession);
    } catch (err) {
      console.error('Generation failed:', err);
      setError('문제 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAnswer = (optionIndex: number) => {
    if (!session) return;
    
    const currentProblem = session.problems[currentProblemIndex];
    setSelectedAnswers({
      ...selectedAnswers,
      [currentProblem.id]: optionIndex,
    });
  };

  const handleNext = () => {
    if (!session) return;

    if (currentProblemIndex < session.problems.length - 1) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentProblemIndex(currentProblemIndex + 1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    } else {
      // 결과 화면으로 이동
      router.push({
        pathname: '/result',
        params: {
          sessionData: JSON.stringify(session),
          selectedAnswersData: JSON.stringify(selectedAnswers),
        },
      });
    }
  };

  const handlePrevious = () => {
    if (currentProblemIndex > 0) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentProblemIndex(currentProblemIndex - 1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  const styles = createStyles(theme);

  // 로딩 상태
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={theme.statusBar} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>AI가 문제를 생성하고 있습니다...</Text>
          <Text style={styles.loadingSubtext}>잠시만 기다려주세요</Text>
        </View>
      </SafeAreaView>
    );
  }

  // 에러 상태
  if (error || !session) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={theme.statusBar} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error || '문제를 불러올 수 없습니다'}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={generateProblems}>
            <Text style={styles.retryButtonText}>다시 시도</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
            <Text style={styles.backButtonText}>돌아가기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentProblem = session.problems[currentProblemIndex];
  const progress = ((currentProblemIndex + 1) / session.problems.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme.statusBar} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.headerBackButton}>
          <Text style={styles.headerBackButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {currentProblemIndex + 1} / {session.problems.length}
          </Text>
        </View>

        <View style={styles.placeholder} />
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>

        {/* Passage Toggle */}
        <TouchableOpacity
          style={styles.passageToggle}
          onPress={() => setShowPassage(!showPassage)}
          activeOpacity={0.6}
        >
          <Text style={styles.passageToggleText}>
            {showPassage ? '지문 숨기기' : '지문 보기'}
          </Text>
        </TouchableOpacity>

        {/* Passage */}
        {showPassage && (
          <View style={styles.passageWrapper}>
            <PassageView passage={session.passage} theme={theme} />
          </View>
        )}

        {/* Problem */}
        <Animated.View style={[styles.problemSection, { opacity: fadeAnim }]}>
          <ProblemView
            problem={currentProblem}
            selectedAnswer={selectedAnswers[currentProblem.id]}
            onSelectAnswer={handleSelectAnswer}
            theme={theme}
          />
        </Animated.View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, currentProblemIndex === 0 && styles.navButtonHidden]}
          onPress={handlePrevious}
          disabled={currentProblemIndex === 0}
          activeOpacity={0.6}
        >
          <Text style={styles.navButtonText}>이전</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.navButton,
            styles.nextButton,
            selectedAnswers[currentProblem.id] === undefined && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={selectedAnswers[currentProblem.id] === undefined}
          activeOpacity={0.6}
        >
          <Text style={[styles.navButtonText, styles.nextButtonText]}>
            {currentProblemIndex === session.problems.length - 1 ? '완료' : '다음'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: 24,
    textAlign: 'center',
  },
  loadingSubtext: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 32,
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginBottom: 12,
  },
  retryButtonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  backButtonText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerBackButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBackButtonText: {
    fontSize: 28,
    color: theme.colors.text,
    fontWeight: '300',
  },
  progressInfo: {
    flex: 1,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts?.number || 'System',
    letterSpacing: 1,
  },
  placeholder: {
    width: 44,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 32,
  },
  progressBarContainer: {
    marginBottom: 40,
  },
  progressBar: {
    height: 2,
    backgroundColor: theme.colors.border,
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  passageToggle: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    marginBottom: 24,
    ...theme.shadows.small,
  },
  passageToggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
    letterSpacing: 0.5,
  },
  passageWrapper: {
    marginBottom: 48,
  },
  problemSection: {
    marginBottom: 48,
  },
  bottomSpacer: {
    height: 40,
  },
  navigationContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 32,
    paddingVertical: 24,
    backgroundColor: theme.colors.background,
  },
  navButton: {
    flex: 1,
    paddingVertical: 18,
    backgroundColor: theme.colors.surface,
    borderRadius: 28,
    alignItems: 'center',
    ...theme.shadows.small,
  },
  navButtonHidden: {
    opacity: 0,
  },
  nextButton: {
    backgroundColor: theme.colors.primary,
  },
  nextButtonDisabled: {
    opacity: 0.3,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    letterSpacing: 0.5,
  },
  nextButtonText: {
    color: theme.colors.background,
  },
});