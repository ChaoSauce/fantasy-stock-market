import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase, FieldValue } from './lib/firebase';
import FirebaseContext from './context/firebase';

const Tab = createMaterialBottomTabNavigator();

import TempScreen from './components/temp';

export default function App() {
  return (
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <StatusBar />
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Leagues" labeled={false} barStyle={{ backgroundColor: 'teal' }}>
          <Tab.Screen name="Store" component={TempScreen} options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="shopping" color={color} size={26} />
            )
          }} />
          <Tab.Screen name="Leagues" component={TempScreen} options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="finance" color={color} size={26} />
            )
          }} />
          <Tab.Screen name="Friends" component={TempScreen} options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account-group" color={color} size={26} />
            )
          }} />
          <Tab.Screen name="Profile" component={TempScreen} options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            )
          }} />
        </Tab.Navigator>
      </NavigationContainer>
    </FirebaseContext.Provider>
  );
}