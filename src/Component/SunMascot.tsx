import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

interface Props {
  size?: number;
  accessory?: 'flower' | 'crown' | 'chef' | 'plain' | 'glasses' | 'wink';
}

export function SunMascot({ size = 54, accessory = 'plain' }: Props) {
  const rays = Array.from({ length: 8 });
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {rays.map((_, index) => {
        const angle = (index * 45 * Math.PI) / 180;
        const x1 = 32 + Math.cos(angle) * 24;
        const y1 = 32 + Math.sin(angle) * 24;
        const x2 = 32 + Math.cos(angle) * 30;
        const y2 = 32 + Math.sin(angle) * 30;
        return (
          <Path
            key={index}
            d={`M${x1} ${y1} L${x2} ${y2}`}
            stroke="#F4B23E"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        );
      })}
      <Circle cx="32" cy="32" r="16" fill="#F6C445" />
      {accessory === 'wink' ? (
        <>
          <Path d="M26 30 Q28 28 30 30" stroke="#3A2A12" strokeWidth="2" fill="none" />
          <Circle cx="38" cy="30" r="1.6" fill="#3A2A12" />
        </>
      ) : (
        <>
          <Circle cx="27" cy="30" r="1.7" fill="#3A2A12" />
          <Circle cx="37" cy="30" r="1.7" fill="#3A2A12" />
        </>
      )}
      <Path d="M28 37 Q32 41 36 37" stroke="#3A2A12" strokeWidth="2" fill="none" strokeLinecap="round" />
      {accessory === 'flower' ? <Circle cx="44" cy="18" r="5" fill="#F48FB1" /> : null}
      {accessory === 'crown' ? (
        <Path d="M22 18 L26 12 L32 18 L38 12 L42 18 Z" fill="#F4C430" />
      ) : null}
      {accessory === 'chef' ? (
        <Ellipse cx="32" cy="14" rx="10" ry="6" fill="#FFF" />
      ) : null}
      {accessory === 'glasses' ? (
        <>
          <Circle cx="27" cy="30" r="5" stroke="#3A2A12" strokeWidth="1.6" fill="none" />
          <Circle cx="37" cy="30" r="5" stroke="#3A2A12" strokeWidth="1.6" fill="none" />
        </>
      ) : null}
    </Svg>
  );
}
