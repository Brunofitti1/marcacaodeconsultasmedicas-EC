import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appointment } from '../types/appointments';
import { generateUniqueId } from '../utils/stringUtils';
import { validateAppointmentDate } from '../utils/validationUtils';

// Chave de armazenamento para consultas
const APPOINTMENTS_STORAGE_KEY = '@MedicalApp:appointments';

export interface CreateAppointmentData {
  patientId: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  description?: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
}

export interface AppointmentFilters {
  patientId?: string;
  doctorId?: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
  dateFrom?: string;
  dateTo?: string;
}

export class AppointmentService {
  /**
   * Busca todas as consultas do storage
   */
  static async getAllAppointments(): Promise<Appointment[]> {
    try {
      const storedAppointments = await AsyncStorage.getItem(APPOINTMENTS_STORAGE_KEY);
      return storedAppointments ? JSON.parse(storedAppointments) : [];
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
      throw new Error('Falha ao carregar consultas');
    }
  }

  /**
   * Busca consultas com filtros
   */
  static async getAppointments(filters?: AppointmentFilters): Promise<Appointment[]> {
    try {
      const allAppointments = await this.getAllAppointments();
      
      if (!filters) {
        return allAppointments;
      }

      return allAppointments.filter(appointment => {
        if (filters.patientId && appointment.patientId !== filters.patientId) {
          return false;
        }
        
        if (filters.doctorId && appointment.doctorId !== filters.doctorId) {
          return false;
        }
        
        if (filters.status && appointment.status !== filters.status) {
          return false;
        }

        // Filtros de data podem ser implementados aqui se necessário
        
        return true;
      });
    } catch (error) {
      console.error('Erro ao buscar consultas com filtros:', error);
      throw new Error('Falha ao filtrar consultas');
    }
  }

  /**
   * Busca uma consulta específica por ID
   */
  static async getAppointmentById(appointmentId: string): Promise<Appointment | null> {
    try {
      const appointments = await this.getAllAppointments();
      return appointments.find(appointment => appointment.id === appointmentId) || null;
    } catch (error) {
      console.error('Erro ao buscar consulta por ID:', error);
      throw new Error('Falha ao carregar consulta');
    }
  }

  /**
   * Cria uma nova consulta
   */
  static async createAppointment(appointmentData: CreateAppointmentData): Promise<Appointment> {
    try {
      // Valida os dados da consulta
      const validation = validateAppointmentDate(appointmentData.date, appointmentData.time);
      if (!validation.isValid) {
        throw new Error(validation.error || 'Dados da consulta inválidos');
      }

      // Verifica conflitos de horário
      const existingAppointments = await this.getAllAppointments();
      const hasConflict = existingAppointments.some(appointment => 
        appointment.doctorId === appointmentData.doctorId &&
        appointment.date === appointmentData.date &&
        appointment.time === appointmentData.time &&
        appointment.status !== 'cancelled'
      );

      if (hasConflict) {
        throw new Error('Já existe uma consulta agendada para este médico neste horário');
      }

      // Cria a nova consulta
      const newAppointment: Appointment = {
        id: generateUniqueId(),
        patientId: appointmentData.patientId,
        doctorId: appointmentData.doctorId,
        doctorName: appointmentData.doctorName,
        specialty: appointmentData.specialty,
        date: appointmentData.date,
        time: appointmentData.time,
        description: appointmentData.description || '',
        status: appointmentData.status || 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Salva no storage
      const updatedAppointments = [...existingAppointments, newAppointment];
      await AsyncStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updatedAppointments));

      return newAppointment;
    } catch (error) {
      console.error('Erro ao criar consulta:', error);
      throw error instanceof Error ? error : new Error('Falha ao criar consulta');
    }
  }

  /**
   * Atualiza o status de uma consulta
   */
  static async updateAppointmentStatus(
    appointmentId: string, 
    newStatus: 'pending' | 'confirmed' | 'cancelled'
  ): Promise<Appointment> {
    try {
      const appointments = await this.getAllAppointments();
      const appointmentIndex = appointments.findIndex(a => a.id === appointmentId);
      
      if (appointmentIndex === -1) {
        throw new Error('Consulta não encontrada');
      }

      appointments[appointmentIndex] = {
        ...appointments[appointmentIndex],
        status: newStatus,
        updatedAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
      
      return appointments[appointmentIndex];
    } catch (error) {
      console.error('Erro ao atualizar status da consulta:', error);
      throw error instanceof Error ? error : new Error('Falha ao atualizar consulta');
    }
  }

  /**
   * Deleta uma consulta
   */
  static async deleteAppointment(appointmentId: string): Promise<void> {
    try {
      const appointments = await this.getAllAppointments();
      const updatedAppointments = appointments.filter(a => a.id !== appointmentId);
      
      if (appointments.length === updatedAppointments.length) {
        throw new Error('Consulta não encontrada');
      }

      await AsyncStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updatedAppointments));
    } catch (error) {
      console.error('Erro ao deletar consulta:', error);
      throw error instanceof Error ? error : new Error('Falha ao deletar consulta');
    }
  }

  /**
   * Busca consultas por paciente
   */
  static async getAppointmentsByPatient(patientId: string): Promise<Appointment[]> {
    return this.getAppointments({ patientId });
  }

  /**
   * Busca consultas por médico
   */
  static async getAppointmentsByDoctor(doctorId: string): Promise<Appointment[]> {
    return this.getAppointments({ doctorId });
  }

  /**
   * Busca próximas consultas (próximos 7 dias)
   */
  static async getUpcomingAppointments(patientId?: string): Promise<Appointment[]> {
    try {
      const appointments = await (patientId 
        ? this.getAppointmentsByPatient(patientId) 
        : this.getAllAppointments());
      
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);

      return appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate >= today && 
               appointmentDate <= nextWeek && 
               appointment.status !== 'cancelled';
      }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } catch (error) {
      console.error('Erro ao buscar próximas consultas:', error);
      throw new Error('Falha ao carregar próximas consultas');
    }
  }

  /**
   * Verifica se um horário está disponível para um médico
   */
  static async isTimeSlotAvailable(
    doctorId: string, 
    date: string, 
    time: string, 
    excludeAppointmentId?: string
  ): Promise<boolean> {
    try {
      const appointments = await this.getAllAppointments();
      
      return !appointments.some(appointment => 
        appointment.doctorId === doctorId &&
        appointment.date === date &&
        appointment.time === time &&
        appointment.status !== 'cancelled' &&
        appointment.id !== excludeAppointmentId
      );
    } catch (error) {
      console.error('Erro ao verificar disponibilidade:', error);
      return false;
    }
  }

  /**
   * Busca horários disponíveis para um médico em uma data
   */
  static async getAvailableTimeSlots(doctorId: string, date: string): Promise<string[]> {
    try {
      // Horários padrão de atendimento (8h às 18h, de hora em hora)
      const standardTimeSlots = [
        '08:00', '09:00', '10:00', '11:00',
        '14:00', '15:00', '16:00', '17:00'
      ];

      const availableSlots: string[] = [];

      for (const timeSlot of standardTimeSlots) {
        const isAvailable = await this.isTimeSlotAvailable(doctorId, date, timeSlot);
        if (isAvailable) {
          availableSlots.push(timeSlot);
        }
      }

      return availableSlots;
    } catch (error) {
      console.error('Erro ao buscar horários disponíveis:', error);
      return [];
    }
  }
}

// Exporta uma instância para compatibilidade
export const appointmentService = AppointmentService;