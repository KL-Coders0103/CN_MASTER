import React from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

import GlowBackground from '@components/GlowBackground';
import GlassCard from '@components/GlassCard';

import Colors from '@theme/colors';
import Spacing from '@theme/spacing';
import Typography from '@theme/typography';

export default function QuizScreen() {
  return (
    <View style={styles.root}>
      <GlowBackground />

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
      >
        <View style={styles.header}>
          <Text
            style={
              styles.badge
            }
          >
            Quiz Arena
          </Text>

          <Text
            style={
              styles.title
            }
          >
            Practice and
            sharpen your
            concepts
          </Text>

          <Text
            style={
              styles.subtitle
            }
          >
            Strengthen your
            networking
            understanding
            through quizzes
            and challenges.
          </Text>
        </View>

        <GlassCard
          style={
            styles.heroCard
          }
        >
          <Ionicons
            name="trophy"
            size={38}
            color={
              Colors.primary
            }
          />

          <Text
            style={
              styles.heroTitle
            }
          >
            Learn + Practice
            + Improve
          </Text>

          <Text
            style={
              styles.heroText
            }
          >
            Quizzes help
            retain concepts
            and boost
            confidence.
          </Text>
        </GlassCard>

        <Text
          style={
            styles.sectionTitle
          }
        >
          Quiz Modes
        </Text>

        <TouchableOpacity
          activeOpacity={
            0.85
          }
        >
          <GlassCard
            style={
              styles.modeCard
            }
          >
            <View
              style={
                styles.modeRow
              }
            >
              <Ionicons
                name="flash"
                size={28}
                color={
                  Colors.primary
                }
              />

              <View
                style={
                  styles.modeInfo
                }
              >
                <Text
                  style={
                    styles.modeTitle
                  }
                >
                  Quick Quiz
                </Text>

                <Text
                  style={
                    styles.modeText
                  }
                >
                  Fast revision
                  questions
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={22}
                color={
                  Colors.textMuted
                }
              />
            </View>
          </GlassCard>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={
            0.85
          }
        >
          <GlassCard
            style={
              styles.modeCard
            }
          >
            <View
              style={
                styles.modeRow
              }
            >
              <Ionicons
                name="book"
                size={28}
                color={
                  Colors.primary
                }
              />

              <View
                style={
                  styles.modeInfo
                }
              >
                <Text
                  style={
                    styles.modeTitle
                  }
                >
                  Module Quiz
                </Text>

                <Text
                  style={
                    styles.modeText
                  }
                >
                  Topic-based
                  practice
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={22}
                color={
                  Colors.textMuted
                }
              />
            </View>
          </GlassCard>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={
            0.85
          }
        >
          <GlassCard>
            <View
              style={
                styles.modeRow
              }
            >
              <Ionicons
                name="flame"
                size={28}
                color={
                  Colors.primary
                }
              />

              <View
                style={
                  styles.modeInfo
                }
              >
                <Text
                  style={
                    styles.modeTitle
                  }
                >
                  Challenge
                  Mode
                </Text>

                <Text
                  style={
                    styles.modeText
                  }
                >
                  Competitive
                  learning
                  challenges
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={22}
                color={
                  Colors.textMuted
                }
              />
            </View>
          </GlassCard>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles =
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor:
        Colors.background,
    },

    content: {
      paddingTop: 70,
      paddingBottom: 120,
      paddingHorizontal:
        Spacing.lg,
    },

    header: {
      marginBottom: 24,
    },

    badge: {
      alignSelf:
        'flex-start',
      backgroundColor:
        '#DBEAFE',
      color:
        Colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
      fontWeight: '600',
      marginBottom: 18,
    },

    title: {
      color:
        Colors.textPrimary,
      fontSize:
        Typography.headingXL,
      fontWeight:
        '800',
      marginBottom: 10,
    },

    subtitle: {
      color:
        Colors.textSecondary,
      fontSize:
        Typography.bodyMD,
      lineHeight: 24,
    },

    heroCard: {
      marginBottom: 28,
      alignItems:
        'center',
    },

    heroTitle: {
      color:
        Colors.textPrimary,
      fontSize:
        Typography.headingMD,
      fontWeight:
        '700',
      marginTop: 14,
      marginBottom: 10,
      textAlign:
        'center',
    },

    heroText: {
      color:
        Colors.textSecondary,
      textAlign:
        'center',
      lineHeight: 24,
    },

    sectionTitle: {
      color:
        Colors.textPrimary,
      fontSize:
        Typography.bodyLG,
      fontWeight:
        '700',
      marginBottom: 16,
    },

    modeCard: {
      marginBottom: 16,
    },

    modeRow: {
      flexDirection:
        'row',
      alignItems:
        'center',
    },

    modeInfo: {
      flex: 1,
      marginLeft: 14,
    },

    modeTitle: {
      color:
        Colors.textPrimary,
      fontWeight:
        '700',
      fontSize:
        Typography.bodyMD,
      marginBottom: 4,
    },

    modeText: {
      color:
        Colors.textSecondary,
      lineHeight: 22,
    },
  });