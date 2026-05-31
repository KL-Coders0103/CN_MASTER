import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import GlassCard from '@components/GlassCard';
import GlassInput from '@components/GlassInput';
import GlowBackground from '@components/GlowBackground';
import PrimaryButton from '@components/PrimaryButton';

import Colors from '@theme/colors';
import Spacing from '@theme/spacing';
import Typography from '@theme/typography';

import { RootStackParamList } from '@navigation/types';
import { useAuthStore } from '@store/authStore';
import { loginAPI } from '@services/loginService';
import { googleAuthAPI } from '@/services/googleAuthService';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginScreen({ navigation }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const setAuth = useAuthStore(state => state.setAuth);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await loginAPI(data);

      if (result.success) {
        console.log('LOGIN RESPONSE', result);
        await setAuth(result.token, result.user);

        Toast.show({
          type: 'success',
          text1: 'Login successful',
        });

        console.log('AUTH STORED');
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    }
  };

  const handleGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      
      const response = await GoogleSignin.signIn();
      if (response.type === 'success'){
        const idToken = response.data.idToken;

      if (!idToken) {
        throw new Error('No ID token found');
      }

      const result = await googleAuthAPI(idToken);
      await setAuth(result.token, result.user);

      if(!result.user.isProfileComplete){
        navigation.navigate('CompleteProfile');
      }

      Toast.show({
        type: 'success',
        text1: 'Google Login successful',
      });
    } else {
      console.log('Sign-in was cancelled');
    }

    } catch (error: any) {
      console.log('Google Sign-In Error:', error);
      Toast.show({
        type: 'error',
        text1: error.message || 'Google Sign-In failed',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <GlowBackground />

      <View style={styles.hero}>
        <Text style={styles.badge}>Welcome Back</Text>
        <Text style={styles.title}>
          Continue your <Text style={styles.accent}>CN Master</Text> journey
        </Text>
        <Text style={styles.subtitle}>
          Sign in and continue learning smarter.
        </Text>
      </View>

      <GlassCard style={styles.card}>
        <Controller
          control={control}
          name="email"
          rules={{ required: 'Email required' }}
          render={({ field }) => (
            <GlassInput
              label="Email"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={field.value}
              onChangeText={field.onChange}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{ required: 'Password required' }}
          render={({ field }) => (
            <GlassInput
              label="Password"
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={field.value}
              onChangeText={field.onChange}
              error={errors.password?.message}
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={22}
                    color={Colors.textMuted}
                  />
                </TouchableOpacity>
              }
            />
          )}
        />

        <PrimaryButton
          title="Login"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
        />

        {/* 4. Updated the onPress to trigger the new native handler */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.googleBtn}
          onPress={handleGoogle}
        >
          <Ionicons name="logo-google" size={18} color="#fff" />
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.register}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>New here? Create Account</Text>
        </TouchableOpacity>
      </GlassCard>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
  },
  hero: {
    marginBottom: Spacing.lg,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#DBEAFE',
    color: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontWeight: '600',
    marginBottom: 18,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 42,
    marginBottom: 10,
  },
  accent: {
    color: Colors.primary,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: Typography.bodyMD,
    lineHeight: 24,
  },
  card: {},
  register: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DB4437',
    paddingVertical: 16,
    borderRadius: 18,
    marginTop: 16,
  },
  googleText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: '700',
    fontSize: 15,
  },
});