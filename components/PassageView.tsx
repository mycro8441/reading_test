import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Passage } from '../types/problem';
import { ParagraphRenderer } from './StyledTextRenderer';

interface PassageViewProps {
  passage: Passage;
  theme: any;
}

export const PassageView: React.FC<PassageViewProps> = ({ passage, theme }) => {
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {/* 제목 */}
      {passage.title && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{passage.title}</Text>
          {passage.author && (
            <Text style={styles.author}>{passage.author}</Text>
          )}
        </View>
      )}

      {/* 본문 */}
      <View style={styles.bodyContainer}>
        {passage.paragraphs.map((paragraph) => (
          <ParagraphRenderer
            key={paragraph.id}
            segments={paragraph.segments}
            annotation={paragraph.annotation}
            indent={paragraph.indent}
            baseStyle={styles.paragraphText}
            theme={theme}
          />
        ))}
      </View>

      {/* 출처 */}
      {passage.source && (
        <View style={styles.sourceContainer}>
          <Text style={styles.sourceText}>- {passage.source} -</Text>
        </View>
      )}

      {/* 각주 */}
      {passage.footnotes && Object.keys(passage.footnotes).length > 0 && (
        <View style={styles.footnotesContainer}>
          {Object.entries(passage.footnotes).map(([key, value]) => (
            <View key={key} style={styles.footnoteItem}>
              <Text style={styles.footnoteKey}>{key}</Text>
              <Text style={styles.footnoteValue}>{value}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    ...theme.shadows.medium,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text,
    fontFamily: theme.fonts?.title || 'System',
    marginBottom: 8,
    textAlign: 'center',
  },
  author: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts?.subText || 'System',
  },
  bodyContainer: {
    marginBottom: 16,
  },
  paragraphText: {
    fontSize: 16,
    lineHeight: 28,
    color: theme.colors.text,
    fontWeight: '400',
    fontFamily: theme.fonts?.body || 'System',

  },
  sourceContainer: {
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  sourceText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts?.subText || 'System',
    fontStyle: 'italic',
  },
  footnotesContainer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  footnoteItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 8,
  },
  footnoteKey: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary,
    fontFamily: theme.fonts?.number || 'System',
    marginRight: 8,
    minWidth: 20,
  },
  footnoteValue: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts?.body || 'System',
  },
});