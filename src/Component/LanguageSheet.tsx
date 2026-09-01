import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../Assets/Colors';
import { LANGUAGES } from '../Assets/Onboarding';

interface Props {
  visible: boolean;
  selected: string;
  onClose: () => void;
  onSelect: (id: string) => void;
}

export function LanguageSheet({ visible, selected, onClose, onSelect }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <View style={styles.head}>
          <Pressable onPress={onClose} style={styles.close}>
            <Ionicons name="close" size={18} color={Colors.text} />
          </Pressable>
          <Text style={styles.title}>Language</Text>
          <View style={{ width: 36 }} />
        </View>
        {LANGUAGES.map((lang) => {
          const on = lang.id === selected;
          return (
            <Pressable
              key={lang.id}
              onPress={() => {
                onSelect(lang.id);
                onClose();
              }}
              style={styles.row}>
              <Text style={styles.flag}>{lang.flag}</Text>
              <Text style={styles.label}>{lang.label}</Text>
              {on ? (
                <View style={styles.check}>
                  <Ionicons name="checkmark" size={14} color={Colors.white} />
                </View>
              ) : (
                <View style={styles.radio} />
              )}
            </Pressable>
          );
        })}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 28,
    paddingHorizontal: 16,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D8D8DC',
    alignSelf: 'center',
    marginTop: 8,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  close: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFEFF2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
    gap: 12,
  },
  flag: {
    fontSize: 22,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#C8C8CC',
  },
});
