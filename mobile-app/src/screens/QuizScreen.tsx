import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '@theme/colors';

export default function QuizScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Quiz
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:
      'center',
    alignItems:
      'center',
    backgroundColor:
      Colors.background,
  },

  text: {
    color:
      Colors.textPrimary,
    fontSize: 26,
    fontWeight:
      '700',
  },
});