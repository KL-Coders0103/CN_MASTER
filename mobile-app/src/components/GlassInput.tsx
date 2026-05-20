import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
} from 'react-native';

import Colors from '@theme/colors';
import Typography from '@theme/typography';
import Glass from '@theme/glass';

interface GlassInputProps
  extends TextInputProps {
  label: string;
  error?: string;
  rightIcon?: React.ReactNode;
}

export default function GlassInput({
  label,
  error,
  rightIcon,
  ...props
}: GlassInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <View
        style={[
          Glass,
          styles.inputWrapper,
          error && styles.errorBorder,
        ]}
      >
        <TextInput
          placeholderTextColor={
            Colors.textMuted
          }
          style={styles.input}
          {...props}
        />

        {rightIcon}
      </View>

      {error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    color: Colors.textSecondary,
    marginBottom: 8,
    fontSize: Typography.bodySM,
    fontWeight: '600',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: Typography.bodyMD,
    minHeight: 56,
  },

  errorBorder: {
    borderColor: Colors.error,
  },

  error: {
    color: Colors.error,
    marginTop: 6,
    fontSize: Typography.caption,
  },
});