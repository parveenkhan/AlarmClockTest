import { Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '../../components/Screen';
import { PrimaryButton } from '../../components/PrimaryButton';
import { OnboardingHeader } from '../../components/OnboardingHeader';
import { Colors } from '../../constants/Colors';
import { NavigationController } from '../../NavigationController/NavigationController';

export default function ReferralScreen() {
  const share = async () => {
    await Share.share({
      message: 'Know someone who sleeps through their alarms? Try Wayk with me — one alarm, one mission, then your day starts.',
    }).catch(() => undefined);
    NavigationController.navigate('CreateAccount');
  };

  return (
    <Screen patterned={false} edges={['top', 'bottom']} style={{ backgroundColor: Colors.onboarding }}>
      <OnboardingHeader step={31} />
      <View style={styles.body}>
        <LinearGradient colors={['#F6A04A', '#E56BA8']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.art}>
          {Array.from({ length: 4 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.ring,
                {
                  width: 70 + index * 28,
                  height: 70 + index * 28,
                  borderRadius: 80,
                  opacity: 0.18 + index * 0.05,
                },
              ]}
            />
          ))}
          <View style={styles.lock}>
            <Ionicons name="lock-closed" size={18} color="#5A3A22" />
          </View>
        </LinearGradient>
        <Text style={styles.title}>Unlock an exclusive alarm sound</Text>
        <Text style={styles.bodyText}>Know someone who sleeps through their alarms? Refer a friend and this alarm sound is yours.</Text>
        <Text style={styles.fine}>We'll write the text for you. Just pick one friend. No spam, no catch.</Text>
      </View>
      <View style={styles.footer}>
        <PrimaryButton title="Text One Friend" onPress={share} />
        <Pressable onPress={() => NavigationController.navigate('CreateAccount')} style={styles.skip}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  art: {
    width: 148,
    height: 148,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  ring: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  lock: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E8D4B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.6,
  },
  bodyText: {
    marginTop: 12,
    textAlign: 'center',
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 22,
  },
  fine: {
    marginTop: 12,
    textAlign: 'center',
    color: '#B0AEA8',
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  skip: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  skipText: {
    color: Colors.textSecondary,
    fontWeight: '600',
    fontSize: 16,
  },
});
