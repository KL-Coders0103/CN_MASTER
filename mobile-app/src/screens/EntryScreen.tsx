import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing, 
  withSpring 
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function EntryScreen() {
  // Animation Values
  const logoScale = useSharedValue(0.5);
  const logoOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(150);
  const cardOpacity = useSharedValue(0);

  useEffect(() => {
    // 1. Logo fades in and scales up (Spring effect)
    logoScale.value = withSpring(1, { damping: 12, stiffness: 90 });
    logoOpacity.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp) });

    // 2. Glassmorphism card slides up from bottom after a slight delay
    setTimeout(() => {
      cardTranslateY.value = withSpring(0, { damping: 14, stiffness: 100 });
      cardOpacity.value = withTiming(1, { duration: 800 });
    }, 700);
  }, []);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: cardTranslateY.value }],
    opacity: cardOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Central Animated Logo */}
      <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
        <Text style={styles.logoText}>CN MASTER</Text>
        <Text style={styles.tagline}>Elevate Your Edge</Text>
      </Animated.View>

      {/* Interactive Glassmorphism Card at the bottom */}
      <Animated.View style={[styles.glassCardContainer, animatedCardStyle]}>
        <BlurView intensity={50} tint="dark" style={styles.glassCard}>
          <Text style={styles.cardTitle}>Welcome Aboard</Text>
          <Text style={styles.cardSubtitle}>Master computer networking through gamified learning.</Text>
          
          <TouchableOpacity activeOpacity={0.8} style={styles.primaryButton}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </BlurView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A', // High contrast pitch dark background
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 14,
    color: '#A0A0A0',
    marginTop: 8,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  glassCardContainer: {
    width: width * 0.9,
    marginBottom: 40,
    borderRadius: 24,
    overflow: 'hidden',
    // Subtle border to enhance the glass effect against dark background
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)', 
  },
  glassCard: {
    padding: 32,
    alignItems: 'center',
    backgroundColor: 'rgba(20, 20, 20, 0.4)', // Base tint for glass
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
});