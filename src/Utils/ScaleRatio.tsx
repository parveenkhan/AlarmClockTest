import { Dimensions, PixelRatio } from 'react-native';

const { width } = Dimensions.get('window');
const BASE_WIDTH = 390;

export function scale(size: number) {
  return PixelRatio.roundToNearestPixel((width / BASE_WIDTH) * size);
}

export default { scale };
