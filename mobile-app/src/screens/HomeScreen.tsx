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

import {
  useAuthStore,
} from '@store/authStore';

export default function HomeScreen() {
  const user =
    useAuthStore(
      state =>
        state.user
    );

  const navigation =
    useNavigation<any>();

  const hour =
    new Date().getHours();

  const greeting =
    hour < 12
      ? 'Good Morning'
      : hour < 18
      ? 'Good Afternoon'
      : 'Good Evening';

  const date =
    new Date().toLocaleDateString(
      'en-IN',
      {
        weekday:
          'long',
        day: 'numeric',
        month:
          'short',
      }
    );

  const progress = 14;

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
          <Text style={styles.greeting}>
            {greeting}
          </Text>

          <Text style={styles.name}>
            {user?.name}
          </Text>

          <Text style={styles.subtitle}>
            {date} · Keep
            building your
            momentum
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
            Learning Momentum
          </Text>

          <Text
            style={
              styles.heroTitle
            }
          >
            You're building
            consistency.
          </Text>

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
                0
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
                0🔥
              </Text>

              <Text
                style={
                  styles.statLabel
                }
              >
                Streak
              </Text>
            </View>
          </View>

          <View
            style={
              styles.progressTrack
            }
          >
            <View
              style={[
                styles.progressFill,
                {
                  width:
                    `${progress}%`,
                },
              ]}
            />
          </View>

          <Text
            style={
              styles.progressText
            }
          >
            {progress}% of
            learning goal
          </Text>
        </GlassCard>

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
            <View>
              <Text
                style={
                  styles.cardTitle
                }
              >
                Active Module
              </Text>

              <Text
                style={
                  styles.moduleName
                }
              >
                Computer
                Network Basics
              </Text>
            </View>

            <Ionicons
              name="play-circle"
              size={36}
              color={
                Colors.primary
              }
            />
          </View>

          <Text
            style={
              styles.cardText
            }
          >
            Resume your
            learning journey
            and unlock XP.
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
            Quick Access
          </Text>
        </View>

        <View
          style={
            styles.quickRow
          }
        >
          <TouchableOpacity
            activeOpacity={
              0.85
            }
            onPress={() =>
              navigation.navigate(
                'Learn'
              )
            }
          >
            <GlassCard
              style={
                styles.quickCard
              }
            >
              <Ionicons
                name="book"
                size={26}
                color={
                  Colors.primary
                }
              />

              <Text
                style={
                  styles.quickText
                }
              >
                Learn
              </Text>
            </GlassCard>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={
              0.85
            }
            onPress={() =>
              navigation.navigate(
                'AI'
              )
            }
          >
            <GlassCard
              style={
                styles.quickCard
              }
            >
              <Ionicons
                name="sparkles"
                size={26}
                color={
                  Colors.primary
                }
              />

              <Text
                style={
                  styles.quickText
                }
              >
                AI
              </Text>
            </GlassCard>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={
              0.85
            }
            onPress={() =>
              navigation.navigate(
                'Quiz'
              )
            }
          >
            <GlassCard
              style={
                styles.quickCard
              }
            >
              <Ionicons
                name="flash"
                size={26}
                color={
                  Colors.primary
                }
              />

              <Text
                style={
                  styles.quickText
                }
              >
                Quiz
              </Text>
            </GlassCard>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:{flex:1,backgroundColor:Colors.background},
  content:{paddingTop:70,paddingBottom:40,paddingHorizontal:Spacing.lg},
  header:{marginBottom:Spacing.lg},
  greeting:{color:Colors.primary,fontWeight:'600',marginBottom:6},
  name:{fontSize:Typography.headingXL,fontWeight:'800',color:Colors.textPrimary,marginBottom:8},
  subtitle:{color:Colors.textSecondary,fontSize:Typography.bodyMD},
  heroCard:{marginBottom:20},
  heroBadge:{color:Colors.primary,fontWeight:'600',marginBottom:10},
  heroTitle:{color:Colors.textPrimary,fontSize:Typography.headingMD,fontWeight:'700',marginBottom:20},
  statsRow:{flexDirection:'row',justifyContent:'space-between',marginBottom:20},
  statValue:{fontSize:30,fontWeight:'800',color:Colors.primary},
  statLabel:{color:Colors.textSecondary,marginTop:4},
  progressTrack:{height:10,backgroundColor:'#E2E8F0',borderRadius:999,overflow:'hidden'},
  progressFill:{height:'100%',borderRadius:999,backgroundColor:Colors.primary},
  progressText:{marginTop:10,color:Colors.textSecondary,fontSize:Typography.bodySM},
  moduleCard:{marginBottom:24},
  moduleTop:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},
  moduleName:{color:Colors.textPrimary,fontSize:Typography.bodyLG,fontWeight:'700',marginTop:6},
  cardTitle:{color:Colors.textSecondary,fontSize:Typography.bodySM,marginBottom:2},
  cardText:{color:Colors.textSecondary,lineHeight:22},
  sectionHeader:{marginBottom:14},
  sectionTitle:{color:Colors.textPrimary,fontWeight:'700',fontSize:Typography.bodyLG},
  quickRow:{flexDirection:'row',justifyContent:'space-between'},
  quickCard:{width:100,alignItems:'center',paddingVertical:22},
  quickText:{marginTop:10,color:Colors.textPrimary,fontWeight:'600'},
});