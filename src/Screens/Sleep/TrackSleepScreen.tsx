import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { ModalHeader } from '../../components/ModalHeader';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Colors } from '../../constants/Colors';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setSleepTracking } from '../../Redux/slices/userSlice';
import { NavigationController } from '../../NavigationController/NavigationController';

export default function TrackSleepScreen() {
  const tracking = useAppSelector((s) => s.user.sleepTracking);
  const dispatch = useAppDispatch();
  return (
    <Screen>
      <ModalHeader title="Track sleep" />
      <View style={styles.body}>
        <Text style={styles.title}>{tracking ? 'Sleep tracking is on' : 'Start tracking tonight'}</Text>
        <Text style={styles.bodyText}>
          Wayk estimates time in bed from when you arm sleep tracking until your first completed mission.
        </Text>
        <View style={styles.card}>
          <Text style={styles.stat}>{tracking ? 'Listening' : 'Idle'}</Text>
          <Text style={styles.meta}>Place your phone on the nightstand. No wearable required.</Text>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <PrimaryButton
          title={tracking ? 'Stop tracking' : 'Track sleep'}
          onPress={() => {
            dispatch(setSleepTracking(!tracking));
            NavigationController.goBack();
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 22,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  bodyText: {
    marginTop: 12,
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 22,
  },
  card: {
    marginTop: 24,
    backgroundColor: Colors.white,
    borderRadius: 22,
    padding: 20,
  },
  stat: {
    fontSize: 22,
    fontWeight: '800',
  },
  meta: {
    marginTop: 8,
    color: Colors.textSecondary,
  },
});
