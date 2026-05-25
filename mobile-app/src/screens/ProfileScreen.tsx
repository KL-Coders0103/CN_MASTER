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

import {
  useAuthStore,
} from '@store/authStore';

import {useFocusEffect} from '@react-navigation/native';

export default function ProfileScreen() {
  const user =
    useAuthStore(
      state =>
        state.user
    );

  const refreshUser =
    useAuthStore(
      state =>
        state.refreshUser
    );

  useFocusEffect(
    React.useCallback(
      () => {
        refreshUser();
      },
      []
    )
  );

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
            Profile
          </Text>

          <Text
            style={
              styles.title
            }
          >
            Your Learning
            Identity
          </Text>
        </View>

        <GlassCard
          style={
            styles.profileCard
          }
        >
          <View
            style={
              styles.avatar
            }
          >
            <Ionicons
              name="person"
              size={42}
              color={
                Colors.primary
              }
            />
          </View>

          <Text
            style={
              styles.name
            }
          >
            {user?.name ||
              'Student'}
          </Text>

          <Text
            style={
              styles.email
            }
          >
            {user?.email}
          </Text>
        </GlassCard>

        <GlassCard
          style={
            styles.statsCard
          }
        >
          <View
            style={
              styles.statsRow
            }
          >
            <View>
              <Text
                style={
                  styles.statValue
                }
              >
                {user?.xp ??
                  0}
              </Text>

              <Text
                style={
                  styles.statLabel
                }
              >
                XP
              </Text>
            </View>

            <View>
              <Text
                style={
                  styles.statValue
                }
              >
                {user?.streak ??
                  0}
                🔥
              </Text>

              <Text
                style={
                  styles.statLabel
                }
              >
                Streak
              </Text>
            </View>

            <View>
              <Text
                style={
                  styles.statValue
                }
              >
                {user?.isVerified
                  ? 'Yes'
                  : 'No'}
              </Text>

              <Text
                style={
                  styles.statLabel
                }
              >
                Verified
              </Text>
            </View>
          </View>
        </GlassCard>

        <Text
          style={
            styles.sectionTitle
          }
        >
          Account Tools
        </Text>

        <TouchableOpacity
          activeOpacity={
            0.85
          }
        >
          <GlassCard
            style={
              styles.toolCard
            }
          >
            <View
              style={
                styles.toolRow
              }
            >
              <Ionicons
                name="create"
                size={26}
                color={
                  Colors.primary
                }
              />

              <View
                style={
                  styles.toolInfo
                }
              >
                <Text
                  style={
                    styles.toolTitle
                  }
                >
                  Edit Profile
                </Text>

                <Text
                  style={
                    styles.toolText
                  }
                >
                  Update your
                  information
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
              styles.toolCard
            }
          >
            <View
              style={
                styles.toolRow
              }
            >
              <Ionicons
                name="settings"
                size={26}
                color={
                  Colors.primary
                }
              />

              <View
                style={
                  styles.toolInfo
                }
              >
                <Text
                  style={
                    styles.toolTitle
                  }
                >
                  Settings
                </Text>

                <Text
                  style={
                    styles.toolText
                  }
                >
                  Preferences and
                  controls
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
                styles.toolRow
              }
            >
              <Ionicons
                name="log-out"
                size={26}
                color={
                  Colors.error
                }
              />

              <View
                style={
                  styles.toolInfo
                }
              >
                <Text
                  style={[
                    styles.toolTitle,
                    {
                      color:
                        Colors.error,
                    },
                  ]}
                >
                  Logout
                </Text>

                <Text
                  style={
                    styles.toolText
                  }
                >
                  Securely sign
                  out
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

    badge:{
      alignSelf:'flex-start',
      backgroundColor:'#DBEAFE',
      color:Colors.primary,
      paddingHorizontal:12,
      paddingVertical:6,
      borderRadius:999,
      fontWeight:'600',
      marginBottom:18,
    },

    title:{
      color:Colors.textPrimary,
      fontSize:
        Typography.headingXL,
      fontWeight:'800',
    },

    profileCard:{
      alignItems:
        'center',
      marginBottom:20,
    },

    avatar:{
      width:90,
      height:90,
      borderRadius:45,
      justifyContent:
        'center',
      alignItems:
        'center',
      backgroundColor:
        'rgba(29,78,216,0.08)',
      marginBottom:16,
    },

    name:{
      color:
        Colors.textPrimary,
      fontSize:
        Typography.headingMD,
      fontWeight:
        '700',
      marginBottom:6,
    },

    email:{
      color:
        Colors.textSecondary,
    },

    statsCard:{
      marginBottom:28,
    },

    statsRow:{
      flexDirection:'row',
      justifyContent:
        'space-between',
    },

    statValue:{
      color:
        Colors.primary,
      fontWeight:'800',
      fontSize:24,
    },

    statLabel:{
      color:
        Colors.textSecondary,
      marginTop:4,
    },

    sectionTitle:{
      color:
        Colors.textPrimary,
      fontSize:
        Typography.bodyLG,
      fontWeight:'700',
      marginBottom:16,
    },

    toolCard:{
      marginBottom:16,
    },

    toolRow:{
      flexDirection:'row',
      alignItems:'center',
    },

    toolInfo:{
      flex:1,
      marginLeft:14,
    },

    toolTitle:{
      color:
        Colors.textPrimary,
      fontWeight:'700',
      fontSize:
        Typography.bodyMD,
      marginBottom:4,
    },

    toolText:{
      color:
        Colors.textSecondary,
      lineHeight:22,
    },
  });