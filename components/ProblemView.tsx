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
        {/* 텍스트가 있으면 먼저 표시 */}
        {premise.text && premise.segments.length > 0 && (
          <SegmentRenderer
            segments={premise.segments}
            baseStyle={styles.premiseText}
            theme={theme}
          />
        )}
        
        {/* items가 있으면 그 다음에 표시 */}
        {premise.items && premise.items.length > 0 && (
          <>
            {premise.items.map((item, index) => (
              <View key={index} style={styles.premiseItem}>
                <Text style={styles.premiseItemMarker}>
                  {String.fromCharCode(0x3131 + index)}.
                </Text>
                <Text style={styles.premiseItemText}>{item}</Text>
              </View>
            ))}
          </>
        )}
      </View>
    </View>
  );

  const renderOption = (option: Option, index: number) => {
    const isSelected = selectedAnswer === index;
    const isCorrect = showAnswer && problem.answer === index;
    const isWrong = showAnswer && selectedAnswer === index && problem.answer !== index;

    return (
      <TouchableOpacity
        key={option.id}
        style={[
          styles.optionButton,
          isSelected && !showAnswer && styles.optionButtonSelected,
          isCorrect && styles.optionButtonCorrect,
          isWrong && styles.optionButtonWrong,
        ]}
        onPress={() => !showAnswer && onSelectAnswer(index)}
        activeOpacity={showAnswer ? 1 : 0.7}
        disabled={showAnswer}
      >
        <View style={styles.optionContent}>
          {/* 선지 번호 */}
          <Text style={[
            styles.optionNumber,
            isSelected && !showAnswer && styles.optionNumberSelected,
            isCorrect && styles.optionNumberCorrect,
            isWrong && styles.optionNumberWrong,
          ]}>
            {index + 1}
          </Text>

          {/* 선지 내용 */}
          <View style={styles.optionTextContainer}>
            <SegmentRenderer
              segments={option.segments}
              baseStyle={styles.optionText}
              theme={theme}
            />
            
            {/* 해설 */}
            {showAnswer && option.explanation && (
              <View style={styles.explanationContainer}>
                <Text style={styles.explanationLabel}>해설</Text>
                <Text style={styles.explanationText}>{option.explanation}</Text>
              </View>
            )}
          </View>

          {/* 정답 표시 */}
          {showAnswer && isCorrect && (
            <Text style={styles.correctMark}>✓</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* 문제 헤더 */}
      <View style={styles.problemHeader}>
        <View style={styles.problemMeta}>
          <Text style={styles.problemNumber}>{problem.id}</Text>
          <Text style={styles.categoryText}>{problem.category}</Text>
          {problem.points && (
            <Text style={styles.pointsText}>{problem.points}점</Text>
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

      {/* 보기 */}
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
      marginBottom: 56,
    },
    problemHeader: {
      marginBottom: 24,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border + '40',
    },
    problemMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    problemNumber: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.text,
      fontFamily: theme.fonts?.number || 'System',
    },
    categoryText: {
      fontSize: 14,
      color: theme.colors.textTertiary,
      fontFamily: theme.fonts?.body || 'System',
    },
    pointsText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.primary,
      fontFamily: theme.fonts?.number || 'System',
      marginLeft: 'auto',
    },
    questionContainer: {
      marginBottom: 28,
    },
    questionText: {
      fontSize: 18,
      fontWeight: '400',
      lineHeight: 30,
      color: theme.colors.text,
      fontFamily: theme.fonts?.body || 'System',
    },
    premiseContainer: {
      marginBottom: 28,
      paddingVertical: 20,
      paddingHorizontal: 24,
      backgroundColor: theme.colors.surface,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.border,
    },
    premiseHeader: {
      marginBottom: 16,
    },
    premiseTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.colors.text,
      fontFamily: theme.fonts?.title || 'System',
      letterSpacing: 1,
    },
    premiseContent: {
      gap: 14,
    },
    premiseText: {
      fontSize: 16,
      lineHeight: 26,
      color: theme.colors.text,
      fontFamily: theme.fonts?.body || 'System',
    },
    premiseItem: {
      flexDirection: 'row',
      paddingLeft: 4,
    },
    premiseItemMarker: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.colors.text,
      fontFamily: theme.fonts?.body || 'System',
      marginRight: 12,
      minWidth: 28,
    },
    premiseItemText: {
      flex: 1,
      fontSize: 15,
      lineHeight: 24,
      color: theme.colors.text,
      fontFamily: theme.fonts?.body || 'System',
    },
    optionsContainer: {
      gap: 12,
    },
    optionButton: {
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      paddingVertical: 18,
      paddingHorizontal: 20,
      borderWidth: 1.5,
      borderColor: theme.colors.border + '60',
    },
    optionButtonSelected: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary + '08',
    },
    optionButtonCorrect: {
      borderColor: theme.colors.success,
      backgroundColor: theme.colors.success + '08',
    },
    optionButtonWrong: {
      borderColor: theme.colors.error,
      backgroundColor: theme.colors.error + '08',
    },
    optionContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    optionNumber: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.textSecondary,
      fontFamily: theme.fonts?.number || 'System',
      minWidth: 20,
    },
    optionNumberSelected: {
      color: theme.colors.primary,
    },
    optionNumberCorrect: {
      color: theme.colors.success,
    },
    optionNumberWrong: {
      color: theme.colors.error,
    },
    optionTextContainer: {
      flex: 1,
    },
    optionText: {
      fontSize: 16,
      lineHeight: 26,
      color: theme.colors.text,
      fontFamily: theme.fonts?.body || 'System',
    },
    explanationContainer: {
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border + '40',
    },
    explanationLabel: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.textTertiary,
      fontFamily: theme.fonts?.body || 'System',
      marginBottom: 6,
    },
    explanationText: {
      fontSize: 14,
      lineHeight: 22,
      color: theme.colors.textSecondary,
      fontFamily: theme.fonts?.body || 'System',
    },
    correctMark: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.success,
      marginLeft: 8,
    },
  });