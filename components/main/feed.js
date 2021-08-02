import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import LoggedInUserContext from '../../context/logged-in-user';
import { getPosts } from '../../services/firebase';
import { formatDistanceToNow, set } from 'date-fns';
import { getUserByUserId } from '../../services/firebase';
import FirebaseContext from '../../context/firebase';

export default function Feed() {
  const [status, setStatus] = useState('');
  const [posts, setPosts] = useState([]);
  const [postsCount, setPostsCount] = useState(0);
  const { user } = useContext(LoggedInUserContext);
  const { firebase } = useContext(FirebaseContext);
  const [currentUser, setCurrentUser] = useState(null);
  const isInvalid = status === '';

  useEffect(() => {
    async function getCurrentUserInfo() {
      const [result] = await getUserByUserId(user.uid);
      setCurrentUser(result);
    }
    
    async function getUserPosts() {
      const results = await getPosts(user.uid);
      setPosts(results.sort((a, b) => b.timeStamp.toDate() - a.timeStamp.toDate()));
      setPostsCount(results.length);
    };
    
    if (user) {
      getUserPosts();
    }

    if (!currentUser) {
      getCurrentUserInfo();
    }
  }, [user, postsCount]);

  const handleSubmit = async () => {
    await firebase.firestore().collection('posts').add({
      fullName: currentUser.fullName,
      text: status,
      timeStamp: new Date(),
      userId: user.uid,
      username: currentUser.username
    });

    setStatus('');
    setPostsCount((count) => count + 1);
  }
  
  return (
    <SafeAreaView style={tw`flex-1 container max-w-screen-sm mx-auto bg-gray-100`}>
      <View style={tw`flex justify-start px-2 py-1 bg-gray-100`}>
        <Text style={tw`text-2xl`}>Fantasy Stock</Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tw`flex-1 container justify-center w-full items-center`}>
          <View style={tw`flex-row justify-start w-full mb-2`}>
            <TextInput
              style={tw`flex p-2 w-4/5 border border-gray-300`}
              multiline
              placeholder="What's on your mind?"
              onChangeText={(text) => setStatus(text)}
              value={status}
            />
            <TouchableOpacity
              disabled={isInvalid}
              style={tw.style(`flex w-1/5 justify-center bg-red-500`, isInvalid && 'opacity-50')}
              onPress={handleSubmit}
            >
              <Text style={tw`text-lg text-white text-center`}>Post</Text>
            </TouchableOpacity>
          </View>
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
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
