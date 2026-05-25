import React from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import GlowBackground from '@components/GlowBackground';
import GlassCard from '@components/GlassCard';

import Colors from '@theme/colors';
import Spacing from '@theme/spacing';
import Typography from '@theme/typography';

import {
  RootStackParamList,
} from '@navigation/types';

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    'Lesson'
  >;

export default function LessonScreen({
  route,
}: Props) {
  const {
    title,
  } = route.params;

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
            Lesson
          </Text>

          <Text
            style={
              styles.title
            }
          >
            {title}
          </Text>

          <Text
            style={
              styles.subtitle
            }
          >
            Learn smarter and
            build strong
            conceptual
            foundations.
          </Text>
        </View>

        <GlassCard
          style={
            styles.progressCard
          }
        >
          <Text
            style={
              styles.progressTitle
            }
          >
            Progress
          </Text>

          <View
            style={
              styles.track
            }
          >
            <View
              style={
                styles.fill
              }
            />
          </View>

          <Text
            style={
              styles.progressText
            }
          >
            20% completed
          </Text>
        </GlassCard>

        <Text
          style={
            styles.sectionTitle
          }
        >
          Overview
        </Text>

        <GlassCard
          style={
            styles.sectionCard
          }
        >
          <Text
            style={
              styles.body
            }
          >
            Computer
            Networks enable
            communication
            between devices
            and systems using
            structured
            protocols and
            networking
            principles.
          </Text>
        </GlassCard>

        <Text
          style={
            styles.sectionTitle
          }
        >
          Key Concepts
        </Text>

        <GlassCard
          style={
            styles.sectionCard
          }
        >
          <Text
            style={
              styles.point
            }
          >
            • Network
            communication
          </Text>

          <Text
            style={
              styles.point
            }
          >
            • Protocols
          </Text>

          <Text
            style={
              styles.point
            }
          >
            • Data transfer
          </Text>

          <Text
            style={
              styles.point
            }
          >
            • Layered
            architecture
          </Text>
        </GlassCard>

        <Text
          style={
            styles.sectionTitle
          }
        >
          Learning Note
        </Text>

        <GlassCard>
          <Text
            style={
              styles.note
            }
          >
            Focus on
            understanding
            concepts before
            memorising
            definitions.
          </Text>
        </GlassCard>
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

    progressCard: {
      marginBottom: 28,
    },

    progressTitle: {
      color:
        Colors.textPrimary,
      fontWeight:
        '700',
      marginBottom: 14,
    },

    track: {
      height: 10,
      backgroundColor:
        '#E2E8F0',
      borderRadius: 999,
      overflow:
        'hidden',
    },

    fill: {
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
    },

    sectionTitle: {
      color:
        Colors.textPrimary,
      fontSize:
        Typography.bodyLG,
      fontWeight:
        '700',
      marginBottom: 14,
    },

    sectionCard: {
      marginBottom: 24,
    },

    body: {
      color:
        Colors.textSecondary,
      lineHeight: 26,
      fontSize:
        Typography.bodyMD,
    },

    point: {
      color:
        Colors.textSecondary,
      lineHeight: 28,
      fontSize:
        Typography.bodyMD,
    },

    note: {
      color:
        Colors.primary,
      fontWeight:
        '600',
      lineHeight: 24,
      fontSize:
        Typography.bodyMD,
    },
  });