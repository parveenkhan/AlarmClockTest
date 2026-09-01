import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen } from './Screen';
import { OnboardingHeader } from './OnboardingHeader';
import { PrimaryButton } from './PrimaryButton';
import { Colors } from '../constants/Colors';

interface Props {
  step: number;
  children: ReactNode;
  onContinue: () => void;
  disabled?: boolean;
  showLang?: boolean;
  onLang?: () => void;
  languageFlag?: string;
  buttonTitle?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
  hideBack?: boolean;
}

export function OnboardingFrame({
  step,
  children,
  onContinue,
  disabled,
  showLang,
  onLang,
  languageFlag,
  buttonTitle = 'Continue',
  hideHeader,
  hideFooter,
  hideBack,
}: Props) {
  return (
    <Screen patterned={false} style={{ backgroundColor: Colors.onboarding }}>
      {hideHeader ? null : (
        <OnboardingHeader
          step={step}
          showLang={showLang}
          onLang={onLang}
          languageFlag={languageFlag}
          hideBack={hideBack}
        />
      )}
      <View style={styles.body}>{children}</View>
      {hideFooter ? null : (
        <View style={styles.footer}>
          <PrimaryButton title={buttonTitle} onPress={onContinue} disabled={disabled} />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 18,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
});
