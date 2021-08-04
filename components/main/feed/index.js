import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import LoggedInUserContext from '../../../context/logged-in-user';
import { getFollowingPosts, getUserByUserId } from '../../../services/firebase';
import FirebaseContext from '../../../context/firebase';
import Posts from './posts';

export default function Feed({ navigation }) {
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
      const results = await getFollowingPosts([...currentUser.following, currentUser.userId]);
      setPosts(results.sort((a, b) => b.timeStamp - a.timeStamp));
      setPostsCount(results.length);
    };
    
    if (!currentUser) {
      getCurrentUserInfo();
    } else {
      getUserPosts();
    }
  }, [currentUser, postsCount]);

  const handleSubmit = async () => {
    await firebase.firestore().collection('posts').add({
      text: status,
      timeStamp: (new Date()).getTime(),
      userId: user.uid,
    });

    setStatus('');
    setPostsCount((count) => count + 1);
  }
  
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={tw`flex-1 container max-w-screen-xl mx-auto bg-gray-100 border border-gray-300`}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tw`flex-1 container justify-center w-full`}>
          <View style={tw`flex-row justify-between items-center p-1`}>
            <View style={tw`flex justify-center px-2 py-1 bg-gray-100`}>
              <Text style={tw`text-2xl`}>Fantasy Stock</Text>
            </View>
            <TouchableOpacity
              style={tw`flex justify-center items-center px-3`}
              onPress={() => navigation.navigate('LookUpUser', { navigation: navigation })}
            >
              <Image
                style={tw`h-7 w-7`}
                source={{uri: 'https://img.icons8.com/ios/500/000000/search--v1.png'}}
              />
            </TouchableOpacity>
          </View>
          <View style={tw`flex-1 container justify-center w-full items-center`}>
            <View style={tw`flex-row justify-start w-full border-b-4 border-gray-400`}>
              <TextInput
                style={tw`flex p-2 w-4/5 border-t border-b border-gray-300`}
                multiline
                placeholder="What's on your mind?"
                onChangeText={(text) => setStatus(text)}
                value={status}
                returnKeyType='send'
              />
              <TouchableOpacity
                disabled={isInvalid}
                style={tw.style(`flex w-1/5 justify-center bg-blue-500`, isInvalid && 'opacity-50')}
                onPress={handleSubmit}
              >
                <Text style={tw`text-lg text-white text-center`}>Post</Text>
              </TouchableOpacity>
            </View>
            <Posts posts={posts} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
