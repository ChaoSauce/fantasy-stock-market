import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import tw from 'tailwind-react-native-classnames';
import { getUserByUserId } from '../../../services/firebase';
import Actions from './actions';

export default function Posts({ posts }) {
  const [updatedPosts, setUpdatedPosts] = useState([...posts]);
  const [userIds, setUserIds] = useState([]);

  useEffect(() => {
    async function updatePosts() {
      const userIdsDict = Object.assign({}, ...(await getUserDict()));
      
      if (Object.keys(userIdsDict).length !== 0) {
        setUpdatedPosts([...posts.map((post) => ({
          ...post,
          username: userIdsDict[post.userId].username,
          fullName: userIdsDict[post.userId].fullName,
          profileImage: userIdsDict[post.userId].profileImage
        }))]);
      }

    }

    async function getUserDict() {
      return await Promise.all(
        userIds.map(async (userId) => ({
          [userId]: await getUserInfo(userId)
        }))
      )
    };

    async function getUserInfo(userId) {
      const [user] = await getUserByUserId(userId);
      return user;
    }
    
    const userIds = [...new Set(posts.map((post) => post.userId))];
    setUserIds(userIds);

    if (userIds.length > 0) {
      updatePosts();
    }    
  }, [posts]);

  return (
    <View style={tw`flex-1 w-full`}>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={updatedPosts}
        renderItem={({item}) => (
          <View style={tw`flex justify-center border-b-4 border-gray-400`} onStartShouldSetResponder={() => true}>
            <View style={tw`flex-row items-center pt-2 pl-2`}>
              <View style={tw`flex items-center mr-2`}>
                <Image
                  style={tw`h-12 w-12 rounded-full`}
                  source={{uri: item.profileImage, cache: 'only-if-cached'}}
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
            <View style={tw`flex pl-16 pr-2 pb-3 pt-1`}>
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
