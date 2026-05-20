import React from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import Colors from '@theme/colors';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
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
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 28,
    padding: 24,

    borderWidth: 1,
    borderColor: Colors.border,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.06,
    shadowRadius: 24,

    elevation: 4,
  },
});