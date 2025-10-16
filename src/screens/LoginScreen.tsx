import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Input, Button, Text } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';
import theme from '../styles/theme';
import { ViewStyle, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import FeedbackMessage from '../components/FeedbackMessage';
import LoadingSpinner from '../components/LoadingSpinner';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC = () => {
  const { signIn } = useAuth();
  const navigation = useNavigation<LoginScreenProps['navigation']>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email é obrigatório');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Email inválido');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError('Senha é obrigatória');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Senha deve ter no mínimo 6 caracteres');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleLogin = async () => {
    setError('');
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      setLoading(true);
      await signIn({ email, password });
    } catch (err) {
      setError('Email ou senha inválidos. Por favor, verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <LogoContainer>
            <AppName>MediCare+</AppName>
            <Tagline>Sua saúde em primeiro lugar</Tagline>
          </LogoContainer>

          <FormContainer>
            <Input
              placeholder="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError('');
                setError('');
              }}
              onBlur={() => validateEmail(email)}
              autoCapitalize="none"
              keyboardType="email-address"
              containerStyle={styles.input}
              errorMessage={emailError}
              leftIcon={{ type: 'ionicon', name: 'mail-outline', color: theme.colors.primary }}
            />

            <Input
              placeholder="Senha"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError('');
                setError('');
              }}
              onBlur={() => validatePassword(password)}
              secureTextEntry
              containerStyle={styles.input}
              errorMessage={passwordError}
              leftIcon={{ type: 'ionicon', name: 'lock-closed-outline', color: theme.colors.primary }}
            />

            {error && (
              <FeedbackMessage
                type="error"
                message={error}
                visible={!!error}
                onDismiss={() => setError('')}
              />
            )}

            <Button
              title="Entrar"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              containerStyle={styles.button as ViewStyle}
              buttonStyle={styles.buttonStyle}
              disabledStyle={styles.disabledButton}
            />

            <Button
              title="Cadastrar Novo Paciente"
              onPress={() => navigation.navigate('Register')}
              disabled={loading}
              containerStyle={styles.registerButton as ViewStyle}
              buttonStyle={styles.registerButtonStyle}
              type="outline"
            />
          </FormContainer>

          <HintContainer>
            <HintText>Credenciais de exemplo:</HintText>
            <CredentialsText>
              Admin: admin@example.com / 123456{'\n'}
              Médicos: joao@example.com / 123456
            </CredentialsText>
          </HintContainer>
        </Container>
      </ScrollView>
      {loading && <LoadingSpinner fullScreen message="Autenticando..." />}
    </KeyboardAvoidingView>
  );
};

const styles = {
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.medium,
  },
  disabledButton: {
    backgroundColor: theme.colors.disabled,
  },
  registerButton: {
    marginTop: 10,
    width: '100%',
  },
  registerButtonStyle: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.medium,
  },
};

const Container = styled.View`
  flex: 1;
  padding: 24px;
  justify-content: center;
  background-color: ${theme.colors.background};
`;

const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: 40px;
`;

const AppName = styled.Text`
  font-size: 42px;
  font-weight: bold;
  color: ${theme.colors.primary};
  margin-bottom: 8px;
  letter-spacing: -1px;
`;

const Tagline = styled.Text`
  font-size: 16px;
  color: ${theme.colors.textSecondary};
  text-align: center;
`;

const FormContainer = styled.View`
  width: 100%;
`;

const HintContainer = styled.View`
  margin-top: 32px;
  padding: 16px;
  background-color: ${theme.colors.surfaceVariant};
  border-radius: ${theme.borderRadius.medium}px;
`;

const HintText = styled.Text`
  font-size: 14px;
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-bottom: 8px;
  font-weight: 600;
`;

const CredentialsText = styled.Text`
  font-size: 12px;
  color: ${theme.colors.textLight};
  text-align: center;
  line-height: 18px;
`;

export default LoginScreen; 