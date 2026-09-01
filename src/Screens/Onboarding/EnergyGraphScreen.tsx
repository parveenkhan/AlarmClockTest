import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Circle, Text as SvgText } from 'react-native-svg';
import { OnboardingFrame } from '../../components/OnboardingFrame';
import { Colors } from '../../constants/Colors';
import { NavigationController } from '../../NavigationController/NavigationController';

export default function EnergyGraphScreen() {
  return (
    <OnboardingFrame step={6} onContinue={() => NavigationController.navigate('Quiz', { id: 'alarmCount' })}>
      <Text style={styles.title}>Wayk gets you out of bed</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Morning Energy Levels</Text>
        <Svg width="100%" height={180} viewBox="0 0 300 180">
          <Path d="M16 70 C 40 40, 55 100, 70 70 S 100 110, 118 72 S 150 40, 168 90 L 286 28" fill="none" stroke="#E07A6A" strokeWidth="4" />
          <Circle cx="286" cy="28" r="5" fill="none" stroke="#E07A6A" strokeWidth="3" />
          <Path d="M168 90 L 286 28 L 286 150 L 168 150 Z" fill="rgba(224,122,106,0.12)" />
          <SvgText x="78" y="128" fill="#E07A6A" fontSize="11" fontWeight="700">
            Snooze Cycle
          </SvgText>
          <SvgText x="198" y="142" fill="#E07A6A" fontSize="11" fontWeight="700">
            GROGGY ZONE
          </SvgText>
        </Svg>
      </View>
    </OnboardingFrame>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 22,
    letterSpacing: -0.6,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 16,
  },
  cardTitle: {
    fontWeight: '700',
    marginBottom: 8,
  },
});
