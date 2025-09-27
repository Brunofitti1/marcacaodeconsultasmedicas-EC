import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Appointment } from '../types/appointments';

const STORAGE_KEY = '@MedicalApp:appointments';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadAppointments = useCallback(async () => {
    try {
      const storedAppointments = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedAppointments) {
        const parsedAppointments = JSON.parse(storedAppointments);
        setAppointments(parsedAppointments);
      }
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshAppointments = useCallback(async () => {
    setRefreshing(true);
    await loadAppointments();
    setRefreshing(false);
  }, [loadAppointments]);

  const updateAppointmentStatus = useCallback(async (
    appointmentId: string, 
    newStatus: 'confirmed' | 'cancelled' | 'pending'
  ) => {
    try {
      const storedAppointments = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        const updatedAppointments = allAppointments.map(appointment => {
          if (appointment.id === appointmentId) {
            return { ...appointment, status: newStatus };
          }
          return appointment;
        });
        
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAppointments));
        setAppointments(updatedAppointments);
      }
    } catch (error) {
      console.error('Erro ao atualizar status da consulta:', error);
      throw error;
    }
  }, []);

  const deleteAppointment = useCallback(async (appointmentId: string) => {
    try {
      const storedAppointments = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        const updatedAppointments = allAppointments.filter(
          appointment => appointment.id !== appointmentId
        );
        
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAppointments));
        setAppointments(updatedAppointments);
      }
    } catch (error) {
      console.error('Erro ao deletar consulta:', error);
      throw error;
    }
  }, []);

  const addAppointment = useCallback(async (newAppointment: Appointment) => {
    try {
      const storedAppointments = await AsyncStorage.getItem(STORAGE_KEY);
      const existingAppointments = storedAppointments ? JSON.parse(storedAppointments) : [];
      
      const updatedAppointments = [...existingAppointments, newAppointment];
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAppointments));
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error('Erro ao adicionar consulta:', error);
      throw error;
    }
  }, []);

  // Carrega appointments quando o hook é usado
  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [loadAppointments])
  );

  return {
    appointments,
    loading,
    refreshing,
    loadAppointments,
    refreshAppointments,
    updateAppointmentStatus,
    deleteAppointment,
    addAppointment
  };
};