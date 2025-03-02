import { LaunchCounter } from '@/models/models';
import StoreReview from 'expo-store-review';
import { getAsyncStorageData } from '@/utils/getAsyncStorageData';
import { setAsyncStorageData } from '@/utils/setAsyncStorageData';

export const checkAndPromptReview = async (): Promise<void> => {
  // Получаем объект счётчика запусков
  const launchCountObject = await getAsyncStorageData<LaunchCounter>(
    'launchCount'
  );

  // При первом запуске приложения создаем счетчик
  if (launchCountObject === null) {
    const initialLaunchCounter: LaunchCounter = { count: 0 };
    await setAsyncStorageData<LaunchCounter>(
      'launchCount',
      initialLaunchCounter
    );
    return;
  }

  // Увеличиваем счётчик
  launchCountObject.count++;
  // Сохраняем обновлённое значение
  await setAsyncStorageData<LaunchCounter>('launchCount', launchCountObject);

  const isAvailableReview = await StoreReview.isAvailableAsync();

  // На пятом запуске запрашиваем оценку
  if (launchCountObject.count === 5 && isAvailableReview) {
    await StoreReview.requestReview();
  }
};
