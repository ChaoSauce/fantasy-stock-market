import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TempScreen from './temp';

const Tab = createMaterialBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator initialRouteName="Feed" labeled={true} >
      <Tab.Screen name="Feed" component={TempScreen} options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} inactiveColor="white" />
        ),
        tabBarColor: 'rgba(16, 185, 129, 1)'
      }} />
      <Tab.Screen name="Store" component={TempScreen} options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="shopping" color={color} size={26} />
        ),
        tabBarColor: 'rgba(16, 185, 129, 1)'
      }} />
      <Tab.Screen name="Leagues" component={TempScreen} options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="finance" color={color} size={26} />
        ),
        tabBarColor: 'rgba(16, 185, 129, 1)'
      }} />
      <Tab.Screen name="Friends" component={TempScreen} options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account-group" color={color} size={26} />
        ),
        tabBarColor: 'rgba(16, 185, 129, 1)'
      }} />
      <Tab.Screen name="Profile" component={TempScreen} options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
        tabBarColor: 'rgba(16, 185, 129, 1)'
      }} />
    </Tab.Navigator>
  )
}
