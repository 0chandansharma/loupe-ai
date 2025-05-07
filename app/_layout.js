// app/_layout.js
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from '../src/store/store';

export default function Layout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2A6CBF',
            },
            headerTintColor: '#fff',
            headerShown: false,
          }}
        />
      </SafeAreaProvider>
    </Provider>
  );
}