import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import LoggedInUserContext from '../../context/logged-in-user';
import { getPosts, getUserByUserId } from '../../services/firebase';
import FirebaseContext from '../../context/firebase';
import Posts from './posts';

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
    <SafeAreaView edges={['top', 'left', 'right']} style={tw`flex-1 container max-w-screen-sm mx-auto bg-gray-100`}>
      <View style={tw`flex justify-start px-2 py-1 bg-gray-100`}>
        <Text style={tw`text-2xl`}>Fantasy Stock</Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tw`flex-1 container justify-center w-full items-center`}>
          <View style={tw`flex-row justify-start w-full`}>
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
          <Posts posts={posts} />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
