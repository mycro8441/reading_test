import React from 'react';
import { TextStyle as RNTextStyle, StyleSheet, Text, View } from 'react-native';
import { TextSegment } from '../types/problem';

interface SegmentRendererProps {
  segments: TextSegment[];
  baseStyle?: RNTextStyle;
  theme: any;
}

export const SegmentRenderer: React.FC<SegmentRendererProps> = ({
  segments,
  baseStyle,
  theme,
}) => {
  // segments가 없으면 빈 텍스트 반환
  if (!segments || segments.length === 0) {
    console.warn('SegmentRenderer: segments가 비어있습니다');
    return <Text style={baseStyle}>(텍스트 없음)</Text>;
  }

  const renderSegment = (segment: TextSegment, index: number) => {
    const textStyles: RNTextStyle[] = [baseStyle || {}];
    const containerStyles: any[] = [];
    let needsContainer = false;

    // 텍스트 스타일 적용
    if (segment.bold) {
      textStyles.push({ fontWeight: '700' });
    }
    
    if (segment.underline) {
      textStyles.push({
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
      });
    }

    // 컨테이너가 필요한 스타일
    if (segment.box) {
      needsContainer = true;
      containerStyles.push({
        borderWidth: 1.5,
        borderColor: theme.colors.text,
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginHorizontal: 2,
      });
    }

    if (segment.highlight) {
      needsContainer = true;
      containerStyles.push({
        backgroundColor: theme.colors.highlight || '#FFF9C4',
        paddingHorizontal: 4,
        paddingVertical: 2,
        marginHorizontal: 2,
        borderRadius: 3,
      });
    }

    const textElement = (
      <Text key={`text-${index}`} style={textStyles}>
        {segment.text}
      </Text>
    );

    if (needsContainer) {
      return (
        <View key={`container-${index}`} style={[{ flexDirection: 'row', alignItems: 'center' }, ...containerStyles]}>
          {textElement}
        </View>
      );
    }

    return textElement;
  };

  return (
    <Text style={baseStyle}>
      {segments.map((segment, index) => renderSegment(segment, index))}
    </Text>
  );
};

interface ParagraphRendererProps {
  segments: TextSegment[];
  annotation?: string;
  indent?: number;
  baseStyle?: RNTextStyle;
  theme: any;
}

export const ParagraphRenderer: React.FC<ParagraphRendererProps> = ({
  segments,
  annotation,
  indent = 0,
  baseStyle,
  theme,
}) => {
  const styles = createParagraphStyles(theme);

  // segments 검증
  if (!segments || segments.length === 0) {
    console.error('ParagraphRenderer: segments가 없습니다');
    return (
      <View style={styles.paragraphContainer}>
        <Text style={[baseStyle, { color: 'red' }]}>
          ⚠️ 문단 오류: segments 없음
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.paragraphContainer}>
      {annotation && (
        <View style={styles.annotationContainer}>
          <Text style={styles.annotationText}>{annotation}</Text>
        </View>
      )}
      <View style={[styles.contentContainer, { marginLeft: indent * 20 }]}>
        <SegmentRenderer segments={segments} baseStyle={baseStyle} theme={theme} />
      </View>
    </View>
  );
};

const createParagraphStyles = (theme: any) => StyleSheet.create({
  paragraphContainer: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  annotationContainer: {
    width: 32,
    paddingTop: 2,
  },
  annotationText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
    fontFamily: theme.fonts?.number || 'System',
  },
  contentContainer: {
    flex: 1,
  },
});