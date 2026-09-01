import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { Colors } from '../Assets/Colors';
import { tap } from '../Utils/haptics';

interface Props {
  title: string;
  onPress: () => void;
  dark?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export function PrimaryButton({ title, onPress, dark = true, disabled, style }: Props) {
  const look = disabled ? 'disabled' : dark ? 'dark' : 'light';
  return (
    <Pressable
      disabled={disabled}
      onPress={() => {
        tap();
        onPress();
      }}
      style={[styles.btn, styles[look], style]}>
      <Text
        style={[
          styles.label,
          look === 'dark' ? styles.darkLabel : look === 'light' ? styles.lightLabel : styles.disabledLabel,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dark: {
    backgroundColor: Colors.black,
  },
  light: {
    backgroundColor: Colors.cream,
  },
  disabled: {
    backgroundColor: Colors.disabled,
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
  },
  darkLabel: {
    color: Colors.white,
  },
  lightLabel: {
    color: Colors.text,
  },
  disabledLabel: {
    color: Colors.disabledText,
  },
});
