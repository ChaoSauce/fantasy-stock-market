import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import ListLeagues from './list';

export default function Join({ currentUser, navigation, leagues }) {
  return (
    <SafeAreaView style={tw`flex-1 container max-w-screen-xl mx-auto bg-gray-100`}>
      <View style={tw`flex-row justify-between my-3 py-1 px-5 w-full`}>
        <TouchableOpacity
          style={tw`flex justify-center items-center pr-10`}
          onPress={() => navigation.navigate('Leagues')}
        >
          <Image
            source={{uri: 'https://img.icons8.com/ios-glyphs/90/000000/back.png'}}
            style={tw`h-6 w-6`}
          />
        </TouchableOpacity>
        <View style={tw`flex-row border border-gray-400 mr-1 px-3 py-1 rounded`}>
          <Image
            style={tw`h-6 w-6 mr-1`}
            source={{uri: 'https://img.icons8.com/office/80/000000/us-dollar--v1.png'}}
          />
          <Text style={tw`text-base`}>{currentUser?.gem}</Text>
        </View>
      </View>
      {leagues && (leagues.length > 0 ? (
        <ListLeagues leagues={leagues} />
      ) : (
        <View style={tw`flex justify-center items-center p-2`}>
          <Text style={tw`text-base`}>No Available Leagues</Text>
        </View>
      ))}
    </SafeAreaView>
  )
}
