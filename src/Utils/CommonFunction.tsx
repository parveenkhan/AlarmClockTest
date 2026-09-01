import { Dimensions, Alert } from 'react-native';

const { width, height } = Dimensions.get('window');

export function singleAlert(title: string, message?: string) {
  Alert.alert(title, message);
}

export function isEmpty(value: unknown) {
  return value === undefined || value === null || value === '';
}

export const screenWidth = width;
export const screenHeight = height;

export default { singleAlert, isEmpty, screenWidth, screenHeight };
