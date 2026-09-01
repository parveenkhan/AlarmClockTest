import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../Component/Screen';
import { PrimaryButton } from '../../Component/PrimaryButton';
import { Colors } from '../../Assets/Colors';
import { RootStackParamList } from '../../Navigation/types';
import { NavigationController } from '../../Navigation/NavigationService';

type Props = NativeStackScreenProps<RootStackParamList, 'PushupMission'>;

export default function PushupMissionScreen({ route }: Props) {
  const [count, setCount] = useState(0);
  const [permission, requestPermission] = useCameraPermissions();
  const goal = 10;

  if (!permission?.granted) {
    return (
      <Screen>
        <View style={styles.center}>
          <Text style={styles.title}>Face the camera</Text>
          <PrimaryButton title="Allow camera" onPress={requestPermission} />
        </View>
      </Screen>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#111' }}>
      <CameraView style={StyleSheet.absoluteFill} facing="front" />
      <View style={styles.overlay}>
        <Text style={styles.title}>Push Ups</Text>
        <Text style={styles.count}>{count}/{goal}</Text>
        <Pressable
          onPress={() => {
            const next = count + 1;
            setCount(next);
            if (next >= goal) {
              NavigationController.replace('MissionSuccess', { alarmId: route.params.alarmId });
            }
          }}
          style={styles.tap}>
          <Text style={styles.tapText}>Tap each rep</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  title: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  count: {
    color: Colors.white,
    fontSize: 56,
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 8,
  },
  tap: {
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  tapText: {
    fontWeight: '800',
    fontSize: 16,
  },
});
