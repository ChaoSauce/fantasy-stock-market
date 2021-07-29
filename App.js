import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import TempScreen from './components/temp';

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Store" component={TempScreen} />
        <Tab.Screen name="Leagues" component={TempScreen} />
        <Tab.Screen name="Friends" component={TempScreen} />
        <Tab.Screen name="Profile" component={TempScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}