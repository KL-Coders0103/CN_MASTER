import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '@theme/colors';
import Typography from '@theme/typography';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        CN Master Home
      </Text>
    </View>
  );
}

const styles =
  StyleSheet.create({
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
      fontSize:
        Typography.headingLG,
      fontWeight:
        '700',
    },
  });