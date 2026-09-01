import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';

const ICONS: Array<keyof typeof Ionicons.glyphMap> = [
  'sunny-outline',
  'moon-outline',
  'alarm-outline',
  'cafe-outline',
  'cloudy-outline',
  'bed-outline',
  'fitness-outline',
  'camera-outline',
];

export function PatternBackground() {
  const tiles = Array.from({ length: 48 });
  return (
    <View pointerEvents="none" style={styles.wrap}>
      {tiles.map((_, index) => (
        <Ionicons
          key={index}
          name={ICONS[index % ICONS.length]}
          size={18}
          color={Colors.pattern}
          style={[
            styles.icon,
            {
              left: (index % 6) * 68 + (index % 2 === 0 ? 12 : 28),
              top: Math.floor(index / 6) * 92 + (index % 3) * 8,
              transform: [{ rotate: `${(index % 5) * 12 - 18}deg` }],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  icon: {
    position: 'absolute',
  },
});
