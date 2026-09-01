import { useState } from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../constants/Colors';

interface Props {
  onChange: (path: string) => void;
}

export function SignaturePad({ onChange }: Props) {
  const [paths, setPaths] = useState<string[]>([]);
  const [current, setCurrent] = useState('');

  const responder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      setCurrent(`M${locationX},${locationY}`);
    },
    onPanResponderMove: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      setCurrent((prev) => `${prev} L${locationX},${locationY}`);
    },
    onPanResponderRelease: () => {
      setPaths((prev) => {
        const next = current ? [...prev, current] : prev;
        onChange(next.join(' '));
        return next;
      });
      setCurrent('');
    },
  });

  return (
    <View style={styles.pad} {...responder.panHandlers}>
      <Svg style={StyleSheet.absoluteFill}>
        {paths.map((d, index) => (
          <Path key={index} d={d} stroke={Colors.text} strokeWidth={3} fill="none" strokeLinecap="round" />
        ))}
        {current ? <Path d={current} stroke={Colors.text} strokeWidth={3} fill="none" strokeLinecap="round" /> : null}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  pad: {
    height: 180,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
});
