/**
 * Formata uma data para o formato brasileiro (DD/MM/AAAA)
 * @param date - Data a ser formatada (Date, string ou timestamp)
 * @returns String formatada ou data original se inválida
 */
export const formatDate = (date: Date | string | number): string => {
  try {
    const dateObj = new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return String(date);
    }
    
    return dateObj.toLocaleDateString('pt-BR');
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return String(date);
  }
};

/**
 * Formata uma data para o formato ISO (AAAA-MM-DD)
 * @param date - Data a ser formatada
 * @returns String no formato ISO ou data original se inválida
 */
export const formatDateISO = (date: Date | string | number): string => {
  try {
    const dateObj = new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return String(date);
    }
    
    return dateObj.toISOString().split('T')[0];
  } catch (error) {
    console.error('Erro ao formatar data ISO:', error);
    return String(date);
  }
};

/**
 * Formata a hora para o formato brasileiro (HH:mm)
 * @param time - Hora a ser formatada (string no formato HH:mm)
 * @returns String formatada
 */
export const formatTime = (time: string): string => {
  try {
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  } catch (error) {
    console.error('Erro ao formatar hora:', error);
    return time;
  }
};

/**
 * Formata data e hora juntas
 * @param date - Data
 * @param time - Hora
 * @returns String formatada "DD/MM/AAAA às HH:mm"
 */
export const formatDateTime = (date: Date | string | number, time: string): string => {
  const formattedDate = formatDate(date);
  const formattedTime = formatTime(time);
  return `${formattedDate} às ${formattedTime}`;
};

/**
 * Calcula a diferença em dias entre duas datas
 * @param date1 - Primeira data
 * @param date2 - Segunda data
 * @returns Número de dias de diferença
 */
export const daysDifference = (date1: Date | string, date2: Date | string): number => {
  try {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    
    const timeDifference = Math.abs(secondDate.getTime() - firstDate.getTime());
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
  } catch (error) {
    console.error('Erro ao calcular diferença de dias:', error);
    return 0;
  }
};

/**
 * Verifica se uma data é hoje
 * @param date - Data para verificar
 * @returns Boolean indicando se é hoje
 */
export const isToday = (date: Date | string): boolean => {
  try {
    const inputDate = new Date(date);
    const today = new Date();
    
    return inputDate.toDateString() === today.toDateString();
  } catch (error) {
    console.error('Erro ao verificar se é hoje:', error);
    return false;
  }
};

/**
 * Verifica se uma data é no futuro
 * @param date - Data para verificar
 * @returns Boolean indicando se é no futuro
 */
export const isFutureDate = (date: Date | string): boolean => {
  try {
    const inputDate = new Date(date);
    const today = new Date();
    
    return inputDate > today;
  } catch (error) {
    console.error('Erro ao verificar se é data futura:', error);
    return false;
  }
};