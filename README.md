# MediCare+ 🏥

<div align="center">
  <h3>Sistema de Agendamento de Consultas Médicas</h3>
  <p>Sua saúde em primeiro lugar</p>
  
  [![React Native](https://img.shields.io/badge/React%20Native-0.76.7-blue.svg)](https://reactnative.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)](https://www.typescriptlang.org/)
  [![Expo](https://img.shields.io/badge/Expo-52.0.39-000020.svg)](https://expo.dev/)
  [![License](https://img.shields.io/badge/License-0BSD-green.svg)](LICENSE)
</div>

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Identidade Visual](#identidade-visual)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura](#arquitetura)
- [Instalação](#instalação)
- [Uso](#uso)
- [Telas do Aplicativo](#telas-do-aplicativo)
- [Credenciais de Teste](#credenciais-de-teste)
- [Estrutura do Projeto](#estrutura-do-projeto)

---

## 📱 Sobre o Projeto

O **MediCare+** é um aplicativo mobile desenvolvido em React Native para facilitar o agendamento de consultas médicas. O sistema oferece uma experiência completa tanto para pacientes quanto para médicos e administradores, com interface intuitiva, moderna e acessível.

### 🎯 Objetivos

- Facilitar o agendamento de consultas médicas
- Proporcionar uma interface amigável e acessível
- Garantir segurança e privacidade dos dados
- Melhorar a comunicação entre pacientes e profissionais de saúde

---

## 🎨 Identidade Visual

### Nome e Conceito

**MediCare+** representa o cuidado médico com um "plus" de tecnologia e qualidade. O nome transmite:
- **Medi**: Medicina, cuidado médico profissional
- **Care**: Cuidado, atenção, zelo com a saúde
- **+**: O diferencial de qualidade, tecnologia e excelência

### Paleta de Cores

A paleta foi cuidadosamente escolhida para transmitir confiança, profissionalismo e bem-estar:

| Cor | Hex | Uso | Significado |
|-----|-----|-----|-------------|
| 🟢 Verde Médico | `#00A859` | Ações principais, botões CTA | Saúde, vitalidade, crescimento |
| 🔵 Azul Hospitalar | `#0066CC` | Ações secundárias, informações | Confiança, profissionalismo |
| 🔷 Turquesa | `#00BFA5` | Destaques, elementos interativos | Modernidade, tecnologia |
| ⬜ Fundo Claro | `#F5F9FC` | Fundo geral do app | Limpeza, clareza |
| ⬛ Texto Principal | `#1A2B3C` | Textos principais | Legibilidade, profissionalismo |

### Justificativas de Design

#### 1. **Verde como Cor Principal (#00A859)**
- Universalmente associado à saúde e bem-estar
- Transmite sensação de calma e segurança
- Diferencia o app de concorrentes que usam apenas azul

#### 2. **Azul como Cor Secundária (#0066CC)**
- Cor tradicional da área de saúde
- Transmite confiança e profissionalismo
- Complementa o verde harmoniosamente

#### 3. **Tipografia Clara e Legível**
- Hierarquia visual bem definida (H1 a Body)
- Tamanhos adequados para diferentes dispositivos
- Espaçamento otimizado para leitura

#### 4. **Espaçamento Consistente**
- Sistema de 8px como unidade base
- Respiração visual entre elementos
- Interface limpa e organizada

#### 5. **Acessibilidade**
- Contraste adequado (WCAG AA)
- Tamanhos de fonte legíveis
- Áreas de toque adequadas (mínimo 44x44px)

---

## ✨ Funcionalidades

### Para Pacientes
- ✅ Cadastro e login seguro
- ✅ Visualização de médicos por especialidade
- ✅ Agendamento de consultas com calendário integrado
- ✅ Validações em tempo real
- ✅ Feedbacks visuais (loading, erro, sucesso)
- ✅ Gerenciamento de consultas agendadas
- ✅ Perfil do usuário

### Para Médicos
- ✅ Login com credenciais profissionais
- ✅ Visualização de agenda
- ✅ Gerenciamento de consultas
- ✅ Informações dos pacientes

### Para Administradores
- ✅ Gerenciamento de usuários
- ✅ Visão geral do sistema
- ✅ Controle de médicos e pacientes

### Validações Implementadas
- 📧 **Email**: Formato válido obrigatório
- 🔒 **Senha**: Mínimo 6 caracteres
- 👤 **Nome**: Mínimo 3 caracteres
- 📅 **Data**: Somente datas futuras (até 3 meses)
- ⏰ **Horário**: Obrigatório e validado
- 📝 **Descrição**: Mínimo 10 caracteres

---

## 🛠 Tecnologias Utilizadas

### Core
- **React Native 0.76.7** - Framework de desenvolvimento mobile
- **TypeScript 5.3.3** - Tipagem estática
- **Expo 52.0.39** - Plataforma de desenvolvimento

### Navegação
- **React Navigation 6.x** - Navegação entre telas
- **React Navigation Stack** - Stack navigation

### UI/UX
- **Styled Components 6.1.16** - CSS-in-JS
- **React Native Elements 3.4.3** - Componentes UI
- **Expo Vector Icons** - Ícones

### Estado e Armazenamento
- **React Context API** - Gerenciamento de estado
- **AsyncStorage 2.1.2** - Armazenamento local

### Utilitários
- **DateTimePicker 8.3.0** - Seletor de data nativo
- **Axios 1.8.4** - Cliente HTTP
- **JWT Decode 4.0.0** - Decodificação de tokens

---

## 🏗 Arquitetura

O projeto segue uma arquitetura em camadas bem definida:

```
src/
├── components/       # Componentes reutilizáveis
│   ├── FeedbackMessage.tsx    # Mensagens de feedback
│   ├── LoadingSpinner.tsx     # Indicador de carregamento
│   ├── Button.tsx             # Botões customizados
│   └── ...
├── screens/          # Telas do aplicativo
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   └── ...
├── navigation/       # Configuração de navegação
├── contexts/         # Context API (estado global)
├── services/         # Lógica de negócio e API
├── types/            # Definições TypeScript
├── styles/           # Estilos globais e tema
│   └── theme.ts              # Tema centralizado
└── constants/        # Constantes (imagens, etc)
    └── images.ts             # URLs de imagens fixas
```

### Princípios Aplicados
- **Separation of Concerns**: Cada camada tem responsabilidade única
- **DRY (Don't Repeat Yourself)**: Código reutilizável
- **Type Safety**: TypeScript em todo o projeto
- **Component Composition**: Componentes pequenos e reutilizáveis

---

## 📥 Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Expo CLI: `npm install -g expo-cli`

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/medicare-plus.git
cd medicare-plus/marcacaoDeConsultasMedicas-EC
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Inicie o aplicativo**
```bash
npx expo start
# ou
npm start
```

4. **Execute em dispositivo/emulador**
- **Android**: Pressione `a` no terminal ou escaneie o QR Code com o Expo Go
- **iOS**: Pressione `i` no terminal ou escaneie o QR Code com o Expo Go (apenas macOS)
- **Web**: Pressione `w` no terminal

---

## 🚀 Uso

### Primeira Execução

1. O app abrirá na tela de login
2. Use as credenciais de teste ou crie uma nova conta
3. Explore as funcionalidades conforme seu perfil de usuário

### Criando uma Conta

1. Na tela de login, clique em "Cadastrar Novo Paciente"
2. Preencha todos os campos obrigatórios:
   - Nome completo (mínimo 3 caracteres)
   - Email válido
   - Senha (mínimo 6 caracteres)
   - Confirmação de senha
3. Aguarde a confirmação de sucesso
4. Faça login com suas credenciais

### Agendando uma Consulta

1. Faça login como paciente
2. Selecione "Agendar Consulta"
3. Escolha um médico da lista
4. Selecione a data usando o calendário
5. Escolha um horário disponível
6. Descreva o motivo da consulta (mínimo 10 caracteres)
7. Confirme o agendamento

---

## 📱 Telas do Aplicativo

### 1. Tela de Login
- Campo de email com validação em tempo real
- Campo de senha com requisitos de segurança
- Feedback visual de erros
- Loading durante autenticação
- Link para cadastro
- Credenciais de exemplo visíveis

### 2. Tela de Cadastro
- Validação completa de todos os campos
- Confirmação de senha
- Feedback de sucesso/erro
- Redirecionamento automático após sucesso

### 3. Dashboard do Paciente
- Lista de consultas agendadas
- Cards visuais por status (pendente/confirmada/cancelada)
- Botão para nova consulta
- Acesso ao perfil

### 4. Agendamento de Consultas
- Lista de médicos com fotos profissionais
- Seletor de data nativo (DatePicker)
- Grid de horários disponíveis
- Campo de descrição com contador
- Validações em tempo real

### 5. Dashboard do Médico
- Agenda de consultas
- Informações dos pacientes
- Gerenciamento de horários

### 6. Dashboard do Admin
- Gerenciamento de usuários
- Estatísticas do sistema
- Controle de acesso

---

## 🔐 Credenciais de Teste

### Administrador
```
Email: admin@example.com
Senha: 123456
```

### Médicos
```
Dr. João Silva (Cardiologia)
Email: joao@example.com
Senha: 123456

Dra. Maria Santos (Pediatria)
Email: maria@example.com
Senha: 123456

Dr. Pedro Oliveira (Ortopedia)
Email: pedro@example.com
Senha: 123456
```

### Pacientes
Crie sua própria conta através da tela de cadastro!

---

## 📂 Estrutura do Projeto

```
marcacaoDeConsultasMedicas-EC/
├── assets/                    # Recursos estáticos
│   ├── icon.png
│   ├── splash-icon.png
│   └── adaptive-icon.png
├── src/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── AppointmentCard.tsx
│   │   ├── AppointmentForm.tsx
│   │   ├── Button.tsx
│   │   ├── DoctorList.tsx
│   │   ├── FeedbackMessage.tsx  # ✨ Novo
│   │   ├── Header.tsx
│   │   ├── Input.tsx
│   │   ├── LoadingSpinner.tsx   # ✨ Novo
│   │   └── TimeSlotList.tsx
│   ├── constants/            # Constantes da aplicação
│   │   └── images.ts         # ✨ URLs fixas de imagens
│   ├── contexts/             # Context API
│   │   └── AuthContext.tsx
│   ├── navigation/           # Configuração de navegação
│   │   └── AppNavigator.tsx
│   ├── routes/               # Definição de rotas
│   │   └── index.tsx
│   ├── screens/              # Telas do aplicativo
│   │   ├── AdminDashboardScreen.tsx
│   │   ├── CreateAppointmentScreen.tsx
│   │   ├── DoctorDashboardScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── LoginScreen.tsx          # ✨ Atualizada
│   │   ├── PatientDashboardScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── RegisterScreen.tsx       # ✨ Atualizada
│   │   └── UserManagementScreen.tsx
│   ├── services/             # Lógica de negócio
│   │   ├── appointments.ts
│   │   └── auth.ts           # ✨ Atualizado
│   ├── styles/               # Estilos globais
│   │   ├── globalStyles.ts
│   │   └── theme.ts          # ✨ Tema completo
│   └── types/                # Definições TypeScript
│       ├── appointments.ts
│       ├── auth.ts
│       ├── doctors.ts
│       └── navigation.ts
├── .gitignore
├── app.json                  # ✨ Atualizado
├── App.tsx
├── index.ts
├── package.json
├── tsconfig.json
└── README.md                 # ✨ Este arquivo

✨ = Arquivos criados ou significativamente atualizados
```

---

## 🎯 Melhorias Implementadas

### 1. Identidade Visual Profissional
- ✅ Nome único e memorável (MediCare+)
- ✅ Paleta de cores tema saúde
- ✅ Tipografia hierárquica e legível
- ✅ Sistema de espaçamento consistente
- ✅ Documentação completa no `theme.ts`

### 2. Feedbacks Visuais
- ✅ Componente `FeedbackMessage` (success, error, warning, info)
- ✅ Componente `LoadingSpinner` (normal e fullscreen)
- ✅ Estados de loading em formulários
- ✅ Mensagens de erro claras e específicas
- ✅ Confirmações visuais de sucesso

### 3. Validações Completas
- ✅ Validação de email com regex
- ✅ Validação de senha (mínimo 6 caracteres)
- ✅ Validação de nome (mínimo 3 caracteres)
- ✅ Validação de data (futura, máximo 3 meses)
- ✅ Validação de horário
- ✅ Validação de descrição (mínimo 10 caracteres)
- ✅ Feedback em tempo real (onBlur)

### 4. Imagens Profissionais
- ✅ URLs fixas do Unsplash
- ✅ Imagens por especialidade médica
- ✅ Imagens específicas por médico
- ✅ Sistema de fallback
- ✅ Constantes centralizadas

### 5. Calendário Integrado
- ✅ DateTimePicker nativo
- ✅ Restrição de datas (somente futuras)
- ✅ Limite de 3 meses à frente
- ✅ Formatação brasileira (DD/MM/AAAA)
- ✅ Interface nativa iOS/Android

### 6. Arquitetura e Código
- ✅ TypeScript strict mode
- ✅ Arquitetura em camadas
- ✅ Componentes reutilizáveis
- ✅ Context API para estado global
- ✅ Styled Components com tema

---

## 📝 Convenções de Commit

Este projeto segue o padrão de commits semânticos:

```
feat: nova funcionalidade
fix: correção de bug
chore: tarefas de manutenção
docs: documentação
style: formatação, sem alteração de código
refactor: refatoração de código
test: adição/correção de testes
perf: melhorias de performance
```

### Exemplos de Commits Realizados
```bash
feat: adiciona identidade visual MediCare+ com paleta de cores tema saúde
feat: adiciona componentes FeedbackMessage e LoadingSpinner para melhor UX
feat: substitui imagens aleatórias por URLs fixas profissionais do Unsplash
feat: adiciona validações completas e integração de DatePicker nativo
docs: atualiza README com identidade visual e instruções completas
```

---

## 👥 Desenvolvedores

- **Equipe de Desenvolvimento FIAP**
- Checkpoint 3 - Mobile Development

---

## 📄 Licença

Este projeto está sob a licença 0BSD. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🙏 Agradecimentos

- Professores da FIAP
- Comunidade React Native
- Unsplash pelas imagens profissionais
- Expo pela excelente plataforma

---

<div align="center">
  <p>Desenvolvido com ❤️ e ☕ para a disciplina de Mobile Development</p>
  <p><strong>MediCare+</strong> - Sua saúde em primeiro lugar</p>
</div>
```
npm install
# ou
yarn install
```

3. Instale as dependências do iOS (apenas em macOS):
```bash
cd ios
pod install
cd ..
```

4. Inicie o aplicativo:
```bash
# Para Android
npm run android
# ou
yarn android

# Para iOS (apenas em macOS)
npm run ios
# ou
yarn ios
```

## Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
│   ├── Header/    # Componente de cabeçalho
│   └── AppointmentForm/  # Formulário de agendamento
├── screens/        # Telas do aplicativo
│   ├── HomeScreen.tsx
│   └── CreateAppointmentScreen.tsx
├── styles/         # Estilos globais e tema
│   └── theme.ts
├── types/          # Definições de tipos TypeScript
│   ├── appointments.ts
│   ├── doctors.ts
│   └── navigation.ts
└── utils/          # Funções utilitárias
```

## Funcionalidades Detalhadas

### Agendamento de Consultas
- Seleção de médico por especialidade
- Escolha de data e horário
- Adição de descrição/motivo da consulta
- Validação de disponibilidade

### Gerenciamento de Consultas
- Visualização de todas as consultas agendadas
- Edição de consultas existentes
- Cancelamento de consultas
- Atualização de status

### Interface do Usuário
- Design moderno e responsivo
- Navegação intuitiva
- Feedback visual de ações
- Suporte a temas claro/escuro

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autores

- **Professor Hete Caetano** - [hete.caetano@fiap.com.br](mailto:hete.caetano@fiap.com.br)

## Agradecimentos

- [React Native Community](https://reactnative.dev/help)
- [React Navigation](https://reactnavigation.org/)
- [Styled Components](https://styled-components.com/)
- Todos os contribuidores do projeto

## Suporte

Se você encontrar algum problema ou tiver sugestões, por favor abra uma issue no GitHub.

---

Desenvolvido por Professor Hete Caetano e compartilhado com alunos de TDS 