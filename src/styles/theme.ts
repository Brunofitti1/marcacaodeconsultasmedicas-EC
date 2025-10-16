/**
 * MediCare+ Theme
 * Identidade Visual - Sistema de Agendamento de Consultas Médicas
 * 
 * Paleta de Cores:
 * - Primary: Verde médico (#00A859) - Representa saúde, vitalidade e crescimento
 * - Secondary: Azul hospitalar (#0066CC) - Transmite confiança e profissionalismo
 * - Accent: Turquesa (#00BFA5) - Modernidade e tecnologia na saúde
 * 
 * Tipografia: Sistema nativo com hierarquia clara e legibilidade otimizada
 */

export default {
   colors: {
      // Cores principais da identidade
      primary: '#00A859',        // Verde médico - ação principal
      secondary: '#0066CC',      // Azul hospitalar - ação secundária
      accent: '#00BFA5',         // Turquesa - destaques
      
      // Cores de superfície
      background: '#F5F9FC',     // Fundo suave azul claro
      surface: '#FFFFFF',        // Superfície de cards
      surfaceVariant: '#E8F4F8', // Superfície alternativa
      
      // Cores de texto
      text: '#1A2B3C',           // Texto principal
      textSecondary: '#5A6B7C',  // Texto secundário
      textLight: '#8A9BAC',      // Texto suave
      
      // Cores de feedback
      error: '#E53935',          // Erro
      success: '#00A859',        // Sucesso (mesmo do primary)
      warning: '#FB8C00',        // Aviso
      info: '#0288D1',           // Informação
      
      // Cores utilitárias
      white: '#FFFFFF',
      black: '#000000',
      border: '#D5E3ED',         // Borda suave
      disabled: '#B0BEC5',       // Elementos desabilitados
      overlay: 'rgba(26, 43, 60, 0.5)', // Overlay escuro
      
      // Cores específicas
      doctorCard: '#E3F2FD',     // Fundo card médico
      patientCard: '#E8F5E9',    // Fundo card paciente
      appointmentPending: '#FFF3E0',   // Consulta pendente
      appointmentConfirmed: '#E8F5E9', // Consulta confirmada
      appointmentCancelled: '#FFEBEE', // Consulta cancelada
   },
   
   typography: {
      // Títulos
      h1: {
         fontSize: 32,
         fontWeight: 'bold' as 'bold',
         lineHeight: 40,
         letterSpacing: -0.5,
      },
      h2: {
         fontSize: 28,
         fontWeight: 'bold' as 'bold',
         lineHeight: 36,
         letterSpacing: -0.25,
      },
      h3: {
         fontSize: 24,
         fontWeight: '600' as '600',
         lineHeight: 32,
         letterSpacing: 0,
      },
      h4: {
         fontSize: 20,
         fontWeight: '600' as '600',
         lineHeight: 28,
         letterSpacing: 0.15,
      },
      
      // Títulos legados (compatibilidade)
      title: {
         fontSize: 24,
         fontWeight: 'bold' as 'bold',
      },
      subtitle: {
         fontSize: 18,
         fontWeight: '600' as '600',
      },
      
      // Corpo de texto
      body1: {
         fontSize: 16,
         fontWeight: 'normal' as 'normal',
         lineHeight: 24,
         letterSpacing: 0.5,
      },
      body2: {
         fontSize: 14,
         fontWeight: 'normal' as 'normal',
         lineHeight: 20,
         letterSpacing: 0.25,
      },
      body: {
         fontSize: 16,
         fontWeight: 'normal' as 'normal',
      },
      
      // Texto auxiliar
      caption: {
         fontSize: 12,
         fontWeight: 'normal' as 'normal',
         lineHeight: 16,
         letterSpacing: 0.4,
      },
      overline: {
         fontSize: 10,
         fontWeight: '600' as '600',
         lineHeight: 16,
         letterSpacing: 1.5,
         textTransform: 'uppercase' as 'uppercase',
      },
      
      // Botões
      button: {
         fontSize: 16,
         fontWeight: '600' as '600',
         letterSpacing: 1.25,
         textTransform: 'uppercase' as 'uppercase',
      },
   },
   
   spacing: {
      xs: 4,
      small: 8,
      medium: 16,
      large: 24,
      xl: 32,
      xlarge: 32,
      xxl: 40,
   },
   
   borderRadius: {
      small: 4,
      medium: 8,
      large: 12,
      xlarge: 16,
      round: 999,
   },
   
   shadows: {
      small: {
         shadowColor: '#000',
         shadowOffset: { width: 0, height: 1 },
         shadowOpacity: 0.1,
         shadowRadius: 2,
         elevation: 2,
      },
      medium: {
         shadowColor: '#000',
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.15,
         shadowRadius: 4,
         elevation: 4,
      },
      large: {
         shadowColor: '#000',
         shadowOffset: { width: 0, height: 4 },
         shadowOpacity: 0.2,
         shadowRadius: 8,
         elevation: 8,
      },
   },
};