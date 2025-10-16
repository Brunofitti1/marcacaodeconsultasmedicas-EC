/**
 * FeedbackMessage Component
 * Componente para exibir mensagens de feedback ao usuário
 * Suporta tipos: success, error, warning, info
 */

import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../styles/theme';

export type FeedbackType = 'success' | 'error' | 'warning' | 'info';

interface FeedbackMessageProps {
  type: FeedbackType;
  message: string;
  visible?: boolean;
  onDismiss?: () => void;
}

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({
  type,
  message,
  visible = true,
  onDismiss,
}) => {
  if (!visible || !message) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'checkmark-circle';
      case 'error':
        return 'alert-circle';
      case 'warning':
        return 'warning';
      case 'info':
        return 'information-circle';
      default:
        return 'information-circle';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      case 'info':
        return theme.colors.info;
      default:
        return theme.colors.info;
    }
  };

  return (
    <Container type={type}>
      <IconContainer>
        <Ionicons name={getIcon()} size={24} color={getColor()} />
      </IconContainer>
      <MessageText type={type}>{message}</MessageText>
      {onDismiss && (
        <DismissButton onPress={onDismiss}>
          <Ionicons name="close" size={20} color={getColor()} />
        </DismissButton>
      )}
    </Container>
  );
};

const Container = styled.View<{ type: FeedbackType }>`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 16px;
  border-radius: ${theme.borderRadius.medium}px;
  background-color: ${(props: { type: FeedbackType }) => {
    switch (props.type) {
      case 'success':
        return theme.colors.success + '15';
      case 'error':
        return theme.colors.error + '15';
      case 'warning':
        return theme.colors.warning + '15';
      case 'info':
        return theme.colors.info + '15';
      default:
        return theme.colors.info + '15';
    }
  }};
  border-left-width: 4px;
  border-left-color: ${(props: { type: FeedbackType }) => {
    switch (props.type) {
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      case 'info':
        return theme.colors.info;
      default:
        return theme.colors.info;
    }
  }};
`;

const IconContainer = styled.View`
  margin-right: 12px;
`;

const MessageText = styled.Text<{ type: FeedbackType }>`
  flex: 1;
  font-size: 14px;
  line-height: 20px;
  color: ${(props: { type: FeedbackType }) => {
    switch (props.type) {
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      case 'info':
        return theme.colors.info;
      default:
        return theme.colors.info;
    }
  }};
`;

const DismissButton = styled.TouchableOpacity`
  padding: 4px;
  margin-left: 8px;
`;

export default FeedbackMessage;
