import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import tw from 'tailwind-react-native-classnames';
import Actions from './actions';

export default function Posts({ posts }) {
  return (
    <View style={tw`flex-1 w-full`}>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={posts}
        renderItem={({item}) => (
          <View style={tw`flex justify-center border-b-4 border-gray-400`} onStartShouldSetResponder={() => true}>
            <View style={tw`flex-row items-center pt-2 pl-2`}>
              <View style={tw`flex items-center mr-2`}>
                <Image
                  style={tw`h-12 w-12 rounded-full`}
                  source={{uri: item.profileImage}}
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
            <View style={tw`flex pl-16 pr-2 pb-2 pt-1`}>
              <Text>{item.text}</Text>
            </View>
            <Actions item={item} />
          </View>
        )}
        keyExtractor={item => item.docId}
      />
    </View>
  )
}
