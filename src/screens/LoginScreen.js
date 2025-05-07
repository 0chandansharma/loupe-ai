import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login, checkAuth } from '../store/actions/authActions';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import globalStyles from '../styles/globalStyles';
import LoadingOverlay from '../components/LoadingOverlay';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  
  useEffect(() => {
    const checkUserAuth = async () => {
      const isLoggedIn = await dispatch(checkAuth());
      if (isLoggedIn) {
        navigation.replace('Camera');
      }
    };
    
    checkUserAuth();
  }, [dispatch, navigation]);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace('Camera');
    }
  }, [isAuthenticated, navigation]);
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    
    if (!validateEmail(email)) {
      setIsEmailValid(false);
      return;
    }
    
    const success = await dispatch(login({ email, password }));
    if (success) {
      navigation.replace('Camera');
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>LOUPE</Text>
          <Text style={styles.tagline}>Medical Report Analysis</Text>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.loginTitle}>Doctor Login</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[styles.input, !isEmailValid && styles.inputError]}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setIsEmailValid(true);
              }}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {!isEmailValid && (
              <Text style={styles.errorText}>Please enter a valid email</Text>
            )}
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
            />
          </View>
          
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          
          {error && <Text style={styles.errorMessage}>{error}</Text>}
          
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      {loading && <LoadingOverlay message="Logging in..." />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 40,
    fontWeight: fonts.weights.bold,
    color: colors.primary,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: fonts.sizes.medium,
    color: colors.textSecondary,
    marginTop: 8,
  },
  formContainer: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  loginTitle: {
    fontSize: fonts.sizes.xlarge,
    fontWeight: fonts.weights.bold,
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: fonts.sizes.small,
    fontWeight: fonts.weights.medium,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  input: {
    ...globalStyles.input,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: fonts.sizes.small,
    marginTop: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: fonts.sizes.small,
    color: colors.primary,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: colors.surface,
    fontSize: fonts.sizes.regular,
    fontWeight: fonts.weights.semibold,
  },
  errorMessage: {
    color: colors.error,
    fontSize: fonts.sizes.small,
    textAlign: 'center',
    marginBottom: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: fonts.sizes.small,
    color: colors.textSecondary,
  },
  registerLink: {
    fontSize: fonts.sizes.small,
    color: colors.primary,
    fontWeight: fonts.weights.medium,
  },
});

export default LoginScreen;