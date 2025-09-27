import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, ViewStyle, TextStyle, Alert } from 'react-native';
import { Button, ListItem, Text } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import theme from '../styles/theme';
import Header from '../components/Header';
import AppointmentCardComponent from '../components/AppointmentCard';
import { useAdminData } from '../hooks/useAdminData';
import { useDoctors } from '../hooks/useDoctors';
import { AppointmentStatus } from '../types/appointments';

type AdminDashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AdminDashboard'>;
};

interface StyledProps {
  status: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return theme.colors.success;
    case 'cancelled':
      return theme.colors.error;
    default:
      return theme.colors.warning;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'Confirmada';
    case 'cancelled':
      return 'Cancelada';
    default:
      return 'Pendente';
  }
};

const AdminDashboardScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<AdminDashboardScreenProps['navigation']>();
  const { 
    appointments, 
    users, 
    loading, 
    stats, 
    updateAppointmentStatus 
  } = useAdminData();
  
  const { getDoctorById } = useDoctors();

  const handleUpdateStatus = async (appointmentId: string, newStatus: AppointmentStatus) => {
    try {
      await updateAppointmentStatus(appointmentId, newStatus);
      Alert.alert('Sucesso', 'Status da consulta atualizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o status da consulta.');
    }
  };

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Painel Administrativo</Title>

        <Button
          title="Gerenciar Usuários"
          onPress={() => navigation.navigate('UserManagement')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          title="Meu Perfil"
          onPress={() => navigation.navigate('Profile')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        <SectionTitle>Últimas Consultas</SectionTitle>
        {loading ? (
          <LoadingText>Carregando dados...</LoadingText>
        ) : appointments.length === 0 ? (
          <EmptyText>Nenhuma consulta agendada</EmptyText>
        ) : (
          appointments.slice(0, 5).map((appointment) => {
            const doctor = getDoctorById(appointment.doctorId);
            
            return (
              <AppointmentCardWrapper key={appointment.id}>
                <AppointmentCardComponent
                  appointment={appointment}
                  doctorImage={doctor?.image}
                  onStatusChange={(status: AppointmentStatus) => handleUpdateStatus(appointment.id, status)}
                  showActions={appointment.status === 'pending'}
                />
              </AppointmentCardWrapper>
            );
          })
        )}

        <StatsContainer>
          <SectionTitle>Estatísticas</SectionTitle>
          <StatsGrid>
            <StatCard>
              <StatNumber>{stats.totalAppointments}</StatNumber>
              <StatLabel>Total de Consultas</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.pendingAppointments}</StatNumber>
              <StatLabel>Pendentes</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.confirmedAppointments}</StatNumber>
              <StatLabel>Confirmadas</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.totalUsers}</StatNumber>
              <StatLabel>Usuários</StatLabel>
            </StatCard>
          </StatsGrid>
        </StatsContainer>

        <Button
          title="Sair"
          onPress={signOut}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.logoutButton}
        />
      </ScrollView>
    </Container>
  );
};

const styles = {
  scrollContent: {
    padding: 20,
  },
  button: {
    marginBottom: 20,
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 12,
  },
  actionButton: {
    marginTop: 8,
    width: '48%',
  },
  confirmButton: {
    backgroundColor: theme.colors.success,
    paddingVertical: 8,
  },
  cancelButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 8,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  specialty: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 4,
  },
  dateTime: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 4,
  },
};

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 15px;
  margin-top: 10px;
`;

const AppointmentCardWrapper = styled.View`
  margin-bottom: 12px;
`;

const LoadingText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;

const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;

const StatsContainer = styled.View`
  margin-top: 24px;
`;

const StatsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StatCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  width: 48%;
  align-items: center;
  border: 1px solid ${theme.colors.border};
`;

const StatNumber = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.primary};
  margin-bottom: 4px;
`;

const StatLabel = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  text-align: center;
  opacity: 0.8;
`;

export default AdminDashboardScreen; 