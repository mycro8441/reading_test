import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { UnifiedHeader } from '../components/UnifiedHeader';
import { useTheme } from '../contexts/ThemeContext';

const TOPICS = [
  { id: 'literature', name: '문학', subtitle: '소설, 시, 수필', icon: '📖', gradient: ['#FFE5E5', '#FFD6D6'] },
  { id: 'nonliterature', name: '비문학', subtitle: '설명문, 논설문', icon: '📰', gradient: ['#FFF4E5', '#FFE9CC'] },
  { id: 'classic', name: '고전', subtitle: '한문, 고전문학', icon: '📜', gradient: ['#F0E5FF', '#E5D6FF'] },
  { id: 'poetry', name: '현대시', subtitle: '시의 이해와 감상', icon: '✍️', gradient: ['#E5F4FF', '#D6ECFF'] },
];

const DIFFICULTIES = [
  { id: 'elementary', name: '초등', description: '기초 수준' },
  { id: 'middle', name: '중등', description: '중급 수준' },
  { id: 'high', name: '고등', description: '심화 수준' },
  { id: 'suneung', name: '수능', description: '최고 수준' },
];

const PROBLEM_COUNTS = [
  { value: 3, label: '3문제', time: '약 5분' },
  { value: 5, label: '5문제', time: '약 10분' },
  { value: 10, label: '10문제', time: '약 20분' },
];

export default function TopicSelectionScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [problemCount, setProblemCount] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    if (!selectedTopic || !selectedDifficulty) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push({
        pathname: '/learning',
        params: {
          topic: selectedTopic,
          difficulty: selectedDifficulty,
          problemCount: problemCount.toString(),
        },
      });
    }, 1200);
  };

  const styles = createStyles(theme);
  const canStart = selectedTopic && selectedDifficulty;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme.statusBar} />
      
      <UnifiedHeader
        title="국어 영역"
        subtitle="AI 맞춤 학습"
        theme={theme}
        showBack
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Topic Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>학습 주제</Text>
          <View style={styles.topicList}>
            {TOPICS.map((topic) => {
              const isSelected = selectedTopic === topic.id;
              return (
                <TouchableOpacity
                  key={topic.id}
                  style={[
                    styles.topicCard,
                    isSelected && styles.topicCardSelected,
                  ]}
                  onPress={() => setSelectedTopic(topic.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.topicCardLeft}>
                    <View style={[
                      styles.topicIconContainer,
                      { backgroundColor: isSelected ? topic.gradient[0] : theme.colors.surfaceSecondary }
                    ]}>
                      <Text style={styles.topicIcon}>{topic.icon}</Text>
                    </View>
                    <View style={styles.topicInfo}>
                      <Text style={[styles.topicName, isSelected && styles.topicNameSelected]}>
                        {topic.name}
                      </Text>
                      <Text style={styles.topicSubtitle}>{topic.subtitle}</Text>
                    </View>
                  </View>
                  {isSelected && (
                    <View style={styles.checkCircle}>
                      <Text style={styles.checkIcon}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Difficulty Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>난이도</Text>
          <View style={styles.pillsContainer}>
            {DIFFICULTIES.map((difficulty) => {
              const isSelected = selectedDifficulty === difficulty.id;
              return (
                <TouchableOpacity
                  key={difficulty.id}
                  style={[
                    styles.pill,
                    isSelected && styles.pillSelected,
                  ]}
                  onPress={() => setSelectedDifficulty(difficulty.id)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
                    {difficulty.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Problem Count */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>문제 수</Text>
          <View style={styles.countCards}>
            {PROBLEM_COUNTS.map((count) => {
              const isSelected = problemCount === count.value;
              return (
                <TouchableOpacity
                  key={count.value}
                  style={[
                    styles.countCard,
                    isSelected && styles.countCardSelected,
                  ]}
                  onPress={() => setProblemCount(count.value)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.countValue, isSelected && styles.countValueSelected]}>
                    {count.value}
                  </Text>
                  <Text style={styles.countTime}>{count.time}</Text>
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
            !canStart && styles.startButtonDisabled,
          ]}
          onPress={handleStart}
          disabled={!canStart || loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={theme.colors.background} size="small" />
          ) : (
            <View style={styles.startButtonContent}>
              <Text style={styles.startButtonText}>시작하기</Text>
              <Text style={styles.startButtonArrow}>→</Text>
            </View>
          )}
        </TouchableOpacity>
        {!canStart && (
          <Text style={styles.footerHint}>주제와 난이도를 선택해주세요</Text>
        )}
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
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  section: {
    marginBottom: 40,
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
  topicList: {
    gap: 12,
  },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    ...theme.shadows.small,
  },
  topicCardSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.background,
    ...theme.shadows.medium,
  },
  topicCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  topicIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  topicIcon: {
    fontSize: 28,
  },
  topicInfo: {
    flex: 1,
  },
  topicName: {
    fontSize: 17,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  topicNameSelected: {
    fontWeight: '700',
  },
  topicSubtitle: {
    fontSize: 13,
    fontFamily: theme.fonts?.body,
    color: theme.colors.textSecondary,
    fontWeight: '400',
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    color: theme.colors.background,
    fontSize: 14,
    fontWeight: '700',
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  pill: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'transparent',
    ...theme.shadows.small,
  },
  pillSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  pillText: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.text,
  },
  pillTextSelected: {
    color: theme.colors.background,
  },
  countCards: {
    flexDirection: 'row',
    gap: 12,
  },
  countCard: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    ...theme.shadows.small,
  },
  countCardSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.background,
  },
  countValue: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: theme.fonts?.number,
    color: theme.colors.text,
    marginBottom: 4,
  },
  countValueSelected: {
    color: theme.colors.primary,
  },
  countTime: {
    fontSize: 12,
    fontFamily: theme.fonts?.body,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  spacer: {
    height: 20,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  startButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.large,
  },
  startButtonDisabled: {
    opacity: 0.4,
  },
  startButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  startButtonText: {
    color: theme.colors.background,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  startButtonArrow: {
    color: theme.colors.background,
    fontSize: 20,
    fontWeight: '400',
  },
  footerHint: {
    textAlign: 'center',
    fontSize: 13,
    fontFamily: theme.fonts?.body,
    color: theme.colors.textTertiary,
    marginTop: 12,
    fontWeight: '500',
  },
});