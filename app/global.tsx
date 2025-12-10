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
import { COUNTRIES, CountryCode, EXAM_SYSTEMS, getExamsByCountry } from '../constants/examSystems';
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function GlobalExamsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | null>(null);

  const styles = createStyles(theme);

  const filteredExams = selectedCountry 
    ? getExamsByCountry(selectedCountry)
    : EXAM_SYSTEMS;

  const handleExamPress = (examId: string) => {
    // 시험 ID에 따라 라우팅
    switch(examId) {
      case 'kr-suneung':
        router.push('/korea');
        break;
      case 'cn-gaokao':
        router.push('/china');
        break;
      case 'jp-kyotsu':
        router.push('/japan');
        break;
      case 'intl-toeic':
        router.push('/international/toeic');
        break;
      case 'intl-sat':
        router.push('/international/sat');
        break;
      default:
        alert('준비 중입니다!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme.statusBar} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>글로벌 시험 준비</Text>
          <Text style={styles.headerSubtitle}>AI 기반 학습 플랫폼</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {/* 설정 */}}
          activeOpacity={0.7}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Country Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>국가 선택</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.countryScroll}
          >
            {COUNTRIES.map((country) => {
              const isSelected = selectedCountry === country.code;
              return (
                <TouchableOpacity
                  key={country.code}
                  style={[
                    styles.countryCard,
                    isSelected && styles.countryCardSelected,
                    { borderColor: isSelected ? country.color : 'transparent' }
                  ]}
                  onPress={() => setSelectedCountry(isSelected ? null : country.code)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.countryFlag}>{country.flag}</Text>
                  <Text style={[styles.countryName, isSelected && styles.countryNameSelected]}>
                    {country.name.native}
                  </Text>
                  <Text style={styles.countryExamCount}>
                    {getExamsByCountry(country.code).length}개 시험
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
              {selectedCountry 
                ? COUNTRIES.find(c => c.code === selectedCountry)?.name.native + '의 시험'
                : '모든 시험'
              }
            </Text>
            {selectedCountry && (
              <TouchableOpacity
                onPress={() => setSelectedCountry(null)}
                activeOpacity={0.7}
              >
                <Text style={styles.clearFilter}>전체 보기</Text>
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
                <View style={styles.examHeader}>
                  <View style={[styles.examIconContainer, { backgroundColor: exam.color + '15' }]}>
                    <Text style={styles.examFlag}>{exam.flag}</Text>
                  </View>
                  <View style={styles.examHeaderText}>
                    <Text style={styles.examName}>{exam.name.native}</Text>
                    <Text style={styles.examDescription}>{exam.description.ko}</Text>
                  </View>
                </View>

                {/* Subjects */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.subjectsScroll}
                >
                  {exam.subjects.map((subject) => (
                    <View
                      key={subject.id}
                      style={[styles.subjectChip, { backgroundColor: subject.color + '15' }]}
                    >
                      <Text style={styles.subjectIcon}>{subject.icon}</Text>
                      <Text style={[styles.subjectName, { color: subject.color }]}>
                        {subject.name.native}
                      </Text>
                    </View>
                  ))}
                </ScrollView>

                {/* Stats */}
                {exam.stats && (
                  <View style={styles.examStats}>
                    <View style={styles.statItem}>
                      <Text style={styles.statIcon}>👥</Text>
                      <Text style={styles.statText}>
                        {(exam.stats.totalUsers! / 10000).toFixed(0)}만+
                      </Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <Text style={styles.statIcon}>📝</Text>
                      <Text style={styles.statText}>
                        {(exam.stats.totalProblems! / 1000).toFixed(0)}K+ 문제
                      </Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <Text style={styles.statIcon}>⚡</Text>
                      <Text style={styles.statText}>
                        {exam.features.length}개 기능
                      </Text>
                    </View>
                  </View>
                )}

                {/* Arrow */}
                <View style={styles.examArrow}>
                  <Text style={styles.arrowIcon}>→</Text>
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

const createStyles = (theme: any) => StyleSheet.create({
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: theme.fonts?.heading,
    color: theme.colors.text,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: theme.fonts?.title,
    color: theme.colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.small,
  },
  settingsIcon: {
    fontSize: 20,
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
  },
  clearFilter: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: theme.fonts?.body,
    color: theme.colors.primary,
  },
  countryScroll: {
    paddingHorizontal: 24,
    gap: 12,
  },
  countryCard: {
    width: 100,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    ...theme.shadows.small,
  },
  countryCardSelected: {
    backgroundColor: theme.colors.background,
    ...theme.shadows.medium,
  },
  countryFlag: {
    fontSize: 32,
    marginBottom: 8,
  },
  countryName: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: theme.fonts?.body,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  countryNameSelected: {
    color: theme.colors.text,
    fontWeight: '700',
  },
  countryExamCount: {
    fontSize: 11,
    fontFamily: theme.fonts?.body,
    color: theme.colors.textTertiary,
    fontWeight: '500',
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
  examHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  examIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  examFlag: {
    fontSize: 28,
  },
  examHeaderText: {
    flex: 1,
  },
  examName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 2,
  },
  examDescription: {
    fontSize: 13,
    fontFamily: theme.fonts?.body,
    color: theme.colors.textSecondary,
    fontWeight: '400',
  },
  subjectsScroll: {
    marginBottom: 16,
  },
  subjectChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginRight: 8,
  },
  subjectIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  subjectName: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: theme.fonts?.body,
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
  examArrow: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  arrowIcon: {
    fontSize: 20,
    color: theme.colors.textTertiary,
  },
  spacer: {
    height: 20,
  },
});