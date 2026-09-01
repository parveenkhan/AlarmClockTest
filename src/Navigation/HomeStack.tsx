import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import EditAlarmScreen from '../Screens/AlarmScreen/EditAlarmScreen';
import AlarmSoundScreen from '../Screens/AlarmScreen/AlarmSoundScreen';
import SoundLibraryScreen from '../Screens/AlarmScreen/SoundLibraryScreen';
import AlarmRingingScreen from '../Screens/AlarmScreen/AlarmRingingScreen';
import ChooseMissionScreen from '../Screens/MissionScreen/ChooseMissionScreen';
import CameraMissionScreen from '../Screens/MissionScreen/CameraMissionScreen';
import ShakeMissionScreen from '../Screens/MissionScreen/ShakeMissionScreen';
import PushupMissionScreen from '../Screens/MissionScreen/PushupMissionScreen';
import MathMissionScreen from '../Screens/MissionScreen/MathMissionScreen';
import ReadAloudMissionScreen from '../Screens/MissionScreen/ReadAloudMissionScreen';
import MissionSuccessScreen from '../Screens/MissionScreen/MissionSuccessScreen';
import InsightsScreen from '../Screens/InsightsScreen/InsightsScreen';
import DailyReportsScreen from '../Screens/InsightsScreen/DailyReportsScreen';
import GroupsScreen from '../Screens/GroupsScreen/GroupsScreen';
import GroupDetailScreen from '../Screens/GroupsScreen/GroupDetailScreen';
import SettingsScreen from '../Screens/SettingScreen/SettingsScreen';
import TrackSleepScreen from '../Screens/SleepScreen/TrackSleepScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, animation: 'fade' }}>
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
  );
}
