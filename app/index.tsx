import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { UnifiedHeader } from '../components/UnifiedHeader';
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { theme, themeId, setTheme } = useTheme();

  const styles = createStyles(theme);

  const mainFeatures = [
    {
      id: 'ai-practice',
      title: 'AI 문제 생성',
      description: '주제와 난이도를 선택해 맞춤 문제를 풀어보세요',
      icon: '🤖',
      color: '#667eea',
      route: '/topic-selection',
    },
    {
      id: 'past-exams',
      title: '기출문제',
      description: '역대 수능 기출문제',
      icon: '📝',
      color: '#f093fb',
      route: '/past-exams',
    },
    {
      id: 'vocabulary',
      title: '어휘 학습',
      description: '한자성어, 속담, 관용구',
      icon: '📚',
      color: '#4facfe',
      route: '/korea/vocabulary',
      badge: '준비중',
    },
    {
      id: 'morpheme',
      title: '형태소 분석',
      description: '문장 구조 분석',
      icon: '🔍',
      color: '#43e97b',
      route: '/korea/morpheme',
      badge: '준비중',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme.statusBar} />

      <UnifiedHeader
        title="수능 국어"
        subtitle="AI 기반 학습 플랫폼"
        showSettings={true}
        theme={theme}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>주요 기능</Text>
          
          <View style={styles.featureList}>
            {mainFeatures.map((feature) => (
              <TouchableOpacity
                key={feature.id}
                style={[
                  styles.featureCard,
                  feature.badge && styles.featureCardDisabled,
                ]}
                onPress={() => {
                  if (feature.badge) {
                    alert('준비 중입니다!');
                  } else {
                    router.push(feature.route as any);
                  }
                }}
                activeOpacity={0.7}
              >
                <View style={styles.featureHeader}>
                  <View style={[styles.featureIconContainer, { backgroundColor: feature.color + '15' }]}>
                    <Text style={styles.featureIcon}>{feature.icon}</Text>
                  </View>
                  <View style={styles.featureHeaderText}>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                  </View>
                </View>

                {feature.badge && (
                  <View style={styles.featureBadge}>
                    <Text style={styles.featureBadgeText}>{feature.badge}</Text>
                  </View>
                )}

                {!feature.badge && (
                  <View style={styles.featureArrow}>
                    <Text style={styles.arrowIcon}>→</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Global Exams Button */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>다른 시험</Text>
          
          <TouchableOpacity
            style={styles.globalButton}
            onPress={() => router.push('/global' as any)}
            activeOpacity={0.7}
          >
            <View style={styles.globalContent}>
              <View style={styles.globalLeft}>
                <View style={styles.globalIconContainer}>
                  <Text style={styles.globalIcon}>🌍</Text>
                </View>
                <View>
                  <Text style={styles.globalTitle}>글로벌 시험</Text>
                  <Text style={styles.globalSubtitle}>가오카오, 공통테스트, TOEIC, SAT</Text>
                </View>
              </View>
              <Text style={styles.globalArrow}>→</Text>
            </View>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
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
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  
  // Feature Cards
  featureList: {
    paddingHorizontal: 24,
    gap: 16,
  },
  featureCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 20,
    ...theme.shadows.medium,
    position: 'relative',
  },
  featureCardDisabled: {
    opacity: 0.7,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  featureIcon: {
    fontSize: 28,
  },
  featureHeaderText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 13,
    fontFamily: theme.fonts?.body,
    color: theme.colors.textSecondary,
    fontWeight: '400',
  },
  featureBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: theme.colors.textTertiary + '15',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  featureBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: theme.fonts?.body,
    color: theme.colors.textSecondary,
  },
  featureArrow: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  arrowIcon: {
    fontSize: 20,
    color: theme.colors.textTertiary,
  },

  // Global Button
  globalButton: {
    marginHorizontal: 24,
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    ...theme.shadows.medium,
  },
  globalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  globalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  globalIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#2196F3' + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  globalIcon: {
    fontSize: 28,
  },
  globalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 2,
  },
  globalSubtitle: {
    fontSize: 13,
    fontFamily: theme.fonts?.body,
    color: theme.colors.textSecondary,
    fontWeight: '400',
  },
  globalArrow: {
    fontSize: 20,
    color: theme.colors.textTertiary,
  },

  spacer: {
    height: 20,
  },
}); 