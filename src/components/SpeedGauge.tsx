import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { Colors } from '../constants/Colors';

interface Props {
  onDone: () => void;
}

export function SpeedGauge({ onDone }: Props) {
  const progress = useRef(new Animated.Value(0)).current;
  const label = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 1800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) onDone();
    });
    const id = progress.addListener(({ value }) => {
      label.setValue(1 + value * 4);
    });
    return () => progress.removeListener(id);
  }, [label, onDone, progress]);

  const rotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '90deg'],
  });

  return (
    <View style={styles.card}>
      <Svg width={280} height={168} viewBox="0 0 280 168">
        <Path d="M36 148 A104 104 0 0 1 244 148" stroke="#E8E6E2" strokeWidth="18" fill="none" strokeLinecap="round" />
        <Path d="M36 148 A104 104 0 0 1 90 58" stroke="#F04A3A" strokeWidth="18" fill="none" strokeLinecap="round" />
        <Path d="M88 58 A104 104 0 0 1 140 44" stroke="#F5B942" strokeWidth="18" fill="none" />
        <Path d="M140 44 A104 104 0 0 1 192 58" stroke="#E8D38A" strokeWidth="18" fill="none" />
        <Path d="M190 58 A104 104 0 0 1 244 148" stroke="#C9D9A8" strokeWidth="18" fill="none" strokeLinecap="round" />
        {Array.from({ length: 17 }).map((_, index) => {
          const t = index / 16;
          const angle = Math.PI - t * Math.PI;
          const x1 = 140 + Math.cos(angle) * 86;
          const y1 = 148 - Math.sin(angle) * 86;
          const x2 = 140 + Math.cos(angle) * 96;
          const y2 = 148 - Math.sin(angle) * 96;
          return <Path key={index} d={`M${x1} ${y1} L${x2} ${y2}`} stroke="#D8D4CC" strokeWidth="1.5" />;
        })}
        <Circle cx="36" cy="148" r="8" fill="#F04A3A" />
      </Svg>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.needleWrap,
          { transform: [{ rotate }] },
        ]}>
        <View style={styles.needle} />
        <View style={styles.hub} />
      </Animated.View>
      <View pointerEvents="none" style={styles.valueWrap}>
        <AnimatedLabel value={label} />
        <Text style={styles.faster}>FASTER</Text>
      </View>
    </View>
  );
}

function AnimatedLabel({ value }: { value: Animated.Value }) {
  const text = useRef('');
  const node = useRef<Text>(null);
  useEffect(() => {
    const id = value.addListener(({ value: next }) => {
      text.current = `${next.toFixed(1)}x`;
      node.current?.setNativeProps({ text: text.current });
    });
    return () => value.removeListener(id);
  }, [value]);
  return (
    <Text ref={node} style={styles.value}>
      1.0x
    </Text>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 28,
    backgroundColor: '#ECECEF',
    borderRadius: 28,
    height: 250,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    paddingBottom: 18,
  },
  needleWrap: {
    position: 'absolute',
    bottom: 32,
    width: 16,
    height: 112,
    alignItems: 'center',
    transformOrigin: '50% 100%',
  },
  needle: {
    width: 4,
    flex: 1,
    backgroundColor: Colors.black,
    borderRadius: 2,
  },
  hub: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.black,
    marginTop: -6,
  },
  valueWrap: {
    position: 'absolute',
    bottom: 58,
    alignItems: 'center',
  },
  value: {
    fontSize: 42,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -1,
  },
  faster: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: '700',
    color: '#B0AEA8',
    letterSpacing: 1.4,
  },
});
