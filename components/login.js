import React, { useState, useContext } from 'react';
import tw from 'tailwind-react-native-classnames';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FirebaseContext from '../context/firebase';

export default function Login({ navigation }) {
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      setPassword('');
      setError(error.message);
    }
  }

  return (
    <SafeAreaView style={tw`container flex-1 justify-center mx-auto max-w-screen-md items-center`}>
      <View style={tw`flex container w-4/5 items-center justify-center`}>
        <Text
          style={tw`font-bold text-xl mb-3`}
        >Fantasy Stock Market</Text>
        <Text style={tw`mb-4 text-red-700`}>{error}</Text>
        <TextInput
          style={tw`p-3 border-2 w-full rounded-sm items-center`}
          placeholder="Email address"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={tw`mt-4 p-3 border-2 w-full rounded-sm items-center`}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity
          style={tw`bg-green-500 p-3 mt-5 font-bold rounded-full w-3/5 items-center justify-center`}
          onPress={handleLogin}
        >
          <Text style={tw`text-white font-bold`}>Log In</Text>
        </TouchableOpacity>
        <View style={tw`flex w-full mt-4 items-center`}>
          <Text>Don't have an account? {` `}
            <Text
              style={tw`text-blue-700`}
              onPress={() => navigation.navigate('SignUp')}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
