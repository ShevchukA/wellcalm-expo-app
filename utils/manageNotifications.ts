import * as Notifications from 'expo-notifications';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Запрос разрешения на уведомления (для iOS и Android)
async function registerForPushNotifications() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

// Планируем однократное уведомление на заданное время
async function scheduleNotificationAt(date: Date): Promise<string> {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Reminder',
      body: 'Have you marked your habits today?',
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      year: date.getFullYear(),
      month: date.getMonth() + 1, // месяц от 1 до 12
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      repeats: false,
    },
  });
  return notificationId;
}

// Отмена уведомления по ID
async function cancelNotification(notificationId: string): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

export async function manageNotifications() {
  const permissionGranted = await registerForPushNotifications();
  if (!permissionGranted) {
    // Если разрешения нет, уведомления работать не будут
    return;
  }

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  // Сохраняем сегодняшнюю дату как дату последнего открытия
  await AsyncStorage.setItem('lastOpenedDate', todayStr);

  // Отменяем запланированное уведомление
  const existingId = await AsyncStorage.getItem('dailyNotificationId');
  if (existingId) {
    await cancelNotification(existingId);
  }

  // Планируем уведомление только на следующий день в 18:00
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(18, 0, 0, 0);

  const newId = await scheduleNotificationAt(tomorrow);
  await AsyncStorage.setItem('dailyNotificationId', newId);
}
