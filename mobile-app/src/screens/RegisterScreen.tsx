import React, { useState } from 'react';
import { 
  View, Text, TextInput, StyleSheet, TouchableOpacity, 
  ScrollView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Ionicons } from '@expo/vector-icons'; // For the eye button

// 1. Strict Validation Schema (Matches your Notes)
const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  mobile: z.string().min(1, 'Mobile is required').min(10, 'Mobile must be at least 10 digits').max(15, 'Invalid mobile number'),
  yearOfStudy: z.string().min(1, 'Year of study is required'),
  branch: z.string().min(1, 'Branch is required'),
  section: z.string().min(1, 'Section is required'),
  password: z.string()
    .min(1, 'Password is required')
    .min(8, 'Must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain 1 uppercase letter')
    .regex(/[a-z]/, 'Must contain 1 lowercase letter')
    .regex(/[0-9]/, 'Must contain 1 number')
    .regex(/[^A-Za-z0-9]/, 'Must contain 1 special character'),
  confirmPassword: z.string().min(1, 'Please confirm your password')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      yearOfStudy: '',
      branch: '',
      section: '',
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit = (data: RegisterFormData) => {
    // Yahan hum next step mein backend (OTP API) call karenge
    console.log('Valid Data Ready for Backend:', data);
    alert("Validation Passed! Ready for OTP.");
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join CN Master to elevate your edge.</Text>
        </View>

        {/* Name Input */}
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputGroup}>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Full Name"
                placeholderTextColor="#666"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
            </View>
          )}
        />

        {/* Email Input */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputGroup}>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Email Address"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </View>
          )}
        />

        {/* Mobile Input */}
        <Controller
          control={control}
          name="mobile"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputGroup}>
              <TextInput
                style={[styles.input, errors.mobile && styles.inputError]}
                placeholder="Mobile Number"
                placeholderTextColor="#666"
                keyboardType="phone-pad"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.mobile && <Text style={styles.errorText}>{errors.mobile.message}</Text>}
            </View>
          )}
        />

        {/* Password Input with Eye Button */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputGroup}>
              <View style={[styles.passwordContainer, errors.password && styles.inputError]}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  placeholderTextColor="#666"
                  secureTextEntry={!showPassword}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#888" />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </View>
          )}
        />

        {/* Confirm Password */}
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputGroup}>
              <View style={[styles.passwordContainer, errors.confirmPassword && styles.inputError]}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Confirm Password"
                  placeholderTextColor="#666"
                  secureTextEntry={!showConfirmPassword}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                  <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#888" />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
            </View>
          )}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        {/* Google Login Dummy Button (API later) */}
        <TouchableOpacity style={styles.googleButton}>
          <Ionicons name="logo-google" size={20} color="#FFF" style={{ marginRight: 10 }} />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginRedirect}>
          <Text style={styles.redirectText}>Already have an account? <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Log in</Text></Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    color: '#FFF',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#FF4C4C',
  },
  errorText: {
    color: '#FF4C4C',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    color: '#FFF',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 16,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  googleButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginRedirect: {
    alignItems: 'center',
  },
  redirectText: {
    color: '#A0A0A0',
    fontSize: 14,
  }
});