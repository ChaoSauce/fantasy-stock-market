
import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { getLeagues, getUserByUserId } from '../../services/firebase';
import ListLeagues from './list-leagues';
import LoggedInUserContext from '../../context/logged-in-user';

export default function OpenLeagues({ navigation }) {
  const { user } = useContext(LoggedInUserContext);
  const [leagues, setLeagues] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function getCurrentUserInfo() {
      const [result] = await getUserByUserId(user.uid);
      setCurrentUser(result);
    }

    async function fetchLeagues() {
      const result = await getLeagues();

      setLeagues(result.filter((league) => league.players.includes(user.uid)));
    }

    if (user) {
      getCurrentUserInfo();
    }

    fetchLeagues();
  }, [user]);

  return (
    <SafeAreaView style={tw`flex-1 container max-w-screen-xl mx-auto bg-gray-100`}>
      <View style={tw`flex-row justify-between mt-3 py-1 px-6 w-full`}>
        <TouchableOpacity
          style={tw`flex justify-center items-center pr-10`}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={{uri: 'https://img.icons8.com/ios-glyphs/90/000000/back.png'}}
            style={tw`h-6 w-6`}
          />
        </TouchableOpacity>
        <View style={tw`flex-row border border-gray-400 px-3 py-1 rounded`}>
          <Image
            style={tw`h-6 w-6 mr-1`}
            source={{uri: 'https://img.icons8.com/office/80/000000/us-dollar--v1.png'}}
          />
          <Text style={tw`text-base`}>{currentUser?.gem}</Text>
        </View>
      </View>
      <View style={tw`flex m-2 justify-center items-center`}>
        <Text style={tw`text-xl`}>Leagues</Text>
      </View>
      <ListLeagues leagues={leagues} />
    </SafeAreaView>
  )
}
