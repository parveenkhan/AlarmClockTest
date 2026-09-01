import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../Component/Screen';
import { ModalHeader } from '../../Component/ModalHeader';
import { PrimaryButton } from '../../Component/PrimaryButton';
import { Colors } from '../../Assets/Colors';
import { RootStackParamList } from '../../Navigation/types';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { deleteAlarm, upsertAlarm } from '../../Redux/Actions/Alarm.Action';
import { NavigationController } from '../../Navigation/NavigationService';
import { getMission } from '../../Assets/Missions';
import { formatTime, pad2 } from '../../Utils/time';
import { getSoundCategory } from '../../Assets/Sounds';

type Props = NativeStackScreenProps<RootStackParamList, 'EditAlarm'>;

const PRESETS = [
  { id: 'once', label: 'Once' },
  { id: 'weekdays', label: 'Weekdays' },
  { id: 'weekends', label: 'Weekends' },
  { id: 'daily', label: 'Every day' },
] as const;

export default function EditAlarmScreen({ route }: Props) {
  const alarmId = route.params?.alarmId;
  const stored = useAppSelector((s) => s.alarms.items.find((item) => item.id === alarmId));
  const dispatch = useAppDispatch();
  const [hour, setHour] = useState(stored?.hour ?? 7);
  const [minute, setMinute] = useState(stored?.minute ?? 0);
  const [label, setLabel] = useState(stored?.label ?? 'Alarm');
  const [repeat, setRepeat] = useState(stored?.repeat ?? 'weekdays');

  const mission = getMission(stored?.missionId ?? 'objectHunt');
  const category = getSoundCategory(stored?.soundCategory ?? 'aggressive');

  const bump = (field: 'hour' | 'minute', dir: number) => {
    if (field === 'hour') setHour((h) => (h + dir + 24) % 24);
    else setMinute((m) => (m + dir + 60) % 60);
  };

  const save = () => {
    if (!stored) return;
    dispatch(
      upsertAlarm({
        ...stored,
        hour,
        minute,
        label,
        repeat,
        days: stored.days,
        enabled: true,
      }),
    );
    NavigationController.goBack();
  };

  const remove = () => {
    if (!stored) return;
    Alert.alert('Delete alarm?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteAlarm(stored.id));
          NavigationController.goBack();
        },
      },
    ]);
  };

  return (
    <Screen patterned={false} style={{ backgroundColor: Colors.background }}>
      <ModalHeader title="Alarm" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.timeCard}>
          <TimeCol label="Hour" value={hour % 12 === 0 ? 12 : hour % 12} onUp={() => bump('hour', 1)} onDown={() => bump('hour', -1)} />
          <Text style={styles.colon}>:</Text>
          <TimeCol label="Min" value={Number(pad2(minute))} onUp={() => bump('minute', 1)} onDown={() => bump('minute', -1)} />
          <Pressable onPress={() => setHour((h) => (h + 12) % 24)} style={styles.ampm}>
            <Text style={styles.ampmText}>{hour >= 12 ? 'PM' : 'AM'}</Text>
          </Pressable>
        </View>
        <Text style={styles.preview}>{formatTime(hour, minute)}</Text>
        <Text style={styles.section}>Repeat</Text>
        <View style={styles.chips}>
          {PRESETS.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => setRepeat(item.id)}
              style={[styles.chip, repeat === item.id && styles.chipOn]}>
              <Text style={[styles.chipText, repeat === item.id && styles.chipTextOn]}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.section}>Label</Text>
        <TextInput value={label} onChangeText={setLabel} style={styles.input} placeholder="Work, Gym, Nap" />
        <Row
          title="Mission"
          value={mission.title}
          onPress={() => stored && NavigationController.navigate('ChooseMission', { alarmId: stored.id })}
        />
        <Row
          title="Alarm Sound"
          value={`${category.name} · ${stored?.soundName ?? 'Air Horn'}`}
          onPress={() => stored && NavigationController.navigate('AlarmSound', { alarmId: stored.id })}
        />
        <Pressable
          onPress={() => stored && NavigationController.navigate('AlarmRinging', { alarmId: stored.id })}
          style={styles.test}>
          <Text style={styles.testText}>Try this alarm now</Text>
        </Pressable>
        <Pressable onPress={remove} style={styles.delete}>
          <Text style={styles.deleteText}>Delete Alarm</Text>
        </Pressable>
      </ScrollView>
      <View style={{ padding: 20 }}>
        <PrimaryButton title="Save" onPress={save} />
      </View>
    </Screen>
  );
}

function TimeCol({
  label,
  value,
  onUp,
  onDown,
}: {
  label: string;
  value: number;
  onUp: () => void;
  onDown: () => void;
}) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Pressable onPress={onUp}><Text style={styles.step}>▲</Text></Pressable>
      <Text style={styles.timeNum}>{pad2(value)}</Text>
      <Pressable onPress={onDown}><Text style={styles.step}>▼</Text></Pressable>
      <Text style={styles.tiny}>{label}</Text>
    </View>
  );
}

function Row({ title, value, onPress }: { title: string; value: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
      <Text style={styles.chev}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  timeCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  colon: {
    fontSize: 42,
    fontWeight: '800',
    marginBottom: 18,
  },
  timeNum: {
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: -1,
  },
  step: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  tiny: {
    color: Colors.textMuted,
    fontSize: 11,
    marginTop: 4,
  },
  ampm: {
    marginLeft: 8,
    backgroundColor: Colors.chip,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  ampmText: {
    fontWeight: '800',
  },
  preview: {
    textAlign: 'center',
    marginTop: 10,
    color: Colors.textSecondary,
  },
  section: {
    marginTop: 22,
    marginBottom: 10,
    color: Colors.textSecondary,
    fontWeight: '700',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 36,
    justifyContent: 'center',
  },
  chipOn: {
    backgroundColor: Colors.black,
  },
  chipText: {
    fontWeight: '700',
    color: Colors.text,
  },
  chipTextOn: {
    color: Colors.white,
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    height: 52,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  row: {
    marginTop: 12,
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowTitle: {
    fontWeight: '800',
    fontSize: 16,
  },
  rowValue: {
    marginTop: 4,
    color: Colors.textSecondary,
  },
  chev: {
    fontSize: 28,
    color: Colors.textMuted,
  },
  test: {
    marginTop: 18,
    alignItems: 'center',
  },
  testText: {
    fontWeight: '700',
    color: Colors.text,
  },
  delete: {
    marginTop: 16,
    alignItems: 'center',
  },
  deleteText: {
    color: Colors.danger,
    fontWeight: '700',
  },
});
