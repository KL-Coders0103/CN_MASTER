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

import {
  useNavigation,
} from '@react-navigation/native';

import GlowBackground from '@components/GlowBackground';
import GlassCard from '@components/GlassCard';

import Colors from '@theme/colors';
import Spacing from '@theme/spacing';
import Typography from '@theme/typography';

const modules = [
  {
    title:
      'Introduction to CN',
    difficulty:
      'Easy',
    status:
      'Start',
  },
  {
    title:
      'OSI Model',
    difficulty:
      'Medium',
    status:
      'Locked',
  },
  {
    title:
      'TCP/IP Model',
    difficulty:
      'Medium',
    status:
      'Locked',
  },
  {
    title:
      'Network Devices',
    difficulty:
      'Medium',
    status:
      'Locked',
  },
  {
    title:
      'IP Addressing',
    difficulty:
      'Hard',
    status:
      'Locked',
  },
];

export default function LearnScreen() {
  const navigation =
    useNavigation<any>();

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
              styles.title
            }
          >
            Learn
          </Text>

          <Text
            style={
              styles.subtitle
            }
          >
            Build strong
            networking
            foundations step
            by step.
          </Text>
        </View>

        <GlassCard
          style={
            styles.heroCard
          }
        >
          <Text
            style={
              styles.heroBadge
            }
          >
            Learning Journey
          </Text>

          <Text
            style={
              styles.heroTitle
            }
          >
            Your CN mastery
            begins here.
          </Text>

          <View
            style={
              styles.progressTrack
            }
          >
            <View
              style={
                styles.progressFill
              }
            />
          </View>

          <Text
            style={
              styles.progressText
            }
          >
            1 of 5 modules
            started
          </Text>
        </GlassCard>

        <View
          style={
            styles.sectionHeader
          }
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            Modules
          </Text>
        </View>

        {modules.map(
          (
            module,
            index
          ) => (
            <TouchableOpacity
              key={index}
              activeOpacity={
                0.85
              }
              onPress={() =>
                navigation.navigate(
                  'ModuleDetail',
                  {
                    title:
                      module.title,
                  }
                )
              }
            >
              <GlassCard
                style={
                  styles.moduleCard
                }
              >
                <View
                  style={
                    styles.moduleTop
                  }
                >
                  <View
                    style={
                      styles.iconWrap
                    }
                  >
                    <Ionicons
                      name="book"
                      size={22}
                      color={
                        Colors.primary
                      }
                    />
                  </View>

                  <View
                    style={
                      styles.moduleInfo
                    }
                  >
                    <Text
                      style={
                        styles.moduleTitle
                      }
                    >
                      {
                        module.title
                      }
                    </Text>

                    <Text
                      style={
                        styles.moduleMeta
                      }
                    >
                      {
                        module.difficulty
                      }{' '}
                      ·{' '}
                      {
                        module.status
                      }
                    </Text>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={22}
                    color={
                      Colors
                        .textMuted
                    }
                  />
                </View>
              </GlassCard>
            </TouchableOpacity>
          )
        )}
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

    title: {
      fontSize:
        Typography.headingXL,
      fontWeight:
        '800',
      color:
        Colors.textPrimary,
      marginBottom: 8,
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
    },

    heroBadge: {
      color:
        Colors.primary,
      fontWeight:
        '600',
      marginBottom: 10,
    },

    heroTitle: {
      color:
        Colors.textPrimary,
      fontSize:
        Typography.headingMD,
      fontWeight:
        '700',
      marginBottom: 20,
    },

    progressTrack: {
      height: 10,
      backgroundColor:
        '#E2E8F0',
      borderRadius: 999,
      overflow:
        'hidden',
    },

    progressFill: {
      width: '20%',
      height: '100%',
      backgroundColor:
        Colors.primary,
      borderRadius: 999,
    },

    progressText: {
      marginTop: 10,
      color:
        Colors.textSecondary,
      fontSize:
        Typography.bodySM,
    },

    sectionHeader: {
      marginBottom: 16,
    },

    sectionTitle: {
      color:
        Colors.textPrimary,
      fontSize:
        Typography.bodyLG,
      fontWeight:
        '700',
    },

    moduleCard: {
      marginBottom: 16,
    },

    moduleTop: {
      flexDirection:
        'row',
      alignItems:
        'center',
    },

    iconWrap: {
      width: 46,
      height: 46,
      borderRadius: 14,
      justifyContent:
        'center',
      alignItems:
        'center',
      backgroundColor:
        'rgba(29,78,216,0.08)',
      marginRight: 14,
    },

    moduleInfo: {
      flex: 1,
    },

    moduleTitle: {
      color:
        Colors.textPrimary,
      fontWeight:
        '700',
      fontSize:
        Typography.bodyMD,
      marginBottom: 4,
    },

    moduleMeta: {
      color:
        Colors.textSecondary,
      fontSize:
        Typography.bodySM,
    },
  });