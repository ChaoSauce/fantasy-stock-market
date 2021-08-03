import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TempScreen from './temp';
import Profile from './main/profile';
import Leagues from './main/leagues';
import Feed from './main/feed';

export default function Main() {
  const Tab = createMaterialBottomTabNavigator();
  const [tabColor, setTabColor] = useState('white');

  return (
    <Tab.Navigator initialRouteName="Feed" labeled={true} activeColor='black' inactiveColor='black' barStyle={{borderTopWidth: 1, borderTopColor: 'gray'}}>
      <Tab.Screen name="Feed" component={Feed} options={{
        tabBarIcon: () => (
          <Ionicons name="reader-outline" size={24} />
        ),
        tabBarColor: tabColor
      }} />
      <Tab.Screen name="Store" component={TempScreen} options={{
        tabBarIcon: () => (
          <Ionicons name="wallet-outline" size={24} />
        ),
        tabBarColor: tabColor
      }} />
      <Tab.Screen name="Leagues" component={Leagues} options={{
        tabBarIcon: () => (
          <Ionicons name="rocket-outline" size={24} />
        ),
        tabBarColor: tabColor
      }} />
      <Tab.Screen name="Messages" component={TempScreen} options={{
        tabBarIcon: () => (
          <Ionicons name="chatbubble-outline" size={24} />
        ),
        tabBarColor: tabColor
      }} />
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: () => (
          <Ionicons name="person-outline" size={24} />
        ),
        tabBarColor: tabColor
      }} />
    </Tab.Navigator>
  )
}
