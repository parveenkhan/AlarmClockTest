import { useCallback, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { OnboardingFrame } from '../../Component/OnboardingFrame';
import { SpeedGauge } from '../../Component/SpeedGauge';
import { NavigationController } from '../../Navigation/NavigationService';

export default function FasterScreen() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  return (
    <OnboardingFrame
      step={26}
      disabled={!ready}
      onContinue={() => NavigationController.navigate('Commitment')}>
      <Text style={styles.title}>Get out of bed 5x faster with Wayk</Text>
      <SpeedGauge onDone={onDone} />
    </OnboardingFrame>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
});
