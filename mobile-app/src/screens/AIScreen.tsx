import React, {
  useState,
} from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import GlowBackground from '@components/GlowBackground';
import GlassCard from '@components/GlassCard';

import Colors from '@theme/colors';
import Spacing from '@theme/spacing';
import Typography from '@theme/typography';

import {
  chatAIAPI,
} from '@services/aiService';

export default function AIMentorScreen() {
  const [
    prompt,
    setPrompt,
  ] = useState('');

  const [
    response,
    setResponse,
  ] = useState('');

  const [
    displayedResponse,
    setDisplayedResponse,
  ] = useState('');

  const [
    loading,
    setLoading,
  ] = useState(false);

  const askAI =
    async () => {
      if (
        loading ||
        !prompt.trim()
      ) {
        return;
      }

      try {
        setLoading(
          true
        );

        setResponse(
          ''
        );
        
        const result =
          await chatAIAPI(
            prompt
          );

        setResponse(
        result.answer
      );

      setDisplayedResponse(
        ''
      );

      let index = 0;

      const interval =
        setInterval(
          () => {
            index++;

            setDisplayedResponse(
              result.answer.slice(
                0,
                index
              )
            );

            if (
              index >=
              result.answer
                .length
            ) {
              clearInterval(
                interval
              );
            }
          },
          15
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  return (
    <View style={styles.root}>
      <GlowBackground />

      <ScrollView
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <Text
          style={
            styles.title
          }
        >
          AI Mentor
        </Text>

        <Text
          style={
            styles.subtitle
          }
        >
          Ask your
          networking
          doubts.
        </Text>

        <GlassCard>
          <TextInput
            value={
              prompt
            }
            onChangeText={
              setPrompt
            }
            placeholder="Explain TCP handshake"
            placeholderTextColor={
              Colors.textMuted
            }
            multiline
            style={
              styles.input
            }
          />

          <TouchableOpacity
            activeOpacity={
              0.85
            }
            style={
              styles.button
            }
            onPress={
              askAI
            }
            disabled={
              loading
            }
          >
            <Text
              style={
                styles.buttonText
              }
            >
              {loading
                ? 'Thinking...'
                : 'Ask AI'}
            </Text>
          </TouchableOpacity>
        </GlassCard>

        {(loading ||
          displayedResponse) && (
          <GlassCard
            style={
              styles.responseCard
            }
          >
            <Text
              style={
                styles.responseTitle
              }
            >
              {loading
                ? 'AI is thinking...'
                : 'AI Response'}
            </Text>

            <Text
              style={
                styles.responseText
              }
            >
              {displayedResponse}
            </Text>
          </GlassCard>
        )}
      </ScrollView>
    </View>
  );
}

const styles =
  StyleSheet.create({
    root:{
      flex:1,
      backgroundColor:
        Colors.background,
    },

    content:{
      paddingTop:70,
      paddingBottom:120,
      paddingHorizontal:
        Spacing.lg,
    },

    title:{
      color:
        Colors.textPrimary,
      fontSize:
        Typography.headingXL,
      fontWeight:'800',
    },

    subtitle:{
      color:
        Colors.textSecondary,
      marginTop:8,
      marginBottom:24,
      fontSize:
        Typography.bodyMD,
    },

    input:{
      minHeight:120,
      color:
        Colors.textPrimary,
      fontSize:
        Typography.bodyMD,
      textAlignVertical:
        'top',
    },

    button:{
      marginTop:18,
      backgroundColor:
        Colors.primary,
      borderRadius:18,
      paddingVertical:14,
      alignItems:
        'center',
    },

    buttonText:{
      color:'#fff',
      fontWeight:'700',
      fontSize:
        Typography.bodyMD,
    },

    responseCard:{
      marginTop:24,
    },

    responseTitle:{
      color:
        Colors.textPrimary,
      fontWeight:'700',
      marginBottom:12,
      fontSize:
        Typography.bodyLG,
    },

    responseText:{
      color:
        Colors.textSecondary,
      lineHeight:28,
      fontSize:
        Typography.bodyMD,
    },
  });