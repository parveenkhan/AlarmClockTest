import { StyleSheet, Text } from 'react-native';
import { OnboardingFrame } from '../../components/OnboardingFrame';
import { TimeWheel } from '../../components/TimeWheel';
import { Colors } from '../../constants/Colors';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setIdealTime } from '../../Redux/slices/onboardingSlice';
import { NavigationController } from '../../NavigationController/NavigationController';

export default function IdealTimeScreen() {
  const hour = useAppSelector((s) => s.onboarding.idealHour);
  const minute = useAppSelector((s) => s.onboarding.idealMinute);
  const dispatch = useAppDispatch();
  return (
    <OnboardingFrame step={21} onContinue={() => NavigationController.navigate('BuildingPlan')}>
      <Text style={styles.title}>What time do you want to be up?</Text>
      <Text style={styles.sub}>Your ideal daily wake up time.</Text>
      <TimeWheel hour={hour} minute={minute} onChange={(h, m) => dispatch(setIdealTime({ hour: h, minute: m }))} />
    </OnboardingFrame>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  sub: {
    marginTop: 8,
    marginBottom: 28,
    color: Colors.textSecondary,
    fontSize: 16,
  },
});
