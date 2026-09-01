import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from '../../constants/Colors';
import { RootStackParamList } from '../../Navigation/types';
import { getMission } from '../../constants/Missions';
import { NavigationController } from '../../NavigationController/NavigationController';
import { PrimaryButton } from '../../components/PrimaryButton';
import { MISSIONS } from '../../constants/Missions';

type Props = NativeStackScreenProps<RootStackParamList, 'CameraMission'>;

export default function CameraMissionScreen({ route }: Props) {
  const { alarmId, missionId } = route.params;
  const mission = getMission(missionId === 'random' ? 'objectHunt' : missionId);
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState(false);
  const camera = useRef<CameraView>(null);
  const hint = mission.objectHint ?? 'the target';

  const finish = async () => {
    try {
      await camera.current?.takePictureAsync({ quality: 0.4 });
    } catch {
      // Simulator may not capture; still complete the mission.
    }
    NavigationController.replace('MissionSuccess', { alarmId });
  };

  const respin = () => {
    const photo = MISSIONS.filter((m) => m.kind === 'camera' && m.id !== mission.id);
    const next = photo[Math.floor(Math.random() * photo.length)] ?? mission;
    NavigationController.replace('CameraMission', { alarmId, missionId: next.id });
  };

  if (!permission?.granted) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.perm}>Camera access is required for this mission.</Text>
        <PrimaryButton title="Allow camera" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Text style={styles.brand}>Wayk</Text>
      <View style={styles.frame}>
        <CameraView ref={camera} style={StyleSheet.absoluteFill} facing="back" enableTorch={torch} />
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Take a photo of {hint} to turn off your alarm</Text>
        </View>
        <Pressable onPress={respin} style={styles.respin}>
          <Ionicons name="sync" size={18} color={Colors.white} />
        </Pressable>
      </View>
      <View style={styles.controls}>
        <View style={{ width: 48 }} />
        <Pressable onPress={finish} style={styles.shutter} />
        <Pressable onPress={() => setTorch((v) => !v)} style={styles.flash}>
          <Ionicons name={torch ? 'flash' : 'flash-outline'} size={20} color={Colors.white} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.backgroundAlt,
    paddingTop: 56,
  },
  brand: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 12,
  },
  frame: {
    flex: 1,
    marginHorizontal: 18,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#111',
  },
  banner: {
    alignSelf: 'center',
    marginTop: 18,
    backgroundColor: 'rgba(0,0,0,0.62)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    maxWidth: '86%',
  },
  bannerText: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: '600',
  },
  respin: {
    alignSelf: 'center',
    marginTop: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
  },
  shutter: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 6,
    borderColor: '#C8C4BC',
    backgroundColor: Colors.white,
  },
  flash: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallback: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: Colors.background,
    gap: 20,
  },
  perm: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700',
  },
});
