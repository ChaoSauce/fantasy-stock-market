import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function TempScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello!</Text>
    </View>
  );
}

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