import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Colors } from '../Assets/Colors';
import { Layout } from '../Assets/Layout';
import { tap } from '../Utils/haptics';

interface Props {
  onPress: () => void;
}

export function FloatingAddButton({ onPress }: Props) {
  return (
    <Pressable
      onPress={() => {
        tap();
        onPress();
      }}
      style={[styles.fab, Layout.shadow]}>
      <Ionicons name="add" size={32} color={Colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 22,
    bottom: 28,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
