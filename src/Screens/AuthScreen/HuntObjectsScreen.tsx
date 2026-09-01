import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OnboardingFrame } from '../../Component/OnboardingFrame';
import { Colors } from '../../Assets/Colors';
import { HUNT_OBJECTS } from '../../Assets/Onboarding';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { toggleHunt } from '../../Redux/Actions/Onboarding.Action';
import { NavigationController } from '../../Navigation/NavigationService';

export default function HuntObjectsScreen() {
  const selected = useAppSelector((s) => s.onboarding.huntIds);
  const dispatch = useAppDispatch();

  return (
    <OnboardingFrame
      step={20}
      disabled={selected.length === 0}
      onContinue={() => NavigationController.navigate('IdealTime')}>
      <Text style={styles.title}>Choose what you'll hunt</Text>
      <Text style={styles.sub}>Wayk picks one of these when your alarm rings. Deselect anything you don't have.</Text>
      <View style={styles.section}>
        <Text style={styles.kicker}>EVERYDAY OBJECTS</Text>
        <Text style={styles.count}>{selected.length} selected</Text>
      </View>
      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {HUNT_OBJECTS.map((item) => {
          const on = selected.includes(item.id);
          return (
            <Pressable key={item.id} onPress={() => dispatch(toggleHunt(item.id))} style={styles.card}>
              {on ? (
                <View style={styles.badge}>
                  <Ionicons name="checkmark" size={12} color={Colors.white} />
                </View>
              ) : null}
              <Text style={styles.emoji}>{item.emoji}</Text>
              <Text style={styles.label}>{item.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </OnboardingFrame>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  sub: {
    marginTop: 8,
    color: Colors.textSecondary,
    fontSize: 15,
    lineHeight: 21,
  },
  section: {
    marginTop: 18,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  kicker: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textSecondary,
    letterSpacing: 0.8,
  },
  count: {
    color: Colors.textSecondary,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingBottom: 16,
  },
  card: {
    width: '31%',
    flexGrow: 1,
    maxWidth: '32%',
    aspectRatio: 0.92,
    backgroundColor: Colors.white,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 32,
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
});
