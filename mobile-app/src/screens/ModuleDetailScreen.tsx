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
    'ModuleDetail'
  >;

export default function ModuleDetailScreen({
  route,
  navigation,
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
            Active Module
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
            Learn concepts,
            practice smarter
            and build strong
            foundations.
          </Text>
        </View>

        <GlassCard
          style={
            styles.heroCard
          }
        >
          <View
            style={
              styles.metaRow
            }
          >
            <View>
              <Text
                style={
                  styles.metaValue
                }
              >
                Easy
              </Text>

              <Text
                style={
                  styles.metaLabel
                }
              >
                Difficulty
              </Text>
            </View>

            <View>
              <Text
                style={
                  styles.metaValue
                }
              >
                Start
              </Text>

              <Text
                style={
                  styles.metaLabel
                }
              >
                Status
              </Text>
            </View>
          </View>
        </GlassCard>

        <Text
          style={
            styles.sectionTitle
          }
        >
          Learning Tools
        </Text>

        <TouchableOpacity
          activeOpacity={
            0.85
          }
          onPress={() =>
            navigation.navigate(
              'Lesson',
              {
                title,
              }
            )
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
                name="play-circle"
                size={28}
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
                  Lessons
                </Text>

                <Text
                  style={
                    styles.toolText
                  }
                >
                  Learn chapter
                  concepts step
                  by step
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
          onPress={() =>
            navigation.navigate(
              'Tabs',
              {
                screen: 'AI',
                params: {
                  topic: title,
                },
              }
            )
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
                name="sparkles"
                size={28}
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
                  AI Mentor
                </Text>

                <Text
                  style={
                    styles.toolText
                  }
                >
                  Ask doubts and
                  simplify hard
                  concepts
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
          onPress={() =>
            navigation.navigate(
              'Tabs',
              {
                screen:
                  'Quiz',
              } as any
            )
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
                name="flash"
                size={28}
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
                  Quiz
                </Text>

                <Text
                  style={
                    styles.toolText
                  }
                >
                  Practice and
                  test your
                  understanding
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
    root:{flex:1,backgroundColor:Colors.background},
    content:{paddingTop:70,paddingBottom:120,paddingHorizontal:Spacing.lg},
    header:{marginBottom:24},
    badge:{alignSelf:'flex-start',backgroundColor:'#DBEAFE',color:Colors.primary,paddingHorizontal:12,paddingVertical:6,borderRadius:999,fontWeight:'600',marginBottom:18},
    title:{color:Colors.textPrimary,fontSize:Typography.headingXL,fontWeight:'800',marginBottom:10},
    subtitle:{color:Colors.textSecondary,lineHeight:24,fontSize:Typography.bodyMD},
    heroCard:{marginBottom:28},
    metaRow:{flexDirection:'row',justifyContent:'space-between'},
    metaValue:{color:Colors.primary,fontWeight:'800',fontSize:24},
    metaLabel:{color:Colors.textSecondary,marginTop:4},
    sectionTitle:{color:Colors.textPrimary,fontSize:Typography.bodyLG,fontWeight:'700',marginBottom:16},
    toolCard:{marginBottom:16},
    toolRow:{flexDirection:'row',alignItems:'center'},
    toolInfo:{flex:1,marginLeft:14},
    toolTitle:{color:Colors.textPrimary,fontWeight:'700',fontSize:Typography.bodyMD,marginBottom:4},
    toolText:{color:Colors.textSecondary,lineHeight:22},
  });