import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { ONBOARDING_TOTAL } from '../constants/Onboarding';
import { NavigationController } from '../NavigationController/NavigationController';

interface Props {
  step: number;
  showLang?: boolean;
  onLang?: () => void;
  languageFlag?: string;
}

export function OnboardingHeader({ step, showLang, onLang, languageFlag = '🇺🇸' }: Props) {
  return (
    <View style={styles.wrap}>
      <Pressable onPress={NavigationController.goBack} style={styles.back}>
        <Ionicons name="chevron-back" size={20} color={Colors.text} />
      </Pressable>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.min(100, (step / ONBOARDING_TOTAL) * 100)}%` }]} />
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
    backgroundColor: Colors.orange,
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
