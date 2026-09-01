import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { ModalHeader } from '../../components/ModalHeader';
import { MissionCard } from '../../components/MissionCard';
import { Colors } from '../../constants/Colors';
import { MISSIONS, MISSION_CATEGORIES, MissionCategory } from '../../constants/Missions';
import { RootStackParamList } from '../../Navigation/types';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setMission } from '../../Redux/slices/alarmsSlice';
import { NavigationController } from '../../NavigationController/NavigationController';

type Props = NativeStackScreenProps<RootStackParamList, 'ChooseMission'>;

export default function ChooseMissionScreen({ route }: Props) {
  const { alarmId } = route.params;
  const selected = useAppSelector((s) => s.alarms.items.find((a) => a.id === alarmId)?.missionId);
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState<MissionCategory>('trending');
  const visible = MISSIONS.filter((m) => m.category.includes(tab));

  return (
    <Screen patterned={false}>
      <ModalHeader title="Choose Mission" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
        {MISSION_CATEGORIES.map((cat) => {
          const on = cat.id === tab;
          return (
            <Pressable key={cat.id} onPress={() => setTab(cat.id)} style={[styles.tab, on && styles.tabOn]}>
              <Ionicons name={cat.icon as never} size={16} color={on ? Colors.text : Colors.textSecondary} />
              <Text style={[styles.tabText, on && styles.tabTextOn]}>{cat.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        <View style={styles.cols}>
          {visible.map((mission) => (
            <View key={mission.id} style={styles.cell}>
              <MissionCard
                mission={mission}
                selected={mission.id === selected}
                footerLabel={mission.id === 'random' ? '0 in pool' : 'Preview'}
                onPress={() => {
                  Alert.alert(mission.title, mission.preview, [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Use mission',
                      onPress: () => {
                        dispatch(setMission({ alarmId, missionId: mission.id }));
                        NavigationController.goBack();
                      },
                    },
                  ]);
                }}
              />
            </View>
          ))}
        </View>
        <Text style={styles.more}>+{Math.max(MISSIONS.length - visible.length, 0)} more</Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  tabs: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.chip,
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 18,
  },
  tabOn: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tabText: {
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  tabTextOn: {
    color: Colors.text,
  },
  grid: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  cols: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  cell: {
    width: '48%',
    flexGrow: 1,
  },
  more: {
    textAlign: 'center',
    marginTop: 16,
    color: Colors.textSecondary,
    fontWeight: '700',
  },
});
