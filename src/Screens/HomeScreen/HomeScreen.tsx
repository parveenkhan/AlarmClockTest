import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../Component/Screen';
import { StreakBadge } from '../../Component/StreakBadge';
import { NextAlarmHero } from '../../Component/NextAlarmHero';
import { AlarmCard } from '../../Component/AlarmCard';
import { FloatingAddButton } from '../../Component/FloatingAddButton';
import { Colors } from '../../Assets/Colors';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { createBlankAlarm, toggleAlarm } from '../../Redux/Actions/Alarm.Action';
import { NavigationController } from '../../Navigation/NavigationService';
import { daysForRepeat, formatCountdown, nextAlarmDate, ringsInLabel } from '../../Utils/time';
import { syncAlarmNotifications } from '../../Redux/Services/Alarm.Service';

export default function HomeScreen() {
  const alarms = useAppSelector((s) => s.alarms.items);
  const streak = useAppSelector((s) => s.user.streak);
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((v) => v + 1), 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    syncAlarmNotifications(alarms).catch(() => undefined);
  }, [alarms]);

  const next = useMemo(() => {
    const upcoming = alarms
      .map((alarm) => ({
        alarm,
        date: nextAlarmDate(alarm.hour, alarm.minute, daysForRepeat(alarm.repeat, alarm.days), alarm.enabled),
      }))
      .filter((item) => item.date)
      .sort((a, b) => (a.date!.getTime() > b.date!.getTime() ? 1 : -1));
    return upcoming[0];
  }, [alarms]);

  const addAlarm = () => {
    const action = dispatch(createBlankAlarm());
    NavigationController.navigate('EditAlarm', { alarmId: action.payload.id });
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.brand}>Wayk</Text>
        <StreakBadge count={streak} onPress={() => NavigationController.navigate('Insights')} />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {next?.date ? (
          <NextAlarmHero
            label={ringsInLabel(next.alarm.repeat)}
            countdown={formatCountdown(next.date)}
            onTrackSleep={() => NavigationController.navigate('TrackSleep')}
          />
        ) : (
          <NextAlarmHero
            label="No alarms yet"
            countdown="Add one"
            onTrackSleep={() => NavigationController.navigate('TrackSleep')}
          />
        )}
        <View style={styles.sectionHead}>
          <Text style={styles.section}>Mission Alarms</Text>
          <Pressable onPress={() => setMenuOpen((v) => !v)} hitSlop={12}>
            <Ionicons name="ellipsis-horizontal" size={22} color={Colors.textSecondary} />
          </Pressable>
        </View>
        {menuOpen ? (
          <View style={styles.menu}>
            <MenuItem
              label="Groups"
              onPress={() => {
                setMenuOpen(false);
                NavigationController.navigate('Groups');
              }}
            />
            <MenuItem
              label="Insights"
              onPress={() => {
                setMenuOpen(false);
                NavigationController.navigate('Insights');
              }}
            />
            <MenuItem
              label="Settings"
              onPress={() => {
                setMenuOpen(false);
                NavigationController.navigate('Settings');
              }}
            />
          </View>
        ) : null}
        <View style={{ gap: 12 }}>
          {alarms.map((alarm) => (
            <AlarmCard
              key={alarm.id}
              alarm={alarm}
              onPress={() => NavigationController.navigate('EditAlarm', { alarmId: alarm.id })}
              onToggle={() => dispatch(toggleAlarm(alarm.id))}
            />
          ))}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
      <FloatingAddButton onPress={addAlarm} />
    </Screen>
  );
}

function MenuItem({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.menuItem}>
      <Text style={styles.menuText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    fontSize: 34,
    fontWeight: '800',
    color: Colors.text,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  sectionHead: {
    marginTop: 22,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  menu: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
