/**
 * Tipos relacionados a consultas médicas
 * Este arquivo contém todas as definições de tipos necessárias para o gerenciamento de consultas
 */

/**
 * Status possíveis para uma consulta
 */
export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';

/**
 * Representa uma consulta médica no sistema
 * @property id - Identificador único da consulta
 * @property patientId - ID do paciente que agendou a consulta
 * @property doctorId - ID do médico que realizará a consulta
 * @property doctorName - Nome do médico (para facilitar exibição)
 * @property specialty - Especialidade médica
 * @property date - Data da consulta no formato YYYY-MM-DD
 * @property time - Horário da consulta no formato HH:mm
 * @property description - Descrição ou motivo da consulta
 * @property status - Status atual da consulta
 * @property createdAt - Data/hora de criação da consulta
 * @property updatedAt - Data/hora da última atualização
 */
export type Appointment = {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  description: string;
  status: AppointmentStatus;
  createdAt?: string;
  updatedAt?: string;
};

/**
 * Dados necessários para criar uma nova consulta
 */
export type CreateAppointmentRequest = {
  patientId: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  description?: string;
};

/**
 * Filtros para buscar consultas
 */
export type AppointmentFilters = {
  patientId?: string;
  doctorId?: string;
  status?: AppointmentStatus;
  dateFrom?: string;
  dateTo?: string;
}; 