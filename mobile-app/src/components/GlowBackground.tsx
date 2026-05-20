import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

export default function GlowBackground() {
  return (
    <>
      <View
        style={styles.topShape}
      />
      <View
        style={
          styles.bottomShape
        }
      />
    </>
  );
}

const styles =
  StyleSheet.create({
    topShape: {
      position: 'absolute',
      width: 240,
      height: 240,
      borderRadius: 120,
      backgroundColor:
        'rgba(59,130,246,0.06)',
      top: -80,
      right: -60,
    },

    bottomShape: {
      position: 'absolute',
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor:
        'rgba(29,78,216,0.04)',
      bottom: -70,
      left: -50,
    },
  });