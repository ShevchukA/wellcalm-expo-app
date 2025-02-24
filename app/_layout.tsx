import { SplashScreen, Stack } from 'expo-router';

import { checkAndPromptReview } from '@/utils/checkAndPromptReview';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { useStore } from '@/store/store';

// TODO
// локальные push-уведомления
// tooltip и tutorial-store
// ачивки

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Afacad-Bold': require('../assets/fonts/Afacad-Bold.ttf'),
    'Afacad-Medium': require('../assets/fonts/Afacad-Medium.ttf'),
    'Afacad-Regular': require('../assets/fonts/Afacad-Regular.ttf'),
    'Afacad-SemiBold': require('../assets/fonts/Afacad-SemiBold.ttf'),
    'Jost-Regular': require('../assets/fonts/Jost-Regular.ttf'),
    'Jost-SemiBold': require('../assets/fonts/Jost-SemiBold.ttf'),
  });

  const loadHabitsFromAsyncStore = useStore(
    (state) => state.loadHabitsFromAsyncStore
  );

  useEffect(() => {
    loadHabitsFromAsyncStore();
    checkAndPromptReview();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='habits' options={{ headerShown: false }} />
      <Stack.Screen name='month' options={{ headerShown: false }} />
    </Stack>
  );
}
