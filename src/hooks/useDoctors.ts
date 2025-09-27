import { useState, useEffect } from 'react';
import { Doctor } from '../types/doctors';

// Mock data dos médicos - em um app real, isso viria de uma API
const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. João Silva',
    specialty: 'Cardiologista',
    image: 'https://mighty.tools/mockmind-api/content/human/91.jpg',
  },
  {
    id: '2',
    name: 'Dra. Maria Santos',
    specialty: 'Dermatologista',
    image: 'https://mighty.tools/mockmind-api/content/human/97.jpg',
  },
  {
    id: '3',
    name: 'Dr. Pedro Oliveira',
    specialty: 'Oftalmologista',
    image: 'https://mighty.tools/mockmind-api/content/human/79.jpg',
  },
];

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento de dados
    const loadDoctors = async () => {
      try {
        // Em um app real, aqui seria uma chamada para API
        await new Promise(resolve => setTimeout(resolve, 500));
        setDoctors(mockDoctors);
      } catch (error) {
        console.error('Erro ao carregar médicos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  const getDoctorById = (doctorId: string): Doctor | undefined => {
    return doctors.find(doctor => doctor.id === doctorId);
  };

  const getDoctorsBySpecialty = (specialty: string): Doctor[] => {
    return doctors.filter(doctor => 
      doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
    );
  };

  return {
    doctors,
    loading,
    getDoctorById,
    getDoctorsBySpecialty
  };
};