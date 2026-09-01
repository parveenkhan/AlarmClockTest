import { StyleSheet, Text, View } from 'react-native';
import { OnboardingFrame } from '../../Component/OnboardingFrame';
import { Colors } from '../../Assets/Colors';
import { useAppSelector } from '../../Redux/hooks';
import { formatTime } from '../../Utils/time';
import { NavigationController } from '../../Navigation/NavigationService';

export default function TargetTimeScreen() {
  const hour = useAppSelector((s) => s.onboarding.usualHour);
  const minute = useAppSelector((s) => s.onboarding.usualMinute);
  return (
    <OnboardingFrame step={15} onContinue={() => NavigationController.navigate('Quote')}>
      <View style={styles.center}>
        <Text style={styles.title}>Waking up at {formatTime(hour, minute)} is your target.</Text>
      </View>
    </OnboardingFrame>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    color: Colors.text,
    letterSpacing: -0.6,
  },
});
