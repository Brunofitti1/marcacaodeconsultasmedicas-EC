import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Button, Input, Text } from 'react-native-elements';
import { Platform, View, TouchableOpacity } from 'react-native';
import theme from '../styles/theme';
import { Doctor } from '../types/doctors';
import { Appointment } from '../types/appointments';
import { getSpecificDoctorImage, getDoctorImage } from '../constants/images';
import FeedbackMessage from './FeedbackMessage';
import DateTimePicker from '@react-native-community/datetimepicker';

const doctors: Doctor[] = [
   {
      id: '1',
      name: 'Dr. João Silva',
      specialty: 'Cardiologia',
      image: getSpecificDoctorImage('joao@example.com'),
   },
   {
      id: '2',
      name: 'Dra. Maria Santos',
      specialty: 'Pediatria',
      image: getSpecificDoctorImage('maria@example.com'),
   },
   {
      id: '3',
      name: 'Dr. Pedro Oliveira',
      specialty: 'Ortopedia',
      image: getSpecificDoctorImage('pedro@example.com'),
   },
];

type AppointmentFormProps = {
   onSubmit: (appointment: {
      doctorId: string;
      date: Date;
      time: string;
      description: string;
   }) => void;
};

const generateTimeSlots = () => {
   const slots = [];
   for (let hour = 9; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
   }
   return slots;
};

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit }) => {
   const [selectedDoctor, setSelectedDoctor] = useState<string>('');
   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
   const [showDatePicker, setShowDatePicker] = useState(false);
   const [selectedTime, setSelectedTime] = useState<string>('');
   const [description, setDescription] = useState('');
   const [error, setError] = useState('');
   const [dateError, setDateError] = useState('');
   const [timeError, setTimeError] = useState('');
   const [doctorError, setDoctorError] = useState('');
   const [descriptionError, setDescriptionError] = useState('');
   const timeSlots = generateTimeSlots();

   const validateDate = (date: Date): boolean => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + 3);
      
      if (date < today) {
         setDateError('Data deve ser futura');
         return false;
      }
      
      if (date > maxDate) {
         setDateError('Data deve ser nos próximos 3 meses');
         return false;
      }
      
      setDateError('');
      return true;
   };

   const handleDateChange = (event: any, selectedDate?: Date) => {
      setShowDatePicker(Platform.OS === 'ios');
      if (selectedDate) {
         setSelectedDate(selectedDate);
         validateDate(selectedDate);
         setError('');
      }
   };

   const validateDoctor = (): boolean => {
      if (!selectedDoctor) {
         setDoctorError('Selecione um médico');
         return false;
      }
      setDoctorError('');
      return true;
   };

   const validateTime = (): boolean => {
      if (!selectedTime) {
         setTimeError('Selecione um horário');
         return false;
      }
      setTimeError('');
      return true;
   };

   const validateDescription = (): boolean => {
      if (!description.trim()) {
         setDescriptionError('Descrição é obrigatória');
         return false;
      }
      if (description.trim().length < 10) {
         setDescriptionError('Descrição deve ter no mínimo 10 caracteres');
         return false;
      }
      setDescriptionError('');
      return true;
   };

   const handleSubmit = () => {
      setError('');
      
      const isDoctorValid = validateDoctor();
      const isDateValid = validateDate(selectedDate);
      const isTimeValid = validateTime();
      const isDescriptionValid = validateDescription();

      if (!isDoctorValid || !isDateValid || !isTimeValid || !isDescriptionValid) {
         setError('Por favor, corrija os campos destacados');
         return;
      }

      onSubmit({
         doctorId: selectedDoctor,
         date: selectedDate,
         time: selectedTime,
         description,
      });
   };

   const isTimeSlotAvailable = (time: string) => {
      // Aqui você pode adicionar lógica para verificar se o horário está disponível
      // Por exemplo, verificar se já existe uma consulta agendada para este horário
      return true;
   };

   return (
      <Container>
         <Title>Selecione o Médico</Title>
         <DoctorList>
            {doctors.map((doctor) => (
               <DoctorCard
                  key={doctor.id}
                  selected={selectedDoctor === doctor.id}
                  onPress={() => setSelectedDoctor(doctor.id)}
               >
                  <DoctorImage source={{ uri: doctor.image }} />
                  <DoctorInfo>
                     <DoctorName>{doctor.name}</DoctorName>
                     <DoctorSpecialty>{doctor.specialty}</DoctorSpecialty>
                  </DoctorInfo>
               </DoctorCard>
            ))}
         </DoctorList>

         {error && (
            <FeedbackMessage
               type="error"
               message={error}
               visible={!!error}
               onDismiss={() => setError('')}
            />
         )}

         {doctorError && (
            <ErrorText>{doctorError}</ErrorText>
         )}

         <Title>Data e Hora</Title>
         <DatePickerContainer>
            <DatePickerButton onPress={() => setShowDatePicker(true)}>
               <DatePickerText>
                  {selectedDate.toLocaleDateString('pt-BR')}
               </DatePickerText>
            </DatePickerButton>
         </DatePickerContainer>
         
         {showDatePicker && (
            <DateTimePicker
               value={selectedDate}
               mode="date"
               display={Platform.OS === 'ios' ? 'spinner' : 'default'}
               onChange={handleDateChange}
               minimumDate={new Date()}
               maximumDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
            />
         )}
         
         {dateError && (
            <ErrorText>{dateError}</ErrorText>
         )}

         <TimeSlotsContainer>
            <TimeSlotsTitle>Horários Disponíveis:</TimeSlotsTitle>
            <TimeSlotsGrid>
               {timeSlots.map((time) => {
                  const isAvailable = isTimeSlotAvailable(time);
                  return (
                     <TimeSlotButton
                        key={time}
                        selected={selectedTime === time}
                        disabled={!isAvailable}
                        onPress={() => isAvailable && setSelectedTime(time)}
                     >
                        <TimeSlotText selected={selectedTime === time} disabled={!isAvailable}>
                           {time}
                        </TimeSlotText>
                     </TimeSlotButton>
                  );
               })}
            </TimeSlotsGrid>
         </TimeSlotsContainer>

         {timeError && (
            <ErrorText>{timeError}</ErrorText>
         )}

         <Title>Descrição</Title>
         <Input
            placeholder="Descreva o motivo da consulta (mínimo 10 caracteres)"
            value={description}
            onChangeText={(text) => {
               setDescription(text);
               setDescriptionError('');
               setError('');
            }}
            onBlur={validateDescription}
            multiline
            numberOfLines={4}
            containerStyle={InputContainer}
            errorMessage={descriptionError}
         />

         <SubmitButton
            title="Agendar Consulta"
            onPress={handleSubmit}
            buttonStyle={{
               backgroundColor: theme.colors.primary,
               borderRadius: 8,
               padding: 12,
               marginTop: 20,
            }}
         />
      </Container>
   );
};

const Container = styled.View`
  padding: ${theme.spacing.medium}px;
`;

const Title = styled.Text`
  font-size: ${theme.typography.subtitle.fontSize}px;
  font-weight: ${theme.typography.subtitle.fontWeight};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.medium}px;
`;

const DoctorList = styled.ScrollView`
  margin-bottom: ${theme.spacing.large}px;
`;

const DoctorCard = styled(TouchableOpacity)<{ selected: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.medium}px;
  background-color: ${(props: { selected: boolean }) => props.selected ? theme.colors.primary : theme.colors.white};
  border-radius: 8px;
  margin-bottom: ${theme.spacing.medium}px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
`;

const DoctorImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: ${theme.spacing.medium}px;
`;

const DoctorInfo = styled.View`
  flex: 1;
`;

const DoctorName = styled.Text`
  font-size: ${theme.typography.subtitle.fontSize}px;
  font-weight: ${theme.typography.subtitle.fontWeight};
  color: ${theme.colors.text};
`;

const DoctorSpecialty = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text};
  opacity: 0.8;
`;

const TimeSlotsContainer = styled.View`
  margin-bottom: ${theme.spacing.large}px;
`;

const TimeSlotsTitle = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.small}px;
`;

const TimeSlotsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.small}px;
`;

const TimeSlotButton = styled(TouchableOpacity)<{ selected: boolean; disabled: boolean }>`
  background-color: ${(props: { selected: boolean; disabled: boolean }) => 
    props.disabled 
      ? theme.colors.background 
      : props.selected 
        ? theme.colors.primary 
        : theme.colors.white};
  padding: ${theme.spacing.small}px ${theme.spacing.medium}px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${(props: { selected: boolean; disabled: boolean }) => 
    props.disabled 
      ? theme.colors.background 
      : props.selected 
        ? theme.colors.primary 
        : theme.colors.text};
  opacity: ${(props: { disabled: boolean }) => props.disabled ? 0.5 : 1};
`;

const TimeSlotText = styled(Text)<{ selected: boolean; disabled: boolean }>`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${(props: { selected: boolean; disabled: boolean }) => 
    props.disabled 
      ? theme.colors.text 
      : props.selected 
        ? theme.colors.white 
        : theme.colors.text};
`;

const InputContainer = {
   marginBottom: theme.spacing.medium,
   backgroundColor: theme.colors.white,
   borderRadius: 8,
   paddingHorizontal: theme.spacing.medium,
};

const SubmitButton = styled(Button)`
  margin-top: ${theme.spacing.large}px;
`;

const ErrorText = styled.Text`
  color: ${theme.colors.error};
  font-size: 12px;
  margin-top: 4px;
  margin-bottom: 8px;
  margin-left: ${theme.spacing.small}px;
`;

const DatePickerContainer = styled.View`
  margin-bottom: ${theme.spacing.medium}px;
`;

const DatePickerButton = styled(TouchableOpacity)`
  background-color: ${theme.colors.surface};
  padding: ${theme.spacing.medium}px;
  border-radius: ${theme.borderRadius.medium}px;
  border-width: 1px;
  border-color: ${theme.colors.border};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DatePickerText = styled.Text`
  font-size: ${theme.typography.body1.fontSize}px;
  color: ${theme.colors.text};
`;

export default AppointmentForm; 