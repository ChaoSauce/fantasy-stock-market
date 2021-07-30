import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUp({ navigation }) {
  return (
    <SafeAreaView style={tw`container flex-1 justify-center mx-auto max-w-screen-md items-center h-screen`}>
      <View style={tw`flex container w-4/5 items-center justify-center`}>
        <Text
          style={tw`font-bold text-xl mb-5`}
        >Fantasy Stock Market</Text>
        <TextInput
          style={tw`p-3 border-2 w-full rounded-sm items-center`}
          placeholder="Username"
        />
        <TextInput
          style={tw`mt-4 p-3 border-2 w-full rounded-sm items-center`}
          placeholder="Full name"
        />
        <TextInput
          style={tw`mt-4 p-3 border-2 w-full rounded-sm items-center`}
          placeholder="Email address"
        />
        <TextInput
          style={tw`mt-4 p-3 border-2 w-full rounded-sm items-center`}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={tw`bg-green-500 p-3 mt-5 font-bold rounded-full w-3/5 items-center justify-center`}
        >
          <Text style={tw`text-white font-bold`}>Log In</Text>
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
    </SafeAreaView>
  )
}
