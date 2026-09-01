import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OnboardingFrame } from '../../components/OnboardingFrame';
import { NavigationController } from '../../NavigationController/NavigationController';
import { useAppSelector } from '../../Redux/hooks';
import { Colors } from '../../constants/Colors';
import { formatTime } from '../../Utils/time';
import { getMission } from '../../constants/Missions';

const STEPS = [
  'Analyzing snooze pattern',
  'Setting your wake window',
  'Choosing a starter mission',
  'Building streak tracking',
];

export default function BuildingPlanScreen() {
  const onboarding = useAppSelector((s) => s.onboarding);
  const [done, setDone] = useState(0);
  const mission = getMission(onboarding.onboardingMission);

  useEffect(() => {
    const timers = STEPS.map((_, index) => setTimeout(() => setDone(index + 1), 700 * (index + 1)));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <OnboardingFrame
      step={22}
      disabled={done < STEPS.length}
      onContinue={() => NavigationController.navigate('Paywall')}>
      <Text style={styles.title}>Building your plan.</Text>
      <Text style={styles.body}>
        Wake at {formatTime(onboarding.idealHour, onboarding.idealMinute)}. First mission: {mission.title}.
      </Text>
      <View style={{ marginTop: 28, gap: 14 }}>
        {STEPS.map((step, index) => {
          const complete = done > index;
          return (
            <View key={step} style={styles.row}>
              <Ionicons
                name={complete ? 'checkmark-circle' : 'ellipse-outline'}
                size={22}
                color={complete ? Colors.green : Colors.textMuted}
              />
              <Text style={[styles.step, complete && styles.complete]}>{step}</Text>
            </View>
          );
        })}
      </View>
    </OnboardingFrame>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: Colors.text,
  },
  body: {
    marginTop: 12,
    fontSize: 17,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
  },
  step: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  complete: {
    color: Colors.text,
  },
});
