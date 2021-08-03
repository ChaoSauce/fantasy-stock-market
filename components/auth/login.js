import React, { useState, useContext } from 'react';
import tw from 'tailwind-react-native-classnames';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FirebaseContext from '../../context/firebase';

export default function Login({ navigation }) {
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = email === '' || password === '';

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email.trimEnd(), password);
    } catch (error) {
      setPassword('');
      setError(error.message);
    }
  };

  return (
    <SafeAreaView style={tw`container flex-1 justify-center mx-auto max-w-screen-sm items-center`}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tw`flex-1 container w-full items-center justify-center`}>
          <Text
            style={tw`font-bold text-xl mb-3`}
          >Fantasy Stock Market</Text>
          <Text style={tw`mb-4 mx-4 text-red-700`}>{error}</Text>
          <TextInput
            style={tw`p-3 border-2 w-4/5 rounded-sm items-center`}
            placeholder="Email address"
            onChangeText={(email) => setEmail(email)}
            value={email}
          />
          <TextInput
            style={tw`mt-4 p-3 border-2 w-4/5 rounded-sm items-center`}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            value={password}
          />
          <TouchableOpacity
            disabled={isInvalid}
            style={tw.style(`bg-red-500 p-3 mt-5 font-bold rounded-full w-2/5 items-center justify-center`, isInvalid && 'opacity-50')}
            onPress={handleLogin}
          >
            <Text style={tw`text-white font-bold`}>Log In</Text>
          </TouchableOpacity>
          <View style={tw`flex w-full mt-5 items-center`}>
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
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
