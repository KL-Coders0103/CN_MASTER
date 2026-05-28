import React from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';

import Colors from '@theme/colors';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function GlassCard({
  children,
  style,
}: GlassCardProps) {
  return (
    <View
      style={[
        styles.card,
        style,
      ]}
    >
      <View
        style={
          styles.topGlow
        }
      />

      {children}
    </View>
  );
}

const styles =
  StyleSheet.create({
    card: {
      position:
        'relative',

      backgroundColor:
        Colors.surface,

      borderRadius: 30,
      padding: 24,

      borderWidth: 1,
      borderColor:
        'rgba(255,255,255,0.9)',

      overflow:
        'hidden',

      shadowColor:
        '#0F172A',

      shadowOffset: {
        width: 0,
        height: 14,
      },

      shadowOpacity:
        0.08,

      shadowRadius: 28,

      elevation: 6,
    },

    topGlow: {
      position:
        'absolute',

      top: 0,
      left: 0,
      right: 0,

      height: 10,

      backgroundColor:
        'rgba(59,130,246,0.08)',
    },
  });