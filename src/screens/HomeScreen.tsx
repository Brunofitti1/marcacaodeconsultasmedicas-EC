import React from 'react';
import styled from 'styled-components/native';
import { FlatList, RefreshControl, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../components/Header';
import AppointmentCardComponent from '../components/AppointmentCard';
import theme from '../styles/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Appointment } from '../types/appointments';
import { RootStackParamList } from '../types/navigation';
import { useAppointments } from '../hooks/useAppointments';
import { useDoctors } from '../hooks/useDoctors';
import { useAuth } from '../contexts/AuthContext';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user } = useAuth();
  const { 
    appointments, 
    loading, 
    refreshing, 
    refreshAppointments, 
    updateAppointmentStatus, 
    deleteAppointment 
  } = useAppointments();
  
  const { getDoctorById } = useDoctors();

  // Filtra consultas do usuário atual (se for paciente)
  const userAppointments = user?.role === 'patient' 
    ? appointments.filter(apt => apt.patientId === user.id)
    : appointments;

  const handleEditAppointment = (appointment: Appointment) => {
    // Navegar para tela de edição
    navigation.navigate('CreateAppointment');
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja cancelar esta consulta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAppointment(appointmentId);
              Alert.alert('Sucesso', 'Consulta cancelada com sucesso!');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível cancelar a consulta.');
            }
          },
        },
      ]
    );
  };

  const handleStatusChange = async (appointmentId: string, newStatus: 'confirmed' | 'cancelled' | 'pending') => {
    try {
      await updateAppointmentStatus(appointmentId, newStatus);
      Alert.alert('Sucesso', 'Status da consulta atualizado!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o status da consulta.');
    }
  };

  const renderAppointment = ({ item }: { item: Appointment }) => {
    const doctor = getDoctorById(item.doctorId);
    
    return (
      <AppointmentCardComponent
        appointment={item}
        doctorImage={doctor?.image}
        onEdit={() => handleEditAppointment(item)}
        onDelete={() => handleDeleteAppointment(item.id)}
        onStatusChange={(status: 'confirmed' | 'cancelled' | 'pending') => handleStatusChange(item.id, status)}
        showActions={user?.role === 'patient'}
      />
    );
  };

  return (
    <Container>
      <Header />
      <PageHeaderContainer>
        <PageHeaderTitle>Minhas Consultas</PageHeaderTitle>
      </PageHeaderContainer>

      <Content>
        <Button
          title="Agendar Nova Consulta"
          icon={
            <FontAwesome
              name="calendar-plus-o"
              size={20}
              color="white"
              style={{ marginRight: 8 }}
            />
          }
          buttonStyle={{
            backgroundColor: theme.colors.primary,
            borderRadius: 8,
            padding: 12,
            marginBottom: theme.spacing.medium
          }}
          onPress={() => navigation.navigate('CreateAppointment')}
        />

        <AppointmentList
          data={userAppointments}
          keyExtractor={(item: Appointment) => item.id}
          renderItem={renderAppointment}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshAppointments} />
          }
          ListEmptyComponent={
            <EmptyText>Nenhuma consulta agendada</EmptyText>
          }
        />
      </Content>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const Content = styled.View`
  flex: 1;
  padding: ${theme.spacing.medium}px;
`;

const AppointmentList = styled(FlatList)`
  flex: 1;
`;

const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  opacity: 0.6;
  margin-top: ${theme.spacing.large}px;
`;

const PageHeaderContainer = styled.View`
  padding: ${theme.spacing.medium}px;
  background-color: ${theme.colors.background};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

const PageHeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
`;

export default HomeScreen;