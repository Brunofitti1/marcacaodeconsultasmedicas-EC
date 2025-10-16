/**
 * LoadingSpinner Component
 * Componente para exibir indicador de carregamento
 */

import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import theme from '../styles/theme';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = theme.colors.primary,
  fullScreen = false,
  message,
}) => {
  if (fullScreen) {
    return (
      <FullScreenContainer>
        <LoadingContent>
          <ActivityIndicator size={size} color={color} />
          {message && <LoadingText>{message}</LoadingText>}
        </LoadingContent>
      </FullScreenContainer>
    );
  }

  return (
    <Container>
      <ActivityIndicator size={size} color={color} />
      {message && <LoadingText>{message}</LoadingText>}
    </Container>
  );
};

const FullScreenContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.overlay};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`;

const LoadingContent = styled.View`
  background-color: ${theme.colors.surface};
  padding: 24px;
  border-radius: ${theme.borderRadius.large}px;
  align-items: center;
  min-width: 120px;
`;

const Container = styled.View`
  padding: 16px;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.Text`
  margin-top: 12px;
  font-size: 14px;
  color: ${theme.colors.textSecondary};
  text-align: center;
`;

export default LoadingSpinner;
