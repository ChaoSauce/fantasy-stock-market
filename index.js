import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import userAuthListener from './hooks/user-auth-listener';
import LoggedInUserContext from './context/logged-in-user';
import tw from 'tailwind-react-native-classnames';
import Main from './components/main';
import Login from './components/login';
import SignUp from './components/sign-up';

const Stack = createStackNavigator();

export default function Index() {
  const { user, loaded } = userAuthListener();

  if (!loaded) {
    return <View style={tw`flex-1 items-center justify-center`}>
      <Text>Loading...</Text>
    </View>
  }

  if (!user) {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    )
  }

  return (
    <LoggedInUserContext.Provider value={{ user }}>
      <SafeAreaProvider>
        <StatusBar />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </LoggedInUserContext.Provider>
  );
}
