import { useEffect } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Screen } from '../../components/Screen';
import { Colors } from '../../constants/Colors';
import { NavigationController } from '../../NavigationController/NavigationController';

export default function SplashScreen() {
  useEffect(() => {
    const t = setTimeout(() => NavigationController.navigate('Quiz', { id: 'morningPerson' }), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <Screen patterned={false} style={{ backgroundColor: '#F4F6FA' }}>
      <Pressable style={styles.center} onPress={() => NavigationController.navigate('Quiz', { id: 'morningPerson' })}>
        <Text style={styles.brand}>Wayk</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    fontSize: 42,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -1,
  },
});
