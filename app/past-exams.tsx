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

// New data structure imports (from data/past-exams)
// Note: These imports assume the data structure exists in ../data/past-exams
// If not yet created, you'll need to create the index.ts file there first
import {
  ALL_PASSAGES,
  ALL_PROBLEMS,
  getAllYears,
  getAllCategories,
  type PassageInfo,
  type ProblemInfo,
} from '../data/past-exams';

// Old data import for backward compatibility (Tab 3)
import {
  DIFFICULTY_COLORS,
  DIFFICULTY_LABELS,
  EXAM_TYPE_LABELS,
  PAST_EXAMS,
} from '../constants/pastExams';

import { useTheme } from '../contexts/ThemeContext';
import { ExamType, ExamYear } from '../types/pastExam';

const { width } = Dimensions.get('window');

type TabType = 'passage' | 'problem' | 'exam';

export default function PastExamsScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  // Tab state
  const [activeTab, setActiveTab] = useState<TabType>('passage');

  // Common filters
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  // Exam-specific filters (Tab 3)
  const [selectedExamType, setSelectedExamType] = useState<ExamType | null>(null);

  const styles = createStyles(theme);

  // Get available years and categories from new data structure
  const availableYears = getAllYears ? getAllYears() : [];
  const availableCategories = getAllCategories ? getAllCategories() : [];

  // Filter passages (Tab 1)
  const filteredPassages = ALL_PASSAGES ? ALL_PASSAGES.filter((passage) => {
    if (selectedYear && passage.year !== selectedYear) return false;
    if (selectedCategory && passage.category !== selectedCategory) return false;
    if (selectedDifficulty && passage.difficulty !== selectedDifficulty) return false;
    return true;
  }) : [];

  // Filter problems (Tab 2)
  const filteredProblems = ALL_PROBLEMS ? ALL_PROBLEMS.filter((problem) => {
    if (selectedYear && problem.year !== selectedYear) return false;
    if (selectedCategory && problem.category !== selectedCategory) return false;
    if (selectedDifficulty && problem.difficulty !== selectedDifficulty) return false;
    return true;
  }) : [];

  // Filter exams (Tab 3)
  const filteredExams = PAST_EXAMS.filter((exam) => {
    if (selectedYear && exam.year !== selectedYear) return false;
    if (selectedExamType && exam.type !== selectedExamType) return false;
    return true;
  });

  // Get exam years (for Tab 3)
  const examYears = Array.from(new Set(PAST_EXAMS.map((e) => e.year))).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  const examTypes: ExamType[] = ['suneung', 'mock-9', 'mock-6'];
  const difficulties = ['easy', 'medium', 'hard'];

  // Handler for passage press (Tab 1)
  const handlePassagePress = (passage: PassageInfo) => {
    // Navigate to learning screen with passage session data
    router.push({
      pathname: '/learning',
      params: {
        session: JSON.stringify(passage.session),
        mode: 'passage',
        passageId: passage.id,
      },
    } as any);
  };

  // Handler for problem press (Tab 2)
  const handleProblemPress = (problem: ProblemInfo) => {
    // Find the passage that contains this problem
    const passage = ALL_PASSAGES?.find(p => p.id === problem.passageId);

    if (passage) {
      // Navigate to learning screen with passage data, focused on this problem
      router.push({
        pathname: '/learning',
        params: {
          session: JSON.stringify(passage.session),
          mode: 'problem',
          problemId: problem.id,
          passageId: passage.id,
        },
      } as any);
    }
  };

  // Handler for exam press (Tab 3 - existing behavior)
  const handleExamPress = (examId: string) => {
    router.push({
      pathname: '/past-exam-detail',
      params: { examId },
    } as any);
  };

  const clearFilters = () => {
    setSelectedYear(null);
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setSelectedExamType(null);
  };

  const hasActiveFilters = selectedYear || selectedCategory || selectedDifficulty || selectedExamType;

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
        theme={theme}
      />

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'passage' && styles.tabActive]}
          onPress={() => setActiveTab('passage')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'passage' && styles.tabTextActive]}>
            지문별
          </Text>
          {activeTab === 'passage' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'problem' && styles.tabActive]}
          onPress={() => setActiveTab('problem')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'problem' && styles.tabTextActive]}>
            문제별
          </Text>
          {activeTab === 'problem' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'exam' && styles.tabActive]}
          onPress={() => setActiveTab('exam')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'exam' && styles.tabTextActive]}>
            시험별
          </Text>
          {activeTab === 'exam' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      </View>

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
              style={[styles.filterChip, !selectedYear && styles.filterChipSelected]}
              onPress={() => setSelectedYear(null)}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterChipText, !selectedYear && styles.filterChipTextSelected]}>
                전체
              </Text>
            </TouchableOpacity>
            {(activeTab === 'exam' ? examYears : availableYears).map((year) => {
              const isSelected = selectedYear === year;
              return (
                <TouchableOpacity
                  key={year}
                  style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                  onPress={() => setSelectedYear(isSelected ? null : year)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.filterChipText, isSelected && styles.filterChipTextSelected]}>
                    {year}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Category/Type Filter */}
        {activeTab === 'exam' ? (
          // Exam Type Filter for Tab 3
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>시험 유형</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterScroll}
            >
              <TouchableOpacity
                style={[styles.filterChip, !selectedExamType && styles.filterChipSelected]}
                onPress={() => setSelectedExamType(null)}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterChipText, !selectedExamType && styles.filterChipTextSelected]}>
                  전체
                </Text>
              </TouchableOpacity>
              {examTypes.map((type) => {
                const isSelected = selectedExamType === type;
                return (
                  <TouchableOpacity
                    key={type}
                    style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                    onPress={() => setSelectedExamType(isSelected ? null : type)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.filterChipText, isSelected && styles.filterChipTextSelected]}>
                      {EXAM_TYPE_LABELS[type]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        ) : (
          // Category Filter for Tabs 1 & 2
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>영역</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterScroll}
            >
              <TouchableOpacity
                style={[styles.filterChip, !selectedCategory && styles.filterChipSelected]}
                onPress={() => setSelectedCategory(null)}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterChipText, !selectedCategory && styles.filterChipTextSelected]}>
                  전체
                </Text>
              </TouchableOpacity>
              {availableCategories.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <TouchableOpacity
                    key={category}
                    style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                    onPress={() => setSelectedCategory(isSelected ? null : category)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.filterChipText, isSelected && styles.filterChipTextSelected]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* Difficulty Filter (for Tabs 1 & 2) */}
        {activeTab !== 'exam' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>난이도</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterScroll}
            >
              <TouchableOpacity
                style={[styles.filterChip, !selectedDifficulty && styles.filterChipSelected]}
                onPress={() => setSelectedDifficulty(null)}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterChipText, !selectedDifficulty && styles.filterChipTextSelected]}>
                  전체
                </Text>
              </TouchableOpacity>
              {difficulties.map((difficulty) => {
                const isSelected = selectedDifficulty === difficulty;
                return (
                  <TouchableOpacity
                    key={difficulty}
                    style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                    onPress={() => setSelectedDifficulty(isSelected ? null : difficulty)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.filterChipText, isSelected && styles.filterChipTextSelected]}>
                      {DIFFICULTY_LABELS[difficulty as keyof typeof DIFFICULTY_LABELS]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* Content List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {activeTab === 'passage' && `${filteredPassages.length}개의 지문`}
              {activeTab === 'problem' && `${filteredProblems.length}개의 문제`}
              {activeTab === 'exam' && `${filteredExams.length}개의 시험`}
            </Text>
            {hasActiveFilters && (
              <TouchableOpacity onPress={clearFilters} activeOpacity={0.7}>
                <Text style={styles.clearFilter}>필터 초기화</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Tab 1: Passage View */}
          {activeTab === 'passage' && (
            <View style={styles.itemList}>
              {filteredPassages.map((passage) => (
                <TouchableOpacity
                  key={passage.id}
                  style={styles.itemCard}
                  onPress={() => handlePassagePress(passage)}
                  activeOpacity={0.7}
                >
                  <View style={styles.itemCardHeader}>
                    <View style={styles.itemCardLeft}>
                      <View style={styles.yearBadge}>
                        <Text style={styles.yearBadgeText}>{passage.year}</Text>
                      </View>
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryBadgeText}>{passage.category}</Text>
                      </View>
                    </View>
                    {passage.difficulty && (
                      <View
                        style={[
                          styles.difficultyBadge,
                          { backgroundColor: getDifficultyColor(passage.difficulty) + '20' },
                        ]}
                      >
                        <Text
                          style={[
                            styles.difficultyBadgeText,
                            { color: getDifficultyColor(passage.difficulty) },
                          ]}
                        >
                          {DIFFICULTY_LABELS[passage.difficulty as keyof typeof DIFFICULTY_LABELS]}
                        </Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.itemTitle}>{passage.title}</Text>
                  {passage.author && (
                    <Text style={styles.itemSubtitle}>{passage.author}</Text>
                  )}

                  <View style={styles.itemStats}>
                    <View style={styles.statItem}>
                      <Text style={styles.statIcon}>📝</Text>
                      <Text style={styles.statText}>{passage.problemCount}문제</Text>
                    </View>
                    {passage.source && (
                      <>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                          <Text style={styles.statIcon}>📚</Text>
                          <Text style={styles.statText}>{passage.source}</Text>
                        </View>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Tab 2: Problem View */}
          {activeTab === 'problem' && (
            <View style={styles.itemList}>
              {filteredProblems.map((problem) => (
                <TouchableOpacity
                  key={problem.id}
                  style={styles.itemCard}
                  onPress={() => handleProblemPress(problem)}
                  activeOpacity={0.7}
                >
                  <View style={styles.itemCardHeader}>
                    <View style={styles.itemCardLeft}>
                      <View style={styles.yearBadge}>
                        <Text style={styles.yearBadgeText}>{problem.year}</Text>
                      </View>
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryBadgeText}>{problem.category}</Text>
                      </View>
                      <View style={styles.problemNumberBadge}>
                        <Text style={styles.problemNumberBadgeText}>#{problem.number}</Text>
                      </View>
                    </View>
                    {problem.difficulty && (
                      <View
                        style={[
                          styles.difficultyBadge,
                          { backgroundColor: getDifficultyColor(problem.difficulty) + '20' },
                        ]}
                      >
                        <Text
                          style={[
                            styles.difficultyBadgeText,
                            { color: getDifficultyColor(problem.difficulty) },
                          ]}
                        >
                          {DIFFICULTY_LABELS[problem.difficulty as keyof typeof DIFFICULTY_LABELS]}
                        </Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.itemTitle}>{problem.title}</Text>
                  {problem.description && (
                    <Text style={styles.itemDescription}>{problem.description}</Text>
                  )}

                  <View style={styles.itemStats}>
                    <View style={styles.statItem}>
                      <Text style={styles.statIcon}>🎯</Text>
                      <Text style={styles.statText}>{problem.type}</Text>
                    </View>
                    {problem.points && (
                      <>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                          <Text style={styles.statIcon}>💎</Text>
                          <Text style={styles.statText}>{problem.points}점</Text>
                        </View>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Tab 3: Exam View (existing) */}
          {activeTab === 'exam' && (
            <View style={styles.itemList}>
              {filteredExams.map((exam) => (
                <TouchableOpacity
                  key={exam.id}
                  style={styles.itemCard}
                  onPress={() => handleExamPress(exam.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.itemCardHeader}>
                    <View style={styles.itemCardLeft}>
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
                          { backgroundColor: getDifficultyColor(exam.difficulty) + '20' },
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

                  <Text style={styles.itemTitle}>{exam.title}</Text>
                  <Text style={styles.itemDate}>{exam.date}</Text>

                  <View style={styles.itemStats}>
                    <View style={styles.statItem}>
                      <Text style={styles.statIcon}>📝</Text>
                      <Text style={styles.statText}>{exam.problemCount}문제</Text>
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
                          <Text style={styles.statText}>평균 {exam.averageScore}점</Text>
                        </View>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
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
    tabBar: {
      flexDirection: 'row',
      paddingHorizontal: 24,
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      position: 'relative',
    },
    tabActive: {
      // Active tab styling handled by indicator
    },
    tabText: {
      fontSize: 15,
      fontWeight: '600',
      fontFamily: theme.fonts?.body,
      color: theme.colors.textSecondary,
    },
    tabTextActive: {
      color: theme.colors.primary,
      fontWeight: '700',
    },
    tabIndicator: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 3,
      backgroundColor: theme.colors.primary,
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
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
    itemList: {
      paddingHorizontal: 24,
      gap: 16,
    },
    itemCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      padding: 20,
      ...theme.shadows.medium,
    },
    itemCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    itemCardLeft: {
      flexDirection: 'row',
      gap: 8,
      flexWrap: 'wrap',
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
    categoryBadge: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: theme.colors.badge,
      borderRadius: 8,
    },
    categoryBadgeText: {
      fontSize: 13,
      fontWeight: '600',
      fontFamily: theme.fonts?.body,
      color: theme.colors.badgeText,
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
    problemNumberBadge: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: theme.colors.accent + '20',
      borderRadius: 8,
    },
    problemNumberBadgeText: {
      fontSize: 13,
      fontWeight: '700',
      fontFamily: theme.fonts?.number,
      color: theme.colors.accent,
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
    itemTitle: {
      fontSize: 18,
      fontWeight: '700',
      fontFamily: theme.fonts?.title,
      color: theme.colors.text,
      marginBottom: 6,
    },
    itemSubtitle: {
      fontSize: 14,
      fontFamily: theme.fonts?.body,
      color: theme.colors.textSecondary,
      marginBottom: 12,
      fontWeight: '500',
    },
    itemDate: {
      fontSize: 13,
      fontFamily: theme.fonts?.body,
      color: theme.colors.textSecondary,
      marginBottom: 16,
    },
    itemDescription: {
      fontSize: 14,
      fontFamily: theme.fonts?.body,
      color: theme.colors.textSecondary,
      marginBottom: 12,
      lineHeight: 20,
    },
    itemStats: {
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
