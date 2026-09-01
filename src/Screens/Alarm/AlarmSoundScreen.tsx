import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { ModalHeader } from '../../components/ModalHeader';
import { SegmentedControl } from '../../components/SegmentedControl';
import { Colors } from '../../constants/Colors';
import { SOUND_CATEGORIES } from '../../constants/Sounds';
import { RootStackParamList } from '../../Navigation/types';
import { useAppSelector } from '../../Redux/hooks';
import { NavigationController } from '../../NavigationController/NavigationController';
import { useState } from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'AlarmSound'>;

export default function AlarmSoundScreen({ route }: Props) {
  const { alarmId } = route.params;
  const alarm = useAppSelector((s) => s.alarms.items.find((a) => a.id === alarmId));
  const [tab, setTab] = useState('Sounds');

  return (
    <Screen patterned={false}>
      <ModalHeader title="Alarm Sound" />
      <View style={{ paddingHorizontal: 16 }}>
        <SegmentedControl options={['Sounds', 'Music']} value={tab} onChange={setTab} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.section}>Custom</Text>
        <Row icon="add" title="Generated" meta="0 sounds" />
        <Row icon="add" title="Uploads" meta="0 sounds" />
        <Text style={styles.section}>Sound Library</Text>
        {SOUND_CATEGORIES.map((cat) => (
          <Pressable
            key={cat.id}
            onPress={() => NavigationController.navigate('SoundLibrary', { alarmId, categoryId: cat.id })}
            style={styles.row}>
            <View style={[styles.radio, alarm?.soundCategory === cat.id && styles.radioOn]}>
              {alarm?.soundCategory === cat.id ? <Ionicons name="checkmark" size={14} color={Colors.white} /> : null}
            </View>
            <Text style={styles.title}>{cat.name}</Text>
            <Text style={styles.meta}>{cat.count} sounds</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}

function Row({ icon, title, meta }: { icon: keyof typeof Ionicons.glyphMap; title: string; meta: string }) {
  return (
    <View style={styles.row}>
      <View style={styles.plus}>
        <Ionicons name={icon} size={18} color={Colors.text} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.meta}>{meta}</Text>
      <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    marginTop: 18,
    marginBottom: 8,
    color: Colors.textSecondary,
    fontWeight: '700',
  },
  row: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  plus: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.chip,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: {
    backgroundColor: Colors.green,
    borderColor: Colors.green,
  },
  title: {
    flex: 1,
    fontWeight: '700',
    fontSize: 16,
  },
  meta: {
    color: Colors.textSecondary,
    marginRight: 4,
  },
});
