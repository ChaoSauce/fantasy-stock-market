import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { SafeAreaView } from 'react-native-safe-area-context';
import FirebaseContext from '../../context/firebase';
import LoggedInUserContext from '../../context/logged-in-user';
import { getUserByUserId } from '../../services/firebase';

export default function Profile() {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(LoggedInUserContext);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function getCurrentUser() {
      const [result] = await getUserByUserId(user.uid);
      setCurrentUser(result);
    }

    getCurrentUser();
  }, [user])
  

  return (
    <SafeAreaView style={tw`container flex-1 my-5 mx-auto max-w-screen-sm items-center`}>
      <View style={tw`flex items-center p-2 border rounded-full`}>
          <Image
            style={tw`h-20 w-20`}
            source={{uri: 'https://img.icons8.com/windows/96/000000/gender-neutral-user.png'}}
          />
        </View>

      <View style={tw`flex-row justify-between m-5 w-11/12 border-b pb-3 px-6`}>
        <View style={tw`flex items-center justify-center`}>
          <Text>{currentUser?.posts.length} posts</Text>
        </View>
        <View style={tw`flex items-center justify-center`}>
          <Text>{currentUser?.followers.length} followers</Text>
        </View>
        <View style={tw`flex items-center justify-center`}>
          <Text>{currentUser?.following.length} following</Text>
        </View>
      </View>
      
      <TouchableOpacity
        style={tw`bg-red-600 p-2 w-2/5 rounded-full items-center justify-center`}
        onPress={() => firebase.auth().signOut()}
      >
        <Text style={tw`text-white font-bold text-base`}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
