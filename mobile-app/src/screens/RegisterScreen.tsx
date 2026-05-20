import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import GlassCard from '@components/GlassCard';
import GlassInput from '@components/GlassInput';
import PrimaryButton from '@components/PrimaryButton';
import GlowBackground from '@components/GlowBackground';

import Colors from '@theme/colors';
import Spacing from '@theme/spacing';
import Typography from '@theme/typography';

import {
  registerSchema,
  RegisterFormData,
} from '@utils/validation';

import {
  registerUserAPI,
} from '@services/authService';

import {
  RootStackParamList,
} from '@navigation/types';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>;

export default function RegisterScreen({
  navigation,
}: Props) {
  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(
      registerSchema
    ),
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      yearOfStudy: '',
      branch: '',
      section: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (
    data: RegisterFormData
  ) => {
    try {
      const result =
        await registerUserAPI(data);

      if (result.success) {
        Toast.show({
          type: 'success',
          text1:
            'Registration Successful',
        });

        navigation.navigate('OTP', {
          userId: result.userId,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: result.message,
        });
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1:
          error.message ||
          'Something went wrong',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <GlowBackground />

      <View style={styles.hero}>
        <Text style={styles.badge}>
          AI Learning Platform
        </Text>

        <Text style={styles.title}>
          Create your{' '}
          <Text
            style={styles.titleAccent}
          >
            CN Master
          </Text>{' '}
          account
        </Text>

        <Text
          style={styles.subtitle}
        >
          Smarter learning for
          Computer Networks,
          powered by premium
          student experience.
        </Text>
      </View>

      <GlassCard style={styles.card}>
        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.formScroll
          }
        >
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <GlassInput
                label="Full Name"
                placeholder="Enter name"
                value={field.value}
                onChangeText={
                  field.onChange
                }
                error={
                  errors.name
                    ?.message
                }
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <GlassInput
                label="Email"
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={field.value}
                onChangeText={
                  field.onChange
                }
                error={
                  errors.email
                    ?.message
                }
              />
            )}
          />

          <Controller
            control={control}
            name="mobile"
            render={({ field }) => (
              <GlassInput
                label="Mobile"
                placeholder="Mobile"
                keyboardType="phone-pad"
                value={field.value}
                onChangeText={
                  field.onChange
                }
                error={
                  errors.mobile
                    ?.message
                }
              />
            )}
          />

          <Controller
            control={control}
            name="yearOfStudy"
            render={({ field }) => (
              <GlassInput
                label="Year"
                placeholder="Year"
                value={field.value}
                onChangeText={
                  field.onChange
                }
                error={
                  errors
                    .yearOfStudy
                    ?.message
                }
              />
            )}
          />

          <Controller
            control={control}
            name="branch"
            render={({ field }) => (
              <GlassInput
                label="Branch"
                placeholder="Branch"
                value={field.value}
                onChangeText={
                  field.onChange
                }
                error={
                  errors.branch
                    ?.message
                }
              />
            )}
          />

          <Controller
            control={control}
            name="section"
            render={({ field }) => (
              <GlassInput
                label="Section"
                placeholder="Section"
                value={field.value}
                onChangeText={
                  field.onChange
                }
                error={
                  errors.section
                    ?.message
                }
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <GlassInput
                label="Password"
                placeholder="Password"
                secureTextEntry={
                  !showPassword
                }
                value={field.value}
                onChangeText={
                  field.onChange
                }
                error={
                  errors.password
                    ?.message
                }
                rightIcon={
                  <TouchableOpacity
                    onPress={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    <Ionicons
                      name={
                        showPassword
                          ? 'eye'
                          : 'eye-off'
                      }
                      size={22}
                      color={
                        Colors
                          .textMuted
                      }
                    />
                  </TouchableOpacity>
                }
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <GlassInput
                label="Confirm Password"
                placeholder="Confirm"
                secureTextEntry={
                  !showConfirmPassword
                }
                value={field.value}
                onChangeText={
                  field.onChange
                }
                error={
                  errors
                    .confirmPassword
                    ?.message
                }
                rightIcon={
                  <TouchableOpacity
                    onPress={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >
                    <Ionicons
                      name={
                        showConfirmPassword
                          ? 'eye'
                          : 'eye-off'
                      }
                      size={22}
                      color={
                        Colors
                          .textMuted
                      }
                    />
                  </TouchableOpacity>
                }
              />
            )}
          />
        </ScrollView>

        <View
          style={styles.buttonArea}
        >
          <PrimaryButton
            title="Create Account"
            onPress={handleSubmit(
              onSubmit
            )}
            loading={isSubmitting}
          />
        </View>
      </GlassCard>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:
      Colors.background,
    paddingHorizontal:
      Spacing.lg,
    justifyContent: 'center',
  },

  hero: {
    marginBottom:
      Spacing.lg,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor:
      '#DBEAFE',
    color: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontWeight: '600',
    marginBottom: 18,
  },

  title: {
    color:
      Colors.textPrimary,
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 42,
    marginBottom: 10,
  },

  titleAccent: {
    color: Colors.primary,
  },

  subtitle: {
    color:
      Colors.textSecondary,
    fontSize:
      Typography.bodyMD,
    lineHeight: 24,
  },

  card: {
    height: '60%',
  },

  formScroll: {
    paddingBottom: 10,
  },

  buttonArea: {
    paddingTop: 16,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor:
      Colors.border,
  },
});