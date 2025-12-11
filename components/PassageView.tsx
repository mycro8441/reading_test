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

      {/* 제목과 저자 (하단 우측) */}
      {(passage.title || passage.author) && (
        <View style={styles.metaContainer}>
          {passage.title && <Text style={styles.metaTitle}>- {passage.title}</Text>}
          {passage.author && <Text style={styles.metaAuthor}>{passage.author}</Text>}
        </View>
      )}

      {/* 출처 */}
      {passage.source && (
        <View style={styles.sourceContainer}>
          <Text style={styles.sourceText}>* {passage.source}</Text>
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
    padding: 10,
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    ...theme.shadows.medium,
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
  metaContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
    marginBottom: 16,
    paddingTop: 12,
  },
  metaTitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts?.body || 'System',
    fontWeight: '400',
    marginBottom: 2,
  },
  metaAuthor: {
    fontSize: 12,
    color: theme.colors.textTertiary,
    fontFamily: theme.fonts?.subText || 'System',
    fontWeight: '400',
  },
  sourceContainer: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  sourceText: {
    fontSize: 11,
    color: theme.colors.textTertiary,
    fontFamily: theme.fonts?.subText || 'System',
    fontWeight: '400',
  },
  footnotesContainer: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  footnoteItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 4,
  },
  footnoteKey: {
    fontSize: 11,
    fontWeight: '500',
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts?.number || 'System',
    marginRight: 6,
    minWidth: 16,
  },
  footnoteValue: {
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts?.body || 'System',
    fontWeight: '400',
  },
});