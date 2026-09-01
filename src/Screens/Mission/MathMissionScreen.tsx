import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { Colors } from '../../constants/Colors';
import { RootStackParamList } from '../../Navigation/types';
import { NavigationController } from '../../NavigationController/NavigationController';
import { warn } from '../../Utils/haptics';

type Props = NativeStackScreenProps<RootStackParamList, 'MathMission'>;

function makeProblems() {
  return Array.from({ length: 3 }, () => {
    const a = 7 + Math.floor(Math.random() * 12);
    const b = 3 + Math.floor(Math.random() * 9);
    return { a, b, answer: a + b };
  });
}

export default function MathMissionScreen({ route }: Props) {
  const variant = route.params.variant ?? 'math';
  const problems = useMemo(makeProblems, []);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState('');
  const phrase = 'I am awake and I get up now';
  const [typed, setTyped] = useState('');
  const [seq] = useState(() => [0, 2, 1, 3]);
  const [tapped, setTapped] = useState<number[]>([]);

  const complete = () => NavigationController.replace('MissionSuccess', { alarmId: route.params.alarmId });

  if (variant === 'typing') {
    return (
      <Screen>
        <View style={styles.body}>
          <Text style={styles.title}>Type this exactly</Text>
          <Text style={styles.phrase}>{phrase}</Text>
          <TextInput value={typed} onChangeText={setTyped} autoCapitalize="none" style={styles.input} />
          <Pressable
            onPress={() => (typed.trim() === phrase ? complete() : warn())}
            style={styles.btn}>
            <Text style={styles.btnText}>Submit</Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  if (variant === 'memory') {
    return (
      <Screen>
        <View style={styles.body}>
          <Text style={styles.title}>Repeat the sequence</Text>
          <Text style={styles.sub}>Tap 1 · 3 · 2 · 4</Text>
          <View style={styles.grid}>
            {[0, 1, 2, 3].map((n) => (
              <Pressable
                key={n}
                onPress={() => {
                  const next = [...tapped, n];
                  setTapped(next);
                  if (next.length === seq.length) {
                    const ok = next.every((v, i) => v === seq[i]);
                    ok ? complete() : (warn(), setTapped([]));
                  }
                }}
                style={[styles.cell, { backgroundColor: ['#F6C445', '#7EC8E3', '#E07A2F', '#7BC67E'][n] }]}>
                <Text style={styles.cellText}>{n + 1}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Screen>
    );
  }

  const current = problems[index];
  return (
    <Screen>
      <View style={styles.body}>
        <Text style={styles.title}>Solve to wake up</Text>
        <Text style={styles.problem}>
          {current.a} + {current.b}
        </Text>
        <TextInput
          value={value}
          onChangeText={setValue}
          keyboardType="number-pad"
          style={styles.input}
          placeholder="Answer"
        />
        <Pressable
          onPress={() => {
            if (Number(value) === current.answer) {
              if (index + 1 >= problems.length) complete();
              else {
                setIndex(index + 1);
                setValue('');
              }
            } else warn();
          }}
          style={styles.btn}>
          <Text style={styles.btnText}>Check</Text>
        </Pressable>
        <Text style={styles.sub}>{index + 1} / {problems.length}</Text>
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
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  problem: {
    marginTop: 24,
    fontSize: 56,
    fontWeight: '800',
    textAlign: 'center',
  },
  phrase: {
    marginTop: 18,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700',
  },
  input: {
    marginTop: 20,
    backgroundColor: Colors.white,
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 20,
    textAlign: 'center',
  },
  btn: {
    marginTop: 16,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: Colors.white,
    fontWeight: '800',
    fontSize: 16,
  },
  sub: {
    marginTop: 16,
    textAlign: 'center',
    color: Colors.textSecondary,
    fontWeight: '700',
  },
  grid: {
    marginTop: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  cell: {
    width: 140,
    height: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.white,
  },
});
