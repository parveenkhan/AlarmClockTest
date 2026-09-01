import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { NavigationController } from '../Navigation/NavigationService';
import { store } from '../Redux/Store/ConfigureStore';
import { configureAndroidChannel } from '../Redux/Services/Alarm.Service';

export function NotificationBridge() {
  useEffect(() => {
    configureAndroidChannel().catch(() => undefined);

    const received = Notifications.addNotificationReceivedListener((notification) => {
      const alarmId = notification.request.content.data?.alarmId;
      if (typeof alarmId === 'string') {
        NavigationController.navigate('AlarmRinging', { alarmId });
      }
    });

    const response = Notifications.addNotificationResponseReceivedListener((event) => {
      const alarmId = event.notification.request.content.data?.alarmId;
      if (typeof alarmId === 'string') {
        const exists = store.getState().alarms.items.some((item) => item.id === alarmId);
        if (exists) NavigationController.navigate('AlarmRinging', { alarmId });
      }
    });

    return () => {
      received.remove();
      response.remove();
    };
  }, []);

  return null;
}
