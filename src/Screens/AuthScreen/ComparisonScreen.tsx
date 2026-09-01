import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OnboardingFrame } from '../../Component/OnboardingFrame';
import { Colors } from '../../Assets/Colors';
import { NavigationController } from '../../Navigation/NavigationService';

export default function ComparisonScreen() {
  return (
    <OnboardingFrame step={10} onContinue={() => NavigationController.navigate('Quiz', { id: 'feelNight' })}>
      <Text style={styles.title}>One alarm. One mission.</Text>
      <View style={styles.card}>
        <View style={styles.col}>
          <Text style={styles.kickerMuted}>TYPICAL MORNING</Text>
          <Zig />
          <Item color={Colors.typical} icon="notifications" time="7:00" label="Alarm" />
          <Item color={Colors.typical} icon="moon" time="7:09" label="Snooze" />
          <Item color={Colors.typical} icon="moon" time="7:18" label="Snooze" />
          <Item color={Colors.typical} icon="warning" time="7:27" label="Panic" />
        </View>
        <View style={styles.divider} />
        <View style={styles.col}>
          <Text style={styles.kicker}>WAYK MORNING</Text>
          <View style={styles.straight} />
          <Item color={Colors.waykLine} icon="notifications" time="7:00" label="Alarm" />
          <Item color={Colors.waykLine} icon="checkmark" time="7:01" label="Mission" filled />
          <Item color={Colors.waykLine} icon="sunny" time="7:02" label="Started" />
        </View>
      </View>
    </OnboardingFrame>
  );
}

function Item({
  color,
  icon,
  time,
  label,
  filled,
}: {
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  time: string;
  label: string;
  filled?: boolean;
}) {
  return (
    <View style={styles.item}>
      <View style={[styles.dot, { backgroundColor: filled ? color : Colors.white, borderColor: color }]}>
        <Ionicons name={icon} size={14} color={filled ? Colors.white : color} />
      </View>
      <View>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

function Zig() {
  return <View style={styles.zig} />;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 18,
    letterSpacing: -0.7,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    minHeight: 340,
  },
  col: {
    flex: 1,
  },
  divider: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 8,
  },
  kicker: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginBottom: 16,
  },
  kickerMuted: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
    color: Colors.textMuted,
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 22,
    alignItems: 'center',
  },
  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontWeight: '800',
  },
  label: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  zig: {
    position: 'absolute',
    left: 15,
    top: 48,
    bottom: 24,
    width: 2,
    backgroundColor: Colors.typical,
    opacity: 0.45,
    transform: [{ rotate: '6deg' }],
  },
  straight: {
    position: 'absolute',
    left: 15,
    top: 48,
    bottom: 80,
    width: 2,
    backgroundColor: Colors.waykLine,
    opacity: 0.4,
  },
});
