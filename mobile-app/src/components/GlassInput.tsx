import React from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
} from 'react-native';

import {
  Dropdown,
} from 'react-native-element-dropdown';

import Colors from '@theme/colors';
import Typography from '@theme/typography';
import Glass from '@theme/glass';

interface GlassInputProps
  extends TextInputProps {
  label: string;
  error?: string;
  rightIcon?: React.ReactNode;

  dropdown?: boolean;
  options?: string[];
}

export default function GlassInput({
  label,
  error,
  rightIcon,
  dropdown,
  options,
  value,
  onChangeText,
  ...props
}: GlassInputProps) {

  const dropdownData =
    options?.map(
      item => ({
        label:item,
        value:item,
      })
    );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <View
        style={[
          Glass,
          styles.inputWrapper,
          error &&
            styles.errorBorder,
        ]}
      >

        {dropdown ? (

          <Dropdown
            style={
              styles.dropdown
            }
            data={
              dropdownData ||
              []
            }
            labelField="label"
            valueField="value"
            placeholder={
              `Select ${label}`
            }
            placeholderStyle={
              styles.placeholder
            }
            selectedTextStyle={
              styles.selected
            }
            value={value}
            onChange={item =>
              onChangeText?.(
                item.value
              )
            }
          />

        ) : (

          <TextInput
            placeholderTextColor={
              Colors.textMuted
            }
            style={
              styles.input
            }
            value={value}
            onChangeText={
              onChangeText
            }
            {...props}
          />

        )}

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

const styles =
StyleSheet.create({

  container:{
    marginBottom:18,
  },

  label:{
    color:
      Colors.textSecondary,
    marginBottom:8,
    fontSize:
      Typography.bodySM,
    fontWeight:'600',
  },

  inputWrapper:{
    flexDirection:'row',
    alignItems:'center',
    borderRadius:18,
    paddingHorizontal:16,
  },

  input:{
    flex:1,
    color:
      Colors.textPrimary,
    fontSize:
      Typography.bodyMD,
    minHeight:56,
  },

  dropdown:{
    flex:1,
    minHeight:56,
  },

  placeholder:{
    color:
      Colors.textMuted,
  },

  selected:{
    color:
      Colors.textPrimary,
    fontSize:
      Typography.bodyMD,
  },

  errorBorder:{
    borderColor:
      Colors.error,
  },

  error:{
    color:
      Colors.error,
    marginTop:6,
    fontSize:
      Typography.caption,
  },
});