import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { SafeAreaView } from 'react-native-safe-area-context';
import FirebaseContext from '../../context/firebase';
import LoggedInUserContext from '../../context/logged-in-user';

export default function Profile() {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(LoggedInUserContext);

  console.log(user);

  return (
    <SafeAreaView style={tw`container flex-1 justify-center mx-auto max-w-screen-sm items-center`}>
      <View>
        <Text>{user.username}</Text>
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
