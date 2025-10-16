/**
 * Imagens fixas para entidades do sistema MediCare+
 * URLs de imagens profissionais de médicos e pacientes
 */

// Imagens de médicos por especialidade
export const DOCTOR_IMAGES = {
  'Cardiologia': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
  'Pediatria': 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
  'Ortopedia': 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
  'Dermatologia': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
  'Neurologia': 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop',
  'Oftalmologia': 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop',
  'Psiquiatria': 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop',
  'Ginecologia': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
  'default': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
};

// Imagens específicas de médicos cadastrados
export const SPECIFIC_DOCTOR_IMAGES = {
  'joao@example.com': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop', // Dr. João Silva - Cardiologia
  'maria@example.com': 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop', // Dra. Maria Santos - Pediatria
  'pedro@example.com': 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop', // Dr. Pedro Oliveira - Ortopedia
};

// Imagens de pacientes (alternadas entre masculino e feminino)
export const PATIENT_IMAGES = {
  male: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
  ],
  female: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
  ],
};

// Imagem do administrador
export const ADMIN_IMAGE = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop';

// Imagem padrão
export const DEFAULT_USER_IMAGE = 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop';

/**
 * Retorna uma imagem de médico baseada na especialidade
 */
export const getDoctorImage = (specialty: string): string => {
  return DOCTOR_IMAGES[specialty as keyof typeof DOCTOR_IMAGES] || DOCTOR_IMAGES.default;
};

/**
 * Retorna uma imagem de paciente baseada no índice
 */
export const getPatientImage = (index: number, gender: 'male' | 'female' = 'male'): string => {
  const images = PATIENT_IMAGES[gender];
  return images[index % images.length];
};

/**
 * Retorna uma imagem de médico específico baseada no email
 */
export const getSpecificDoctorImage = (email: string): string => {
  return SPECIFIC_DOCTOR_IMAGES[email as keyof typeof SPECIFIC_DOCTOR_IMAGES] || DOCTOR_IMAGES.default;
};
