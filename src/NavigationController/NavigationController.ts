import { createNavigationContainerRef, StackActions, CommonActions } from '@react-navigation/native';
import { RootStackParamList } from '../Navigation/types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

type RouteName = keyof RootStackParamList;

export const NavigationController = {
  navigate<T extends RouteName>(name: T, params?: RootStackParamList[T]) {
    if (!navigationRef.isReady()) return;
    navigationRef.navigate(name as any, params as any);
  },

  push<T extends RouteName>(name: T, params?: RootStackParamList[T]) {
    if (!navigationRef.isReady()) return;
    navigationRef.dispatch(StackActions.push(name, params));
  },

  replace<T extends RouteName>(name: T, params?: RootStackParamList[T]) {
    if (!navigationRef.isReady()) return;
    navigationRef.dispatch(StackActions.replace(name, params));
  },

  goBack() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  },

  resetToHome() {
    if (!navigationRef.isReady()) return;
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      }),
    );
  },

  openMission(alarmId: string, missionId: string) {
    const map: Record<string, RouteName> = {
      shake: 'ShakeMission',
      steps: 'ShakeMission',
      pushups: 'PushupMission',
      squats: 'PushupMission',
      objectHunt: 'CameraMission',
      skyPhoto: 'CameraMission',
      makeBed: 'CameraMission',
      qr: 'CameraMission',
      math: 'MathMission',
      memory: 'MathMission',
      typing: 'MathMission',
      bible: 'ReadAloudMission',
      affirmation: 'ReadAloudMission',
      random: 'CameraMission',
    };
    const screen = map[missionId] ?? 'CameraMission';
    if (screen === 'CameraMission') {
      this.navigate('CameraMission', { alarmId, missionId: missionId as never });
      return;
    }
    if (screen === 'ReadAloudMission') {
      this.navigate('ReadAloudMission', { alarmId, missionId: missionId as never });
      return;
    }
    if (screen === 'MathMission') {
      this.navigate('MathMission', {
        alarmId,
        variant: missionId === 'typing' ? 'typing' : missionId === 'memory' ? 'memory' : 'math',
      });
      return;
    }
    this.navigate(screen, { alarmId } as never);
  },
};
