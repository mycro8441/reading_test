import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { ThemeProvider } from '../contexts/ThemeContext';
import { useCustomFonts } from '../hooks/useCustomFonts';

export default function RootLayout() {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="learning" />
        <Stack.Screen name="result" />
      </Stack>
    </ThemeProvider>
  );
}
