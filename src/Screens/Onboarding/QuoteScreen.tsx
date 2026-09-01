import { StyleSheet, Text, View } from 'react-native';
import { OnboardingFrame } from '../../components/OnboardingFrame';
import { Colors } from '../../constants/Colors';
import { NavigationController } from '../../NavigationController/NavigationController';

export default function QuoteScreen() {
  return (
    <OnboardingFrame step={16} onContinue={() => NavigationController.navigate('Biology')}>
      <View style={styles.center}>
        <Text style={styles.mark}>“</Text>
        <Text style={styles.quote}>If you win the morning, you win the day.</Text>
        <Text style={styles.author}>Tim Ferriss</Text>
      </View>
    </OnboardingFrame>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  mark: {
    fontSize: 64,
    color: '#E8C581',
    lineHeight: 64,
  },
  quote: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  author: {
    marginTop: 14,
    color: Colors.textSecondary,
    fontSize: 16,
  },
});
