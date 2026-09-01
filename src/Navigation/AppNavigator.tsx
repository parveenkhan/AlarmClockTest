import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { navigationRef } from '../NavigationController/NavigationController';
import { useAppSelector } from '../Redux/hooks';
import SplashScreen from '../Screens/Onboarding/SplashScreen';
import QuizScreen from '../Screens/Onboarding/QuizScreen';
import EnergyGraphScreen from '../Screens/Onboarding/EnergyGraphScreen';
import ComparisonScreen from '../Screens/Onboarding/ComparisonScreen';
import UsualTimeScreen from '../Screens/Onboarding/UsualTimeScreen';
import TargetTimeScreen from '../Screens/Onboarding/TargetTimeScreen';
import QuoteScreen from '../Screens/Onboarding/QuoteScreen';
import BiologyScreen from '../Screens/Onboarding/BiologyScreen';
import WhyObjectScreen from '../Screens/Onboarding/WhyObjectScreen';
import OnboardingMissionScreen from '../Screens/Onboarding/OnboardingMissionScreen';
import HuntObjectsScreen from '../Screens/Onboarding/HuntObjectsScreen';
import IdealTimeScreen from '../Screens/Onboarding/IdealTimeScreen';
import DaysScreen from '../Screens/Onboarding/DaysScreen';
import OnboardingSoundScreen from '../Screens/Onboarding/OnboardingSoundScreen';
import MissionAudioScreen from '../Screens/Onboarding/MissionAudioScreen';
import HearAboutScreen from '../Screens/Onboarding/HearAboutScreen';
import FasterScreen from '../Screens/Onboarding/FasterScreen';
import CommitmentScreen from '../Screens/Onboarding/CommitmentScreen';
import BuildingPlanScreen from '../Screens/Onboarding/BuildingPlanScreen';
import MorningPlanScreen from '../Screens/Onboarding/MorningPlanScreen';
import PlanPreviewScreen from '../Screens/Onboarding/PlanPreviewScreen';
import ReferralScreen from '../Screens/Onboarding/ReferralScreen';
import CreateAccountScreen from '../Screens/Onboarding/CreateAccountScreen';
import PaywallScreen from '../Screens/Onboarding/PaywallScreen';
import HomeScreen from '../Screens/Home/HomeScreen';
import EditAlarmScreen from '../Screens/Alarm/EditAlarmScreen';
import AlarmSoundScreen from '../Screens/Alarm/AlarmSoundScreen';
import SoundLibraryScreen from '../Screens/Alarm/SoundLibraryScreen';
import AlarmRingingScreen from '../Screens/Alarm/AlarmRingingScreen';
import ChooseMissionScreen from '../Screens/Mission/ChooseMissionScreen';
import CameraMissionScreen from '../Screens/Mission/CameraMissionScreen';
import ShakeMissionScreen from '../Screens/Mission/ShakeMissionScreen';
import PushupMissionScreen from '../Screens/Mission/PushupMissionScreen';
import MathMissionScreen from '../Screens/Mission/MathMissionScreen';
import ReadAloudMissionScreen from '../Screens/Mission/ReadAloudMissionScreen';
import MissionSuccessScreen from '../Screens/Mission/MissionSuccessScreen';
import InsightsScreen from '../Screens/Insights/InsightsScreen';
import DailyReportsScreen from '../Screens/Insights/DailyReportsScreen';
import GroupsScreen from '../Screens/Groups/GroupsScreen';
import GroupDetailScreen from '../Screens/Groups/GroupDetailScreen';
import SettingsScreen from '../Screens/Settings/SettingsScreen';
import TrackSleepScreen from '../Screens/Sleep/TrackSleepScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const onboarded = useAppSelector((s) => s.onboarding.completed);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={onboarded ? 'Home' : 'Splash'}
        screenOptions={{ headerShown: false, animation: 'fade' }}>
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
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EditAlarm" component={EditAlarmScreen} options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="ChooseMission" component={ChooseMissionScreen} options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="AlarmSound" component={AlarmSoundScreen} options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="SoundLibrary" component={SoundLibraryScreen} />
        <Stack.Screen name="Insights" component={InsightsScreen} />
        <Stack.Screen name="DailyReports" component={DailyReportsScreen} />
        <Stack.Screen name="Groups" component={GroupsScreen} />
        <Stack.Screen name="GroupDetail" component={GroupDetailScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="TrackSleep" component={TrackSleepScreen} />
        <Stack.Screen name="AlarmRinging" component={AlarmRingingScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="CameraMission" component={CameraMissionScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="ShakeMission" component={ShakeMissionScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="PushupMission" component={PushupMissionScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="MathMission" component={MathMissionScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="ReadAloudMission" component={ReadAloudMissionScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="MissionSuccess" component={MissionSuccessScreen} options={{ gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
