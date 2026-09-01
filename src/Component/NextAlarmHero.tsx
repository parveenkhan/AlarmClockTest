import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../Assets/Colors';
import { Layout } from '../Assets/Layout';

interface Props {
  label: string;
  countdown: string;
  onTrackSleep: () => void;
}

export function NextAlarmHero({ label, countdown, onTrackSleep }: Props) {
  return (
    <LinearGradient colors={[Colors.heroTop, Colors.heroBottom]} style={[styles.card, Layout.softShadow]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.time}>{countdown}</Text>
      <Pressable onPress={onTrackSleep} style={styles.pill}>
        <Ionicons name="moon" size={16} color={Colors.text} />
        <Text style={styles.pillText}>Track sleep</Text>
        <Ionicons name="chevron-forward" size={16} color={Colors.textSecondary} />
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    paddingVertical: 22,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500',
  },
  time: {
    marginTop: 8,
    fontSize: 42,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -1,
  },
  pill: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(253, 250, 244, 0.85)',
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 20,
  },
  pillText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
});
