import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, Vibration, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Colors } from '../../constants/Colors';
import { RootStackParamList } from '../../Navigation/types';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setRingingAlarm } from '../../Redux/slices/alarmsSlice';
import { getMission } from '../../constants/Missions';
import { formatTime } from '../../Utils/time';
import { NavigationController } from '../../NavigationController/NavigationController';

type Props = NativeStackScreenProps<RootStackParamList, 'AlarmRinging'>;

export default function AlarmRingingScreen({ route }: Props) {
  const alarm = useAppSelector((s) => s.alarms.items.find((a) => a.id === route.params.alarmId));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setRingingAlarm(route.params.alarmId));
    Vibration.vibrate([0, 800, 400, 800], true);
    return () => {
      Vibration.cancel();
      dispatch(setRingingAlarm(null));
    };
  }, [dispatch, route.params.alarmId]);

  if (!alarm) return null;
  const mission = getMission(alarm.missionId);

  return (
    <Screen>
      <View style={styles.body}>
        <Text style={styles.kicker}>{alarm.label.toUpperCase()}</Text>
        <Text style={styles.time}>{formatTime(alarm.hour, alarm.minute)}</Text>
        <Text style={styles.mission}>Complete {mission.title} to turn this off</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{mission.title}</Text>
          <Text style={styles.cardBody}>{mission.description}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <PrimaryButton
          title="Start mission"
          onPress={() => NavigationController.openMission(alarm.id, alarm.missionId)}
        />
        <Pressable style={styles.noSnooze}>
          <Text style={styles.noSnoozeText}>No snooze. Get up.</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  kicker: {
    letterSpacing: 1.6,
    color: Colors.textSecondary,
    fontWeight: '800',
    textAlign: 'center',
  },
  time: {
    marginTop: 8,
    fontSize: 64,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -2,
  },
  mission: {
    marginTop: 10,
    textAlign: 'center',
    color: Colors.textSecondary,
    fontSize: 16,
  },
  card: {
    marginTop: 28,
    backgroundColor: Colors.white,
    borderRadius: 22,
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  cardBody: {
    marginTop: 8,
    color: Colors.textSecondary,
    fontSize: 16,
  },
  footer: {
    padding: 20,
  },
  noSnooze: {
    marginTop: 14,
    alignItems: 'center',
  },
  noSnoozeText: {
    color: Colors.textSecondary,
    fontWeight: '700',
  },
});
