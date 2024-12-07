import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { AccessibleButton } from '../components/AccessibleButton';
import { loginUser } from '../services/api';
import { useNavigation } from '@react-navigation/native';

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      // تخزين رمز المصادقة
      await AsyncStorage.setItem('authToken', response.token);
      navigation.navigate('Home');
    } catch (err) {
      setError('خطأ في تسجيل الدخول');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          <Text
            style={styles.title}
            accessibilityRole="header"
            accessibilityLabel="شاشة تسجيل الدخول"
          >
            تسجيل الدخول
          </Text>

          <TextInput
            style={styles.input}
            placeholder="البريد الإلكتروني"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            accessible={true}
            accessibilityLabel="حقل البريد الإلكتروني"
            accessibilityHint="أدخل بريدك الإلكتروني"
          />

          <TextInput
            style={styles.input}
            placeholder="كلمة المرور"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            accessible={true}
            accessibilityLabel="حقل كلمة المرور"
            accessibilityHint="أدخل كلمة المرور"
          />

          {error ? (
            <Text
              style={styles.error}
              accessibilityRole="alert"
              accessibilityLabel={error}
            >
              {error}
            </Text>
          ) : null}

          <AccessibleButton
            label="تسجيل الدخول"
            onPress={handleLogin}
            style={styles.loginButton}
            accessibilityHint="اضغط لتسجيل الدخول"
          />

          <AccessibleButton
            label="إنشاء حساب جديد"
            onPress={() => navigation.navigate('Register')}
            style={styles.registerButton}
            textStyle={styles.registerButtonText}
            accessibilityHint="اضغط للانتقال إلى صفحة التسجيل"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  form: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    minHeight: 48,
    textAlign: 'right',
  },
  error: {
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#1E88E5',
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: 'transparent',
  },
  registerButtonText: {
    color: '#1E88E5',
  },
});
