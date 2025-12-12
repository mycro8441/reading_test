import { UnifiedHeader } from '@/components/UnifiedHeader';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    DIFFICULTY_COLORS,
    DIFFICULTY_LABELS,
    EXAM_TYPE_LABELS,
    PAST_EXAMS,
} from '../constants/pastExams';
import { useTheme } from '../contexts/ThemeContext';
import { ExamType, ExamYear } from '../types/pastExam';

const { width } = Dimensions.get('window');

export default function PastExamsScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [selectedYear, setSelectedYear] = useState<ExamYear | null>(null);
  const [selectedType, setSelectedType] = useState<ExamType | null>(null);

  const styles = createStyles(theme);

  // 필터링된 시험 목록
  const filteredExams = PAST_EXAMS.filter((exam) => {
    if (selectedYear && exam.year !== selectedYear) return false;
    if (selectedType && exam.type !== selectedType) return false;
    return true;
  });

  // 연도 목록 (최신순)
  const years = Array.from(new Set(PAST_EXAMS.map((e) => e.year))).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  // 시험 유형
  const examTypes: ExamType[] = ['suneung', 'mock-9', 'mock-6'];

  const handleExamPress = (examId: string) => {
    // 기출문제 상세 화면으로 이동
    router.push({
      pathname: '/past-exam-detail',
      params: { examId },
    } as any);
  };

  const getDifficultyColor = (difficulty?: string) => {
    if (!difficulty) return theme.colors.textTertiary;
    return DIFFICULTY_COLORS[difficulty as keyof typeof DIFFICULTY_COLORS];
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme.statusBar} />

        <UnifiedHeader
              title='기출문제'
              subtitle='역대 수능 문제 풀이'
              showBack 
              theme={theme}        />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Year Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>연도</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            <TouchableOpacity
              style={[
                styles.filterChip,
                !selectedYear && styles.filterChipSelected,
              ]}
              onPress={() => setSelectedYear(null)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterChipText,
                  !selectedYear && styles.filterChipTextSelected,
                ]}
              >
                전체
              </Text>
            </TouchableOpacity>
            {years.map((year) => {
              const isSelected = selectedYear === year;
              return (
                <TouchableOpacity
                  key={year}
                  style={[
                    styles.filterChip,
                    isSelected && styles.filterChipSelected,
                  ]}
                  onPress={() => setSelectedYear(isSelected ? null : year)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      isSelected && styles.filterChipTextSelected,
                    ]}
                  >
                    {year}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Type Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>시험 유형</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            <TouchableOpacity
              style={[
                styles.filterChip,
                !selectedType && styles.filterChipSelected,
              ]}
              onPress={() => setSelectedType(null)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterChipText,
                  !selectedType && styles.filterChipTextSelected,
                ]}
              >
                전체
              </Text>
            </TouchableOpacity>
            {examTypes.map((type) => {
              const isSelected = selectedType === type;
              return (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.filterChip,
                    isSelected && styles.filterChipSelected,
                  ]}
                  onPress={() => setSelectedType(isSelected ? null : type)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      isSelected && styles.filterChipTextSelected,
                    ]}
                  >
                    {EXAM_TYPE_LABELS[type]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Exam List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {filteredExams.length}개의 시험
            </Text>
            {(selectedYear || selectedType) && (
              <TouchableOpacity
                onPress={() => {
                  setSelectedYear(null);
                  setSelectedType(null);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.clearFilter}>필터 초기화</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.examList}>
            {filteredExams.map((exam) => (
              <TouchableOpacity
                key={exam.id}
                style={styles.examCard}
                onPress={() => handleExamPress(exam.id)}
                activeOpacity={0.7}
              >
                {/* Exam Header */}
                <View style={styles.examCardHeader}>
                  <View style={styles.examCardLeft}>
                    <View style={styles.yearBadge}>
                      <Text style={styles.yearBadgeText}>{exam.year}</Text>
                    </View>
                    <View style={styles.typeBadge}>
                      <Text style={styles.typeBadgeText}>
                        {EXAM_TYPE_LABELS[exam.type]}
                      </Text>
                    </View>
                  </View>
                  {exam.difficulty && (
                    <View
                      style={[
                        styles.difficultyBadge,
                        {
                          backgroundColor:
                            getDifficultyColor(exam.difficulty) + '20',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.difficultyBadgeText,
                          { color: getDifficultyColor(exam.difficulty) },
                        ]}
                      >
                        {DIFFICULTY_LABELS[exam.difficulty]}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Exam Title */}
                <Text style={styles.examTitle}>{exam.title}</Text>
                <Text style={styles.examDate}>{exam.date}</Text>

                {/* Stats */}
                <View style={styles.examStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statIcon}>📝</Text>
                    <Text style={styles.statText}>
                      {exam.problemCount}문제
                    </Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statIcon}>⏱</Text>
                    <Text style={styles.statText}>{exam.timeLimit}분</Text>
                  </View>
                  {exam.averageScore && (
                    <>
                      <View style={styles.statDivider} />
                      <View style={styles.statItem}>
                        <Text style={styles.statIcon}>📊</Text>
                        <Text style={styles.statText}>
                          평균 {exam.averageScore}점
                        </Text>
                      </View>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

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
      fontSize: 24,
      fontWeight: '700',
      fontFamily: theme.fonts?.heading,
      color: theme.colors.text,
      letterSpacing: -0.5,
    },
    headerSubtitle: {
      fontSize: 13,
      fontFamily: theme.fonts?.body,
      color: theme.colors.textSecondary,
      marginTop: 2,
      fontWeight: '500',
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
      paddingHorizontal: 24,
      marginBottom: 16,
    },
    clearFilter: {
      fontSize: 14,
      fontWeight: '600',
      fontFamily: theme.fonts?.body,
      color: theme.colors.primary,
    },
    filterScroll: {
      paddingHorizontal: 24,
      gap: 10,
    },
    filterChip: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: 'transparent',
      ...theme.shadows.small,
    },
    filterChipSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    filterChipText: {
      fontSize: 14,
      fontWeight: '600',
      fontFamily: theme.fonts?.body,
      color: theme.colors.text,
    },
    filterChipTextSelected: {
      color: theme.colors.background,
    },
    examList: {
      paddingHorizontal: 24,
      gap: 16,
    },
    examCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      padding: 20,
      ...theme.shadows.medium,
      position: 'relative',
    },
    examCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    examCardLeft: {
      flexDirection: 'row',
      gap: 8,
    },
    yearBadge: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: theme.colors.primary + '20',
      borderRadius: 8,
    },
    yearBadgeText: {
      fontSize: 13,
      fontWeight: '700',
      fontFamily: theme.fonts?.number,
      color: theme.colors.primary,
    },
    typeBadge: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: theme.colors.badge,
      borderRadius: 8,
    },
    typeBadgeText: {
      fontSize: 13,
      fontWeight: '600',
      fontFamily: theme.fonts?.body,
      color: theme.colors.badgeText,
    },
    difficultyBadge: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
    },
    difficultyBadgeText: {
      fontSize: 12,
      fontWeight: '700',
      fontFamily: theme.fonts?.body,
    },
    examTitle: {
      fontSize: 18,
      fontWeight: '700',
      fontFamily: theme.fonts?.title,
      color: theme.colors.text,
      marginBottom: 6,
    },
    examDate: {
      fontSize: 13,
      fontFamily: theme.fonts?.body,
      color: theme.colors.textSecondary,
      marginBottom: 16,
    },
    examStats: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    statItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    statIcon: {
      fontSize: 14,
    },
    statText: {
      fontSize: 12,
      fontWeight: '600',
      fontFamily: theme.fonts?.body,
      color: theme.colors.textSecondary,
    },
    statDivider: {
      width: 1,
      height: 16,
      backgroundColor: theme.colors.border,
    },
    spacer: {
      height: 20,
    },
  });