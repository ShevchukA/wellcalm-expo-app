import { SplashScreen, Stack } from 'expo-router';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { checkAndPromptReview } from '@/utils/checkAndPromptReview';
import { manageNotifications } from '@/utils/manageNotifications';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { useStore } from '@/store/store';
import { useTutorStore } from '@/store/tutorStore';

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

  const loadTutorialFromAsyncStore = useTutorStore(
    (state) => state.loadTutorialFromAsyncStore
  );

  useEffect(() => {
    loadHabitsFromAsyncStore();
    loadTutorialFromAsyncStore();
    checkAndPromptReview();
    manageNotifications();
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
    <GestureHandlerRootView>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='habits' options={{ headerShown: false }} />
        <Stack.Screen name='month' options={{ headerShown: false }} />
        <Stack.Screen name='year' options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
