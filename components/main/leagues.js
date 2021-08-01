import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function Leagues() {
  return (
    <SafeAreaView style={tw`flex-1 container max-w-screen-sm mx-auto`}>
      <View style={tw`flex-row justify-end mt-2 py-1 px-6 w-full items-center border-b border-gray-300`}>
        <Image
          style={tw`h-5 w-5`}
          source={{uri: 'https://img.icons8.com/color/48/000000/topaz.png'}}
        />
        <Text>5</Text>
      </View>
    </SafeAreaView>
  )
}

