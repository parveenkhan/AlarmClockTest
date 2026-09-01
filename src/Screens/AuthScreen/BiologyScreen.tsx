import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OnboardingFrame } from '../../Component/OnboardingFrame';
import { Colors } from '../../Assets/Colors';
import { NavigationController } from '../../Navigation/NavigationService';

export default function BiologyScreen() {
  return (
    <OnboardingFrame step={17} onContinue={() => NavigationController.navigate('WhyObject')}>
      <View style={styles.center}>
        <View style={styles.icon}>
          <Ionicons name="git-branch-outline" size={42} color="#7B89F4" />
        </View>
        <Text style={styles.title}>Biology, Not Laziness</Text>
        <Text style={styles.body}>
          When the alarm rings, your prefrontal cortex is still asleep. This is ‘Sleep Inertia.’ You can’t think your way out of bed when your brain is offline.
        </Text>
      </View>
    </OnboardingFrame>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  icon: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: '#EAEBFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  body: {
    marginTop: 14,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
