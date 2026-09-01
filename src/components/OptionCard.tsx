import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function OptionCard({ label, selected, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.card, selected && styles.selected]}>
      <Text style={[styles.label, selected && styles.labelOn, !selected && styles.labelOff]}>{label}</Text>
      {selected ? (
        <View style={styles.check}>
          <Ionicons name="checkmark" size={14} color={Colors.white} />
        </View>
      ) : (
        <View style={styles.radio} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    minHeight: 58,
    borderRadius: 18,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: Colors.black,
  },
  label: {
    fontSize: 17,
    flex: 1,
    paddingRight: 12,
  },
  labelOn: {
    color: Colors.text,
    fontWeight: '700',
  },
  labelOff: {
    color: Colors.text,
    fontWeight: '500',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#C8C8CC',
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
