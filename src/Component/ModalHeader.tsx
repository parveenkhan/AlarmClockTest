import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../Assets/Colors';
import { NavigationController } from '../Navigation/NavigationService';

interface Props {
  title: string;
  onClose?: () => void;
  right?: React.ReactNode;
}

export function ModalHeader({ title, onClose, right }: Props) {
  return (
    <View style={styles.row}>
      <Pressable onPress={onClose ?? NavigationController.goBack} style={styles.close}>
        <Ionicons name="close" size={20} color={Colors.text} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.right}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  close: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.chip,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
  right: {
    width: 36,
    alignItems: 'flex-end',
  },
});
