import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../Assets/Colors';
import { ONBOARDING_TOTAL } from '../Assets/Onboarding';
import { NavigationController } from '../Navigation/NavigationService';

interface Props {
  step: number;
  showLang?: boolean;
  onLang?: () => void;
  languageFlag?: string;
  hideBack?: boolean;
}

export function OnboardingHeader({ step, showLang, onLang, languageFlag = '🇺🇸', hideBack }: Props) {
  const pct = Math.min(100, (step / ONBOARDING_TOTAL) * 100);
  return (
    <View style={styles.wrap}>
      {hideBack ? (
        <View style={{ width: 36 }} />
      ) : (
        <Pressable onPress={NavigationController.goBack} style={styles.back}>
          <Ionicons name="chevron-back" size={20} color={Colors.text} />
        </Pressable>
      )}
      <View style={styles.track}>
        <LinearGradient
          colors={['#F5A623', '#C46A2C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fill, { width: `${pct}%` }]}
        />
      </View>
      {showLang ? (
        <Pressable onPress={onLang} style={styles.flag}>
          <Text style={{ fontSize: 16 }}>{languageFlag}</Text>
        </Pressable>
      ) : (
        <View style={{ width: 36 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 8,
    gap: 10,
  },
  back: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EDEDED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  track: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E8E8EA',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
  },
  flag: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
