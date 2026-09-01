import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Screen } from '../../Component/Screen';
import { PrimaryButton } from '../../Component/PrimaryButton';
import { Colors } from '../../Assets/Colors';
import { useAppDispatch } from '../../Redux/hooks';
import { finishOnboardingPlan } from '../../Utils/completeOnboarding';
import { store } from '../../Redux/Store/ConfigureStore';

export default function PaywallScreen() {
  const [plan, setPlan] = useState<'yearly' | 'monthly'>('yearly');
  const dispatch = useAppDispatch();

  const start = () => finishOnboardingPlan(dispatch, store.getState());

  return (
    <Screen>
      <View style={styles.body}>
        <Text style={styles.title}>Start your 7-day free trial.</Text>
        <Text style={styles.sub}>Unlimited alarms and missions. Cancel anytime before billing starts.</Text>
        <Pressable onPress={() => setPlan('yearly')} style={[styles.plan, plan === 'yearly' && styles.planOn]}>
          <View>
            <Text style={styles.planName}>Yearly</Text>
            <Text style={styles.planMeta}>₹599 / year</Text>
          </View>
          <View style={styles.save}>
            <Text style={styles.saveText}>SAVE 75%</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => setPlan('monthly')} style={[styles.plan, plan === 'monthly' && styles.planOn]}>
          <View>
            <Text style={styles.planName}>Monthly</Text>
            <Text style={styles.planMeta}>₹199 / month</Text>
          </View>
        </Pressable>
        <View style={styles.timeline}>
          <Line title="Today" body="Unlock missions and set your first alarm" />
          <Line title="Day 7" body="Trial ends. We’ll remind you first." />
          <Line title="Day 8" body="Billing begins unless you cancel" />
        </View>
      </View>
      <View style={styles.footer}>
        <PrimaryButton title="Start free trial" onPress={start} />
        <Pressable onPress={start} style={{ marginTop: 14, alignItems: 'center' }}>
          <Text style={styles.link}>Continue for demo</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

function Line({ title, body }: { title: string; body: string }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ fontWeight: '800', color: Colors.text }}>{title}</Text>
      <Text style={{ color: Colors.textSecondary, marginTop: 2 }}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.7,
  },
  sub: {
    marginTop: 10,
    marginBottom: 22,
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 22,
  },
  plan: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  planOn: {
    borderColor: Colors.text,
  },
  planName: {
    fontSize: 18,
    fontWeight: '800',
  },
  planMeta: {
    marginTop: 4,
    color: Colors.textSecondary,
  },
  save: {
    backgroundColor: Colors.green,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  saveText: {
    color: Colors.white,
    fontWeight: '800',
    fontSize: 12,
  },
  timeline: {
    marginTop: 16,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  link: {
    color: Colors.textSecondary,
    fontWeight: '600',
  },
});
