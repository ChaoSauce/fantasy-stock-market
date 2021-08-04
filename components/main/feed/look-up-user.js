import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUsersBySearchText } from '../../../services/firebase';

export default function LookUpUser({ navigation }) {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    async function fetchUsersBySearch() {
      var strlength = searchText.length;
      var strFrontCode = searchText.slice(0, strlength-1);
      var strEndCode = searchText.slice(strlength-1, searchText.length);

      var startcode = searchText;
      var endcode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

      const result = await getUsersBySearchText(startcode.toLowerCase(), endcode.toLowerCase());

      setUsers(
        result.map((user) => (
          {
            ...user,
            fullName: user.fullName.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
          }
        ))
      );
    };

    if (searchText != '') {
      fetchUsersBySearch();
    } else {
      setUsers([]);
    }
  }, [searchText])

  return (
    <SafeAreaView style={tw`flex-1 container max-w-screen-xl mx-auto bg-gray-100`}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tw`flex justify-center items-center`}>
          <View style={tw`flex-row justify-start items-center my-3 py-1 pl-2 w-full`}>
            <TouchableOpacity
              style={tw`flex justify-center items-center`}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={{uri: 'https://img.icons8.com/ios-glyphs/90/000000/back.png'}}
                style={tw`h-7 w-7`}
              />
            </TouchableOpacity>
            <View style={tw`flex justify-center ml-3 items-center w-10/12`}>
              <TextInput
                style={tw`border border-gray-300 py-2 px-3 rounded-full w-full`}
                placeholder='Search...'
                onChangeText={(search) => setSearchText(search)}
                value={searchText}
              />
            </View>
          </View>
          <View style={tw`flex justify-center border-t border-gray-300 w-full p-2`}>
            <FlatList
              numColumns={1}
              horizontal={false}
              data={users}
              renderItem={({item}) => (
                <View>
                  <Text>{item.fullName}</Text>
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
