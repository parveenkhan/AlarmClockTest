import Svg, { Path, Polygon } from 'react-native-svg';
import { Colors } from '../constants/Colors';

export function LaurelStars({ size = 54 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <Path
        d="M18 50 C8 40 8 24 18 16 C16 28 18 38 26 46"
        stroke="#C4A15A"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M46 50 C56 40 56 24 46 16 C48 28 46 38 38 46"
        stroke="#C4A15A"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {[0, 1, 2, 3, 4].map((index) => {
        const x = 18 + index * 7;
        const y = 24 + Math.abs(2 - index) * 1.2;
        return (
          <Polygon
            key={index}
            points={`${x + 4},${y} ${x + 5.2},${y + 3.4} ${x + 8.8},${y + 3.4} ${x + 5.8},${y + 5.6} ${x + 7},${y + 9} ${x + 4},${y + 7} ${x + 1},${y + 9} ${x + 2.2},${y + 5.6} ${x - 0.8},${y + 3.4} ${x + 2.8},${y + 3.4}`}
            fill={Colors.gold}
          />
        );
      })}
    </Svg>
  );
}
