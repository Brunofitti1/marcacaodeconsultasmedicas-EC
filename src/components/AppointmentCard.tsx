import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import theme from '../styles/theme';
import { Appointment, AppointmentStatus } from '../types/appointments';
import { formatDate, formatTime } from '../utils/dateUtils';

interface AppointmentCardProps {
  appointment: Appointment;
  doctorImage?: string;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onStatusChange?: (newStatus: AppointmentStatus) => void;
  showActions?: boolean;
  style?: ViewStyle;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  doctorImage,
  onPress,
  onEdit,
  onDelete,
  onStatusChange,
  showActions = false,
  style,
}) => {
  const getStatusConfig = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return {
          color: theme.colors.success,
          text: 'Confirmada',
          icon: 'check-circle'
        };
      case 'cancelled':
        return {
          color: theme.colors.error,
          text: 'Cancelada',
          icon: 'cancel'
        };
      default:
        return {
          color: theme.colors.warning,
          text: 'Pendente',
          icon: 'schedule'
        };
    }
  };

  const statusConfig = getStatusConfig(appointment.status);

  return (
    <CardContainer 
      style={style}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <CardContent>
        <DoctorInfo>
          <Avatar
            size="medium"
            rounded
            source={{ 
              uri: doctorImage || 'https://via.placeholder.com/100/cccccc/ffffff?text=Dr' 
            }}
            containerStyle={styles.avatar}
          />
          <TextContainer>
            <DoctorName>{appointment.doctorName}</DoctorName>
            <Specialty>{appointment.specialty}</Specialty>
          </TextContainer>
        </DoctorInfo>

        <AppointmentInfo>
          <InfoRow>
            <InfoLabel>Data:</InfoLabel>
            <InfoValue>{formatDate(appointment.date)}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Horário:</InfoLabel>
            <InfoValue>{formatTime(appointment.time)}</InfoValue>
          </InfoRow>
          {appointment.description && (
            <InfoRow>
              <InfoLabel>Motivo:</InfoLabel>
              <InfoValue numberOfLines={2}>{appointment.description}</InfoValue>
            </InfoRow>
          )}
        </AppointmentInfo>

        <StatusContainer>
          <StatusIndicator>
            <Icon
              name={statusConfig.icon}
              type="material"
              size={16}
              color={statusConfig.color}
            />
            <StatusText color={statusConfig.color}>
              {statusConfig.text}
            </StatusText>
          </StatusIndicator>

          {showActions && (
            <ActionsContainer>
              {onEdit && (
                <ActionButton onPress={onEdit}>
                  <Icon name="edit" type="material" size={20} color={theme.colors.primary} />
                </ActionButton>
              )}
              
              {onDelete && (
                <ActionButton onPress={onDelete}>
                  <Icon name="delete" type="material" size={20} color={theme.colors.error} />
                </ActionButton>
              )}
              
              {onStatusChange && appointment.status === 'pending' && (
                <>
                  <ActionButton onPress={() => onStatusChange('confirmed')}>
                    <Icon name="check" type="material" size={20} color={theme.colors.success} />
                  </ActionButton>
                  <ActionButton onPress={() => onStatusChange('cancelled')}>
                    <Icon name="close" type="material" size={20} color={theme.colors.error} />
                  </ActionButton>
                </>
              )}
            </ActionsContainer>
          )}
        </StatusContainer>
      </CardContent>
    </CardContainer>
  );
};

const styles = {
  card: {
    borderRadius: 10,
    marginHorizontal: 0,
    marginVertical: 8,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  },
};

const CardContainer = styled(TouchableOpacity)`
  border-radius: 12px;
  margin-vertical: 8px;
  padding: 16px;
  background-color: ${theme.colors.white};
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  border: 1px solid ${theme.colors.border};
`;

const CardContent = styled.View`
  flex: 1;
`;

const DoctorInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const TextContainer = styled.View`
  flex: 1;
  margin-left: 12px;
`;

const DoctorName = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: 2px;
`;

const Specialty = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  opacity: 0.7;
`;

const AppointmentInfo = styled.View`
  margin-bottom: 16px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
`;

const InfoLabel = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  font-weight: 500;
  flex: 0.3;
  opacity: 0.8;
`;

const InfoValue = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  font-weight: 400;
  flex: 0.7;
  text-align: right;
`;

const StatusContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StatusIndicator = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StatusText = styled.Text<{ color: string }>`
  font-size: 14px;
  color: ${(props: { color: string }) => props.color};
  font-weight: 600;
  margin-left: 6px;
`;

const ActionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ActionButton = styled(TouchableOpacity)`
  padding: 8px;
  margin-left: 8px;
  border-radius: 6px;
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
`;

export default AppointmentCard; 