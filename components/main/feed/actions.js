import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import FirebaseContext from '../../../context/firebase';


export default function Actions({ item }) {
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const [toggleLiked, setToggleLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(item.likes.length);
  const [numComments, setNumComments] = useState(item.comments.length);

  useEffect(() => {
    if (item.likes.includes(firebase.auth().currentUser.uid)) {
      setToggleLiked(true);
    };
  }, [item]);

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);
  
    await firebase
      .firestore()
      .collection('posts')
      .doc(item.docId)
      .update({
        likes: toggleLiked
          ? FieldValue.arrayRemove(firebase.auth().currentUser.uid)
          : FieldValue.arrayUnion(firebase.auth().currentUser.uid)
      })
  
    setNumLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };

  return (
    <View style={tw`flex`}>
      <View style={tw`flex-row justify-end items-center p-2 border-b border-gray-300`}>
        <View style={tw`flex-row items-center`} onPress={() => alert('Like')}>
          <Text style={tw`mr-3`}>{numLikes}{numLikes > 1 ? ' Likes' : ' Like'}</Text>
        </View>
        <View style={tw`flex-row items-center`} onPress={() => alert('Like')}>
          <Text>{numComments}{numComments > 1 ? ' Comments' : ' Comment'}</Text>
        </View>
      </View>
      <View style={tw`flex-row items-center p-2`}>
        <TouchableOpacity style={tw`flex-row items-center`} onPress={handleToggleLiked}>
          <Image
            source={{uri: toggleLiked ? 'https://img.icons8.com/material-sharp/96/000000/facebook-like--v1.png' : 'https://img.icons8.com/material-outlined/96/000000/facebook-like--v1.png'}}
            style={tw`h-4 w-4`}
          />
          <Text style={tw`mr-3`}> Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex-row items-center`} onPress={() => alert('Show comments here...')}>
          <Image
            source={{uri: 'https://img.icons8.com/fluency-systems-regular/96/000000/comments--v2.png'}}
            style={tw`h-4 w-4`}
          />
          <Text> Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
