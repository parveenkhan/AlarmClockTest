import { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingFrame } from '../../Component/OnboardingFrame';
import { OptionCard } from '../../Component/OptionCard';
import { LanguageSheet } from '../../Component/LanguageSheet';
import { Colors } from '../../Assets/Colors';
import { LANGUAGES, QUIZZES } from '../../Assets/Onboarding';
import { RootStackParamList } from '../../Navigation/types';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setAnswer, setLanguage } from '../../Redux/Actions/Onboarding.Action';
import { NavigationController } from '../../Navigation/NavigationService';
import { nextQuiz } from '../../Utils/onboardingFlow';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

export default function QuizScreen({ route }: Props) {
  const quiz = QUIZZES[route.params.id];
  const value = useAppSelector((s) => s.onboarding.answers[quiz.id]);
  const language = useAppSelector((s) => s.onboarding.language);
  const dispatch = useAppDispatch();
  const [langOpen, setLangOpen] = useState(false);
  const flag = LANGUAGES.find((l) => l.id === language)?.flag ?? '🇺🇸';

  return (
    <OnboardingFrame
      step={quiz.step}
      showLang={quiz.showLang}
      languageFlag={flag}
      onLang={() => setLangOpen(true)}
      disabled={!value}
      onContinue={() => {
        const dest = nextQuiz(quiz.id);
        NavigationController.navigate(dest.name as any, dest.params as any);
      }}>
      <Text style={styles.title}>{quiz.title}</Text>
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {quiz.options.map((option) => (
          <OptionCard
            key={option}
            label={option}
            selected={value === option}
            onPress={() => dispatch(setAnswer({ id: quiz.id, value: option }))}
          />
        ))}
      </ScrollView>
      <LanguageSheet
        visible={langOpen}
        selected={language}
        onClose={() => setLangOpen(false)}
        onSelect={(id) => dispatch(setLanguage(id))}
      />
    </OnboardingFrame>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.7,
    marginBottom: 22,
  },
  list: {
    gap: 12,
    paddingBottom: 16,
  },
});
