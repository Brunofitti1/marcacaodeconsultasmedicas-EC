import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Input, Button } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';
import theme from '../styles/theme';
import { ViewStyle, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import FeedbackMessage from '../components/FeedbackMessage';
import LoadingSpinner from '../components/LoadingSpinner';

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

const RegisterScreen: React.FC = () => {
  const { register } = useAuth();
  const navigation = useNavigation<RegisterScreenProps['navigation']>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateName = (name: string): boolean => {
    if (!name) {
      setNameError('Nome é obrigatório');
      return false;
    }
    if (name.length < 3) {
      setNameError('Nome deve ter no mínimo 3 caracteres');
      return false;
    }
    setNameError('');
    return true;
  };

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

  const validateConfirmPassword = (confirmPass: string): boolean => {
    if (!confirmPass) {
      setConfirmPasswordError('Confirmação de senha é obrigatória');
      return false;
    }
    if (confirmPass !== password) {
      setConfirmPasswordError('As senhas não coincidem');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const handleRegister = async () => {
    setError('');
    setSuccess('');

    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    try {
      setLoading(true);

      await register({
        name,
        email,
        password,
      });

      setSuccess('Conta criada com sucesso! Redirecionando para o login...');
      
      // Aguarda 2 segundos antes de navegar para o login
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    } catch (err) {
      setError('Erro ao criar conta. Email pode já estar cadastrado.');
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
          <HeaderContainer>
            <Title>Cadastro de Paciente</Title>
            <Subtitle>Crie sua conta no MediCare+</Subtitle>
          </HeaderContainer>

          <FormContainer>
            <Input
              placeholder="Nome completo"
              value={name}
              onChangeText={(text) => {
                setName(text);
                setNameError('');
                setError('');
              }}
              onBlur={() => validateName(name)}
              autoCapitalize="words"
              containerStyle={styles.input}
              errorMessage={nameError}
              leftIcon={{ type: 'ionicon', name: 'person-outline', color: theme.colors.primary }}
            />

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

            <Input
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setConfirmPasswordError('');
                setError('');
              }}
              onBlur={() => validateConfirmPassword(confirmPassword)}
              secureTextEntry
              containerStyle={styles.input}
              errorMessage={confirmPasswordError}
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

            {success && (
              <FeedbackMessage
                type="success"
                message={success}
                visible={!!success}
              />
            )}

            <Button
              title="Cadastrar"
              onPress={handleRegister}
              loading={loading}
              disabled={loading}
              containerStyle={styles.button as ViewStyle}
              buttonStyle={styles.buttonStyle}
              disabledStyle={styles.disabledButton}
            />

            <Button
              title="Voltar para Login"
              onPress={() => navigation.navigate('Login')}
              disabled={loading}
              containerStyle={styles.backButton as ViewStyle}
              buttonStyle={styles.backButtonStyle}
              type="outline"
            />
          </FormContainer>
        </Container>
      </ScrollView>
      {loading && <LoadingSpinner fullScreen message="Criando conta..." />}
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
  backButton: {
    marginTop: 10,
    width: '100%',
  },
  backButtonStyle: {
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

const HeaderContainer = styled.View`
  margin-bottom: 32px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: ${theme.colors.text};
  margin-bottom: 8px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: ${theme.colors.textSecondary};
  text-align: center;
`;

const FormContainer = styled.View`
  width: 100%;
`;

export default RegisterScreen; 