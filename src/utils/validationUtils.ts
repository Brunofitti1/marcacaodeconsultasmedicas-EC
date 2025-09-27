/**
 * Valida se um email tem formato válido
 * @param email - Email a ser validado
 * @returns Boolean indicando se é válido
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Valida se uma senha atende aos critérios mínimos
 * @param password - Senha a ser validada
 * @returns Objeto com resultado da validação e mensagens de erro
 */
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push('A senha deve ter no mínimo 6 caracteres');
  }
  
  if (!/[A-Za-z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra');
  }
  
  if (!/\d/.test(password)) {
    errors.push('A senha deve conter pelo menos um número');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida se um nome tem formato válido
 * @param name - Nome a ser validado
 * @returns Boolean indicando se é válido
 */
export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2 && /^[A-Za-zÀ-úÇç\s]+$/.test(name.trim());
};

/**
 * Valida se um telefone tem formato válido (brasileiro)
 * @param phone - Telefone a ser validado
 * @returns Boolean indicando se é válido
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\(?[1-9]{2}\)?\s?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Valida se uma data está no formato correto e é válida
 * @param date - Data a ser validada (formato DD/MM/AAAA)
 * @returns Boolean indicando se é válida
 */
export const isValidDate = (date: string): boolean => {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  
  if (!dateRegex.test(date)) {
    return false;
  }
  
  const [day, month, year] = date.split('/').map(Number);
  const dateObj = new Date(year, month - 1, day);
  
  return dateObj.getFullYear() === year &&
         dateObj.getMonth() === month - 1 &&
         dateObj.getDate() === day;
};

/**
 * Valida se uma hora está no formato correto
 * @param time - Hora a ser validada (formato HH:mm)
 * @returns Boolean indicando se é válida
 */
export const isValidTime = (time: string): boolean => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

/**
 * Valida campos obrigatórios de um formulário
 * @param fields - Objeto com os campos a serem validados
 * @returns Objeto com resultado da validação
 */
export const validateRequiredFields = (fields: Record<string, any>): {
  isValid: boolean;
  errors: Record<string, string>;
} => {
  const errors: Record<string, string> = {};
  
  Object.entries(fields).forEach(([key, value]) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      errors[key] = 'Este campo é obrigatório';
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Valida se uma data de agendamento é válida (não pode ser no passado)
 * @param date - Data do agendamento
 * @param time - Hora do agendamento
 * @returns Objeto com resultado da validação
 */
export const validateAppointmentDate = (date: string, time: string): {
  isValid: boolean;
  error?: string;
} => {
  if (!isValidDate(date)) {
    return { isValid: false, error: 'Data inválida' };
  }
  
  if (!isValidTime(time)) {
    return { isValid: false, error: 'Hora inválida' };
  }
  
  const [day, month, year] = date.split('/').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  
  const appointmentDate = new Date(year, month - 1, day, hours, minutes);
  const now = new Date();
  
  if (appointmentDate <= now) {
    return { isValid: false, error: 'A data e hora devem ser no futuro' };
  }
  
  return { isValid: true };
};