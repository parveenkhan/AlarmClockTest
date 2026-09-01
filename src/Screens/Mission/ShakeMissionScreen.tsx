import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { Colors } from '../../constants/Colors';
import { RootStackParamList } from '../../Navigation/types';
import { NavigationController } from '../../NavigationController/NavigationController';

type Props = NativeStackScreenProps<RootStackParamList, 'ShakeMission'>;

export default function ShakeMissionScreen({ route }: Props) {
  const [count, setCount] = useState(0);
  const last = useRef(0);
  const goal = 30;

  useEffect(() => {
    Accelerometer.setUpdateInterval(120);
    const sub = Accelerometer.addListener(({ x, y, z }) => {
      const mag = Math.sqrt(x * x + y * y + z * z);
      const now = Date.now();
      if (mag > 1.8 && now - last.current > 280) {
        last.current = now;
        setCount((c) => c + 1);
      }
    });
    return () => sub.remove();
  }, []);

  useEffect(() => {
    if (count >= goal) {
      NavigationController.replace('MissionSuccess', { alarmId: route.params.alarmId });
    }
  }, [count, goal, route.params.alarmId]);

  return (
    <Screen>
      <View style={styles.body}>
        <Text style={styles.title}>Shake your phone</Text>
        <Text style={styles.count}>{count}</Text>
        <Text style={styles.goal}>/ {goal}</Text>
        <Text style={styles.hint}>Keep shaking. The alarm stops at {goal}.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
  },
  count: {
    marginTop: 24,
    fontSize: 88,
    fontWeight: '800',
    color: Colors.text,
  },
  goal: {
    fontSize: 22,
    color: Colors.textSecondary,
    fontWeight: '700',
  },
  hint: {
    marginTop: 18,
    color: Colors.textSecondary,
  },
});
