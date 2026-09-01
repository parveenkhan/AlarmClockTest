import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/Redux/store';
import AppNavigator from './src/Navigation/AppNavigator';
import { NotificationBridge } from './src/components/NotificationBridge';
import { Colors } from './src/constants/Colors';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate
          loading={
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.background }}>
              <ActivityIndicator color={Colors.text} />
            </View>
          }
          persistor={persistor}>
          <SafeAreaProvider>
            <StatusBar style="dark" />
            <NotificationBridge />
            <AppNavigator />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
