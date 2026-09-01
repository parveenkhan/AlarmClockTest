import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';
import { Colors } from '../Assets/Colors';
import { formatTime, monthDayUpper } from '../Utils/time';

interface Props {
  hour: number;
  minute: number;
  mission: string;
}

export function PlanHeroCard({ hour, minute, mission }: Props) {
  return (
    <View style={styles.card}>
      <Svg width="100%" height={220} viewBox="0 0 340 220" preserveAspectRatio="xMidYMid slice">
        <Rect width="340" height="220" fill="#F4B85A" />
        <Path d="M0 0 L340 0 L340 120 Q240 86 170 118 T0 96 Z" fill="#F7C97A" />
        <Path d="M0 118 Q80 90 150 124 T340 108 L340 220 L0 220 Z" fill="#4F8F88" />
        <Ellipse cx="170" cy="210" rx="220" ry="46" fill="#3E7A74" />
        <Path d="M0 150 L64 132 L110 152 L168 126 L230 150 L286 128 L340 146 L340 220 L0 220 Z" fill="#7FA56A" />
        <Circle cx="210" cy="86" r="40" fill="#F6D56A" />
        <Circle cx="198" cy="80" r="4.5" fill="#3A2A12" />
        <Circle cx="224" cy="80" r="4.5" fill="#3A2A12" />
        <Path d="M198 98 Q211 110 224 98" stroke="#3A2A12" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <Path d="M40 176 L118 160 L118 220 L40 220 Z" fill="#8B5A32" />
        <Rect x="112" y="154" width="12" height="66" fill="#6E4526" />
        <Path d="M118 158 Q186 146 208 176" stroke="#2E2A26" strokeWidth="2.4" fill="none" />
        <Circle cx="214" cy="178" r="6" fill="#E8E4DC" />
        <Path d="M250 168 Q262 150 274 168 Q262 160 250 168" fill="#D9E8F2" />
      </Svg>
      <View style={styles.overlay}>
        <Text style={styles.date}>{monthDayUpper()}</Text>
        <View style={styles.bottom}>
          <View>
            <Text style={styles.time}>{formatTime(hour, minute).replace(' ', ' ').toLowerCase()}</Text>
            <Text style={styles.mission}>{mission}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>No. 1</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 220,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#F4B85A',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 18,
    justifyContent: 'space-between',
  },
  date: {
    color: Colors.white,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  time: {
    color: Colors.white,
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -0.8,
    textTransform: 'lowercase',
  },
  mission: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.28)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  badgeText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 13,
  },
});
