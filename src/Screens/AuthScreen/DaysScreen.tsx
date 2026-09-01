import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OnboardingFrame } from '../../Component/OnboardingFrame';
import { Colors } from '../../Assets/Colors';
import { WEEK_DAYS } from '../../Assets/Onboarding';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { toggleOnboardingDay } from '../../Redux/Actions/Onboarding.Action';
import { NavigationController } from '../../Navigation/NavigationService';

export default function DaysScreen() {
  const days = useAppSelector((s) => s.onboarding.days);
  const dispatch = useAppDispatch();

  return (
    <OnboardingFrame
      step={22}
      disabled={days.length === 0}
      onContinue={() => NavigationController.navigate('OnboardingSound')}>
      <Text style={styles.title}>Which days should Wayk ring?</Text>
      <Text style={styles.sub}>Pick the days you want to lock in.</Text>
      <ScrollView contentContainerStyle={{ gap: 8, paddingBottom: 8 }} showsVerticalScrollIndicator={false}>
        {WEEK_DAYS.map((item) => {
          const on = days.includes(item.day);
          return (
            <Pressable key={item.day} onPress={() => dispatch(toggleOnboardingDay(item.day))} style={[styles.row, on && styles.on]}>
              <Text style={[styles.label, on ? styles.labelOn : styles.labelOff]}>{item.label}</Text>
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
    marginTop: 8,
    marginBottom: 18,
    color: Colors.textSecondary,
    fontSize: 16,
  },
  row: {
    minHeight: 54,
    borderRadius: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  on: {
    borderColor: Colors.black,
    backgroundColor: Colors.white,
  },
  label: {
    fontSize: 18,
  },
  labelOn: {
    fontWeight: '800',
    color: Colors.text,
  },
  labelOff: {
    color: '#B0B0B5',
    fontWeight: '600',
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
