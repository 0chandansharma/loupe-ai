// app/_layout.js
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from '../src/store/store';

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: "Loupe",
            headerStyle: {
              backgroundColor: '#2A6CBF',
            },
            headerTintColor: '#fff',
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="result" 
          options={{ 
            title: "Analysis Results",
            headerStyle: {
              backgroundColor: '#2A6CBF',
            },
            headerTintColor: '#fff',
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="history" 
          options={{ 
            title: "Scan History",
            headerStyle: {
              backgroundColor: '#2A6CBF',
            },
            headerTintColor: '#fff',
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="profile" 
          options={{ 
            title: "Profile",
            headerStyle: {
              backgroundColor: '#2A6CBF',
            },
            headerTintColor: '#fff',
            headerShown: false
          }} 
        />
      </Stack>
    </Provider>
  );
}