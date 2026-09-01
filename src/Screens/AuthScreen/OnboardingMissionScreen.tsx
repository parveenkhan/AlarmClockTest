import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OnboardingFrame } from '../../Component/OnboardingFrame';
import { Colors } from '../../Assets/Colors';
import { getMission } from '../../Assets/Missions';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setOnboardingMission } from '../../Redux/Actions/Onboarding.Action';
import { NavigationController } from '../../Navigation/NavigationService';
import { MissionId } from '../../Assets/Missions';

const ORDER: MissionId[] = ['objectHunt', 'pushups', 'squats', 'math', 'skyPhoto', 'makeBed'];

export default function OnboardingMissionScreen() {
  const selected = useAppSelector((s) => s.onboarding.onboardingMission);
  const dispatch = useAppDispatch();

  return (
    <OnboardingFrame
      step={19}
      disabled={!selected}
      onContinue={() => {
        if (selected === 'objectHunt') NavigationController.navigate('HuntObjects');
        else NavigationController.navigate('IdealTime');
      }}>
      <Text style={styles.title}>Choose your wake up mission</Text>
      <Text style={styles.sub}>You'll do this to turn off your alarm.</Text>
      <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 12 }} showsVerticalScrollIndicator={false}>
        {ORDER.map((id) => {
          const mission = getMission(id);
          const on = selected === id;
          return (
            <Pressable key={id} onPress={() => dispatch(setOnboardingMission(id))} style={[styles.row, on && styles.on]}>
              <View style={[styles.icon, { backgroundColor: mission.tint }]}>
                <Ionicons name={mission.icon as never} size={20} color={Colors.text} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{mission.title === 'Math' ? 'Math Problem' : mission.title}</Text>
                <Text style={styles.desc}>
                  {id === 'objectHunt'
                    ? 'Photograph a random object'
                    : id === 'pushups'
                      ? 'Complete push-ups'
                      : id === 'squats'
                        ? 'Complete squats'
                        : id === 'math'
                          ? 'Solve math problems'
                          : id === 'skyPhoto'
                            ? 'Photograph the morning sky'
                            : 'Show a made bed'}
                </Text>
              </View>
              {on ? (
                <View style={styles.check}>
                  <Ionicons name="checkmark" size={14} color={Colors.white} />
                </View>
              ) : (
                <View style={styles.radio} />
              )}
            </Pressable>
          );
        })}
      </ScrollView>
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
    marginTop: 6,
    marginBottom: 16,
    color: Colors.textSecondary,
    fontSize: 16,
  },
  row: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  on: {
    borderColor: Colors.black,
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontWeight: '800',
    fontSize: 16,
  },
  desc: {
    color: Colors.textSecondary,
    marginTop: 2,
    fontSize: 13,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#C8C8CC',
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
