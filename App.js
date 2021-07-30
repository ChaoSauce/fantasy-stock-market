import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { firebase, FieldValue } from './lib/firebase';
import FirebaseContext from './context/firebase';
import LoggedInUserContext from './context/logged-in-user';
import userAuthListener from './hooks/user-auth-listener';

import Main from './components/main';
import Login from './components/login';
import SignUp from './components/sign-up';

const Stack = createStackNavigator();

export default function App() {
  const { user } = userAuthListener();

  if (!user) {
    return (
      <FirebaseContext.Provider value={{ firebase, FieldValue }}>
        <SafeAreaProvider>
          <StatusBar />
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
              <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </FirebaseContext.Provider>
    )
  }

  return (
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <SafeAreaProvider>
        <StatusBar />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </FirebaseContext.Provider>
  );
}