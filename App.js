import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { firebase, FieldValue } from './lib/firebase';
import FirebaseContext from './context/firebase';
import Main from './components/main';

const Stack = createStackNavigator();

export default function App() {
  return (
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <StatusBar />
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </FirebaseContext.Provider>
  );
}