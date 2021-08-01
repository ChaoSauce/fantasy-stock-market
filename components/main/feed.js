import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';

export default function Feed() {
  const [status, setStatus] = useState('');

  useEffect(() => {
    
  }, [status])

  const handleSubmit = () => {
    setStatus('');
    Keyboard.dismiss();
  }
  
  return (
    <SafeAreaView style={tw`flex-1 container max-w-screen-sm mx-auto bg-gray-100`}>
      <View style={tw`flex justify-start px-2 py-1`}>
        <Text style={tw`text-2xl`}>Fantasy Stock</Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tw`flex-1 container w-full items-center`}>
          <View style={tw`flex-row justify-start w-full`}>
            <TextInput
              style={tw`flex p-2 w-4/5 border border-gray-300`}
              multiline
              placeholder="What's on your mind?"
              onChangeText={(text) => setStatus(text)}
              value={status}
            />
            <TouchableOpacity
              style={tw`flex w-1/5 justify-center bg-blue-900`}
              onPress={handleSubmit}
            >
              <Text style={tw`text-lg text-white text-center`}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
