import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { getLeagues, getUserByUserId } from '../../services/firebase';
import ListLeagues from './list-leagues';
import LoggedInUserContext from '../../context/logged-in-user';

export default function MyLeagues({ navigation }) {
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
    <SafeAreaView edges={['top', 'left', 'right']} style={tw`flex-1 container max-w-screen-sm mx-auto bg-gray-100`}>
      <View style={tw`flex-row justify-between mt-3 py-1 px-6 w-full`}>
        <TouchableOpacity
          style={tw`flex justify-center items-center bg-blue-500 px-3 py-1 rounded`}
          onPress={() => navigation.navigate('OpenLeagues')}
        >
          <Text style={tw`text-white text-base`}>Available Leagues</Text>
        </TouchableOpacity>
        <View style={tw`flex-row border border-gray-400 px-3 py-1 rounded`}>
          <Image
            style={tw`h-6 w-6`}
            source={{uri: 'https://img.icons8.com/color/48/000000/topaz.png'}}
          />
          <Text style={tw`text-base`}>{currentUser?.gem}</Text>
        </View>
      </View>
      <View style={tw`flex m-2 justify-center items-center`}>
        <Text style={tw`text-xl`}>My Leagues</Text>
      </View>
      <ListLeagues leagues={leagues} />
    </SafeAreaView>
  )
}