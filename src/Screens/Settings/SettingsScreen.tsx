import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { ModalHeader } from '../../components/ModalHeader';
import { Toggle } from '../../components/Toggle';
import { Colors } from '../../constants/Colors';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { toggleSetting } from '../../Redux/slices/settingsSlice';
import { resetOnboarding } from '../../Redux/slices/onboardingSlice';
import { NavigationController } from '../../NavigationController/NavigationController';
import { ensureNotificationPermission } from '../../Utils/alarmScheduler';

export default function SettingsScreen() {
  const settings = useAppSelector((s) => s.settings);
  const dispatch = useAppDispatch();

  return (
    <Screen patterned={false}>
      <ModalHeader title="Settings" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 10 }}>
        <Row label="Volume boost" value={settings.volumeBoost} onToggle={() => dispatch(toggleSetting('volumeBoost'))} />
        <Row label="Vibration" value={settings.vibration} onToggle={() => dispatch(toggleSetting('vibration'))} />
        <Row
          label="Show on lock screen"
          value={settings.showOnLockScreen}
          onToggle={() => dispatch(toggleSetting('showOnLockScreen'))}
        />
        <Pressable
          style={styles.row}
          onPress={async () => {
            const ok = await ensureNotificationPermission();
            Alert.alert(ok ? 'Notifications on' : 'Permission needed', ok ? 'Alarms can ring even when the app is closed.' : 'Enable notifications to schedule alarms.');
          }}>
          <Text style={styles.label}>Notification permission</Text>
          <Text style={styles.chev}>›</Text>
        </Pressable>
        <Pressable style={styles.row} onPress={() => NavigationController.navigate('Groups')}>
          <Text style={styles.label}>Groups</Text>
          <Text style={styles.chev}>›</Text>
        </Pressable>
        <Pressable style={styles.row} onPress={() => NavigationController.navigate('Insights')}>
          <Text style={styles.label}>Insights</Text>
          <Text style={styles.chev}>›</Text>
        </Pressable>
        <Pressable
          style={styles.row}
          onPress={() => {
            dispatch(resetOnboarding());
            NavigationController.navigate('Splash');
          }}>
          <Text style={styles.label}>Replay onboarding</Text>
          <Text style={styles.chev}>›</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

function Row({ label, value, onToggle }: { label: string; value: boolean; onToggle: () => void }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Toggle value={value} onValueChange={onToggle} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: Colors.white,
    minHeight: 58,
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
  chev: {
    fontSize: 24,
    color: Colors.textMuted,
  },
});
