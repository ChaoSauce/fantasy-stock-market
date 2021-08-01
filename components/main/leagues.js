import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, FlatList } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { getOpenLeagues } from '../../services/firebase';

export default function Leagues() {
  const [leagues, setLeagues] = useState([]);
  
  useEffect(() => {
    async function getAvailableLeagues() {
      const result = await getOpenLeagues();

      setLeagues(result);
    }

    getAvailableLeagues();
  }, [])

  return (
    <SafeAreaView style={tw`flex-1 container max-w-screen-sm mx-auto`}>
      <View style={tw`flex-row justify-end mt-4 py-1 px-6 w-full`}>
        <View style={tw`flex-row border border-gray-300 px-10 py-1`}>
          <Image
            style={tw`h-6 w-6`}
            source={{uri: 'https://img.icons8.com/color/48/000000/topaz.png'}}
          />
          <Text style={tw`text-base`}>5</Text>
        </View>
      </View>

      <View style={tw`flex-1 my-4 w-full`}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={leagues}
          renderItem={({item}) => (
            <View style={tw`border border-gray-300 p-4 my-2 mx-5`}>
              <Text style={tw`text-center`}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}