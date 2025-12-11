import { useRouter } from 'expo-router';
import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface UnifiedHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  showSettings?: boolean;
  onBackPress?: () => void;
  theme: any;
}

export const UnifiedHeader: React.FC<UnifiedHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  showSettings = false,
  onBackPress,
  theme,
}) => {
  const router = useRouter();
  const styles = createStyles(theme);

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>{title}</Text>
            {subtitle && (
              <Text style={styles.headerSubtitle}>{subtitle}</Text>
            )}
          </View>

      </View>

      {/* Right Side - Settings or Back button */}
      <View style={styles.headerRight}>
        {showSettings && (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.push('/settings' as any)}
            activeOpacity={0.7}
          >
            <Text style={styles.headerButtonIcon}>⚙️</Text>
          </TouchableOpacity>
        )}
        {showBack && (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleBackPress}
            activeOpacity={0.7}
          >
            <View style={styles.closeIconContainer}>
              <View style={styles.closeIconLine1} />
              <View style={styles.closeIconLine2} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 16 : 24,
    paddingBottom: 24,
  },
  headerLeft: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  headerTitleContainer: {
    // 뒤로 버튼이 없을 때
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: theme.fonts?.heading,
    color: theme.colors.text,
    letterSpacing: -0.5,
  },
  headerTitleCenter: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: theme.fonts?.heading,
    color: theme.colors.text,
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: theme.fonts?.title,
    color: theme.colors.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.small,
  },
  headerButtonIcon: {
    fontSize: 20,
  },
  closeIconContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIconLine1: {
    position: 'absolute',
    width: 16,
    height: 2,
    backgroundColor: theme.colors.text,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
  },
  closeIconLine2: {
    position: 'absolute',
    width: 16,
    height: 2,
    backgroundColor: theme.colors.text,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }],
  },
});