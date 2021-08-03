import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { getLeagues, getUserByUserId } from '../../services/firebase';
import ListLeagues from '../join-league/list';
import LoggedInUserContext from '../../context/logged-in-user';

export default function Leagues({ navigation }) {
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
    <SafeAreaView edges={['top', 'left', 'right']} style={tw`flex-1 container max-w-screen-xl mx-auto bg-gray-100 border border-gray-300`}>
      <View style={tw`flex-row justify-between my-3 py-1 px-6 w-full`}>
        <View style={tw`flex justify-center items-center`}>
          <TouchableOpacity
            style={tw`flex justify-center items-center bg-blue-500 px-2 py-1 rounded`}
            onPress={() => navigation.navigate('OpenLeagues', { currentUser: currentUser })}
          >
            <Text style={tw`text-white text-base`}>Join League</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row border border-gray-400 px-3 py-1 rounded`}>
          <Image
            style={tw`h-6 w-6 mr-1`}
            source={{uri: 'https://img.icons8.com/office/80/000000/us-dollar--v1.png'}}
          />
          <Text style={tw`text-base`}>{currentUser?.gem}</Text>
        </View>
      </View>
      {leagues.length > 0 ? (
        <ListLeagues leagues={leagues} />
      ) : (
        <View style={tw`flex justify-center items-center p-2`}>
          <Text style={tw`text-base`}>You are not in any leagues.</Text>
        </View>
      )}
    </SafeAreaView>
  )
}