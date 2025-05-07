import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import NavigationService from './src/navigation/NavigationService';
import { registerRootComponent } from 'expo';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        >
          <StatusBar style="light" />
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

// Register the root component
registerRootComponent(App);

// Export for potential imports in other files
export default App;