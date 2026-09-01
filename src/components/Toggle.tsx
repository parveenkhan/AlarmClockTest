import { Pressable, StyleSheet, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { tap } from '../Utils/haptics';

interface Props {
  value: boolean;
  onValueChange: (next: boolean) => void;
}

export function Toggle({ value, onValueChange }: Props) {
  return (
    <Pressable
      onPress={() => {
        tap();
        onValueChange(!value);
      }}
      style={[styles.track, value ? styles.on : styles.off]}>
      <View style={[styles.thumb, value ? styles.thumbOn : styles.thumbOff]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 52,
    height: 32,
    borderRadius: 16,
    padding: 2,
    justifyContent: 'center',
  },
  on: {
    backgroundColor: Colors.green,
    alignItems: 'flex-end',
  },
  off: {
    backgroundColor: '#E4E1DA',
    alignItems: 'flex-start',
  },
  thumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  thumbOn: {},
  thumbOff: {},
});
