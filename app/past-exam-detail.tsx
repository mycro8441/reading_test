import { UnifiedHeader } from '@/components/UnifiedHeader';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CATEGORY_LABELS, PAST_EXAMS } from '../constants/pastExams';
import { useTheme } from '../contexts/ThemeContext';
import { ProblemCategory } from '../types/pastExam';

// 임시 문제 데이터 (실제로는 API에서 가져와야 함)
const MOCK_PROBLEMS = Array.from({ length: 45 }, (_, i) => ({
  number: i + 1,
  category: (['literature', 'reading', 'grammar', 'writing', 'classic'] as ProblemCategory[])[
    Math.floor(i / 9)
  ],
  points: i < 34 ? 2 : 3, // 1-34번: 2점, 35-45번: 3점
  correctRate: Math.floor(Math.random() * 40) + 40, // 40-80%
}));

export default function PastExamDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { theme } = useTheme();

  const examId = params.examId as string;
  const exam = PAST_EXAMS.find((e) => e.id === examId);

  const [selectedCategory, setSelectedCategory] = useState<ProblemCategory | null>(null);
  const [selectedProblems, setSelectedProblems] = useState<number[]>([]);

  const styles = createStyles(theme);

  if (!exam) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>시험을 찾을 수 없습니다</Text>
      </SafeAreaView>
    );
  }

  // 필터링된 문제
  const filteredProblems = MOCK_PROBLEMS.filter((problem) => {
    if (selectedCategory && problem.category !== selectedCategory) return false;
    return true;
  });

  // 카테고리별 문제 수
  const categoryCount = Object.fromEntries(
    Object.keys(CATEGORY_LABELS).map((cat) => [
      cat,
      MOCK_PROBLEMS.filter((p) => p.category === cat).length,
    ])
  );

  const handleProblemToggle = (problemNumber: number) => {
    if (selectedProblems.includes(problemNumber)) {
      setSelectedProblems(selectedProblems.filter((n) => n !== problemNumber));
    } else {
      setSelectedProblems([...selectedProblems, problemNumber]);
    }
  };

  const handleSelectAll = () => {
    if (selectedProblems.length === filteredProblems.length) {
      setSelectedProblems([]);
    } else {
      setSelectedProblems(filteredProblems.map((p) => p.number));
    }
  };

  const handleStart = () => {
    if (selectedProblems.length === 0) {
      alert('문제를 선택해주세요');
      return;
    }

    // 학습 화면으로 이동 (기출문제 모드)
    router.push({
      pathname: '/learning',
      params: {
        examId,
        problems: JSON.stringify(selectedProblems),
        mode: 'past-exam',
      },
    } as any);
  };

  const getCorrectRateColor = (rate: number) => {
    if (rate >= 70) return theme.colors.success;
    if (rate >= 50) return theme.colors.warning;
    return theme.colors.error;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme.statusBar} />

      {/* Header */}
              <UnifiedHeader
                    title={`${exam.year}학년도`}
                    subtitle={exam.title}
                    showBack 
                    theme={theme}        />


      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Exam Info */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>📝</Text>
              <Text style={styles.infoLabel}>문제 수</Text>
              <Text style={styles.infoValue}>{exam.problemCount}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>⏱</Text>
              <Text style={styles.infoLabel}>시간</Text>
              <Text style={styles.infoValue}>{exam.timeLimit}분</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>💯</Text>
              <Text style={styles.infoLabel}>배점</Text>
              <Text style={styles.infoValue}>{exam.totalPoints}점</Text>
            </View>
          </View>
        </View>

        {/* Category Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>영역 선택</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            <TouchableOpacity
              style={[
                styles.categoryChip,
                !selectedCategory && styles.categoryChipSelected,
              ]}
              onPress={() => setSelectedCategory(null)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  !selectedCategory && styles.categoryChipTextSelected,
                ]}
              >
                전체 ({MOCK_PROBLEMS.length})
              </Text>
            </TouchableOpacity>
            {(Object.keys(CATEGORY_LABELS) as ProblemCategory[]).map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = categoryCount[cat];
              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryChip,
                    isSelected && styles.categoryChipSelected,
                  ]}
                  onPress={() => setSelectedCategory(isSelected ? null : cat)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      isSelected && styles.categoryChipTextSelected,
                    ]}
                  >
                    {CATEGORY_LABELS[cat]} ({count})
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Problem Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              문제 선택 ({selectedProblems.length}/{filteredProblems.length})
            </Text>
            <TouchableOpacity onPress={handleSelectAll} activeOpacity={0.7}>
              <Text style={styles.selectAllText}>
                {selectedProblems.length === filteredProblems.length
                  ? '전체 해제'
                  : '전체 선택'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.problemGrid}>
            {filteredProblems.map((problem) => {
              const isSelected = selectedProblems.includes(problem.number);
              return (
                <TouchableOpacity
                  key={problem.number}
                  style={[
                    styles.problemCard,
                    isSelected && styles.problemCardSelected,
                  ]}
                  onPress={() => handleProblemToggle(problem.number)}
                  activeOpacity={0.7}
                >
                  <View style={styles.problemCardHeader}>
                    <Text
                      style={[
                        styles.problemNumber,
                        isSelected && styles.problemNumberSelected,
                      ]}
                    >
                      {problem.number}
                    </Text>
                    {isSelected && (
                      <View style={styles.problemCheckmark}>
                        <Text style={styles.checkmarkIcon}>✓</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.problemCategory}>
                    {CATEGORY_LABELS[problem.category]}
                  </Text>
                  <View style={styles.problemFooter}>
                    <Text style={styles.problemPoints}>{problem.points}점</Text>
                    <Text
                      style={[
                        styles.problemCorrectRate,
                        { color: getCorrectRateColor(problem.correctRate) },
                      ]}
                    >
                      {problem.correctRate}%
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      {/* Start Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.startButton,
            selectedProblems.length === 0 && styles.startButtonDisabled,
          ]}
          onPress={handleStart}
          disabled={selectedProblems.length === 0}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>
            {selectedProblems.length > 0
              ? `${selectedProblems.length}문제 시작하기`
              : '문제를 선택하세요'}
          </Text>
        </TouchableOpacity>
      </View>
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
      fontSize: 18,
      fontWeight: '700',
      fontFamily: theme.fonts?.heading,
      color: theme.colors.text,
      letterSpacing: -0.3,
    },
    headerSubtitle: {
      fontSize: 12,
      fontFamily: theme.fonts?.body,
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
    infoCard: {
      marginHorizontal: 24,
      marginBottom: 32,
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      padding: 20,
      ...theme.shadows.medium,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    infoItem: {
      alignItems: 'center',
      gap: 8,
    },
    infoIcon: {
      fontSize: 24,
    },
    infoLabel: {
      fontSize: 12,
      fontFamily: theme.fonts?.body,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    infoValue: {
      fontSize: 18,
      fontFamily: theme.fonts?.number,
      color: theme.colors.text,
      fontWeight: '700',
    },
    section: {
      marginBottom: 32,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: '700',
      fontFamily: theme.fonts?.heading || theme.fonts?.title,
      color: theme.colors.textTertiary,
      textTransform: 'uppercase',
      letterSpacing: 1.2,
      paddingHorizontal: 24,  // 이 줄 추가
      marginBottom: 16,       // 이 줄 추가
    },
    selectAllText: {
      fontSize: 14,
      fontWeight: '600',
      fontFamily: theme.fonts?.body,
      color: theme.colors.primary,
    },
    categoryScroll: {
      paddingHorizontal: 24,
      gap: 10,
    },
    categoryChip: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: 'transparent',
      ...theme.shadows.small,
    },
    categoryChipSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    categoryChipText: {
      fontSize: 13,
      fontWeight: '600',
      fontFamily: theme.fonts?.body,
      color: theme.colors.text,
    },
    categoryChipTextSelected: {
      color: theme.colors.background,
    },
    problemGrid: {
      paddingHorizontal: 24,
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    problemCard: {
      width: '22%',
      aspectRatio: 1,
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 12,
      borderWidth: 2,
      borderColor: 'transparent',
      justifyContent: 'space-between',
      ...theme.shadows.small,
    },
    problemCardSelected: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary + '15',
    },
    problemCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    problemNumber: {
      fontSize: 20,
      fontWeight: '700',
      fontFamily: theme.fonts?.number,
      color: theme.colors.text,
    },
    problemNumberSelected: {
      color: theme.colors.primary,
    },
    problemCheckmark: {
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkmarkIcon: {
      fontSize: 10,
      color: '#FFFFFF',
      fontWeight: '700',
    },
    problemCategory: {
      fontSize: 10,
      fontFamily: theme.fonts?.body,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    problemFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    problemPoints: {
      fontSize: 11,
      fontFamily: theme.fonts?.body,
      color: theme.colors.textSecondary,
      fontWeight: '600',
    },
    problemCorrectRate: {
      fontSize: 11,
      fontFamily: theme.fonts?.number,
      fontWeight: '700',
    },
    footer: {
      paddingHorizontal: 24,
      paddingVertical: 20,
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    startButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 18,
      borderRadius: 16,
      alignItems: 'center',
      ...theme.shadows.large,
    },
    startButtonDisabled: {
      opacity: 0.4,
    },
    startButtonText: {
      color: theme.colors.background,
      fontSize: 17,
      fontWeight: '700',
      letterSpacing: 0.3,
    },
    spacer: {
      height: 20,
    },
  });