import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../../Screens/SettingScreen/SettingsScreen';
import TrackSleepScreen from '../../Screens/SleepScreen/TrackSleepScreen';
import InsightsScreen from '../../Screens/InsightsScreen/InsightsScreen';
import DailyReportsScreen from '../../Screens/InsightsScreen/DailyReportsScreen';

const Stack = createNativeStackNavigator();

export default function SettingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="TrackSleep" component={TrackSleepScreen} />
      <Stack.Screen name="Insights" component={InsightsScreen} />
      <Stack.Screen name="DailyReports" component={DailyReportsScreen} />
    </Stack.Navigator>
  );
}
