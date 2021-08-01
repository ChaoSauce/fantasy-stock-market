import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TempScreen from './temp';
import Profile from './main/profile';
import Leagues from './main/leagues';
import Feed from './main/feed';

const Tab = createMaterialBottomTabNavigator();

export default function Main() {
  const [tabColor, setTabColor] = useState('darkturquoise');

  return (
    <Tab.Navigator initialRouteName="Feed" labeled={true}>
      <Tab.Screen name="Feed" component={Feed} options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
        tabBarColor: tabColor
      }} />
      <Tab.Screen name="Store" component={TempScreen} options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="shopping" color={color} size={26} />
        ),
        tabBarColor: tabColor
      }} />
      <Tab.Screen name="Leagues" component={Leagues} options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="finance" color={color} size={26} />
        ),
        tabBarColor: tabColor
      }} />
      <Tab.Screen name="Messages" component={TempScreen} options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="comment-text-multiple" color={color} size={26} />
        ),
        tabBarColor: tabColor
      }} />
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
        tabBarColor: tabColor
      }} />
    </Tab.Navigator>
  )
}
