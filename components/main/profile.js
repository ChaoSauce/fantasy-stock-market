import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, Platform, StatusBar } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoggedInUserContext from '../../context/logged-in-user';
import { getUserByUserId, getUserPosts, uploadProfileImage } from '../../services/firebase';
import Posts from './feed/posts';
import * as ImagePicker from 'expo-image-picker';

export default function Profile() {
  const { user } = useContext(LoggedInUserContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getCurrentUser() {
      const result = await getUserByUserId(user.uid);
      setCurrentUser(result);
    }

    async function fetchUserPosts() {
      const results = await getUserPosts(currentUser, currentUser.docId);
      setPosts(results.sort((a, b) => b.timeStamp - a.timeStamp));
    };

    getCurrentUser();

    if (currentUser) {
      fetchUserPosts();
    }
  }, [currentUser])

  const createNoPermissionAlert = () =>
    Alert.alert(
      "Permission Required",
      "Permission to photo gallery is required to perform this task",
      [
        { text: "OK" }
      ],
      { cancelable: false }
    );

  const pickImage = async () => {
    const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (galleryStatus.status !== 'granted') {
      createNoPermissionAlert();
      return;
    }

    if (Platform.OS === 'ios') {
      StatusBar.setHidden(false);
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
      allowsEditing: true,
    });

    if (!result.cancelled) {
      uploadProfileImage(result.uri);
    }
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={tw`container flex-1 mx-auto max-w-screen-xl items-center bg-gray-100 border border-gray-300`}>
      <View style={tw`flex items-center`}>
        <Text style={tw`text-2xl font-bold`}>{currentUser?.fullName}</Text>
      </View>

      <TouchableOpacity
        style={tw`flex items-center`}
        onPress={() => pickImage()}
      >
        <Image
          style={tw`h-24 w-24 rounded-full`}
          source={{uri: currentUser?.profileImage}}
        />
      </TouchableOpacity>

      <View style={tw`flex justify-center w-full items-center`}>
        <Text style={tw`text-base mt-1`}>@{currentUser?.username}</Text>
        <View style={tw`flex-row justify-between m-1`}>
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

      <View style={tw`flex-row justify-center w-full border-b border-gray-300 px-10 pt-1 pb-2`}>
        <View style={tw`flex items-center justify-center mr-4`}>
          <Text>{currentUser?.followers.length || 0} followers</Text>
        </View>
        <View style={tw`flex items-center justify-center`}>
          <Text>{currentUser?.following.length || 0} following</Text>
        </View>
      </View>

      {currentUser && currentUser.bio !== '' && (
        <View style={tw`p-2 w-full border-b border-gray-300`}>
          <Text>this is a test bio taking up space</Text>
        </View>
      )}
      <Posts posts={posts} />
    </SafeAreaView>
  )
}
