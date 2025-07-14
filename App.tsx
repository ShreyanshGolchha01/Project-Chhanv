/**
 * Government Health App - Login Screen (Expo Version)
 * @format
 */

import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import CustomButton from './src/components/CustomButton';
import CustomInput from './src/components/CustomInput';
import HomeScreen from './src/screens/HomeScreen';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from './src/constants/theme';

const { height } = Dimensions.get('window');

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ phoneNumber: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const validateForm = () => {
    const newErrors = { phoneNumber: '', password: '' };
    let isValid = true;

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'फोन नंबर आवश्यक है';
      isValid = false;
    } else if (phoneNumber.length < 10) {
      newErrors.phoneNumber = 'कृपया एक वैध 10-अंकीय फोन नंबर दर्ज करें';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'पासवर्ड आवश्यक है';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with phone-password validation
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo credentials (phone: password)
      const credentials: { [key: string]: { password: string; name: string } } = {
        '9876543210': { password: '123456', name: 'राम कुमार' },
        '8765432109': { password: 'admin123', name: 'सुनीता देवी' },
        '7654321098': { password: 'user123', name: 'अमित शर्मा' },
      };

      const userCred = credentials[phoneNumber];
      
      if (!userCred) {
        Alert.alert('त्रुटि', 'अमान्य फोन नंबर। कृपया पंजीकृत नंबर का उपयोग करें।');
        return;
      }
      
      if (userCred.password !== password) {
        Alert.alert('त्रुटि', 'गलत पासवर्ड। कृपया सही पासवर्ड दर्ज करें।');
        return;
      }

      setUserName(userCred.name);
      setIsLoggedIn(true);
      Alert.alert('सफल', `लॉगिन सफल! स्वागत है ${userCred.name}`);
    }, 2000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPhoneNumber('');
    setPassword('');
    setUserName('');
    setErrors({ phoneNumber: '', password: '' });
  };

  // If user is logged in, show HomeScreen
  if (isLoggedIn) {
    return <HomeScreen userName={userName} onLogout={handleLogout} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <LinearGradient
            colors={COLORS.gradients.primary.colors}
            start={COLORS.gradients.primary.start}
            end={COLORS.gradients.primary.end}
            style={styles.header}
          >
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={COLORS.gradients.card.colors}
                start={COLORS.gradients.card.start}
                end={COLORS.gradients.card.end}
                style={styles.logo}
              >
                <Text style={styles.logoText}>🏥</Text>
              </LinearGradient>
            </View>
            <Text style={styles.appTitle}>सरकारी स्वास्थ्य पोर्टल</Text>
            <Text style={styles.subtitle}>स्वास्थ्य सेवाओं तक सुरक्षित पहुंच</Text>
          </LinearGradient>

          {/* Login Form */}
          <View style={styles.formContainer}>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeTitle}>स्वागत है</Text>
              <Text style={styles.welcomeSubtitle}>
                कृपया अपने पंजीकृत फोन नंबर से साइन इन करें
              </Text>
            </View>

            <CustomInput
              label="फोन नंबर"
              placeholder="अपना 10-अंकीय फोन नंबर दर्ज करें"
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text.replace(/[^0-9]/g, ''));
                if (errors.phoneNumber) {
                  setErrors(prev => ({ ...prev, phoneNumber: '' }));
                }
              }}
              keyboardType="phone-pad"
              maxLength={10}
              autoComplete="tel"
              error={errors.phoneNumber}
            />

            <CustomInput
              label="पासवर्ड"
              placeholder="अपना पासवर्ड दर्ज करें"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) {
                  setErrors(prev => ({ ...prev, password: '' }));
                }
              }}
              secureTextEntry
              autoComplete="password"
              error={errors.password}
            />

            <CustomButton
              title="साइन इन करें"
              loadingText="साइन इन हो रहा है..."
              onPress={handleLogin}
              loading={isLoading}
              style={styles.loginButton}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              स्वास्थ्य और परिवार कल्याण मंत्रालय
            </Text>
            <Text style={styles.footerSubtext}>
              भारत सरकार की पहल
            </Text>
            <Text style={styles.versionText}>संस्करण 1.0.0</Text>
            <Text style={styles.poweredByText}>Powered by SSIPMT, RAIPUR</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: height,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.lg,
    borderBottomLeftRadius: BORDER_RADIUS.xl,
    borderBottomRightRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.lg,
    ...SHADOWS.medium,
  },
  logoContainer: {
    marginBottom: SPACING.md,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.large,
    elevation: 8,
  },
  logoText: {
    fontSize: 32,
  },
  appTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray[200],
    textAlign: 'center',
  },
  formContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  welcomeContainer: {
    marginBottom: SPACING.md,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  welcomeSubtitle: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  loginButton: {
    marginTop: SPACING.md,
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  footerText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  footerSubtext: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  versionText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  poweredByText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: FONTS.weights.semibold,
  },
});
