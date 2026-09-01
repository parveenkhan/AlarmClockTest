import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import SplashScreen from '../Screens/AuthScreen/SplashScreen';
import QuizScreen from '../Screens/AuthScreen/QuizScreen';
import EnergyGraphScreen from '../Screens/AuthScreen/EnergyGraphScreen';
import ComparisonScreen from '../Screens/AuthScreen/ComparisonScreen';
import UsualTimeScreen from '../Screens/AuthScreen/UsualTimeScreen';
import TargetTimeScreen from '../Screens/AuthScreen/TargetTimeScreen';
import QuoteScreen from '../Screens/AuthScreen/QuoteScreen';
import BiologyScreen from '../Screens/AuthScreen/BiologyScreen';
import WhyObjectScreen from '../Screens/AuthScreen/WhyObjectScreen';
import OnboardingMissionScreen from '../Screens/AuthScreen/OnboardingMissionScreen';
import HuntObjectsScreen from '../Screens/AuthScreen/HuntObjectsScreen';
import IdealTimeScreen from '../Screens/AuthScreen/IdealTimeScreen';
import DaysScreen from '../Screens/AuthScreen/DaysScreen';
import OnboardingSoundScreen from '../Screens/AuthScreen/OnboardingSoundScreen';
import MissionAudioScreen from '../Screens/AuthScreen/MissionAudioScreen';
import HearAboutScreen from '../Screens/AuthScreen/HearAboutScreen';
import FasterScreen from '../Screens/AuthScreen/FasterScreen';
import CommitmentScreen from '../Screens/AuthScreen/CommitmentScreen';
import BuildingPlanScreen from '../Screens/AuthScreen/BuildingPlanScreen';
import MorningPlanScreen from '../Screens/AuthScreen/MorningPlanScreen';
import PlanPreviewScreen from '../Screens/AuthScreen/PlanPreviewScreen';
import ReferralScreen from '../Screens/AuthScreen/ReferralScreen';
import CreateAccountScreen from '../Screens/AuthScreen/CreateAccountScreen';
import PaywallScreen from '../Screens/AuthScreen/PaywallScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="EnergyGraph" component={EnergyGraphScreen} />
      <Stack.Screen name="Comparison" component={ComparisonScreen} />
      <Stack.Screen name="UsualTime" component={UsualTimeScreen} />
      <Stack.Screen name="TargetTime" component={TargetTimeScreen} />
      <Stack.Screen name="Quote" component={QuoteScreen} />
      <Stack.Screen name="Biology" component={BiologyScreen} />
      <Stack.Screen name="WhyObject" component={WhyObjectScreen} />
      <Stack.Screen name="OnboardingMission" component={OnboardingMissionScreen} />
      <Stack.Screen name="HuntObjects" component={HuntObjectsScreen} />
      <Stack.Screen name="IdealTime" component={IdealTimeScreen} />
      <Stack.Screen name="Days" component={DaysScreen} />
      <Stack.Screen name="OnboardingSound" component={OnboardingSoundScreen} />
      <Stack.Screen name="MissionAudio" component={MissionAudioScreen} />
      <Stack.Screen name="HearAbout" component={HearAboutScreen} />
      <Stack.Screen name="Faster" component={FasterScreen} />
      <Stack.Screen name="Commitment" component={CommitmentScreen} />
      <Stack.Screen name="BuildingPlan" component={BuildingPlanScreen} />
      <Stack.Screen name="MorningPlan" component={MorningPlanScreen} />
      <Stack.Screen name="PlanPreview" component={PlanPreviewScreen} />
      <Stack.Screen name="Referral" component={ReferralScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="Paywall" component={PaywallScreen} />
    </Stack.Navigator>
  );
}
