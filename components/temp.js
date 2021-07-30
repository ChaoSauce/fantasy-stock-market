import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';

export default function TempScreen() {
  return (
    <SafeAreaView style={tw`flex-1 justify-center items-center`}>
        <Text>Hello!</Text>
    </SafeAreaView>
  );
}
