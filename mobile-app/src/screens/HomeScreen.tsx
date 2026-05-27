import React from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
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

import {
  useAuthStore,
} from '@store/authStore';

export default function HomeScreen() {
  const user =
    useAuthStore(
      state =>
        state.user
    );

  const xp =
    user?.xp ?? 0;

  const streak =
    user?.streak ?? 0;

  const level =
    Math.floor(
      xp / 100
    ) + 1;

  const levelProgress =
    xp % 100;

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
              styles.greeting
            }
          >
            Hello,
          </Text>

          <Text
            style={
              styles.name
            }
          >
            {user?.name ||
              'Learner'}
            👋
          </Text>

          <Text
            style={
              styles.subtitle
            }
          >
            Keep building
            your networking
            mastery.
          </Text>
        </View>

        <GlassCard
          style={
            styles.levelCard
          }
        >
          <View
            style={
              styles.levelRow
            }
          >
            <View>
              <Text
                style={
                  styles.levelLabel
                }
              >
                Current Level
              </Text>

              <Text
                style={
                  styles.levelValue
                }
              >
                Level {level}
              </Text>
            </View>

            <Ionicons
              name="rocket"
              size={34}
              color={
                Colors.primary
              }
            />
          </View>

          <View
            style={
              styles.track
            }
          >
            <View
              style={[
                styles.fill,
                {
                  width:
                    `${levelProgress}%`,
                },
              ]}
            />
          </View>

          <Text
            style={
              styles.progressText
            }
          >
            {xp} XP earned
          </Text>
        </GlassCard>

        <View
          style={
            styles.statsRow
          }
        >
          <GlassCard
            style={
              styles.statCard
            }
          >
            <Ionicons
              name="flash"
              size={28}
              color={
                Colors.primary
              }
            />

            <Text
              style={
                styles.statValue
              }
            >
              {xp}
            </Text>

            <Text
              style={
                styles.statLabel
              }
            >
              Total XP
            </Text>
          </GlassCard>

          <GlassCard
            style={
              styles.statCard
            }
          >
            <Ionicons
              name="flame"
              size={28}
              color={
                Colors.warning
              }
            />

            <Text
              style={
                styles.statValue
              }
            >
              {streak}
            </Text>

            <Text
              style={
                styles.statLabel
              }
            >
              Day Streak
            </Text>
          </GlassCard>
        </View>

       <Text
  style={
    styles.sectionTitle
  }
>
  Achievements
</Text>

<View
  style={
    styles.badgesGrid
  }
>
  {user?.achievements?.map(
    achievement => (
      <GlassCard
        key={
          achievement.id
        }
        style={
          styles.badgeCard
        }
      >
        <View
          style={
            styles.badgeIcon
          }
        >
          <Ionicons
            name={
              achievement.id ===
              'beginner_explorer'
                ? 'planet'
                : achievement.id ===
                  'consistency_flame'
                ? 'flame'
                : 'trophy'
            }
            size={26}
            color={
              achievement
                .unlocked
                ? Colors.primary
                : Colors
                    .textMuted
            }
          />
        </View>

        <Text
          style={
            styles.badgeTitle
          }
        >
          {
            achievement.title
          }
        </Text>

        <Text
          style={
            achievement.unlocked
              ? styles.badgeStatus
              : styles
                  .lockedText
          }
        >
          {achievement
            .unlocked
            ? 'Unlocked'
            : 'Locked'}
        </Text>
      </GlassCard>
    )
  )}
</View>
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

    header:{
      marginBottom:24,
    },

    greeting:{
      color:
        Colors.textSecondary,
      fontSize:
        Typography.bodyLG,
    },

    name:{
      color:
        Colors.textPrimary,
      fontSize:
        Typography.headingXL,
      fontWeight:
        '800',
      marginTop:4,
    },

    subtitle:{
      color:
        Colors.textSecondary,
      marginTop:10,
      lineHeight:24,
      fontSize:
        Typography.bodyMD,
    },

    levelCard:{
      marginBottom:24,
    },

    levelRow:{
      flexDirection:'row',
      justifyContent:
        'space-between',
      alignItems:
        'center',
      marginBottom:20,
    },

    levelLabel:{
      color:
        Colors.textSecondary,
    },

    levelValue:{
      color:
        Colors.textPrimary,
      fontWeight:'800',
      fontSize:26,
      marginTop:6,
    },

    track:{
      height:10,
      backgroundColor:
        '#E2E8F0',
      borderRadius:999,
      overflow:'hidden',
    },

    fill:{
      height:'100%',
      backgroundColor:
        Colors.primary,
      borderRadius:999,
    },

    progressText:{
      marginTop:10,
      color:
        Colors.textSecondary,
    },

    statsRow:{
      flexDirection:'row',
      justifyContent:
        'space-between',
      marginBottom:28,
    },

    statCard:{
      width:'48%',
      alignItems:
        'center',
    },

    statValue:{
      color:
        Colors.textPrimary,
      fontWeight:'800',
      fontSize:28,
      marginTop:12,
    },

    statLabel:{
      color:
        Colors.textSecondary,
      marginTop:6,
    },

    sectionTitle:{
      color:
        Colors.textPrimary,
      fontSize:
        Typography.bodyLG,
      fontWeight:'700',
      marginBottom:16,
    },

    badgeRow:{
      flexDirection:'row',
      alignItems:
        'center',
    },

    badge:{
      width:52,
      height:52,
      borderRadius:16,
      justifyContent:
        'center',
      alignItems:
        'center',
      backgroundColor:
        'rgba(29,78,216,0.08)',
    },

    badgeInfo:{
      flex:1,
      marginLeft:14,
    },

    badgeText:{
      color:
        Colors.textSecondary,
      lineHeight:22,
    },

    badgesGrid:{
      flexDirection:'row',
      justifyContent:
        'space-between',
    },

    badgeCard:{
      width:'31%',
      alignItems:
        'center',
      paddingVertical:20,
    },

    badgeIcon:{
      width:52,
      height:52,
      borderRadius:16,
      justifyContent:
        'center',
      alignItems:
        'center',
      backgroundColor:
        'rgba(29,78,216,0.08)',
      marginBottom:14,
    },

    badgeTitle:{
      color:
        Colors.textPrimary,
      fontWeight:'700',
      textAlign:'center',
      fontSize:13,
      marginBottom:8,
    },

    badgeStatus:{
      color:
        Colors.success,
      fontWeight:'600',
      fontSize:12,
    },

    lockedText:{
      color:
        Colors.textMuted,
      fontWeight:'600',
      fontSize:12,
    },
  });