import { AppDispatch } from '../Redux/store';
import { completeOnboarding } from '../Redux/slices/onboardingSlice';
import { upsertAlarm } from '../Redux/slices/alarmsSlice';
import { setSilenceDuringMission } from '../Redux/slices/settingsSlice';
import { setPro } from '../Redux/slices/userSlice';
import { ensureNotificationPermission } from './alarmScheduler';
import { NavigationController } from '../NavigationController/NavigationController';
import { daysForRepeat, repeatFromDays } from './time';
import { RootState } from '../Redux/store';

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
  NavigationController.resetToHome();
}
