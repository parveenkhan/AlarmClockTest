import { StyleSheet, Text, View } from 'react-native';
import * as Speech from 'expo-speech';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../Component/Screen';
import { PrimaryButton } from '../../Component/PrimaryButton';
import { Colors } from '../../Assets/Colors';
import { AFFIRMATIONS, BIBLE_VERSES } from '../../Assets/Missions';
import { RootStackParamList } from '../../Navigation/types';
import { NavigationController } from '../../Navigation/NavigationService';

type Props = NativeStackScreenProps<RootStackParamList, 'ReadAloudMission'>;

export default function ReadAloudMissionScreen({ route }: Props) {
  const isBible = route.params.missionId === 'bible';
  const text = isBible ? BIBLE_VERSES[0] : AFFIRMATIONS[0];

  return (
    <Screen>
      <View style={styles.body}>
        <Text style={styles.kicker}>{isBible ? 'READ ALOUD' : 'AFFIRMATION'}</Text>
        <Text style={styles.verse}>{text}</Text>
      </View>
      <View style={{ padding: 20, gap: 12 }}>
        <PrimaryButton title="Hear it" onPress={() => Speech.speak(text)} dark={false} />
        <PrimaryButton
          title="I read it"
          onPress={() => NavigationController.replace('MissionSuccess', { alarmId: route.params.alarmId })}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  kicker: {
    letterSpacing: 1.6,
    color: Colors.goldMuted,
    fontWeight: '800',
    textAlign: 'center',
  },
  verse: {
    marginTop: 18,
    fontSize: 24,
    lineHeight: 34,
    fontWeight: '700',
    textAlign: 'center',
    color: Colors.text,
  },
});
