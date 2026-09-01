import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Path, Stop, Line } from 'react-native-svg';
import { Colors } from '../constants/Colors';
import { WakePoint } from '../constants/Types';
import { formatTime } from '../Utils/time';

interface Props {
  points: WakePoint[];
  width?: number;
  height?: number;
}

export function WakeChart({ points, width = 320, height = 160 }: Props) {
  const pad = 28;
  const minutes = points.map((p) => p.hour * 60 + p.minute);
  const min = Math.min(...minutes) - 10;
  const max = Math.max(...minutes) + 10;
  const xs = points.map((_, i) => pad + (i * (width - pad * 2)) / Math.max(points.length - 1, 1));
  const ys = minutes.map((m) => pad + ((max - m) / (max - min || 1)) * (height - pad * 2));
  const line = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ');
  const area = `${line} L${xs[xs.length - 1]},${height - 8} L${xs[0]},${height - 8} Z`;
  const active = 1;

  return (
    <View>
      <Svg width={width} height={height}>
        <Defs>
          <SvgGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={Colors.streak} stopOpacity="0.28" />
            <Stop offset="1" stopColor={Colors.streak} stopOpacity="0.02" />
          </SvgGradient>
        </Defs>
        <Path d={area} fill="url(#fill)" />
        <Path d={line} stroke={Colors.streak} strokeWidth={3} fill="none" />
        <Line
          x1={xs[active]}
          y1={12}
          x2={xs[active]}
          y2={height - 10}
          stroke={Colors.streak}
          strokeDasharray="4 6"
          strokeWidth={1.5}
        />
        <Circle cx={xs[active]} cy={ys[active]} r={6} fill={Colors.streak} />
      </Svg>
      <View style={[styles.tooltip, { left: Math.max(8, xs[active] - 54) }]}>
        <Text style={styles.tipTime}>{formatTime(points[active].hour, points[active].minute)}</Text>
        <Text style={styles.tipDate}>{points[active].dateLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    top: 8,
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  tipTime: {
    fontWeight: '800',
    color: Colors.text,
  },
  tipDate: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
});
