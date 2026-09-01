import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OnboardingFrame } from '../../Component/OnboardingFrame';
import { SignaturePad } from '../../Component/SignaturePad';
import { Colors } from '../../Assets/Colors';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setSignature } from '../../Redux/Actions/Onboarding.Action';
import { NavigationController } from '../../Navigation/NavigationService';
import { formatTime } from '../../Utils/time';
import { success } from '../../Utils/haptics';

export default function CommitmentScreen() {
  const onboarding = useAppSelector((s) => s.onboarding);
  const dispatch = useAppDispatch();
  const signed = onboarding.signature.length > 8;
  const [committed, setCommitted] = useState(signed);
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!committed) return;
    Animated.loop(
      Animated.timing(pulse, {
        toValue: 1,
        duration: 1400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ).start();
  }, [committed, pulse]);

  const lockIn = () => {
    if (committed) return;
    setCommitted(true);
    success();
  };

  return (
    <OnboardingFrame
      step={27}
      disabled={!committed}
      buttonTitle={committed ? 'Continue' : '✓  I Commit'}
      onContinue={() => NavigationController.navigate('BuildingPlan')}>
      <Text style={styles.title}>Lock in your commitment</Text>
      <Text style={styles.sub}>
        Sign below to put the phone down and get up at {formatTime(onboarding.idealHour, onboarding.idealMinute)}.
      </Text>
      <View style={[styles.wrap, committed && styles.wrapOn]}>
        <SignaturePad
          onChange={(path) => {
            dispatch(setSignature(path));
            if (path.length > 8) lockIn();
          }}
        />
        {committed ? (
          <View pointerEvents="none" style={styles.success}>
            {[0, 1, 2].map((index) => (
              <Animated.View
                key={index}
                style={[
                  styles.ring,
                  {
                    transform: [
                      {
                        scale: pulse.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1 + index * 0.15, 1.55 + index * 0.25],
                        }),
                      },
                    ],
                    opacity: pulse.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.35 - index * 0.08, 0],
                    }),
                  },
                ]}
              />
            ))}
            <View style={styles.check}>
              <Ionicons name="checkmark" size={32} color={Colors.white} />
            </View>
          </View>
        ) : null}
      </View>
    </OnboardingFrame>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.6,
    textAlign: 'center',
  },
  sub: {
    marginTop: 10,
    marginBottom: 22,
    color: Colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  wrap: {
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  wrapOn: {
    borderColor: '#34C759',
  },
  success: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: 'rgba(52,199,89,0.18)',
  },
  check: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
