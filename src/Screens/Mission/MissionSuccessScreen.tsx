import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { PrimaryButton } from '../../components/PrimaryButton';
import { SunMascot } from '../../components/SunMascot';
import { Colors } from '../../constants/Colors';
import { RootStackParamList } from '../../Navigation/types';
import { NavigationController } from '../../NavigationController/NavigationController';
import { useAppDispatch } from '../../Redux/hooks';
import { incrementStreak } from '../../Redux/slices/userSlice';
import { setRingingAlarm } from '../../Redux/slices/alarmsSlice';
import { success } from '../../Utils/haptics';

type Props = NativeStackScreenProps<RootStackParamList, 'MissionSuccess'>;

export default function MissionSuccessScreen({}: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    success();
    dispatch(incrementStreak());
    dispatch(setRingingAlarm(null));
  }, [dispatch]);

  return (
    <Screen>
      <View style={styles.body}>
        <SunMascot size={96} accessory="wink" />
        <Text style={styles.title}>You won the morning.</Text>
        <Text style={styles.sub}>Alarm off. Streak updated. Go keep the momentum.</Text>
      </View>
      <View style={{ padding: 20 }}>
        <PrimaryButton title="Done" onPress={() => NavigationController.resetToHome()} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  title: {
    marginTop: 18,
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
  },
  sub: {
    marginTop: 10,
    textAlign: 'center',
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 22,
  },
});
