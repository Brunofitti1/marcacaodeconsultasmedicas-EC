import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Appointment } from '../types/appointments';
import { User } from '../types/auth';

interface AdminStats {
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  cancelledAppointments: number;
  totalUsers: number;
  totalDoctors: number;
  totalPatients: number;
}

export const useAdminData = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats>({
    totalAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
    cancelledAppointments: 0,
    totalUsers: 0,
    totalDoctors: 0,
    totalPatients: 0,
  });

  const calculateStats = useCallback((appointmentsList: Appointment[], usersList: User[]) => {
    const newStats: AdminStats = {
      totalAppointments: appointmentsList.length,
      pendingAppointments: appointmentsList.filter(a => a.status === 'pending').length,
      confirmedAppointments: appointmentsList.filter(a => a.status === 'confirmed').length,
      cancelledAppointments: appointmentsList.filter(a => a.status === 'cancelled').length,
      totalUsers: usersList.length,
      totalDoctors: usersList.filter(u => u.role === 'doctor').length,
      totalPatients: usersList.filter(u => u.role === 'patient').length,
    };
    setStats(newStats);
  }, []);

  const loadAdminData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Carrega consultas
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      const appointmentsList: Appointment[] = storedAppointments 
        ? JSON.parse(storedAppointments) 
        : [];
      
      // Carrega usuários
      const storedUsers = await AsyncStorage.getItem('@MedicalApp:users');
      const usersList: User[] = storedUsers 
        ? JSON.parse(storedUsers) 
        : [];

      setAppointments(appointmentsList);
      setUsers(usersList);
      calculateStats(appointmentsList, usersList);
      
    } catch (error) {
      console.error('Erro ao carregar dados administrativos:', error);
    } finally {
      setLoading(false);
    }
  }, [calculateStats]);

  const updateAppointmentStatus = useCallback(async (
    appointmentId: string, 
    newStatus: 'confirmed' | 'cancelled' | 'pending'
  ) => {
    try {
      const updatedAppointments = appointments.map(appointment => {
        if (appointment.id === appointmentId) {
          return { ...appointment, status: newStatus };
        }
        return appointment;
      });
      
      await AsyncStorage.setItem('@MedicalApp:appointments', JSON.stringify(updatedAppointments));
      setAppointments(updatedAppointments);
      calculateStats(updatedAppointments, users);
      
    } catch (error) {
      console.error('Erro ao atualizar status da consulta:', error);
      throw error;
    }
  }, [appointments, users, calculateStats]);

  const deleteUser = useCallback(async (userId: string) => {
    try {
      const updatedUsers = users.filter(user => user.id !== userId);
      
      await AsyncStorage.setItem('@MedicalApp:users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      calculateStats(appointments, updatedUsers);
      
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      throw error;
    }
  }, [users, appointments, calculateStats]);

  // Carrega dados quando o hook é usado
  useFocusEffect(
    useCallback(() => {
      loadAdminData();
    }, [loadAdminData])
  );

  return {
    appointments,
    users,
    loading,
    stats,
    loadAdminData,
    updateAppointmentStatus,
    deleteUser
  };
};