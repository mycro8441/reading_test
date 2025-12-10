import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Option, Premise, Problem } from '../types/problem';
import { SegmentRenderer } from './StyledTextRenderer';

interface ProblemViewProps {
  problem: Problem;
  selectedAnswer?: number;
  onSelectAnswer: (index: number) => void;
  showAnswer?: boolean;
  theme: any;
}

export const ProblemView: React.FC<ProblemViewProps> = ({
  problem,
  selectedAnswer,
  onSelectAnswer,
  showAnswer = false,
  theme,
}) => {
  const styles = createStyles(theme);

  const renderPremise = (premise: Premise) => (
    <View style={styles.premiseContainer}>
      <View style={styles.premiseHeader}>
        <Text style={styles.premiseTitle}>
          {premise.title || '< 보 기 >'}
        </Text>
      </View>
      <View style={styles.premiseContent}>
        {premise.items ? (
          // 나열형 보기 (ㄱ, ㄴ, ㄷ)
          premise.items.map((item, index) => (
            <View key={index} style={styles.premiseItem}>
              <Text style={styles.premiseItemMarker}>
                {String.fromCharCode(0x3131 + index)}.
              </Text>
              <Text style={styles.premiseItemText}>{item}</Text>
            </View>
          ))
        ) : (
          // 일반 보기
          <SegmentRenderer
            segments={premise.segments}
            baseStyle={styles.premiseText}
            theme={theme}
          />
        )}
      </View>
    </View>
  );

  const renderOption = (option: Option, index: number) => {
    const isSelected = selectedAnswer === index;
    const isCorrect = showAnswer && problem.answer === index;
    const isWrong = showAnswer && selectedAnswer === index && problem.answer !== index;

    let borderColor = 'transparent';
    if (isWrong) borderColor = theme.colors.error;
    else if (isCorrect) borderColor = theme.colors.success;
    else if (isSelected) borderColor = theme.colors.primary;

    return (
      <TouchableOpacity
        key={option.id}
        style={[
          styles.optionButton,
          { borderColor },
          isSelected && !showAnswer && styles.optionButtonSelected,
          isCorrect && styles.optionButtonCorrect,
          isWrong && styles.optionButtonWrong,
        ]}
        onPress={() => !showAnswer && onSelectAnswer(index)}
        activeOpacity={showAnswer ? 1 : 0.6}
        disabled={showAnswer}
      >
        <View style={styles.optionContent}>
          {/* 선지 번호 */}
          <View
            style={[
              styles.optionCircle,
              isSelected && !showAnswer && styles.optionCircleSelected,
              isCorrect && styles.optionCircleCorrect,
              isWrong && styles.optionCircleWrong,
            ]}
          >
            <Text
              style={[
                styles.optionNumber,
                isSelected && !showAnswer && styles.optionNumberSelected,
                (isCorrect || isWrong) && styles.optionNumberHighlight,
              ]}
            >
              {index + 1}
            </Text>
          </View>

          {/* 선지 내용 */}
          <View style={styles.optionTextContainer}>
            <SegmentRenderer
              segments={option.segments}
              baseStyle={[
                styles.optionText,
                isSelected && !showAnswer && styles.optionTextSelected,
              ]}
              theme={theme}
            />
            
            {/* 해설 (정답 확인 모드일 때만) */}
            {showAnswer && option.explanation && (
              <View style={styles.explanationContainer}>
                <Text style={styles.explanationText}>{option.explanation}</Text>
              </View>
            )}
          </View>

          {/* 정답 표시 */}
          {showAnswer && isCorrect && (
            <View style={styles.correctBadge}>
              <Text style={styles.correctBadgeText}>✓</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {/* 문제 헤더 */}
      <View style={styles.problemHeader}>
        <Text style={styles.problemNumber}>문제 {problem.id}</Text>
        <View style={styles.badges}>
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{problem.category}</Text>
          </View>
          {problem.points && (
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsText}>{problem.points}점</Text>
            </View>
          )}
        </View>
      </View>

      {/* 문제 질문 */}
      <View style={styles.questionContainer}>
        <SegmentRenderer
          segments={problem.questionSegments}
          baseStyle={styles.questionText}
          theme={theme}
        />
      </View>

      {/* 보기 (있는 경우) */}
      {problem.premise && renderPremise(problem.premise)}

      {/* 선택지 */}
      <View style={styles.optionsContainer}>
        {problem.options.map((option, index) => renderOption(option, index))}
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      marginBottom: 48,
    },
    problemHeader: {
      alignItems: 'center',
      marginBottom: 32,
    },
    problemNumber: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.textTertiary,
      textTransform: 'uppercase',
      letterSpacing: 2,
      marginBottom: 12,
      fontFamily: theme.fonts?.number || 'System',
    },
    badges: {
      flexDirection: 'row',
      gap: 8,
    },
    typeBadge: {
      paddingVertical: 6,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.badge,
      borderRadius: 12,
    },
    typeText: {
      fontSize: 13,
      fontWeight: '500',
      color: theme.colors.badgeText,
      fontFamily: theme.fonts?.subText || 'System',
      letterSpacing: 0.5,
    },
    pointsBadge: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      justifyContent:"center",
      backgroundColor: theme.colors.primary + '20',
      borderRadius: 12,
    },
    pointsText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.primary,
      fontFamily: theme.fonts?.number || 'System',
    },
    questionContainer: {
      marginBottom: 24,
    },
    questionText: {
      fontSize: 20,
      fontWeight: '400',
      lineHeight: 32,
      color: theme.colors.text,
      textAlign: 'center',
      fontFamily: theme.fonts?.body || 'System',
    },
    premiseContainer: {
      marginBottom: 32,
      backgroundColor: theme.colors.background,
      borderRadius: 16,
      padding: 20,
      borderWidth: 1.5,
      borderColor: theme.colors.border,
    },
    premiseHeader: {
      alignItems: 'center',
      marginBottom: 16,
    },
    premiseTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.colors.text,
      fontFamily: theme.fonts?.title || 'System',
      letterSpacing: 2,
    },
    premiseContent: {
      gap: 12,
    },
    premiseText: {
      fontSize: 16,
      lineHeight: 26,
      color: theme.colors.text,
      fontFamily: theme.fonts?.body || 'System',
    },
    premiseItem: {
      flexDirection: 'row',
      paddingLeft: 8,
    },
    premiseItemMarker: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.colors.text,
      fontFamily: theme.fonts?.body || 'System',
      marginRight: 12,
      minWidth: 24,
    },
    premiseItemText: {
      flex: 1,
      fontSize: 15,
      lineHeight: 24,
      color: theme.colors.text,
      fontFamily: theme.fonts?.body || 'System',
    },
    optionsContainer: {
      gap: 16,
    },
    optionButton: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      padding: 20,
      borderWidth: 2,
      borderColor: 'transparent',
      ...theme.shadows.small,
    },
    optionButtonSelected: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.background,
    },
    optionButtonCorrect: {
      borderColor: theme.colors.success,
      backgroundColor: theme.colors.success + '10',
    },
    optionButtonWrong: {
      borderColor: theme.colors.error,
      backgroundColor: theme.colors.error + '10',
    },
    optionContent: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    optionCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
      flexShrink: 0,
    },
    optionCircleSelected: {
      backgroundColor: theme.colors.primary,
    },
    optionCircleCorrect: {
      backgroundColor: theme.colors.success,
    },
    optionCircleWrong: {
      backgroundColor: theme.colors.error,
    },
    optionNumber: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.textSecondary,
      fontFamily: theme.fonts?.number || 'System',
    },
    optionNumberSelected: {
      color: theme.colors.background,
    },
    optionNumberHighlight: {
      color: theme.colors.background,
    },
    optionTextContainer: {
      flex: 1,
    },
    optionText: {
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.textSecondary,
      fontWeight: '400',
      fontFamily: theme.fonts?.body || 'System',
    },
    optionTextSelected: {
      color: theme.colors.text,
      fontWeight: '500',
    },
    explanationContainer: {
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    explanationText: {
      fontSize: 14,
      lineHeight: 22,
      color: theme.colors.textSecondary,
      fontFamily: theme.fonts?.body || 'System',
      fontStyle: 'italic',
    },
    correctBadge: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.colors.success,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 12,
    },
    correctBadgeText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '700',
    },
  });