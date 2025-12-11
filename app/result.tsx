import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { theme } = useTheme();
  const [expandedProblems, setExpandedProblems] = useState<Record<number, boolean>>({});
  const scoreAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const problemsData = JSON.parse(params.problemsData as string);
  const selectedAnswers = JSON.parse(params.selectedAnswersData as string);

  const correctCount = problemsData.reduce((count: number, problem: any) => {
    return count + (selectedAnswers[problem.id] === problem.answer ? 1 : 0);
  }, 0);
  const score = Math.round((correctCount / problemsData.length) * 100);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scoreAnim, {
        toValue: 1,
        tension: 15,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const toggleProblem = (problemId: number) => {
    setExpandedProblems({
      ...expandedProblems,
      [problemId]: !expandedProblems[problemId],
    });
  };

  const getScoreMessage = () => {
    if (score >= 90) return '완벽합니다';
    if (score >= 80) return '잘했습니다';
    if (score >= 70) return '좋습니다';
    if (score >= 60) return '괜찮습니다';
    return '다시 도전하세요';
  };

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme.statusBar} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Score Section */}
        <Animated.View
          style={[
            styles.scoreSection,
            {
              opacity: fadeAnim,
              transform: [
                {
                  scale: scoreAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.scoreLabel}>점수</Text>
          <Text style={styles.scoreValue}>{score}</Text>
          <Text style={styles.scoreMessage}>{getScoreMessage()}</Text>
          
          <View style={styles.scoreDetails}>
            <View style={styles.scoreDetail}>
              <Text style={styles.scoreDetailValue}>{correctCount}</Text>
              <Text style={styles.scoreDetailLabel}>정답</Text>
            </View>
            <View style={styles.scoreDivider} />
            <View style={styles.scoreDetail}>
              <Text style={[styles.scoreDetailValue, { color: theme.colors.error }]}>
                {problemsData.length - correctCount}
              </Text>
              <Text style={styles.scoreDetailLabel}>오답</Text>
            </View>
          </View>
        </Animated.View>

        {/* Problems Review */}
        <View style={styles.reviewSection}>
          <Text style={styles.reviewTitle}>문제 해설</Text>

          {problemsData.map((problem: any, index: number) => {
            const userAnswer = selectedAnswers[problem.id];
            const isCorrect = userAnswer === problem.answer;
            const isExpanded = expandedProblems[problem.id];

            return (
              <View key={problem.id} style={styles.reviewCard}>
                <TouchableOpacity
                  style={styles.reviewCardHeader}
                  onPress={() => toggleProblem(problem.id)}
                  activeOpacity={0.6}
                >
                  <View style={styles.reviewCardLeft}>
                    <Text style={styles.reviewCardNumber}>{index + 1}</Text>
                    <View style={[
                      styles.reviewCardBadge,
                      isCorrect ? styles.correctBadge : styles.incorrectBadge,
                    ]}>
                      <Text style={styles.reviewCardBadgeText}>
                        {isCorrect ? '정답' : '오답'}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.reviewCardExpand}>
                    {isExpanded ? '−' : '+'}
                  </Text>
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.reviewCardContent}>
                    <View style={styles.reviewCardSection}>
                      <Text style={styles.reviewCardSectionLabel}>문제</Text>
                      <Text style={styles.reviewCardText}>{problem.questionText}</Text>
                    </View>

                    <View style={styles.reviewCardSection}>
                      <Text style={styles.reviewCardSectionLabel}>내 답안</Text>
                      {userAnswer !== undefined && problem.options[userAnswer] ? (
                        <Text style={[
                          styles.reviewCardText,
                          !isCorrect && { color: theme.colors.error },
                        ]}>
                          ⑤ {problem.options[userAnswer].text}
                        </Text>
                      ) : (
                        <Text style={[styles.reviewCardText, { color: theme.colors.textTertiary }]}>
                          선택하지 않음
                        </Text>
                      )}
                    </View>

                    {!isCorrect && (
                      <View style={styles.reviewCardSection}>
                        <Text style={styles.reviewCardSectionLabel}>정답</Text>
                        {problem.options[problem.answer] ? (
                          <Text style={[
                            styles.reviewCardText,
                            { color: theme.colors.success },
                          ]}>
                            ⑤ {problem.options[problem.answer].text}
                          </Text>
                        ) : (
                          <Text style={styles.reviewCardText}>정답 정보 없음</Text>
                        )}
                      </View>
                    )}

                    <View style={[styles.reviewCardSection, styles.explanationSection]}>
                      <Text style={styles.reviewCardSectionLabel}>해설</Text>
                      {problem.options[problem.answer]?.explanation ? (
                        <Text style={styles.reviewCardText}>
                          {problem.options[problem.answer].explanation}
                        </Text>
                      ) : (
                        <Text style={styles.reviewCardText}>
                          이 문제는 {problem.category} 유형으로, 지문의 핵심 내용을 파악하고 
                          논리적으로 추론하는 능력을 평가합니다.
                        </Text>
                      )}
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/')}
          activeOpacity={0.6}
        >
          <Text style={styles.actionButtonText}>새로 시작</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 32,
    paddingTop: 48,
  },
  scoreSection: {
    alignItems: 'center',
    paddingVertical: 64,
    marginBottom: 48,
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 24,
  },
  scoreValue: {
    fontSize: 96,
    fontWeight: '300',
    color: theme.colors.text,
    letterSpacing: -4,
    marginBottom: 16,
    fontFamily: theme.fonts?.number || 'System',
  },
  scoreMessage: {
    fontSize: 20,
    fontWeight: '400',
    color: theme.colors.textSecondary,
    letterSpacing: 1,
    marginBottom: 40,
  },
  scoreDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  scoreDetail: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  scoreDetailValue: {
    fontSize: 32,
    fontWeight: '500',
    color: theme.colors.success,
    marginBottom: 8,
  },
  scoreDetailLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.colors.textSecondary,
    letterSpacing: 1,
  },
  scoreDivider: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.border,
  },
  reviewSection: {
    marginBottom: 48,
  },
  reviewTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 24,
    textAlign: 'center',
  },
  reviewCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    ...theme.shadows.small,
  },
  reviewCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  reviewCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  reviewCardNumber: {
    fontSize: 20,
    fontWeight: '500',
    color: theme.colors.text,
    fontFamily: theme.fonts?.number || 'System',
  },
  reviewCardBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  correctBadge: {
    backgroundColor: theme.colors.success + '20',
  },
  incorrectBadge: {
    backgroundColor: theme.colors.error + '20',
  },
  reviewCardBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text,
    letterSpacing: 0.5,
  },
  reviewCardExpand: {
    fontSize: 24,
    fontWeight: '300',
    color: theme.colors.textSecondary,
  },
  reviewCardContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: 24,
  },
  reviewCardSection: {
    marginBottom: 24,
  },
  reviewCardSectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  reviewCardText: {
    fontSize: 15,
    lineHeight: 24,
    color: theme.colors.text,
    fontWeight: '400',
    fontFamily: theme.fonts?.body || 'System',
  },
  explanationSection: {
    backgroundColor: theme.colors.badge,
    padding: 20,
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 0,
  },
  bottomSpacer: {
    height: 40,
  },
  actionContainer: {
    paddingHorizontal: 32,
    paddingVertical: 24,
    backgroundColor: theme.colors.background,
  },
  actionButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 20,
    borderRadius: 32,
    alignItems: 'center',
    ...theme.shadows.large,
  },
  actionButtonText: {
    color: theme.colors.background,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});