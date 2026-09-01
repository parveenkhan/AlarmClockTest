import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '../../components/Screen';
import { Colors } from '../../constants/Colors';
import { SETUP_STEPS } from '../../constants/Onboarding';
import { getMission } from '../../constants/Missions';
import { useAppSelector } from '../../Redux/hooks';
import { formatTime } from '../../Utils/time';
import { NavigationController } from '../../NavigationController/NavigationController';
import { success } from '../../Utils/haptics';

export default function BuildingPlanScreen() {
  const onboarding = useAppSelector((s) => s.onboarding);
  const mission = getMission(onboarding.onboardingMission);
  const [pct, setPct] = useState(0);
  const doneRef = useRef(-1);

  const subtitles = [
    'Morning routine ready',
    `${mission.title} selected`,
    'Sound locked in',
    `Set for ${formatTime(onboarding.idealHour, onboarding.idealMinute)}`,
    'Wake receipt ready',
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setPct((value) => {
        if (value >= 100) {
          clearInterval(id);
          return 100;
        }
        return value + 1;
      });
    }, 42);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const completed = Math.min(5, Math.floor(pct / 20));
    if (completed - 1 > doneRef.current && completed > 0) {
      doneRef.current = completed - 1;
      success();
    }
    if (pct >= 100) {
      const timer = setTimeout(() => NavigationController.navigate('MorningPlan'), 700);
      return () => clearTimeout(timer);
    }
  }, [pct]);

  const active = Math.min(4, Math.floor(pct / 20));
  const status = pct < 100 ? `${SETUP_STEPS[active].title}...` : 'Ready';

  return (
    <Screen patterned={false} style={{ backgroundColor: Colors.onboarding }}>
      <View style={styles.body}>
        <Text style={styles.pct}>{pct}%</Text>
        <Text style={styles.title}>Setting everything up for you</Text>
        <View style={styles.track}>
          <LinearGradient
            colors={['#F08A3A', '#F5C15A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.fill, { width: `${pct}%` }]}
          />
        </View>
        <Text style={styles.status}>{status}</Text>
        <View style={styles.card}>
          {SETUP_STEPS.map((step, index) => {
            const complete = pct >= (index + 1) * 20;
            const current = index === active && !complete;
            return (
              <View key={step.title} style={[styles.row, index > 0 && styles.divider]}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.step, complete || current ? styles.stepOn : styles.stepOff]}>{step.title}</Text>
                  {complete ? <Text style={styles.meta}>{subtitles[index]}</Text> : null}
                </View>
                {complete ? (
                  <View style={styles.check}>
                    <Ionicons name="checkmark" size={13} color={Colors.white} />
                  </View>
                ) : (
                  <View style={styles.radio} />
                )}
              </View>
            );
          })}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 36,
  },
  pct: {
    fontSize: 64,
    fontWeight: '800',
    letterSpacing: -2,
    color: Colors.text,
  },
  title: {
    marginTop: 6,
    fontSize: 26,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  track: {
    marginTop: 22,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E8E8EA',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
  status: {
    marginTop: 10,
    color: Colors.textSecondary,
    fontSize: 14,
  },
  card: {
    marginTop: 28,
    backgroundColor: Colors.white,
    borderRadius: 24,
    overflow: 'hidden',
  },
  row: {
    minHeight: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#EFEFF2',
  },
  step: {
    fontSize: 16,
    fontWeight: '700',
  },
  stepOn: {
    color: Colors.text,
  },
  stepOff: {
    color: '#C2C2C6',
  },
  meta: {
    marginTop: 3,
    color: Colors.textSecondary,
    fontSize: 13,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#E0E0E4',
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
