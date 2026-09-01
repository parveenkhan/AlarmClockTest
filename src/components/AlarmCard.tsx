import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';
import { Alarm } from '../constants/Types';
import { getMission } from '../constants/Missions';
import { formatTime, repeatLabel } from '../Utils/time';
import { Toggle } from './Toggle';

interface Props {
  alarm: Alarm;
  onPress: () => void;
  onToggle: (next: boolean) => void;
}

const MISSION_ICON: Record<string, keyof typeof Ionicons.glyphMap> = {
  objectHunt: 'scan-outline',
  skyPhoto: 'cloudy-outline',
  makeBed: 'bed-outline',
  qr: 'qr-code-outline',
  pushups: 'barbell-outline',
  squats: 'fitness-outline',
  shake: 'phone-portrait-outline',
  steps: 'walk-outline',
  math: 'calculator-outline',
  bible: 'book-outline',
  affirmation: 'chatbubble-ellipses-outline',
  random: 'dice-outline',
};

export function AlarmCard({ alarm, onPress, onToggle }: Props) {
  const mission = getMission(alarm.missionId);
  const muted = !alarm.enabled;
  return (
    <Pressable onPress={onPress} style={[styles.card, Layout.softShadow]}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.meta}>{repeatLabel(alarm.repeat, alarm.days)}</Text>
          <View style={styles.timeRow}>
            <Text style={[styles.time, muted && styles.muted]}>{formatTime(alarm.hour, alarm.minute)}</Text>
            <Ionicons
              name={MISSION_ICON[alarm.missionId] ?? 'scan-outline'}
              size={18}
              color={muted ? Colors.textMuted : Colors.textSecondary}
              style={{ marginLeft: 8, marginTop: 6 }}
            />
          </View>
          <Text style={styles.meta}>{alarm.label || mission.title}</Text>
        </View>
        <Toggle value={alarm.enabled} onValueChange={onToggle} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meta: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  time: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.6,
  },
  muted: {
    color: '#9A958E',
  },
});
