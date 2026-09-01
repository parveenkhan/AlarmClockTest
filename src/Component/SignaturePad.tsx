import { useRef, useState } from 'react';
import { PanResponder, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../Assets/Colors';

interface Props {
  onChange: (path: string) => void;
}

export function SignaturePad({ onChange }: Props) {
  const [paths, setPaths] = useState<string[]>([]);
  const [current, setCurrent] = useState('');
  const currentRef = useRef('');
  const pathsRef = useRef<string[]>([]);

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        const next = `M${locationX},${locationY}`;
        currentRef.current = next;
        setCurrent(next);
      },
      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        const next = `${currentRef.current} L${locationX},${locationY}`;
        currentRef.current = next;
        setCurrent(next);
      },
      onPanResponderRelease: () => {
        const stroke = currentRef.current;
        const next = stroke ? [...pathsRef.current, stroke] : pathsRef.current;
        pathsRef.current = next;
        setPaths(next);
        setCurrent('');
        currentRef.current = '';
        onChange(next.join(' '));
      },
    }),
  ).current;

  const empty = paths.length === 0 && !current;

  return (
    <View style={styles.pad} {...responder.panHandlers}>
      {empty ? (
        <View pointerEvents="none" style={styles.placeholder}>
          <Text style={styles.signHere}>Sign here</Text>
          <Text style={styles.caption}>your commitment to wake up</Text>
        </View>
      ) : null}
      <Svg style={StyleSheet.absoluteFill}>
        {paths.map((d, index) => (
          <Path key={index} d={d} stroke={Colors.text} strokeWidth={3.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {current ? (
          <Path d={current} stroke={Colors.text} strokeWidth={3.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        ) : null}
      </Svg>
      <View pointerEvents="none" style={styles.lineRow}>
        <Text style={styles.x}>x</Text>
        <View style={styles.line} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pad: {
    height: 280,
    borderRadius: 28,
    backgroundColor: '#EEEEF0',
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 28,
  },
  signHere: {
    fontSize: 34,
    fontWeight: '800',
    color: '#B8B8BE',
  },
  caption: {
    marginTop: 6,
    fontSize: 16,
    color: '#C4C4CA',
    fontWeight: '500',
  },
  lineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingBottom: 28,
    gap: 8,
  },
  x: {
    fontSize: 18,
    color: '#C8C8CE',
    fontWeight: '500',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D5D5DA',
  },
});
