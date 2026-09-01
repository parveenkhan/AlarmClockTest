import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../Assets/Colors';

interface Props {
  question: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function QuizOptions({ question, options, value, onChange }: Props) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.q}>{question}</Text>
      <View style={{ gap: 12, marginTop: 28 }}>
        {options.map((option) => {
          const active = option === value;
          return (
            <Pressable key={option} onPress={() => onChange(option)} style={[styles.option, active && styles.active]}>
              <Text style={[styles.label, active && styles.activeLabel]}>{option}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  q: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.6,
  },
  option: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    minHeight: 58,
    paddingHorizontal: 18,
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  active: {
    borderColor: Colors.text,
  },
  label: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text,
  },
  activeLabel: {
    fontWeight: '800',
  },
});
