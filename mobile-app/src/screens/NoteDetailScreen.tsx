import React, {
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import Colors
from
'@theme/colors';

import Typography
from
'@theme/typography';

import {
  updateNote,
  Note,
} from
'@utils/noteStorage';

import Toast
from
'react-native-toast-message';

export default function NoteDetailScreen() {
  const navigation =
    useNavigation();

  const route =
    useRoute<any>();

  const note:
    Note =
    route.params
      .note;

  const [
    content,
    setContent,
  ] = useState(
    note.content
  );

  const handleSave =
    async () => {
      await updateNote(
        {
          ...note,
          content,
        }
      );

      Toast.show({
        type:
          'success',
        text1:
          'Note Updated',
      });

      navigation.goBack();
    };

  return (
    <View
      style={
        styles.root
      }
    >
      <Text
        style={
          styles.topic
        }
      >
        {note.topic}
      </Text>

      <TextInput
        multiline
        value={
          content
        }
        onChangeText={
          setContent
        }
        style={
          styles.input
        }
      />

      <TouchableOpacity
        activeOpacity={
          0.85
        }
        onPress={
          handleSave
        }
        style={
          styles.saveBtn
        }
      >
        <Text
          style={
            styles.saveText
          }
        >
          Save Changes
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles =
  StyleSheet.create({
    root:{
      flex:1,
      backgroundColor:
        Colors.background,
      padding:20,
    },

    topic:{
      color:
        Colors.primary,
      fontSize:22,
      fontWeight:'700',
      marginBottom:20,
    },

    input:{
      flex:1,
      backgroundColor:
        Colors.surface,
      borderRadius:18,
      padding:18,
      color:
        Colors.textPrimary,
      fontSize:
        Typography.bodyMD,
      textAlignVertical:
        'top',
    },

    saveBtn:{
      marginTop:20,
      backgroundColor:
        Colors.primary,
      borderRadius:18,
      paddingVertical:16,
      alignItems:
        'center',
    },

    saveText:{
      color:'#fff',
      fontWeight:'700',
      fontSize:16,
    },
  });