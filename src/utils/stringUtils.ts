/**
 * Gera um ID único baseado em timestamp e número aleatório
 * @returns String com ID único
 */
export const generateUniqueId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomNum = Math.random().toString(36).substr(2, 5);
  return `${timestamp}-${randomNum}`;
};

/**
 * Capitaliza a primeira letra de cada palavra
 * @param text - Texto a ser formatado
 * @returns Texto com primeira letra maiúscula
 */
export const capitalizeWords = (text: string): string => {
  return text.toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase());
};

/**
 * Remove caracteres especiais de uma string, mantendo apenas letras, números e espaços
 * @param text - Texto a ser limpo
 * @returns Texto limpo
 */
export const cleanText = (text: string): string => {
  return text.replace(/[^a-zA-Z0-9\sÀ-úÇç]/g, '');
};

/**
 * Trunca um texto para um tamanho máximo, adicionando reticências se necessário
 * @param text - Texto a ser truncado
 * @param maxLength - Tamanho máximo
 * @returns Texto truncado
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Formata um CPF adicionando pontos e hífen
 * @param cpf - CPF a ser formatado (apenas números)
 * @returns CPF formatado
 */
export const formatCPF = (cpf: string): string => {
  const cleanCPF = cpf.replace(/\D/g, '');
  
  if (cleanCPF.length !== 11) {
    return cpf;
  }
  
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

/**
 * Formata um telefone brasileiro
 * @param phone - Telefone a ser formatado (apenas números)
 * @returns Telefone formatado
 */
export const formatPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  if (cleanPhone.length === 11) {
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  
  return phone;
};

/**
 * Converte uma string em formato kebab-case
 * @param text - Texto a ser convertido
 * @returns Texto em kebab-case
 */
export const toKebabCase = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Remove acentos de uma string
 * @param text - Texto com acentos
 * @returns Texto sem acentos
 */
export const removeAccents = (text: string): string => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * Verifica se uma string está vazia ou contém apenas espaços
 * @param text - Texto a ser verificado
 * @returns Boolean indicando se está vazio
 */
export const isEmpty = (text: string | null | undefined): boolean => {
  return !text || text.trim().length === 0;
};

/**
 * Mascarar dados sensíveis (email, telefone, etc.)
 * @param text - Texto a ser mascarado
 * @param visibleChars - Número de caracteres visíveis no início e fim
 * @returns Texto mascarado
 */
export const maskSensitiveData = (text: string, visibleChars: number = 2): string => {
  if (text.length <= visibleChars * 2) {
    return text;
  }
  
  const start = text.slice(0, visibleChars);
  const end = text.slice(-visibleChars);
  const middle = '*'.repeat(text.length - visibleChars * 2);
  
  return `${start}${middle}${end}`;
};