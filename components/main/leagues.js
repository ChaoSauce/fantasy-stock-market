import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, FlatList } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { getOpenLeagues } from '../../services/firebase';
import { formatDistance, format } from 'date-fns';

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
    <SafeAreaView style={tw`flex-1 container max-w-screen-sm mx-auto bg-gray-100`}>
      <View style={tw`flex-row justify-end mt-4 py-1 px-6 w-full`}>
        <View style={tw`flex-row border border-gray-300 px-10 py-1 rounded`}>
          <Image
            style={tw`h-6 w-6`}
            source={{uri: 'https://img.icons8.com/color/48/000000/topaz.png'}}
          />
          <Text style={tw`text-base`}>5</Text>
        </View>
      </View>

      <View style={tw`flex-1 my-4 w-full`}>
        <FlatList
        scroll
          numColumns={1}
          horizontal={false}
          data={leagues}
          renderItem={({item}) => (
            <View style={tw`border border-gray-300 py-1 px-4 my-2 mx-6 rounded bg-gray-700 shadow`}>
              <Text style={tw`text-center mb-4 text-lg text-white`}>{item.name}</Text>
              <View style={tw`flex-row w-full justify-between px-2`}>
                <View style={tw`justify-center`}>
                  <View style={tw`items-center`}>
                    <Image
                      style={tw`h-5 w-5 mb-1 items-center`}
                      source={{uri: 'https://img.icons8.com/office/480/000000/test-account.png'}}
                    />
                  </View>
                  <Text style={tw`text-center text-sm text-white`}>{item.numPlayers}/{item.maxNumPlayers}</Text>
                </View>
                <View style={tw`justify-center`}>
                  <View style={tw`items-center`}>
                    <Image
                      style={tw`h-5 w-5 mb-1`}
                      source={{uri: 'https://img.icons8.com/color/480/000000/topaz.png'}}
                    />
                  </View>
                  <Text style={tw`text-center text-sm text-white`}>{item.gemPerPlayer}</Text>
                </View>
                <View style={tw`justify-center`}>
                  <View style={tw`items-center`}>
                    <Image
                      style={tw`h-5 w-5 mb-1`}
                      source={{uri: 'https://img.icons8.com/office/480/000000/clock--v1.png'}}
                    />
                  </View>
                  <Text style={tw`text-center text-sm text-white`}>{format(item.draftTime.toDate(), 'M/d/yyyy h:mm:ss a')}</Text>
                </View>
              </View>
              <Text style={tw`mt-4 text-base text-blue-400 text-center`}>Draft starts {formatDistance(item.draftTime.toDate(), new Date(), { addSuffix: true })}</Text>
            </View>
          )}
          keyExtractor={item => item.docId}
        />
      </View>
    </SafeAreaView>
  )
}