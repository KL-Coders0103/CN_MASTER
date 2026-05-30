import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView
} from 'react-native';

import * as Speech from 'expo-speech';

import GlowBackground from '@components/GlowBackground';
import GlassCard from '@components/GlassCard';

import Colors from '@theme/colors';
import Spacing from '@theme/spacing';
import Typography from '@theme/typography';

import {
  chatAIAPI,
} from '@services/aiService';

import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/types';
import { getAIChat, saveAIChat, clearAIChat } from '@/utils/aiStorage';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import Marked from 'react-native-marked';
import { saveNote, clearNotes, getNotes } from '@/utils/noteStorage';

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
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
    inputHeight,
    setInputHeight
  ] = useState(120);

  const [
    regenerating,
    setRegenerating,
  ] = useState(false);

  const scrollRef = useRef<any>(null);

  type AIROuteProp = RouteProp<RootStackParamList, 'AIScreen'>;
  const route = useRoute<AIROuteProp>();

  useEffect(() => {
    if(route.params?.topic) {
      setCurrentTopic(route.params.topic);
    }
  }, [route.params?.topic]);

  useEffect(() => {
    const loadChat = async () => {
      const chat = await getAIChat();

      if(chat?.length) {
        setMessages(chat);
      }
    };
    loadChat();

    chatAIAPI(
      [
        {
          role: 'user',
          content: 'hi',
        },
      ]).catch(() => {});
  }, []);

  useEffect(() => {
    saveAIChat(messages);
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({
      animated: true,
    });
  }, [messages, displayedResponse]);

  const [ currentTopic, setCurrentTopic ] = useState(route.params?.topic || 'Computer Networks');

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
              timestamp: Date.now(),
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
            timestamp: Date.now(),
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

  const startNewChat = async () => {
    setMessages([]);
    setResponse('');
    setDisplayedResponse('');
    await clearAIChat();
  }

  const copyMessage = async (text: string) => {
    await Clipboard.setStringAsync(text);

    Toast.show({
      type: 'success',
      text1: 'Copied',
    });
  };

  const regenerateAnswer =
      async () => {
        if (
          loading ||
          regenerating ||
          !messages.length
        ) {
          return;
        }

        setRegenerating(
          true
        );

        try {
          const cleanedMessages =
            messages.filter(
              (
                m,
                idx
              ) =>
                !(
                  idx ===
                    messages.length -
                      1 &&
                  m.role ===
                    'ai'
                )
            );

          setMessages(
            cleanedMessages
          );

          setDisplayedResponse(
            ''
          );

          const history =
            cleanedMessages
              .slice(-6)
              .map(
                message => ({
                  role:
                    message.role ===
                    'ai'
                      ? 'assistant'
                      : 'user',

                  content:
                    message.content,
                })
              );

          const result =
            await chatAIAPI(
              history
            );

          const aiMessage:
              Message = {
              role:
                'ai',

              content:
                result.answer,

              timestamp:
                Date.now(),
            } ;

          setMessages(
            prev => [
              ...prev,
              aiMessage,
            ]
          );

          let index =
            0;

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
          setRegenerating(
            false
          );
        }
      };

  const speakMessage = (text: string) => {
    Speech.stop();
    Speech.speak(
      text,{ language: 'en-US', pitch:1, rate:0.9}
    );
  };

  const stopSpeaking = () => {
    Speech.stop();
  };

  const handleSaveNote = async(content:string) => {
    await saveNote({
      id: Date.now().toString(),
      topic: currentTopic,
      content,
      createdAt: Date.now(),
    });
    Toast.show({
      type:'success',
      text1:'Saved to Notes',
    })
  }

  return (
    <KeyboardAvoidingView style={styles.root} behavior={
      Platform.OS === 'ios' ? 'padding' : 'height'
    }>
      <GlowBackground />

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <View
          style={styles.headerRow}
        >
          <Text
            style={styles.title}
          >
            AI Mentor
          </Text>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={startNewChat}
            style={styles.newChatButton}
          >
            <Text
              style={styles.newChatText}
            >
              New Chat
            </Text>
          </TouchableOpacity>
        </View>

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
              'Introduction to CN',
              'OSI Model',
              'TCP/IP',
              'Network Devices',
              'IP Addressing',
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
            onContentSizeChange={(e) => setInputHeight(Math.min(180, Math.max(120, e.nativeEvent.contentSize.height)))}
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
            style={[
              styles.input,
              {height: inputHeight},
            ]}
          />

          <View
            style={
              styles.inputFooter
            }
          >
            <TouchableOpacity
              activeOpacity={
                0.85
              }
              onPress={
                askAI
              }
              disabled={
                loading
              }
              style={[
                styles.sendButton,

                loading && {
                  opacity:
                    0.6,
                },
              ]}
            >
              <Ionicons
                name="send"
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </GlassCard>

        {messages.map(
          (msg, idx) => (
            <View key={idx} 
              style={[
                styles.messageRow,

                msg.role === 'user' ? styles.userRow : styles.aiRow,
              ]}
            >
              {msg.role === 'ai' && (
                <View
                  style={styles.avatarAI}
                >
                  <Ionicons
                    name="sparkles"
                    size={18}
                    color="#fff"
                  />
                </View>
              )}
              <TouchableOpacity
                activeOpacity={0.9}
                onLongPress={() => copyMessage(msg.content)}
              >
              <GlassCard
                style={[
                  styles.messageBubble,

                  msg.role === 'user' ? styles.userBubble : styles.aiBubble,
                ]}
              >
                {msg.role ===
                    'ai' ? (
                    <Marked
                      value={
                        idx ===
                          messages.length -
                            1 &&
                        displayedResponse
                          ? displayedResponse
                          : msg.content
                      }
                      flatListProps={{
                        scrollEnabled:false,
                      }}
                      styles={{
                      text:{
                        color:
                          Colors.textPrimary,
                        fontSize:
                          Typography.bodyMD,
                        lineHeight:
                          26,
                      },

                      code:{
                        backgroundColor:
                          'rgba(255,255,255,0.08)',
                        borderRadius:8,
                        padding:8,
                      },

                      blockquote:{
                        borderLeftWidth:3,
                        borderLeftColor:
                          Colors.primary,
                        paddingLeft:10,
                      },
                    }}
                    />
                  ) : (
                    <Text
                      style={
                        styles.messageText
                      }
                    >
                      {msg.content}
                    </Text>
                  )}

                <Text
                  style={styles.timeText}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
                {msg.role === 'ai' && idx === messages.length-1 && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={regenerateAnswer}
                    disabled={regenerating}
                    style={styles.regenButton}
                  >
                    <Ionicons 
                      name="refresh"
                      size={14}
                      color={Colors.primary}
                    />

                    <Text
                      style={styles.regenText}
                    >
                      {regenerating ? 'Generating' : 'Regenerate'}
                    </Text>

                    {msg.role ===
                      'ai' && (
                      <View
                        style={
                          styles.actionRow
                        }
                      >
                        <TouchableOpacity
                          activeOpacity={
                            0.8
                          }
                          onPress={() =>
                            speakMessage(
                              msg.content
                            )
                          }
                          style={
                            styles.actionButton
                          }
                        >
                          <Ionicons
                            name="volume-high"
                            size={14}
                            color={
                              Colors.primary
                            }
                          />

                          <Text
                            style={
                              styles.actionText
                            }
                          >
                            Speak
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          activeOpacity={
                            0.8
                          }
                          onPress={
                            stopSpeaking
                          }
                          style={
                            styles.actionButton
                          }
                        >
                          <Ionicons
                            name="stop-circle"
                            size={14}
                            color={
                              Colors.primary
                            }
                          />

                          <Text
                            style={
                              styles.actionText
                            }
                          >
                            Stop
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => handleSaveNote(msg.content)}
                          style={styles.actionButton}
                        >
                          <Ionicons 
                            name="star"
                            size={14}
                            color={Colors.primary}
                          />
                          <Text
                            style={styles.actionText}
                          >Save</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </TouchableOpacity>
                )}
              </GlassCard>
              </TouchableOpacity>

              {msg.role === 'user' && (
                <View
                  style={styles.avatarUser}
                >
                  <Ionicons
                    name='person'
                    size={18}
                    color='#fff'
                  />
                </View>
              )}
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
    </KeyboardAvoidingView>
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
      marginTop:18,
      flexDirection:'row',
      alignItems:'flex-end',
      width:'100%',
    },

    userRow:{
      justifyContent:'flex-end',
    },

    aiRow:{
      justifyContent:'flex-start',
    },

    messageBubble:{
      maxWidth:'78%',
      paddingHorizontal:4,
      paddingVertical:2,
    },

    userBubble:{
      backgroundColor: Colors.primary,
      borderRadius: 22,
      shadowColor: Colors.primary,
      shadowOffset:{
        width:0,
        height:6
      },
      shadowOpacity:0.18,
      shadowRadius:12,
      elevation:6
    },

    aiBubble:{
      backgroundColor:Colors.glass,
      borderWidth:1,
      borderColor:Colors.glassBorder,
      borderRadius: 22,
      shadowColor: '#000',
      shadowOffset:{
        width:0,
        height:4,
      },
      shadowOpacity:0.08,
      shadowRadius:10,
      elevation:4,
    },

    messageText:{
      color: Colors.textPrimary,
      lineHeight:26,
      fontSize: Typography.bodyMD,
      paddingHorizontal: 4
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

    headerRow:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
    },

    newChatButton:{
      paddingHorizontal:14,
      paddingVertical:10,
      backgroundColor: Colors.surface,
      borderRadius:14,
    },

    newChatText:{
      color: Colors.primary,
      fontWeight:'700',
    },

    timeText:{
      marginTop:8,
      fontSize:11,
      color: Colors.textMuted,
      alignSelf:'flex-end',
    },

    inputFooter:{
      marginTop:16,
      alignItems:
        'flex-end',
    },

    sendButton:{
      width:52,
      height:52,
      borderRadius:26,
      backgroundColor:
        Colors.primary,
      justifyContent:
        'center',
      alignItems:
        'center',
    },

    avatarAI:{
      width:34,
      height:34,
      borderRadius: 17,
      backgroundColor: Colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
    },
    
    avatarUser:{
      width:34,
      height:34,
      borderRadius: 17,
      backgroundColor: Colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
    },

    regenButton: {
      flexDirection:'row',
      alignItems:'center',
      marginTop:10,
      alignSelf:'flex-end'
    },

    regenText:{
      color:Colors.primary,
      marginLeft:6,
      fontSize:12,
      fontWeight:'600'
    },

    actionRow:{
      flexDirection:
        'row',
      marginTop:8,
      alignSelf:
        'flex-end',
    },

    actionButton:{
      flexDirection:
        'row',
      alignItems:
        'center',
      marginLeft:14,
    },

    actionText:{
      color:
        Colors.primary,
      marginLeft:5,
      fontSize:12,
      fontWeight:'600',
    },
  });