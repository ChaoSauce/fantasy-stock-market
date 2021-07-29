import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCKh9yDUJFSEg5yH_XwuUwnZ1e6B-iQxBA",
  authDomain: "fantasy-stock-market-66c32.firebaseapp.com",
  projectId: "fantasy-stock-market-66c32",
  storageBucket: "fantasy-stock-market-66c32.appspot.com",
  messagingSenderId: "387326101646",
  appId: "1:387326101646:web:2036b875cadcbb97bca1df",
  measurementId: "G-MRZEQGX93Y"
};

firebase.initializeApp(firebaseConfig);

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