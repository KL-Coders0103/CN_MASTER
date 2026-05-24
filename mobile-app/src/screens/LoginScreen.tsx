import React, {
  useState,
} from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Controller,
  useForm,
} from 'react-hook-form';

import {
  Ionicons,
} from '@expo/vector-icons';

import Toast from 'react-native-toast-message';

import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import GlassCard from '@components/GlassCard';
import GlassInput from '@components/GlassInput';
import GlowBackground from '@components/GlowBackground';
import PrimaryButton from '@components/PrimaryButton';

import Colors from '@theme/colors';
import Spacing from '@theme/spacing';
import Typography from '@theme/typography';

import {
  RootStackParamList,
} from '@navigation/types';

import {
  useAuthStore,
} from '@store/authStore';

import {
  loginAPI,
} from '@services/loginService';

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    'Login'
  >;

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginScreen({
  navigation,
}: Props) {
  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const setAuth =
  useAuthStore(
    state => state.setAuth
  );

  const {
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } =
    useForm<LoginForm>({
      defaultValues: {
        email: '',
        password: '',
      },
    });

  const onSubmit =
    async (
      data: LoginForm
    ) => {
      try {
        const result =
          await loginAPI(
            data
          );

        if (
          result.success
        ) {
          setAuth(
            result.token,
            result.user
            );

            Toast.show({
            type: 'success',
            text1:
                'Login successful',
            });

            console.log(
            'AUTH STORED'
            );
        }
      } catch (
        error: any
      ) {
        Toast.show({
          type:
            'error',
          text1:
            error.message,
        });
      }
    };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={
        Platform.OS ===
        'ios'
          ? 'padding'
          : undefined
      }
    >
      <GlowBackground />

      <View style={styles.hero}>
        <Text
          style={
            styles.badge
          }
        >
          Welcome Back
        </Text>

        <Text
          style={
            styles.title
          }
        >
          Continue your{' '}
          <Text
            style={
              styles.accent
            }
          >
            CN Master
          </Text>{' '}
          journey
        </Text>

        <Text
          style={
            styles.subtitle
          }
        >
          Sign in and
          continue learning
          smarter.
        </Text>
      </View>

      <GlassCard
        style={styles.card}
      >
        <Controller
          control={control}
          name="email"
          rules={{
            required:
              'Email required',
          }}
          render={({
            field,
          }) => (
            <GlassInput
              label="Email"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={
                field.value
              }
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
          name="password"
          rules={{
            required:
              'Password required',
          }}
          render={({
            field,
          }) => (
            <GlassInput
              label="Password"
              placeholder="Password"
              secureTextEntry={
                !showPassword
              }
              value={
                field.value
              }
              onChangeText={
                field.onChange
              }
              error={
                errors
                  .password
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

        <PrimaryButton
          title="Login"
          onPress={handleSubmit(
            onSubmit
          )}
          loading={
            isSubmitting
          }
        />

        <TouchableOpacity
          style={
            styles.register
          }
          onPress={() =>
            navigation.navigate(
              'Register'
            )
          }
        >
          <Text
            style={
              styles.registerText
            }
          >
            New here? Create
            Account
          </Text>
        </TouchableOpacity>
      </GlassCard>
    </KeyboardAvoidingView>
  );
}

const styles =
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor:
        Colors.background,
      paddingHorizontal:
        Spacing.lg,
      justifyContent:
        'center',
    },

    hero: {
      marginBottom:
        Spacing.lg,
    },

    badge: {
      alignSelf:
        'flex-start',
      backgroundColor:
        '#DBEAFE',
      color:
        Colors.primary,
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
      fontWeight:
        '800',
      lineHeight: 42,
      marginBottom: 10,
    },

    accent: {
      color:
        Colors.primary,
    },

    subtitle: {
      color:
        Colors.textSecondary,
      fontSize:
        Typography.bodyMD,
      lineHeight: 24,
    },

    card: {},

    register: {
      marginTop: 20,
      alignItems:
        'center',
    },

    registerText: {
      color:
        Colors.primary,
      fontWeight:
        '600',
    },
  });