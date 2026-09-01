import { AppDispatch, RootState } from '../Redux/Store/ConfigureStore';
import { completeOnboarding } from '../Redux/Actions/Onboarding.Action';
import { upsertAlarm } from '../Redux/Actions/Alarm.Action';
import { setSilenceDuringMission } from '../Redux/Actions/Settings.Action';
import { setPro } from '../Redux/Actions/User.Action';
import { ensureNotificationPermission } from '../Redux/Services/Alarm.Service';
import { daysForRepeat, repeatFromDays } from './time';

export async function finishOnboardingPlan(dispatch: AppDispatch, state: RootState) {
  const onboarding = state.onboarding;
  await ensureNotificationPermission();
  const days = onboarding.days.length ? onboarding.days : [1, 2, 3, 4, 5];
  const repeat = repeatFromDays(days);
  dispatch(setPro(true));
  dispatch(setSilenceDuringMission(onboarding.playDuringMission === false));
  dispatch(
    upsertAlarm({
      id: 'alarm_weekdays',
      label: 'Work',
      hour: onboarding.idealHour,
      minute: onboarding.idealMinute,
      enabled: true,
      repeat,
      days: daysForRepeat(repeat, days),
      missionId: onboarding.onboardingMission,
      soundCategory: onboarding.soundCategory,
      soundId: onboarding.soundId,
      soundName: onboarding.soundName,
    }),
  );
  dispatch(completeOnboarding());
}
