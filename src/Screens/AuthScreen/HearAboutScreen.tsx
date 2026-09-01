import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OnboardingFrame } from '../../Component/OnboardingFrame';
import { Colors } from '../../Assets/Colors';
import { HEAR_ABOUT } from '../../Assets/Onboarding';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setHeardFrom } from '../../Redux/Actions/Onboarding.Action';
import { NavigationController } from '../../Navigation/NavigationService';

export default function HearAboutScreen() {
  const selected = useAppSelector((s) => s.onboarding.heardFrom);
  const dispatch = useAppDispatch();

  return (
    <OnboardingFrame
      step={25}
      disabled={!selected}
      onContinue={() => NavigationController.navigate('Faster')}>
      <Text style={styles.title}>Where did you hear about us?</Text>
      <ScrollView contentContainerStyle={{ gap: 10, paddingTop: 18, paddingBottom: 8 }} showsVerticalScrollIndicator={false}>
        {HEAR_ABOUT.map((item) => {
          const on = selected === item.id;
          return (
            <Pressable key={item.id} onPress={() => dispatch(setHeardFrom(item.id))} style={[styles.row, on && styles.on]}>
              <View style={styles.icon}>
                <Ionicons name={item.icon as never} size={20} color={item.color} />
              </View>
              <Text style={styles.label}>{item.label}</Text>
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
  row: {
    backgroundColor: Colors.white,
    minHeight: 62,
    borderRadius: 18,
    paddingHorizontal: 14,
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
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F4F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#D0D0D4',
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
