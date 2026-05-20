import React, {
  useEffect,
  useState,
} from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Controller,
  useForm,
} from 'react-hook-form';

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
  verifyOtpAPI,
} from '@services/otpService';

import {
  resendOtpAPI,
} from '@services/resendOtpService';

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    'OTP'
  >;

type OtpForm = {
  otp: string;
};

export default function OtpScreen({
  route,
}: Props) {
  const { userId } =
    route.params;

  const [timer, setTimer] =
    useState(300);

  const [resending, setResending] =
  useState(false);

  const {
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<OtpForm>({
    defaultValues: {
      otp: '',
    },
  });

  useEffect(() => {
    if (timer <= 0) return;

    const interval =
      setInterval(() => {
        setTimer(
          prev => prev - 1
        );
      }, 1000);

    return () =>
      clearInterval(
        interval
      );
  }, [timer]);

  const onSubmit =
    async (
      data: OtpForm
    ) => {
      try {
        const result =
          await verifyOtpAPI(
            userId,
            data.otp
          );

        if (
          result.success
        ) {
          Toast.show({
            type: 'success',
            text1:
              'Email Verified',
          });
        }
      } catch (
        error: any
      ) {
        Toast.show({
          type: 'error',
          text1:
            error.message,
        });
      }
    };

  const minutes =
    Math.floor(
      timer / 60
    );

  const seconds =
    timer % 60;

  const handleResend =
  async () => {
    if (
      timer > 0 ||
      resending
    )
      return;

    try {
      setResending(
        true
      );

      await resendOtpAPI(
        userId
      );

      setTimer(300);

      Toast.show({
        type:
          'success',
        text1:
          'OTP resent',
      });
    } catch (
      error: any
    ) {
      Toast.show({
        type:
          'error',
        text1:
          error.message,
      });
    } finally {
      setResending(
        false
      );
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
          Email Verification
        </Text>

        <Text
          style={
            styles.title
          }
        >
          Verify OTP
        </Text>

        <Text
          style={
            styles.subtitle
          }
        >
          Enter the
          verification code
          sent to your
          email.
        </Text>
      </View>

      <GlassCard
        style={styles.card}
      >
        <Controller
          control={control}
          name="otp"
          rules={{
            required:
              'OTP required',
          }}
          render={({
            field,
          }) => (
            <GlassInput
              label="OTP"
              placeholder="Enter 6-digit OTP"
              keyboardType="numeric"
              maxLength={6}
              value={
                field.value
              }
              onChangeText={
                field.onChange
              }
              error={
                errors.otp
                  ?.message
              }
            />
          )}
        />

        <Text
          style={styles.resend}
          onPress={
            handleResend
          }
        >
          {timer > 0
            ? `Resend OTP in ${minutes}:${seconds
                .toString()
                .padStart(
                  2,
                  '0'
                )}`
            : resending
            ? 'Sending...'
            : 'Resend OTP'}
        </Text>

        <PrimaryButton
          title="Verify OTP"
          onPress={handleSubmit(
            onSubmit
          )}
          loading={
            isSubmitting
          }
        />
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
      fontSize:
        Typography.headingXL,
      fontWeight:
        '800',
      marginBottom: 10,
    },

    subtitle: {
      color:
        Colors.textSecondary,
      fontSize:
        Typography.bodyMD,
      lineHeight: 24,
    },

    card: {},

    timer: {
      color:
        Colors.textMuted,
      textAlign:
        'center',
      marginVertical: 16,
      fontSize:
        Typography.bodySM,
    },

    resend: {
  color:
    Colors.primary,
  textAlign:
    'center',
  marginBottom: 18,
  fontWeight: '600',
},
  });