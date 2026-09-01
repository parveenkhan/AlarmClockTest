import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OnboardingFrame } from '../../Component/OnboardingFrame';
import { Colors } from '../../Assets/Colors';
import { NavigationController } from '../../Navigation/NavigationService';

export default function WhyObjectScreen() {
  return (
    <OnboardingFrame step={18} onContinue={() => NavigationController.navigate('OnboardingMission')}>
      <Text style={styles.title}>Why finding a random object wakes you up</Text>
      <View style={styles.center}>
        <View style={styles.icon}>
          <Ionicons name="scan-outline" size={40} color="#7B6BBF" />
        </View>
        <Text style={styles.sub}>Active scanning</Text>
        <Text style={styles.body}>Searching for a random object gets you moving and forces visual engagement with your space.</Text>
      </View>
    </OnboardingFrame>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: '#E8EAF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sub: {
    marginTop: 18,
    fontSize: 20,
    fontWeight: '800',
  },
  body: {
    marginTop: 10,
    textAlign: 'center',
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 22,
    paddingHorizontal: 12,
  },
});
