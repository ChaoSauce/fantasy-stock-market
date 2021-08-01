import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { SafeAreaView } from 'react-native-safe-area-context';
import FirebaseContext from '../../context/firebase';
import LoggedInUserContext from '../../context/logged-in-user';
import { getUserByUserId } from '../../services/firebase';

export default function Profile() {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(LoggedInUserContext);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function getCurrentUser() {
      const [result] = await getUserByUserId(user.uid);
      setCurrentUser(result);
    }

    getCurrentUser();
  }, [user])
  
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
      title: 'First Post',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f632',
      title: 'Second Post',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d723',
      title: 'Third Post',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba4',
      title: 'First Post',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f635',
      title: 'Second Post',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d726',
      title: 'Third Post',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba7',
      title: 'First Post',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f638',
      title: 'Second Post',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d729',
      title: 'Third Post',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba0',
      title: 'First Post',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6311',
      title: 'Second Post',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d7212',
      title: 'Third Post',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba13',
      title: 'First Post',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6314',
      title: 'Second Post',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d7215',
      title: 'Third Post',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba016',
      title: 'First Post',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f631117',
      title: 'Second Post',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72121',
      title: 'Third Post',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba132',
      title: 'First Post',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63143',
      title: 'Second Post',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72154',
      title: 'Third Post',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba05',
      title: 'First Post',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63116',
      title: 'Second Post',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72127',
      title: 'Third Post',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba138',
      title: 'First Post',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63149',
      title: 'Second Post',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d721510',
      title: 'Third Post',
    },
  ];

  return (
    <SafeAreaView style={tw`container flex-1 mt-5 mx-auto max-w-screen-sm items-center bg-gray-100`}>
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
            style={tw`flex bg-red-500 py-1 px-3 mr-4 items-center justify-center`}
          >
            <Text style={tw`font-bold text-white text-base`}>Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex bg-red-500 py-1 px-3 items-center justify-center`}
          >
            <Text style={tw`font-bold text-white text-base`}>Message</Text>
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
      
      <View style={tw`flex-1 my-4 w-full`}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={DATA}
          renderItem={({item}) => (
            <View>
              <Text style={tw`text-center`}>{item.title}</Text>
            </View>
          )}
        />
      </View>

      <TouchableOpacity
        style={tw`bg-red-500 p-2 mb-2 w-2/5 rounded-full items-center justify-center`}
        onPress={() => firebase.auth().signOut()}
      >
        <Text style={tw`text-white font-bold text-base`}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
