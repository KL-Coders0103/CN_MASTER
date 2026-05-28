import React, {
  useEffect,
  useState,
} from 'react';

import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import GlowBackground from '@components/GlowBackground';
import GlassCard from '@components/GlassCard';

import Colors from '@theme/colors';
import Spacing from '@theme/spacing';
import Typography from '@theme/typography';

import Toast from 'react-native-toast-message';

import {
  useAuthStore,
} from '@store/authStore';

import {
  getQuizAPI,
  submitQuizAPI,
} from '@services/quizService';

interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAns: string;
}

export default function QuizPlayScreen() {
  const [
    quizzes,
    setQuizzes,
  ] = useState<Quiz[]>(
    []
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const [
    selected,
    setSelected,
  ] = useState<
    string | null
  >(null);

  const [
    submitted,
    setSubmitted,
  ] = useState(false);

  const [
    score,
    setScore,
  ] = useState(0);

  const refreshUser = useAuthStore(
    state => state.refreshUser
  );

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz =
    async () => {
      try {
        const result =
          await getQuizAPI();

        setQuizzes(
          result.quizzes
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

  if (loading) {
    return (
      <View
        style={
          styles.loader
        }
      >
        <ActivityIndicator
          size="large"
          color={
            Colors.primary
          }
        />
      </View>
    );
  }

  const quiz =
    quizzes[
      currentIndex
    ];

  if (!quiz) {

    const submitResult =
      async () => {
        try {
          const result =
            await submitQuizAPI(
              score
            );

          await refreshUser();

          Toast.show({
            type:
              'success',
            text1:
              `+${result.xpReward} XP earned`,
          });
        } catch (
          error
        ) {
          console.log(
            error
          );
        }
      };

    return (
      <View
        style={
          styles.root
        }
      >
        <GlowBackground />

        <View
          style={
            styles.resultBox
          }
        >
          <Text
            style={
              styles.resultText
            }
          >
            Score:
            {' '}
            {score}/
            {
              quizzes.length
            }
          </Text>

          <TouchableOpacity
            activeOpacity={
              0.85
            }
            style={
              styles.button
            }
            onPress={
              submitResult
            }
          >
            <Text
              style={
                styles.buttonText
              }
            >
              Claim Reward
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const submitAnswer =
    () => {
      if (
        !selected ||
        submitted
      ) {
        return;
      }

      setSubmitted(
        true
      );

      if (
        selected ===
        quiz.correctAns
      ) {
        setScore(
          prev =>
            prev + 1
        );
      }
    };

  const nextQuestion =
    () => {
      setSelected(
        null
      );

      setSubmitted(
        false
      );

      setCurrentIndex(
        prev =>
          prev + 1
      );
    };

  return (
    <View style={styles.root}>
      <GlowBackground />

      <ScrollView
        contentContainerStyle={
          styles.content
        }
      >
        <Text
          style={
            styles.badge
          }
        >
          Question
          {' '}
          {currentIndex + 1}
          /
          {
            quizzes.length
          }
        </Text>

        <Text
          style={
            styles.question
          }
        >
          {
            quiz.question
          }
        </Text>

        {quiz.options.map(
          option => {
            const isCorrect =
              option ===
              quiz.correctAns;

            const isSelected =
              option ===
              selected;

            return (
              <TouchableOpacity
                key={
                  option
                }
                activeOpacity={
                  0.85
                }
                onPress={() =>
                  !submitted &&
                  setSelected(
                    option
                  )
                }
              >
                <GlassCard
                  style={[
                    styles.optionCard,

                    isSelected &&
                      !submitted && {
                        borderColor:
                          Colors.primary,
                        borderWidth:
                          2,
                      },

                    submitted &&
                      isCorrect && {
                        borderColor:
                          Colors.success,
                        borderWidth:
                          2,
                      },

                    submitted &&
                      isSelected &&
                      !isCorrect && {
                        borderColor:
                          Colors.error,
                        borderWidth:
                          2,
                      },
                  ]}
                >
                  <Text
                    style={
                      styles.optionText
                    }
                  >
                    {option}
                  </Text>
                </GlassCard>
              </TouchableOpacity>
            );
          }
        )}

        {!submitted ? (
          <TouchableOpacity
            activeOpacity={
              0.85
            }
            style={
              styles.button
            }
            onPress={
              submitAnswer
            }
          >
            <Text
              style={
                styles.buttonText
              }
            >
              Submit
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={
              0.85
            }
            style={
              styles.button
            }
            onPress={
              nextQuestion
            }
          >
            <Text
              style={
                styles.buttonText
              }
            >
              Next
            </Text>
          </TouchableOpacity>
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

    loader:{
      flex:1,
      justifyContent:
        'center',
      alignItems:
        'center',
      backgroundColor:
        Colors.background,
    },

    content:{
      paddingTop:70,
      paddingBottom:120,
      paddingHorizontal:
        Spacing.lg,
    },

    badge:{
      alignSelf:'flex-start',
      backgroundColor:
        '#DBEAFE',
      color:
        Colors.primary,
      paddingHorizontal:12,
      paddingVertical:6,
      borderRadius:999,
      fontWeight:'600',
      marginBottom:24,
    },

    question:{
      color:
        Colors.textPrimary,
      fontSize:
        Typography.headingMD,
      fontWeight:'700',
      marginBottom:28,
      lineHeight:36,
    },

    optionCard:{
      marginBottom:16,
    },

    optionText:{
      color:
        Colors.textPrimary,
      fontSize:
        Typography.bodyMD,
      lineHeight:24,
    },

    button:{
      backgroundColor:
        Colors.primary,
      borderRadius:20,
      paddingVertical:16,
      alignItems:
        'center',
      marginTop:24,
    },

    buttonText:{
      color:'#fff',
      fontWeight:'700',
      fontSize:
        Typography.bodyMD,
    },

    resultBox:{
      flex:1,
      justifyContent:
        'center',
      alignItems:
        'center',
      padding:30,
    },

    resultTitle:{
      color:
        Colors.textPrimary,
      fontSize:
        Typography.headingLG,
      fontWeight:'800',
      marginBottom:14,
    },

    resultText:{
      color:
        Colors.textSecondary,
      fontSize:
        Typography.bodyLG,
    },
  });