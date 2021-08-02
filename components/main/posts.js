import React from 'react';
import { View, Text, FlatList } from 'react-native';
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
          <View style={tw`flex justify-center p-1 mx-2 my-1 rounded border border-gray-400 shadow`}>
            <View style={tw`flex-row`}>
              <Text style={tw`text-base font-bold leading-4`}>{item.fullName} </Text>
              <Text style={tw`text-base text-gray-700 leading-4`}>@{item.username} </Text>
            </View>
            <View style={tw`flex`}>
              <Text style={tw`text-xs leading-4`}>{formatDistanceToNow(item.timeStamp.toDate())} ago</Text>
            </View>
            <View style={tw`flex mt-1 pb-1 border-b border-gray-300`}>
              <Text>{item.text}</Text>
            </View>
            <View style={tw`flex-row`}>
              <Text style={tw`mr-4`}>Like</Text>
              <Text>Comment</Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.docId}
      />
    </View>
  )
}
