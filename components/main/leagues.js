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
        <View style={tw`flex-row border border-gray-400 px-10 py-1 rounded shadow-md`}>
          <Image
            style={tw`h-6 w-6`}
            source={{uri: 'https://img.icons8.com/color/48/000000/topaz.png'}}
          />
          <Text style={tw`text-base`}>5</Text>
        </View>
      </View>

      <View style={tw`flex-1 w-full mt-1`}>
        <FlatList
        scroll
          numColumns={1}
          horizontal={false}
          data={leagues}
          renderItem={({item}) => (
            <View style={tw`border border-gray-400 py-3 px-3 my-2 mx-6 rounded bg-gray-100 shadow-md`}>
              <View style={tw`flex-row w-full px-2 pb-2 border-b border-gray-300 mb-4 justify-center`}>
                <View style={tw`items-center mr-2`}>
                  <Image
                    style={tw`h-5 w-5`}
                    source={{uri: 'https://img.icons8.com/office/480/000000/clock--v1.png'}}
                  />
                </View>
                <Text style={tw`text-center text-sm`}>{format(item.draftTime.toDate(), 'iii, MMM do @ h:mm a')}</Text>
              </View>
              <View style={tw`flex w-full px-8`}>
                <View style={tw`flex-row justify-between mb-2`}>
                  <View style={tw`flex-col justify-start`}>
                    <View style={tw`flex-row mb-2`}>
                      <View style={tw`items-center mr-2`}>
                        <Image
                          style={tw`h-5 w-5`}
                          source={{uri: 'https://img.icons8.com/office/480/000000/test-account.png'}}
                        />
                      </View>
                      <Text style={tw`text-center text-sm`}>{item.numPlayers}/{item.maxNumPlayers}</Text>
                    </View>
                    <View style={tw`flex-row`}>
                      <View style={tw`items-center mr-2`}>
                        <Image
                          style={tw`h-5 w-5`}
                          source={{uri: 'https://img.icons8.com/color/480/000000/topaz.png'}}
                        />
                      </View>
                      <Text style={tw`text-center text-sm`}>{item.gemPerPlayer}</Text>
                    </View>
                  </View>
                  <View style={tw`flex-col justify-start`}>
                    <View style={tw`flex-row mb-2`}>
                      <View style={tw`items-center mr-1`}>
                        <Image
                          style={tw`h-5 w-5`}
                          source={{uri: 'https://img.icons8.com/windows/96/000000/wall-clock.png'}}
                        />
                      </View>
                      <Text style={tw`text-center text-sm`}>{item.minPerPick} Min Per Pick</Text>
                    </View>
                    <View style={tw`flex-row`}>
                      <View style={tw`items-center mr-1`}>
                        <Image
                          style={tw`h-5 w-5`}
                          source={{uri: 'https://img.icons8.com/fluency-systems-regular/96/000000/repeat.png'}}
                        />
                      </View>
                      <Text style={tw`text-center text-sm`}>{item.rounds} rounds</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Text style={tw`text-base text-blue-500 text-center`}>Draft starts {formatDistance(item.draftTime.toDate(), new Date(), { addSuffix: true, includeSeconds: true })}</Text>
            </View>
          )}
          keyExtractor={item => item.docId}
        />
      </View>
    </SafeAreaView>
  )
}