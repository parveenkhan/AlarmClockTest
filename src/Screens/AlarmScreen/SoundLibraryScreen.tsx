import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../Component/Screen';
import { ModalHeader } from '../../Component/ModalHeader';
import { Colors } from '../../Assets/Colors';
import { getSoundCategory } from '../../Assets/Sounds';
import { RootStackParamList } from '../../Navigation/types';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setSound } from '../../Redux/Actions/Alarm.Action';
import { NavigationController } from '../../Navigation/NavigationService';

type Props = NativeStackScreenProps<RootStackParamList, 'SoundLibrary'>;

export default function SoundLibraryScreen({ route }: Props) {
  const { alarmId, categoryId } = route.params;
  const category = getSoundCategory(categoryId);
  const selected = useAppSelector((s) => s.alarms.items.find((a) => a.id === alarmId)?.soundId);
  const dispatch = useAppDispatch();

  return (
    <Screen patterned={false}>
      <ModalHeader title={category.name} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {category.sounds.map((sound) => {
          const on = sound.id === selected;
          return (
            <Pressable
              key={sound.id}
              onPress={() => {
                dispatch(
                  setSound({
                    alarmId,
                    soundCategory: category.id,
                    soundId: sound.id,
                    soundName: sound.name,
                  }),
                );
                NavigationController.goBack();
              }}
              style={styles.row}>
              <View style={[styles.radio, on && styles.radioOn]}>
                {on ? <Ionicons name="checkmark" size={14} color={Colors.white} /> : null}
              </View>
              <Text style={styles.title}>{sound.name}</Text>
              <Ionicons name="play-circle-outline" size={22} color={Colors.textSecondary} />
            </Pressable>
          );
        })}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
});
