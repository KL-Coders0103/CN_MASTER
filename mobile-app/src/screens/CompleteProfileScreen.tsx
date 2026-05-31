import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {
  useForm,
  Controller,
} from 'react-hook-form';

import Toast from 'react-native-toast-message';

import GlassCard from '@components/GlassCard';
import GlassInput from '@components/GlassInput';
import PrimaryButton from '@components/PrimaryButton';

import {
  completeProfileAPI,
} from '@services/profileService';

import {
  useAuthStore,
} from '@store/authStore';

import {
  branchSections,
} from '@utils/branchSection';

import Colors from '@theme/colors';

import { useNavigation } from '@react-navigation/native';

interface FormData {
  mobile: string;
  yearOfStudy: string;
  branch: string;
  section: string;
}

export default function
CompleteProfileScreen() {

  const {
    control,
    handleSubmit,
    watch,
    formState:{
      errors,
      isSubmitting,
    },
  } =
    useForm<FormData>();

    const navigation = useNavigation<any>();

  const refreshUser =
    useAuthStore(
      state =>
        state.refreshUser
    );

  const selectedBranch =
    watch(
      'branch'
    );

  const onSubmit =
    async (
      data:FormData
    ) => {
      try {

        await completeProfileAPI(
          data
        );

        await refreshUser();

        Toast.show({
          type:'success',
          text1:
            'Profile completed',
        });

        navigation.replace('Tabs');

      } catch(
        error:any
      ){
        Toast.show({
          type:'error',
          text1:
            error.message,
        });
      }
    };

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >
      <GlassCard>

        <Text
          style={
            styles.title
          }
        >
          Complete Profile
        </Text>

        <Text
          style={
            styles.subtitle
          }
        >
          Few details left
        </Text>

        <Controller
          control={control}
          name="mobile"
          render={({field})=>(
            <GlassInput
              label="Mobile"
              placeholder="Mobile"
              value={field.value}
              onChangeText={
                field.onChange
              }
              keyboardType="phone-pad"
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
          render={({field})=>(
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
          render={({field})=>(
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
          render={({field})=>(
            <GlassInput
              label="Section"
              placeholder={
                selectedBranch
                ? branchSections[
                    selectedBranch
                  ]?.join(', ')
                : 'Select branch first'
              }
              editable={
                !!selectedBranch
              }
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

        <PrimaryButton
          title="Continue"
          onPress={handleSubmit(
            onSubmit
          )}
          loading={
            isSubmitting
          }
        />

      </GlassCard>
    </ScrollView>
  );
}

const styles =
StyleSheet.create({

  container:{
    flexGrow:1,
    justifyContent:
      'center',
    padding:20,
  },

  title:{
    color:
      Colors.textPrimary,
    fontSize:24,
    fontWeight:'700',
    marginBottom:8,
  },

  subtitle:{
    color:
      Colors.textSecondary,
    marginBottom:24,
  },

});