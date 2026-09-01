import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Src/Redux/Store/ConfigureStore';
import MainNavigation from './Src/Navigation/MainNavigation';
import { NotificationBridge } from './Src/Component/NotificationBridge';
import { Colors } from './Src/Assets/Colors';

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
            <MainNavigation />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
