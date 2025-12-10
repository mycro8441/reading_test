import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, themeId, setTheme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('ko');

  const styles = createStyles(theme);

  const themes = [
    { id: 'vocabulary', name: '기본', icon: '📝', description: '베이지 & 미니멀' },
    { id: 'claudeLight', name: 'Claude Light', icon: '☀️', description: '밝고 깔끔한' },
    { id: 'claudeDark', name: 'Claude Dark', icon: '🌙', description: '어둡고 세련된' },
    { id: 'pyeonggawon', name: '평가원', icon: '🎓', description: '수능 공식 스타일' },
  ];

  const languages = [
    { code: 'ko', name: '한국어', native: '한국어', flag: '🇰🇷' },
    { code: 'en', name: '영어', native: 'English', flag: '🇺🇸', badge: '준비중' },
    { code: 'zh', name: '중국어', native: '中文', flag: '🇨🇳', badge: '준비중' },
    { code: 'ja', name: '일본어', native: '日本語', flag: '🇯🇵', badge: '준비중' },
  ];

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
        <Text style={styles.headerTitle}>설정</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Theme Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>테마</Text>
          <Text style={styles.sectionDescription}>
            앱의 전체적인 색상과 스타일을 변경할 수 있습니다
          </Text>

          <View style={styles.optionList}>
            {themes.map((themeOption) => {
              const isSelected = themeId === themeOption.id;
              return (
                <TouchableOpacity
                  key={themeOption.id}
                  style={[
                    styles.optionCard,
                    isSelected && styles.optionCardSelected,
                  ]}
                  onPress={() => setTheme(themeOption.id as any)}
                  activeOpacity={0.7}
                >
                  <View style={styles.optionLeft}>
                    <View style={[
                      styles.optionIconContainer,
                      isSelected && { backgroundColor: theme.colors.primary + '15' }
                    ]}>
                      <Text style={styles.optionIcon}>{themeOption.icon}</Text>
                    </View>
                    <View style={styles.optionText}>
                      <Text style={[
                        styles.optionTitle,
                        isSelected && styles.optionTitleSelected
                      ]}>
                        {themeOption.name}
                      </Text>
                      <Text style={styles.optionDescription}>
                        {themeOption.description}
                      </Text>
                    </View>
                  </View>
                  {isSelected && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkIcon}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Language Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>언어</Text>
          <Text style={styles.sectionDescription}>
            앱에서 사용할 언어를 선택하세요
          </Text>

          <View style={styles.optionList}>
            {languages.map((language) => {
              const isSelected = selectedLanguage === language.code;
              const isDisabled = !!language.badge;
              return (
                <TouchableOpacity
                  key={language.code}
                  style={[
                    styles.optionCard,
                    isSelected && styles.optionCardSelected,
                    isDisabled && styles.optionCardDisabled,
                  ]}
                  onPress={() => {
                    if (!isDisabled) {
                      setSelectedLanguage(language.code);
                    } else {
                      alert('준비 중입니다!');
                    }
                  }}
                  activeOpacity={0.7}
                  disabled={isDisabled}
                >
                  <View style={styles.optionLeft}>
                    <View style={[
                      styles.optionIconContainer,
                      isSelected && { backgroundColor: theme.colors.primary + '15' }
                    ]}>
                      <Text style={styles.optionIcon}>{language.flag}</Text>
                    </View>
                    <View style={styles.optionText}>
                      <View style={styles.languageTitleRow}>
                        <Text style={[
                          styles.optionTitle,
                          isSelected && styles.optionTitleSelected,
                          isDisabled && styles.optionTitleDisabled,
                        ]}>
                          {language.name}
                        </Text>
                        {language.badge && (
                          <View style={styles.badge}>
                            <Text style={styles.badgeText}>{language.badge}</Text>
                          </View>
                        )}
                      </View>
                      <Text style={[
                        styles.optionDescription,
                        isDisabled && styles.optionDescriptionDisabled,
                      ]}>
                        {language.native}
                      </Text>
                    </View>
                  </View>
                  {isSelected && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkIcon}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>정보</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>버전</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>개발자</Text>
              <Text style={styles.infoValue}>Minwoo</Text>
            </View>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: theme.fonts?.heading,
    color: theme.colors.text,
    letterSpacing: -0.3,
  },
  headerSpacer: {
    width: 44,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: 40,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: theme.fonts?.heading || theme.fonts?.title,
    color: theme.colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: theme.fonts?.body,
    color: theme.colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  
  // Option Cards
  optionList: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
    ...theme.shadows.small,
  },
  optionCardSelected: {
    borderColor: theme.colors.primary,
    ...theme.shadows.medium,
  },
  optionCardDisabled: {
    opacity: 0.5,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionIcon: {
    fontSize: 24,
  },
  optionText: {
    flex: 1,
  },
  languageTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  optionTitleSelected: {
    fontWeight: '700',
    color: theme.colors.primary,
  },
  optionTitleDisabled: {
    color: theme.colors.textSecondary,
  },
  optionDescription: {
    fontSize: 13,
    fontFamily: theme.fonts?.body,
    color: theme.colors.textSecondary,
  },
  optionDescriptionDisabled: {
    color: theme.colors.textTertiary,
  },
  badge: {
    backgroundColor: theme.colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: theme.fonts?.body,
    color: theme.colors.primary,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  checkmarkIcon: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // Info Card
  infoCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    ...theme.shadows.small,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 4,
  },
  infoLabel: {
    fontSize: 15,
    fontFamily: theme.fonts?.body,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    fontFamily: theme.fonts?.body,
    color: theme.colors.text,
    fontWeight: '600',
  },

  spacer: {
    height: 20,
  },
});