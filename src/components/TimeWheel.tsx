import { useMemo, useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { formatTime } from '../Utils/time';

interface Props {
  hour: number;
  minute: number;
  onChange: (hour: number, minute: number) => void;
}

const ITEM = 40;

function to12(hour24: number) {
  const period = hour24 >= 12 ? 1 : 0;
  const h = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return { h, period };
}

function to24(h12: number, period: number) {
  if (period === 0) return h12 === 12 ? 0 : h12;
  return h12 === 12 ? 12 : h12 + 12;
}

function Wheel({
  values,
  index,
  onIndex,
}: {
  values: string[];
  index: number;
  onIndex: (i: number) => void;
}) {
  const ref = useRef<ScrollView>(null);
  return (
    <ScrollView
      ref={ref}
      style={styles.wheel}
      showsVerticalScrollIndicator={false}
      snapToInterval={ITEM}
      decelerationRate="fast"
      contentContainerStyle={{ paddingVertical: ITEM * 2 }}
      onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const i = Math.round(e.nativeEvent.contentOffset.y / ITEM);
        onIndex(Math.max(0, Math.min(values.length - 1, i)));
      }}
      onLayout={() => ref.current?.scrollTo({ y: index * ITEM, animated: false })}>
      {values.map((value, i) => (
        <View key={value + i} style={styles.item}>
          <Text style={[styles.itemText, i === index && styles.itemOn]}>{value}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

export function TimeWheel({ hour, minute, onChange }: Props) {
  const { h, period } = to12(hour);
  const hours = useMemo(() => Array.from({ length: 12 }, (_, i) => String(i + 1)), []);
  const minutes = useMemo(() => Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')), []);
  const periods = ['AM', 'PM'];

  return (
    <View>
      <Text style={styles.big}>{formatTime(hour, minute)}</Text>
      <View style={styles.row}>
        <View style={styles.highlight} pointerEvents="none" />
        <Wheel
          values={hours}
          index={h - 1}
          onIndex={(i) => onChange(to24(i + 1, period), minute)}
        />
        <Wheel
          values={minutes}
          index={minute}
          onIndex={(i) => onChange(hour, i)}
        />
        <Wheel
          values={periods}
          index={period}
          onIndex={(i) => onChange(to24(h, i), minute)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  big: {
    textAlign: 'center',
    fontSize: 42,
    fontWeight: '800',
    marginBottom: 16,
    letterSpacing: -1,
  },
  row: {
    height: ITEM * 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  highlight: {
    position: 'absolute',
    left: 12,
    right: 12,
    top: ITEM * 2,
    height: ITEM,
    borderRadius: 12,
    backgroundColor: '#ECECEF',
  },
  wheel: {
    width: 80,
  },
  item: {
    height: ITEM,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 20,
    color: '#C5C5C8',
    fontWeight: '600',
  },
  itemOn: {
    color: Colors.text,
    fontWeight: '800',
  },
});
