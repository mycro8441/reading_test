import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// 스플래시 화면 유지
SplashScreen.preventAutoHideAsync();

export function useCustomFonts() {
  const [fontsLoaded, fontError] = useFonts({
    'ADinaru': require('../assets/fonts/ADinaru.ttf'),           // 시험 제목용 (신명 디나루 역할)
    'AJungmyungjo': require('../assets/fonts/AJungMyungJo.ttf'),      // 문제 본문용 (신명 중명조 역할)
    'HYGyeonmyungjo': require('../assets/fonts/HYGyeonmyungjo.ttf'),   // 문항 번호, 쪽 번호용
    'ShinGraphic': require('../assets/fonts/ShinGraphic.ttf'),      // 섹션 제목용
    'TeGothic': require('../assets/fonts/TeGothic.otf'),      // 섹션 부제목용

  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
      console.log(fontError)
    }
  }, [fontsLoaded, fontError]);

  return fontsLoaded;
}