import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
    <SafeAreaView style={tw`container flex-1 justify-center mx-auto max-w-screen-sm items-center`}>
      <View style={tw`border-b-2 mb-5 w-3/5 pb-1 items-center`}>
        <Text>{currentUser?.fullName}</Text>
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
