import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../Assets/Colors';
import { monthDayUpper } from '../Utils/time';

interface Props {
  compact?: boolean;
  onShare?: () => void;
}

export function WakeReceipt({ compact, onShare }: Props) {
  return (
    <View style={[styles.card, compact && styles.compact]}>
      <Svg width="100%" height={compact ? 150 : 180} viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">
        <Rect width="320" height="180" fill="#F2C56B" />
        <Path d="M0 70 Q80 40 160 78 T320 58 L320 180 L0 180 Z" fill="#E8A54A" />
        <Path d="M0 110 Q90 86 180 120 T320 100 L320 180 L0 180 Z" fill="#4E8F8A" />
        <Ellipse cx="160" cy="168" rx="180" ry="38" fill="#3F7C78" />
        <Circle cx="168" cy="78" r="34" fill="#F6D56A" />
        <Circle cx="156" cy="74" r="4" fill="#3A2A12" />
        <Circle cx="180" cy="74" r="4" fill="#3A2A12" />
        <Path d="M156 90 Q168 100 180 90" stroke="#3A2A12" strokeWidth="3" fill="none" strokeLinecap="round" />
        <Path d="M0 128 L70 108 L118 128 L176 102 L230 126 L280 108 L320 122 L320 180 L0 180 Z" fill="#7A9A62" />
        <Path d="M40 150 L90 138 L90 180 L40 180 Z" fill="#8B5A32" />
        <Rect x="86" y="132" width="10" height="48" fill="#6E4526" />
        <Path d="M92 136 Q150 128 168 150" stroke="#2E2A26" strokeWidth="2" fill="none" />
        <Circle cx="168" cy="150" r="4" fill="#E8E4DC" />
      </Svg>
      <View style={styles.overlay}>
        <Text style={styles.date}>{monthDayUpper()}</Text>
        {onShare ? (
          <Pressable onPress={onShare} hitSlop={10}>
            <Ionicons name="share-outline" size={18} color={Colors.white} />
          </Pressable>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#F2C56B',
    height: 180,
  },
  compact: {
    height: 150,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    color: Colors.white,
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.6,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowRadius: 6,
  },
});
