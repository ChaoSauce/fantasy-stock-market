import React, { useState, useContext } from 'react';
import tw from 'tailwind-react-native-classnames';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FirebaseContext from '../context/firebase';
import { doesUsernameExist } from '../services/firebase';

export default function SignUp({ navigation }) {
  const { firebase } = useContext(FirebaseContext);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = email === '' && password === '' && username === '' && fullName === '';

  const handleSignUp = async () => {
    const usernameExists = doesUsernameExist(username);

    if (!usernameExists) {
      try {
        const createdUserResult = await firebase.auth().createUserWithEmailAndPassword(email, password);
    
        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: username,
          fullName,
          email: email.toLowerCase(),
          following: [],
          followers: [],
          leagues: [],
          dateCreated: Date.now()
        });
      } catch (error) {
        setPassword('');
        setError(error.message);
      }
    } else {
      setPassword('');
      setError('That username is already taken, please try another.');
    }
  }

  return (
    <SafeAreaView style={tw`container flex-1 justify-center mx-auto max-w-screen-md items-center`}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tw`flex container w-4/5 items-center justify-center`}>
          <Text
            style={tw`font-bold text-xl mb-5`}
          >Fantasy Stock Market</Text>
          <Text style={tw`mb-4 text-red-700`}>{error}</Text>
          <TextInput
            showSoftInputOnFocus={false}
            style={tw`p-3 border-2 w-full rounded-sm items-center`}
            placeholder="Username"
            onChangeText={(username) => setUsername(username)}
          />
          <TextInput
            showSoftInputOnFocus={false}
            style={tw`mt-4 p-3 border-2 w-full rounded-sm items-center`}
            placeholder="Full name"
            onChangeText={(fullName) => setFullName(fullName)}
          />
          <TextInput
            showSoftInputOnFocus={false}
            style={tw`mt-4 p-3 border-2 w-full rounded-sm items-center`}
            placeholder="Email address"
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            showSoftInputOnFocus={false}
            style={tw`mt-4 p-3 border-2 w-full rounded-sm items-center`}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity
            disabled={isInvalid}
            style={tw.style(`bg-green-500 p-3 mt-5 font-bold rounded-full w-3/5 items-center justify-center`, isInvalid && 'opacity-50')}
            onPress={handleSignUp}
          >
            <Text style={tw`text-white font-bold`}>Sign Up</Text>
          </TouchableOpacity>
          <View style={tw`flex w-full mt-4 items-center`}>
            <Text>Already have an account? {` `}
              <Text
                style={tw`text-blue-700`}
                onPress={() => navigation.navigate('Login')}
              >
                Log In
              </Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
