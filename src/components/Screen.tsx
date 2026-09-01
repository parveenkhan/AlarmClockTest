import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import { PatternBackground } from './PatternBackground';

interface Props {
  children: ReactNode;
  patterned?: boolean;
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
  style?: ViewStyle;
}

export function Screen({ children, patterned = true, edges = ['top'], style }: Props) {
  return (
    <View style={[styles.root, style]}>
      {patterned ? <PatternBackground /> : null}
      <SafeAreaView style={styles.safe} edges={edges}>
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safe: {
    flex: 1,
  },
});
