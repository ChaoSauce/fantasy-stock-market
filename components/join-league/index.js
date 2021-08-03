import React, { useState, useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TempScreen from '../temp';
import Join from './join';

export default function JoinLeague({ route }) {
  const { currentUser, navigation, leagues } = route.params;
  const Tab = createMaterialBottomTabNavigator();
  const [tabColor, setTabColor] = useState('white');

  const EmptyScreen = () => {
      return (null)
  }

  return (
    <Tab.Navigator initialRouteName="Join" labeled={true} activeColor='black' inactiveColor='black' barStyle={{borderTopWidth: 1, borderTopColor: 'gray'}}>
      <Tab.Screen name="PlaceHolder1" component={EmptyScreen}
        options={{
          tabBarColor: tabColor
        }}
        listeners={({ navigation }) => ({
          tabPress: event => {
              event.preventDefault();
          }
        })}
      />
      <Tab.Screen name="Join" children={() => <Join currentUser={currentUser} navigation={navigation} leagues={leagues} />} options={{
        tabBarIcon: () => (
          <Ionicons name="play-outline" size={24} />
        ),
        tabBarColor: tabColor
      }} />
      <Tab.Screen name="Create" component={TempScreen} options={{
        tabBarIcon: () => (
          <Ionicons name="add-circle-outline" size={24} />
        ),
        tabBarColor: tabColor
      }} />
      <Tab.Screen name="PlaceHolder2" component={EmptyScreen}
        options={{
          tabBarColor: tabColor
        }}
        listeners={({ navigation }) => ({
          tabPress: event => {
              event.preventDefault();
          }
        })}
      />
    </Tab.Navigator>
  );
}