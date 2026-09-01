import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../components/Screen';
import { PrimaryButton } from '../../components/PrimaryButton';
import { PlanHeroCard } from '../../components/PlanHeroCard';
import { Colors } from '../../constants/Colors';
import { PLAN_QUOTES } from '../../constants/Onboarding';
import { getMission } from '../../constants/Missions';
import { useAppSelector } from '../../Redux/hooks';
import { NavigationController } from '../../NavigationController/NavigationController';

const DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function PlanPreviewScreen() {
  const onboarding = useAppSelector((s) => s.onboarding);
  const mission = getMission(onboarding.onboardingMission);
  const days = onboarding.days.length ? onboarding.days : [1, 2, 3, 4, 5];
  const times = days.length === 7 ? 7 : days.length;

  return (
    <Screen patterned={false} edges={['top', 'bottom']} style={{ backgroundColor: Colors.onboarding }}>
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <PlanHeroCard hour={onboarding.idealHour} minute={onboarding.idealMinute} mission={mission.title} />
        <Ionicons name="chevron-down" size={16} color="#C8C8CC" style={{ alignSelf: 'center', marginVertical: 10 }} />
        <View style={styles.card}>
          <Text style={styles.title}>Rise and repeat.</Text>
          <Text style={styles.sub}>Your alarm fires {times}x a week. Build the streak.</Text>
          <View style={styles.days}>
            {DAY_LETTERS.map((letter, index) => {
              const on = days.includes(index);
              return (
                <View key={`${letter}-${index}`} style={[styles.day, on && styles.dayOn]}>
                  <Text style={[styles.dayText, on && styles.dayTextOn]}>{letter}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <Ionicons name="chevron-down" size={16} color="#C8C8CC" style={{ alignSelf: 'center', marginVertical: 10 }} />
        <Text style={styles.kicker}>OTHERS LIKE YOU</Text>
        {PLAN_QUOTES.map((item) => (
          <View key={item.name} style={styles.quote}>
            <View style={styles.quoteHead}>
              <View style={[styles.avatar, { backgroundColor: item.tint }]}>
                <Text style={styles.initials}>{item.initials}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.stars}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Ionicons key={index} name="star" size={12} color="#F5A623" />
                  ))}
                  <Text style={styles.rating}>5.0</Text>
                </View>
              </View>
            </View>
            <Text style={styles.copy}>“{item.quote}”</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.cta}>
        <PrimaryButton title="Start my plan" onPress={() => NavigationController.navigate('Referral')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
  },
  sub: {
    marginTop: 6,
    color: Colors.textSecondary,
    fontSize: 15,
  },
  days: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  day: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#D8D8DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayOn: {
    borderColor: Colors.black,
    backgroundColor: Colors.black,
  },
  dayText: {
    fontWeight: '700',
    color: Colors.text,
  },
  dayTextOn: {
    color: Colors.white,
  },
  kicker: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 0.8,
    marginBottom: 10,
    textAlign: 'center',
  },
  quote: {
    backgroundColor: Colors.white,
    borderRadius: 22,
    padding: 16,
    marginBottom: 10,
  },
  quoteHead: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontWeight: '800',
    fontSize: 13,
  },
  name: {
    fontWeight: '800',
    fontSize: 15,
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 2,
  },
  rating: {
    marginLeft: 6,
    fontWeight: '700',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  copy: {
    marginTop: 10,
    color: Colors.textSecondary,
    lineHeight: 20,
    fontSize: 14,
  },
  cta: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
});
