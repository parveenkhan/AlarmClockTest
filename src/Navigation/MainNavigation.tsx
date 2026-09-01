import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationService';
import { useAppSelector } from '../Redux/hooks';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

export default function MainNavigation() {
  const onboarded = useAppSelector((s) => s.onboarding.completed);

  return <NavigationContainer ref={navigationRef}>{onboarded ? <HomeStack /> : <AuthStack />}</NavigationContainer>;
}
