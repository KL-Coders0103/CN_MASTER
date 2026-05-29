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

interface Message {
  role: 'user' | 'ai';
  content: string;
}

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
    messages,
    setMessages,
  ] = useState<Message[]>([]);

  const [
    currentTopic, 
    setCurrentTopic,
  ] = useState('Computer Networks');

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

        setMessages(
          prev => [
            ...prev, {
              role: 'user', 
              content: prompt,
            },
          ]
        );

        const history = [
          {
            role: 'system',
            content: `Current topic: ${currentTopic}. You are an expert mentor in this topic. Answer the user's question in a clear and concise manner, providing explanations and examples when necessary. If the user asks for clarification, provide more details or rephrase your answer. Always be helpful and patient.`,
          },
          ...messages,
          {
            role: 'user',
            content: prompt,
          },
        ].slice(-6).map(
          msg => ({
            role: msg.role === 'ai'? 'assistant' : msg.role,
            content: msg.content,
          })
        );

        const result =
          await chatAIAPI(
            history
          );

        setMessages(
        prev => [
          ...prev, {
            role: 'ai',
            content: result.answer,
          },
        ]
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

        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={
              false
            }
            style={
              styles.topicRow
            }
          >
            {[
              'Computer Networks',
              'OSI Model',
              'TCP/IP',
              'Routing',
              'DNS',
            ].map(
              topic => (
                <TouchableOpacity
                  key={
                    topic
                  }
                  activeOpacity={
                    0.85
                  }
                  onPress={() =>
                    setCurrentTopic(
                      topic
                    )
                  }
                  style={[
                    styles.topicChip,

                    currentTopic ===
                      topic && {
                      backgroundColor:
                        Colors.primary,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.topicText,

                      currentTopic ===
                        topic && {
                        color:'#fff',
                      },
                    ]}
                  >
                    {topic}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>

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

        {messages.map(
          (msg, idx) => (
            <View key={idx} 
              style={[
                styles.messageRow,

                msg.role === 'user' ? styles.userRow : styles.aiRow,
              ]}
            >
              <GlassCard
                style={[
                  styles.messageBubble,

                  msg.role === 'user' ? styles.userBubble : styles.aiBubble,
                ]}
              >
                <Text
                  style={
                    styles.messageText
                  }
                >
                  {msg.role === 'ai' && idx === messages.length - 1 ? displayedResponse : msg.content}
                </Text>
              </GlassCard>
            </View>
          )
        )}

        {loading && (
          <Text
            style={
              styles.thinkingText
            }
          >
            AI is thinking...
          </Text>
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

    messageRow:{
      marginTop:16,
    },

    userRow:{
      alignItems:'flex-end',
    },

    aiRow:{
      alignItems:'flex-start',
    },

    messageBubble:{
      maxWidth:'85%',
    },

    userBubble:{
      backgroundColor: Colors.primary,
    },

    aiBubble:{},

    messageText:{
      color: Colors.textPrimary,
      lineHeight:26,
      fontSize: Typography.bodyMD,
    },

    thinkingText:{
      color: Colors.textSecondary,
      marginTop:16,
    },

    topicRow:{
      marginBottom:20,
    },

    topicChip:{
      paddingHorizontal:16,
      paddingVertical:10,
      borderRadius:999,
      backgroundColor:
        Colors.surface,
      marginRight:10,
    },

    topicText:{
      color:
        Colors.textSecondary,
      fontWeight:'600',
    },
  });