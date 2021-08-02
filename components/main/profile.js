import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { SafeAreaView } from 'react-native-safe-area-context';
import FirebaseContext from '../../context/firebase';
import LoggedInUserContext from '../../context/logged-in-user';
import { getUserByUserId, getPosts } from '../../services/firebase';
import { formatDistanceToNow } from 'date-fns';

export default function Profile() {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(LoggedInUserContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getCurrentUser() {
      const [result] = await getUserByUserId(user.uid);
      setCurrentUser(result);
    }

    async function getUserPosts() {
      const results = await getPosts(user.uid);
      setPosts(results.sort((a, b) => b.timeStamp.toDate() - a.timeStamp.toDate()));
    };

    getCurrentUser();

    if (user) {
      getUserPosts();
    }
  }, [user])

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={tw`container flex-1 mt-5 mx-auto max-w-screen-sm items-center bg-gray-100`}>
      <View style={tw`flex items-center mb-2`}>
        <Text style={tw`text-2xl font-bold`}>{currentUser?.fullName}</Text>
      </View>

      <View style={tw`flex items-center p-2 border rounded-full`}>
        <Image
          style={tw`h-20 w-20`}
          source={{uri: 'https://img.icons8.com/windows/96/000000/gender-neutral-user.png'}}
        />
      </View>

      <View style={tw`flex justify-center w-full items-center`}>
        <Text style={tw`text-base mt-2`}>@{currentUser?.username}</Text>
        <View style={tw`flex-row justify-between m-3`}>
          <TouchableOpacity
            style={tw`flex bg-red-500 py-1 px-5 mr-4 items-center justify-center rounded`}
          >
            <Text style={tw`font-bold text-white text-sm`}>Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex bg-gray-100 border py-1 px-5 items-center justify-center rounded`}
          >
            <Text style={tw`font-bold text-sm`}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={tw`flex-row justify-between w-full border-b border-gray-300 px-10 pb-3`}>
        <View style={tw`flex items-center justify-center`}>
          <Text>{currentUser?.posts.length || 0} posts</Text>
        </View>
        <View style={tw`flex items-center justify-center`}>
          <Text>{currentUser?.followers.length || 0} followers</Text>
        </View>
        <View style={tw`flex items-center justify-center`}>
          <Text>{currentUser?.following.length || 0} following</Text>
        </View>
      </View>

      {currentUser && currentUser.bio !== '' && (
        <View style={tw`p-3 w-full border-b border-gray-300 items-center`}>
          <Text>this is a test bio taking up space</Text>
        </View>
      )}
      
      <View style={tw`flex-1 w-full pt-1`}>
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
    </SafeAreaView>
  )
}
