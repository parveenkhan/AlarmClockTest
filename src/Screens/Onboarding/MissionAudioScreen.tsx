import { StyleSheet, Text, View } from 'react-native';
import { OnboardingFrame } from '../../components/OnboardingFrame';
import { OptionCard } from '../../components/OptionCard';
import { Colors } from '../../constants/Colors';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setPlayDuringMission } from '../../Redux/slices/onboardingSlice';
import { NavigationController } from '../../NavigationController/NavigationController';

export default function MissionAudioScreen() {
  const value = useAppSelector((s) => s.onboarding.playDuringMission);
  const dispatch = useAppDispatch();

  return (
    <OnboardingFrame
      step={24}
      disabled={value === null}
      onContinue={() => NavigationController.navigate('HearAbout')}>
      <Text style={styles.title}>Play your alarm during the mission?</Text>
      <Text style={styles.sub}>You can change this later in settings.</Text>
      <View style={{ gap: 10 }}>
        <OptionCard
          label="Keep alarm ringing while completing the mission."
          selected={value === true}
          onPress={() => dispatch(setPlayDuringMission(true))}
        />
        <OptionCard
          label="Silence the alarm during my mission. It rings again if I leave the app."
          selected={value === false}
          onPress={() => dispatch(setPlayDuringMission(false))}
        />
      </View>
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
    marginBottom: 22,
    color: Colors.textSecondary,
    fontSize: 16,
  },
});
