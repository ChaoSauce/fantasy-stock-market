import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import tw from 'tailwind-react-native-classnames';

export default function Posts({ posts }) {
  return (
    <View style={tw`flex-1 w-full`}>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={posts}
        renderItem={({item}) => (
          <View style={tw`flex justify-center border-t-4 border-gray-400`} onStartShouldSetResponder={() => true}>
            <View style={tw`flex-row items-center pt-2 pl-2`}>
              <View style={tw`flex items-center p-2 mr-2 border rounded-full`}>
                <Image
                  style={tw`h-4 w-4`}
                  source={{uri: 'https://img.icons8.com/windows/96/000000/gender-neutral-user.png'}}
                />
              </View>
              <View style={tw`flex-col justify-center`}>
                <View style={tw`flex-row items-center`}>
                  <Text style={tw`text-base font-bold leading-4`}>{item.fullName} </Text>
                  <Text style={tw`text-base text-gray-700 leading-4`}>@{item.username} </Text>
                </View>
                <View style={tw`flex`}>
                  <Text style={tw`text-xs leading-4`}>{formatDistanceToNow(item.timeStamp)} ago</Text>
                </View>
              </View>
            </View>
            <View style={tw`flex px-2 py-3 border-b border-gray-300`}>
              <Text>{item.text}</Text>
            </View>
            <View style={tw`flex-row items-center p-2`}>
              <TouchableOpacity style={tw`flex-row items-center`} onPress={() => alert('Like')}>
                <Image
                  source={{uri: 'https://img.icons8.com/material-outlined/96/000000/facebook-like--v1.png'}}
                  style={tw`h-4 w-4`}
                />
                <Text style={tw`mr-3`}> Like</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`flex-row items-center`} onPress={() => alert('Like')}>
                <Image
                  source={{uri: 'https://img.icons8.com/fluency-systems-regular/96/000000/comments--v2.png'}}
                  style={tw`h-4 w-4`}
                />
                <Text> Comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item.docId}
      />
    </View>
  )
}
