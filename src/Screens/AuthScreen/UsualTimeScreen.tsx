import { StyleSheet, Text } from 'react-native';
import { OnboardingFrame } from '../../Component/OnboardingFrame';
import { TimeWheel } from '../../Component/TimeWheel';
import { Colors } from '../../Assets/Colors';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setUsualTime } from '../../Redux/Actions/Onboarding.Action';
import { NavigationController } from '../../Navigation/NavigationService';

export default function UsualTimeScreen() {
  const hour = useAppSelector((s) => s.onboarding.usualHour);
  const minute = useAppSelector((s) => s.onboarding.usualMinute);
  const dispatch = useAppDispatch();
  return (
    <OnboardingFrame step={14} onContinue={() => NavigationController.navigate('TargetTime')}>
      <Text style={styles.title}>What time do you usually get out of bed?</Text>
      <Text style={styles.sub}>This helps us set a realistic first target.</Text>
      <TimeWheel hour={hour} minute={minute} onChange={(h, m) => dispatch(setUsualTime({ hour: h, minute: m }))} />
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
