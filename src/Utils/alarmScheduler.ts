import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Alarm } from '../constants/Types';
import { daysForRepeat, formatTime } from './time';
import { getMission } from '../constants/Missions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function ensureNotificationPermission() {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted || current.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
    return true;
  }
  const requested = await Notifications.requestPermissionsAsync();
  return (
    requested.granted ||
    requested.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}

export async function configureAndroidChannel() {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync('alarms', {
    name: 'Alarms',
    importance: Notifications.AndroidImportance.MAX,
    sound: 'default',
    vibrationPattern: [0, 500, 250, 500],
    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    bypassDnd: true,
  });
}

function weekdayFromJs(day: number) {
  return day + 1;
}

export async function syncAlarmNotifications(alarms: Alarm[]) {
  await configureAndroidChannel();
  await Notifications.cancelAllScheduledNotificationsAsync();

  for (const alarm of alarms) {
    if (!alarm.enabled) continue;
    const mission = getMission(alarm.missionId);
    const days = daysForRepeat(alarm.repeat, alarm.days);

    const content = {
      title: `Wayk · ${formatTime(alarm.hour, alarm.minute)}`,
      body: `Complete ${mission.title} to turn this alarm off.`,
      sound: 'default' as const,
      data: { alarmId: alarm.id },
      interruptionLevel: 'timeSensitive' as const,
      ...(Platform.OS === 'android' ? { channelId: 'alarms' } : {}),
    };

    if (alarm.repeat === 'once' || days.length === 0) {
      const fire = new Date();
      fire.setHours(alarm.hour, alarm.minute, 0, 0);
      if (fire.getTime() <= Date.now()) {
        fire.setDate(fire.getDate() + 1);
      }
      await Notifications.scheduleNotificationAsync({
        content,
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: fire,
        },
      });
      continue;
    }

    for (const day of days) {
      await Notifications.scheduleNotificationAsync({
        content,
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
          weekday: weekdayFromJs(day),
          hour: alarm.hour,
          minute: alarm.minute,
          ...(Platform.OS === 'android' ? { channelId: 'alarms' } : {}),
        },
      });
    }
  }
}
