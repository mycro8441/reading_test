import { UnifiedHeader } from '@/components/UnifiedHeader';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  CATEGORY_LABELS,
  LEVEL_LABELS,
  VOCABULARY_DECKS,
} from '../constants/vocabularyData';
import { useTheme } from '../contexts/ThemeContext';
import { VocabularyCategory, VocabularyLevel } from '../types/vocabulary';

const { width } = Dimensions.get('window');

export default function VocabularyScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [selectedLevel, setSelectedLevel] = useState<VocabularyLevel | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<VocabularyCategory | null>(null);

  const styles = createStyles(theme);

  // 필터링된 덱
  const filteredDecks = VOCABULARY_DECKS.filter((deck) => {
    if (selectedLevel && deck.level !== selectedLevel) return false;
    if (selectedCategory && deck.category !== selectedCategory) return false;
    return true;
  });

  // 레벨별 그룹핑
  const levels: VocabularyLevel[] = ['suneung', 'advanced', 'intermediate', 'beginner'];
  const categories: VocabularyCategory[] = ['hanja', 'idiom', 'literature', 'grammar', 'proverb', 'pure'];

  const handleDeckPress = (deckId: string) => {
    router.push({
      pathname: '/vocabulary-study',
      params: { deckId },
    } as any);
  };

  const getLevelColor = (level: VocabularyLevel) => {
    switch (level) {
      case 'suneung':
        return '#E53935'; // 빨강
      case 'advanced':
        return '#FB8C00'; // 주황
      case 'intermediate':
        return '#43A047'; // 초록
      case 'beginner':
        return '#1E88E5'; // 파랑
      default:
        return theme.colors.primary;
    }
  };

  const getCategoryIcon = (category: VocabularyCategory) => {
    switch (category) {
      case 'hanja':
        return '📚';
      case 'pure':
        return '🌸';
      case 'idiom':
        return '💬';
      case 'proverb':
        return '📖';
      case 'grammar':
        return '✏️';
      case 'literature':
        return '🎭';
      default:
        return '📝';
    }
  };

  // 통계 (임시)
  const stats = {
    totalCards: 300,
    dueToday: 25,
    streak: 7,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme.statusBar} />

      <UnifiedHeader title="단어장" subtitle="Anki 스타일 학습" showBack theme={theme} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>📊</Text>
            <Text style={styles.statValue}>{stats.totalCards}</Text>
            <Text style={styles.statLabel}>총 단어</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>⏰</Text>
            <Text style={styles.statValue}>{stats.dueToday}</Text>
            <Text style={styles.statLabel}>오늘 복습</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statValue}>{stats.streak}일</Text>
            <Text style={styles.statLabel}>연속 학습</Text>
          </View>
        </View>

        {/* Level Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>난이도</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            <TouchableOpacity
              style={[styles.filterChip, !selectedLevel && styles.filterChipSelected]}
              onPress={() => setSelectedLevel(null)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterChipText,
                  !selectedLevel && styles.filterChipTextSelected,
                ]}
              >
                전체
              </Text>
            </TouchableOpacity>
            {levels.map((level) => {
              const isSelected = selectedLevel === level;
              return (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.filterChip,
                    isSelected && {
                      backgroundColor: getLevelColor(level),
                      borderColor: getLevelColor(level),
                    },
                  ]}
                  onPress={() => setSelectedLevel(isSelected ? null : level)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      isSelected && styles.filterChipTextSelected,
                    ]}
                  >
                    {LEVEL_LABELS[level]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Category Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>카테고리</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            <TouchableOpacity
              style={[
                styles.filterChip,
                !selectedCategory && styles.filterChipSelected,
              ]}
              onPress={() => setSelectedCategory(null)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterChipText,
                  !selectedCategory && styles.filterChipTextSelected,
                ]}
              >
                전체
              </Text>
            </TouchableOpacity>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.filterChip,
                    isSelected && styles.filterChipSelected,
                  ]}
                  onPress={() => setSelectedCategory(isSelected ? null : cat)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.filterChipIcon}>{getCategoryIcon(cat)}</Text>
                  <Text
                    style={[
                      styles.filterChipText,
                      isSelected && styles.filterChipTextSelected,
                    ]}
                  >
                    {CATEGORY_LABELS[cat]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Deck List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {filteredDecks.length}개의 덱
            </Text>
            {(selectedLevel || selectedCategory) && (
              <TouchableOpacity
                onPress={() => {
                  setSelectedLevel(null);
                  setSelectedCategory(null);
                }}
                
                activeOpacity={0.7}
              >
                <Text style={styles.clearFilter}>필터 초기화</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.deckList}>
            {filteredDecks.map((deck) => (
              <TouchableOpacity
                key={deck.id}
                style={styles.deckCard}
                onPress={() => handleDeckPress(deck.id)}
                activeOpacity={0.7}
              >
                {/* Deck Header */}
                <View style={styles.deckCardHeader}>
                  <View style={styles.deckIconContainer}>
                    <Text style={styles.deckIcon}>
                      {getCategoryIcon(deck.category)}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.levelBadge,
                      { backgroundColor: getLevelColor(deck.level) + '20' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.levelBadgeText,
                        { color: getLevelColor(deck.level) },
                      ]}
                    >
                      {LEVEL_LABELS[deck.level]}
                    </Text>
                  </View>
                </View>

                {/* Deck Info */}
                <Text style={styles.deckTitle}>{deck.title}</Text>
                <Text style={styles.deckDescription}>{deck.description}</Text>

                {/* Deck Stats */}
                <View style={styles.deckFooter}>
                  <View style={styles.deckStat}>
                    <Text style={styles.deckStatIcon}>📝</Text>
                    <Text style={styles.deckStatText}>{deck.cardCount}개 카드</Text>
                  </View>
                  <View style={styles.deckStat}>
                    <Text style={styles.deckStatIcon}>📂</Text>
                    <Text style={styles.deckStatText}>
                      {CATEGORY_LABELS[deck.category]}
                    </Text>
                  </View>
                </View>

                {/* Start Button */}
                <TouchableOpacity
                  style={[
                    styles.startButton,
                    { backgroundColor: getLevelColor(deck.level) },
                  ]}
                  onPress={() => handleDeckPress(deck.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.startButtonText}>학습 시작</Text>
                </TouchableOpacity>
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
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 40,
    },
    statsCard: {
      flexDirection: 'row',
      marginHorizontal: 24,
      marginBottom: 32,
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      padding: 20,
      ...theme.shadows.medium,
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
      gap: 6,
    },
    statIcon: {
      fontSize: 24,
    },
    statValue: {
      fontSize: 20,
      fontWeight: '700',
      fontFamily: theme.fonts?.number,
      color: theme.colors.text,
    },
    statLabel: {
      fontSize: 11,
      fontFamily: theme.fonts?.body,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    statDivider: {
      width: 1,
      backgroundColor: theme.colors.border,
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
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingVertical: 10,
      paddingHorizontal: 16,
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
    filterChipIcon: {
      fontSize: 16,
    },
    filterChipText: {
      fontSize: 13,
      fontWeight: '600',
      fontFamily: theme.fonts?.body,
      color: theme.colors.text,
    },
    filterChipTextSelected: {
      color: theme.colors.background,
    },
    deckList: {
      paddingHorizontal: 24,
      gap: 16,
    },
    deckCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      padding: 20,
      ...theme.shadows.medium,
    },
    deckCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    deckIconContainer: {
      width: 56,
      height: 56,
      borderRadius: 16,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deckIcon: {
      fontSize: 28,
    },
    levelBadge: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 12,
    },
    levelBadgeText: {
      fontSize: 12,
      fontWeight: '700',
      fontFamily: theme.fonts?.body,
    },
    deckTitle: {
      fontSize: 20,
      fontWeight: '700',
      fontFamily: theme.fonts?.title,
      color: theme.colors.text,
      marginBottom: 8,
    },
    deckDescription: {
      fontSize: 14,
      fontFamily: theme.fonts?.body,
      color: theme.colors.textSecondary,
      marginBottom: 16,
      lineHeight: 20,
    },
    deckFooter: {
      flexDirection: 'row',
      gap: 16,
      marginBottom: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    deckStat: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    deckStatIcon: {
      fontSize: 14,
    },
    deckStatText: {
      fontSize: 13,
      fontWeight: '600',
      fontFamily: theme.fonts?.body,
      color: theme.colors.textSecondary,
    },
    startButton: {
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: 'center',
    },
    startButtonText: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '700',
      fontFamily: theme.fonts?.body,
      letterSpacing: 0.5,
    },
    spacer: {
      height: 20,
    },
  });
