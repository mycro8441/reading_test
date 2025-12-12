import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { VOCABULARY_DECKS } from '../constants/vocabularyData';
import { useTheme } from '../contexts/ThemeContext';
import { VocabularyCard } from '../types/vocabulary';

const { width, height } = Dimensions.get('window');

export default function VocabularyStudyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { theme } = useTheme();

  const deckId = params.deckId as string;
  const deck = VOCABULARY_DECKS.find((d) => d.id === deckId);

  // 세트 관리
  const [currentSet, setCurrentSet] = useState<VocabularyCard[]>([]);
  const [nextSet, setNextSet] = useState<VocabularyCard[]>([]);
  const [masteredCards, setMasteredCards] = useState<string[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [setNumber, setSetNumber] = useState(1);

  // 애니메이션
  const [isFlipped, setIsFlipped] = useState(false);
  const [wordSlideAnim] = useState(new Animated.Value(0));
  const [meaningFadeAnim] = useState(new Animated.Value(0));

  const styles = createStyles(theme);

  // 초기 세트 설정
  useEffect(() => {
    if (deck) {
      setCurrentSet(deck.cards);
    }
  }, [deck]);

  if (!deck) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>덱을 찾을 수 없습니다</Text>
      </SafeAreaView>
    );
  }

  if (currentSet.length === 0 && nextSet.length === 0) {
    // 모든 카드 마스터 완료
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={theme.statusBar} />
        <View style={styles.completionContainer}>
          <Text style={styles.completionIcon}>🎉</Text>
          <Text style={styles.completionTitle}>학습 완료!</Text>
          <Text style={styles.completionText}>
            총 {masteredCards.length}개의 단어를 마스터했습니다.
          </Text>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => router.back()}
          >
            <Text style={styles.homeButtonText}>돌아가기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentCard = currentSet[currentCardIndex];
  const progress = ((currentCardIndex + 1) / currentSet.length) * 100;

  // 뜻 공개
  const handleShowMeaning = () => {
    Animated.parallel([
      Animated.timing(wordSlideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(meaningFadeAnim, {
        toValue: 1,
        duration: 400,
        delay: 150,
        useNativeDriver: true,
      }),
    ]).start();
    setIsFlipped(true);
  };

  // 배열 섞기 함수
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 알고 있음 (마스터)
  const handleKnowIt = () => {
    setMasteredCards([...masteredCards, currentCard.id]);
    moveToNextCard(false);
  };

  // 다음으로 (다음 세트로)
  const handleMoveToNext = () => {
    moveToNextCard(true);
  };

  // 다음 카드로 이동
  const moveToNextCard = (addToNextSet: boolean) => {
    // 애니메이션 리셋
    setIsFlipped(false);
    wordSlideAnim.setValue(0);
    meaningFadeAnim.setValue(0);

    if (currentCardIndex < currentSet.length - 1) {
      // 현재 세트에 다음 카드가 있음
      if (addToNextSet) {
        setNextSet([...nextSet, currentCard]);
      }
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // 현재 세트의 마지막 카드
      const updatedNextSet = addToNextSet ? [...nextSet, currentCard] : nextSet;

      if (updatedNextSet.length > 0) {
        // 다음 세트로 이동 (랜덤 섞기)
        setCurrentSet(shuffleArray(updatedNextSet));
        setNextSet([]);
        setCurrentCardIndex(0);
        setSetNumber(setNumber + 1);
      } else {
        // 모든 세트 완료
        setCurrentSet([]);
      }
    }
  };

  // 단어 슬라이드 애니메이션
  const wordTranslateY = wordSlideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -80],
  });

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
          <Text style={styles.headerTitle}>{deck.title}</Text>
          <Text style={styles.headerSubtitle}>세트 {setNumber}</Text>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statText}>
            {currentCardIndex + 1} / {currentSet.length}
          </Text>
          <Text style={styles.statText}>마스터: {masteredCards.length}개</Text>
        </View>
      </View>

      {/* Card */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={isFlipped ? undefined : handleShowMeaning}
          style={styles.cardTouchable}
        >
          <View style={styles.card}>
            {/* 단어 */}
            <Animated.View
              style={[
                styles.wordSection,
                {
                  transform: [{ translateY: wordTranslateY }],
                },
              ]}
            >
              <Text style={styles.cardLabel}>단어</Text>
              <Text style={styles.cardWord}>{currentCard.word}</Text>

              {currentCard.hanja && (
                <Text style={styles.cardHanja}>{currentCard.hanja}</Text>
              )}

              {currentCard.pronunciation && (
                <Text style={styles.cardPronunciation}>
                  [{currentCard.pronunciation}]
                </Text>
              )}
            </Animated.View>

            {/* 뜻 */}
            <Animated.View
              style={[
                styles.meaningSection,
                {
                  opacity: meaningFadeAnim,
                },
              ]}
              pointerEvents={isFlipped ? 'auto' : 'none'}
            >
              <View style={styles.meaningDivider} />
              <Text style={styles.cardLabel}>뜻</Text>
              <Text style={styles.cardMeaning}>{currentCard.meaning}</Text>

              {currentCard.examples && currentCard.examples.length > 0 && (
                <View style={styles.examplesContainer}>
                  <Text style={styles.examplesTitle}>예문</Text>
                  <Text style={styles.exampleText}>{currentCard.examples[0]}</Text>
                </View>
              )}
            </Animated.View>

            {!isFlipped && (
              <Text style={styles.tapHint}>탭하여 뜻 보기</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        {!isFlipped ? (
          <>
            <TouchableOpacity
              style={[styles.actionButton, styles.knowButton]}
              onPress={handleKnowIt}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>✓ 알고 있음</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.showButton]}
              onPress={handleShowMeaning}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>뜻 공개</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[styles.actionButton, styles.nextButton]}
            onPress={handleMoveToNext}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>다음으로 →</Text>
          </TouchableOpacity>
        )}
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
      paddingVertical: 16,
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
    },
    headerSubtitle: {
      fontSize: 13,
      fontFamily: theme.fonts?.body,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    headerSpacer: {
      width: 44,
    },
    progressContainer: {
      paddingHorizontal: 24,
      marginBottom: 24,
    },
    progressBar: {
      height: 4,
      backgroundColor: theme.colors.border,
      borderRadius: 2,
      overflow: 'hidden',
      marginBottom: 12,
    },
    progressFill: {
      height: '100%',
      backgroundColor: theme.colors.primary,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    statText: {
      fontSize: 12,
      fontFamily: theme.fonts?.body,
      color: theme.colors.textSecondary,
    },
    cardContainer: {
      flex: 1,
      paddingHorizontal: 24,
      justifyContent: 'center',
      paddingBottom: 100,
    },
    cardTouchable: {
      height: height * 0.5,
    },
    card: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      borderRadius: 24,
      padding: 32,
      ...theme.shadows.large,
      justifyContent: 'center',
      alignItems: 'center',
    },
    wordSection: {
      alignItems: 'center',
      width: '100%',
    },
    cardLabel: {
      fontSize: 12,
      fontWeight: '600',
      fontFamily: theme.fonts?.body,
      color: theme.colors.textTertiary,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 16,
    },
    cardWord: {
      fontSize: 48,
      fontWeight: '700',
      fontFamily: theme.fonts?.title,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 12,
    },
    cardHanja: {
      fontSize: 32,
      fontFamily: theme.fonts?.body,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: 8,
    },
    cardPronunciation: {
      fontSize: 16,
      fontFamily: theme.fonts?.body,
      color: theme.colors.textTertiary,
      textAlign: 'center',
    },
    meaningSection: {
      position: 'absolute',
      top: '50%',
      left: 32,
      right: 32,
      bottom: 32,
      alignItems: 'center',
    },
    meaningDivider: {
      width: 60,
      height: 2,
      backgroundColor: theme.colors.border,
      marginBottom: 24,
    },
    cardMeaning: {
      fontSize: 24,
      fontWeight: '600',
      fontFamily: theme.fonts?.title,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 16,
      lineHeight: 36,
    },
    examplesContainer: {
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    examplesTitle: {
      fontSize: 12,
      fontWeight: '600',
      fontFamily: theme.fonts?.body,
      color: theme.colors.textTertiary,
      marginBottom: 8,
      textAlign: 'center',
    },
    exampleText: {
      fontSize: 14,
      fontFamily: theme.fonts?.body,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
    tapHint: {
      position: 'absolute',
      bottom: 20,
      alignSelf: 'center',
      fontSize: 12,
      fontFamily: theme.fonts?.body,
      color: theme.colors.textTertiary,
      opacity: 0.6,
    },
    buttonsContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 24,
      paddingBottom: 24,
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      gap: 12,
    },
    actionButton: {
      flex: 1,
      paddingVertical: 18,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.medium,
    },
    knowButton: {
      backgroundColor: '#43A047',
    },
    showButton: {
      backgroundColor: theme.colors.primary,
    },
    nextButton: {
      backgroundColor: theme.colors.primary,
    },
    actionButtonText: {
      fontSize: 16,
      fontWeight: '700',
      fontFamily: theme.fonts?.body,
      color: '#FFFFFF',
      letterSpacing: 0.5,
    },
    completionContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 32,
    },
    completionIcon: {
      fontSize: 80,
      marginBottom: 24,
    },
    completionTitle: {
      fontSize: 28,
      fontWeight: '700',
      fontFamily: theme.fonts?.heading,
      color: theme.colors.text,
      marginBottom: 12,
    },
    completionText: {
      fontSize: 16,
      fontFamily: theme.fonts?.body,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: 40,
    },
    homeButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 16,
      paddingHorizontal: 48,
      borderRadius: 24,
    },
    homeButtonText: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: theme.fonts?.body,
      color: '#FFFFFF',
    },
  });
