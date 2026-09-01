import { useEffect, useMemo, useState } from 'react';
import { ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../Component/Screen';
import { PrimaryButton } from '../../Component/PrimaryButton';
import { LaurelStars } from '../../Component/LaurelStars';
import { WakeReceipt } from '../../Component/WakeReceipt';
import { Colors } from '../../Assets/Colors';
import { getMission } from '../../Assets/Missions';
import { useAppSelector } from '../../Redux/hooks';
import { NavigationController } from '../../Navigation/NavigationService';
import { formatCountdownHMS, formatTime, nextAlarmDate, weekdayShort } from '../../Utils/time';

export default function MorningPlanScreen() {
  const onboarding = useAppSelector((s) => s.onboarding);
  const mission = getMission(onboarding.onboardingMission);
  const selectedDays = onboarding.days.length ? onboarding.days : [1, 2, 3, 4, 5];
  const target = useMemo(
    () => nextAlarmDate(onboarding.idealHour, onboarding.idealMinute, selectedDays, true) ?? new Date(),
    [onboarding.days, onboarding.idealHour, onboarding.idealMinute],
  );
  const [countdown, setCountdown] = useState(formatCountdownHMS(target));

  useEffect(() => {
    const id = setInterval(() => setCountdown(formatCountdownHMS(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const timeLabel = `${weekdayShort(target)} ${formatTime(onboarding.idealHour, onboarding.idealMinute)}`;

  return (
    <Screen patterned={false} edges={['top', 'bottom']} style={{ backgroundColor: Colors.onboarding }}>
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center' }}>
          <LaurelStars />
          <Text style={styles.title}>Your Morning Plan</Text>
          <Text style={styles.sub}>Here's what today looks like at {formatTime(onboarding.idealHour, onboarding.idealMinute)}</Text>
        </View>
        <View style={styles.pills}>
          <Pill icon="time-outline" label={`Starts in ${countdown}`} hot />
          <Pill icon="flash-outline" label={timeLabel} />
          <Pill icon="barbell-outline" label={mission.title} />
          <Pill icon="notifications-outline" label={onboarding.soundName} />
        </View>
        <Ionicons name="chevron-down" size={16} color="#C8C8CC" style={{ alignSelf: 'center', marginVertical: 8 }} />
        <View style={styles.card}>
          <Text style={styles.kicker}>HERE'S TODAY</Text>
          <TimelineItem icon="notifications" text={`${formatTime(onboarding.idealHour, onboarding.idealMinute)} — Alarm rings`} last={false} />
          <TimelineItem icon="barbell" text={`Complete ${mission.title}`} last={false} />
          <TimelineItem icon="checkmark" text="You're up. Day started." last green />
          <Text style={styles.footerCopy}>No snooze loops. One action, then your day starts with momentum.</Text>
        </View>
        <Ionicons name="chevron-down" size={16} color="#C8C8CC" style={{ alignSelf: 'center', marginVertical: 8 }} />
        <Text style={styles.kicker}>YOUR WAKE RECEIPT</Text>
        <WakeReceipt
          onShare={() => {
            Share.share({ message: `Up at ${formatTime(onboarding.idealHour, onboarding.idealMinute)} with Wayk.` }).catch(() => undefined);
          }}
        />
      </ScrollView>
      <View style={styles.cta}>
        <PrimaryButton title="Start my plan" onPress={() => NavigationController.navigate('PlanPreview')} />
      </View>
    </Screen>
  );
}

function Pill({ icon, label, hot }: { icon: keyof typeof Ionicons.glyphMap; label: string; hot?: boolean }) {
  return (
    <View style={[styles.pill, hot && styles.pillHot]}>
      <Ionicons name={icon} size={14} color={hot ? Colors.white : '#E38A2C'} />
      <Text style={[styles.pillText, hot && styles.pillTextHot]}>{label}</Text>
    </View>
  );
}

function TimelineItem({
  icon,
  text,
  last,
  green,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  last?: boolean;
  green?: boolean;
}) {
  return (
    <View style={styles.tlRow}>
      <View style={{ alignItems: 'center' }}>
        <View style={[styles.tlDot, green && styles.tlDotGreen]}>
          <Ionicons name={icon} size={13} color={Colors.white} />
        </View>
        {last ? null : <View style={styles.tlLine} />}
      </View>
      <Text style={styles.tlText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  title: {
    marginTop: 8,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  sub: {
    marginTop: 6,
    color: Colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginTop: 16,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F3E6D4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  pillHot: {
    backgroundColor: '#F08A3A',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },
  pillTextHot: {
    color: Colors.white,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 18,
  },
  kicker: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  footerCopy: {
    marginTop: 8,
    textAlign: 'center',
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  tlRow: {
    flexDirection: 'row',
    gap: 12,
    minHeight: 44,
  },
  tlDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tlDotGreen: {
    backgroundColor: '#34C759',
  },
  tlLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E6E6EA',
    marginVertical: 4,
  },
  tlText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    paddingTop: 3,
  },
  cta: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
});
