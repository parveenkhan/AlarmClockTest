import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../Component/Screen';
import { Colors } from '../../Assets/Colors';
import { useAppDispatch } from '../../Redux/hooks';
import { finishOnboardingPlan } from '../../Utils/completeOnboarding';
import { store } from '../../Redux/Store/ConfigureStore';
import { tap } from '../../Utils/haptics';

export default function CreateAccountScreen() {
  const dispatch = useAppDispatch();
  const finish = () => {
    tap();
    finishOnboardingPlan(dispatch, store.getState());
  };

  return (
    <Screen patterned={false} edges={['top', 'bottom']} style={{ backgroundColor: Colors.onboarding }}>
      <View style={styles.body}>
        <View style={{ flex: 1 }} />
        <Text style={styles.title}>Create an account</Text>
        <Text style={styles.sub}>Keep your alarms, streak, and badges safe.</Text>
        <Pressable onPress={finish} style={styles.apple}>
          <Ionicons name="logo-apple" size={20} color={Colors.white} />
          <Text style={styles.appleText}>Sign in with Apple</Text>
        </Pressable>
        <Pressable onPress={finish} style={styles.google}>
          <Ionicons name="logo-google" size={18} color={Colors.text} />
          <Text style={styles.googleText}>Continue with Google</Text>
        </Pressable>
        <Pressable onPress={finish} style={styles.skip}>
          <Text style={styles.skipText}>Skip for now</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 22,
    paddingBottom: 18,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.6,
  },
  sub: {
    marginTop: 8,
    marginBottom: 28,
    textAlign: 'center',
    color: Colors.textSecondary,
    fontSize: 16,
  },
  apple: {
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  appleText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  google: {
    marginTop: 12,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8E8EA',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  googleText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
  },
  skip: {
    alignItems: 'center',
    paddingVertical: 18,
  },
  skipText: {
    color: '#B0AEA8',
    fontWeight: '600',
    fontSize: 16,
  },
});
