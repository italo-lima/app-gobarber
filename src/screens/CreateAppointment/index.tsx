import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, Alert } from 'react-native';
import { format } from 'date-fns';

import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  Content,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

interface RouteParams {
  provider_id: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const { goBack, navigate } = useNavigation();
  const route = useRoute();
  const { provider_id } = route.params as RouteParams;

  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(provider_id);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [showPicker, setShowPicker] = useState(false);

  const navigationBack = useCallback(() => {
    goBack();
  }, [goBack]);

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        setAvailability(response.data);
      });
  }, [selectedDate, selectedProvider]);

  const handleSelectedProvider = useCallback((id: string) => {
    setSelectedProvider(id);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowPicker(oldState => !oldState);
  }, []);

  const handleDateChange = useCallback((event: any, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }

    if (date) {
      setSelectedDate(date);
    }
  }, []);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => ({
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [availability]);

  const afternonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => ({
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [availability]);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('appointments', {
        provider_id: selectedProvider,
        date,
      });

      navigate('AppointmentCreated', { date: date.getTime() });
    } catch {
      Alert.alert(
        'Erro ao criar agendamento',
        'Ocorreu um erro ao criar um agendamento, tente novamente',
      );
    }
  }, [selectedDate, selectedHour, navigate, selectedProvider]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigationBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <Content>
        <ProvidersListContainer>
          <ProvidersList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={providers}
            keyExtractor={provider => provider.id}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                onPress={() => handleSelectedProvider(provider.id)}
                selected={provider.id === selectedProvider}
              >
                <ProviderAvatar source={{ uri: provider.avatar_url }} />
                <ProviderName selected={provider.id === selectedProvider}>
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>

        <Calendar>
          <Title>Escolha a data</Title>

          <OpenDatePickerButton onPress={handleToggleDatePicker}>
            <OpenDatePickerButtonText>
              Selecionar outra data
            </OpenDatePickerButtonText>
          </OpenDatePickerButton>

          {showPicker && (
            <DateTimePicker
              onChange={handleDateChange}
              value={selectedDate}
              mode="date"
              display="calendar"
              textColor="#f4ede8"
            />
          )}

          <Schedule>
            <Title>Escolha um horário</Title>

            <Section>
              <SectionTitle>Manhã</SectionTitle>

              <SectionContent>
                {morningAvailability.map(
                  ({ hour, hourFormatted, available }) => (
                    <Hour
                      enabled={available}
                      selected={hour === selectedHour}
                      onPress={() => handleSelectHour(hour)}
                      available={available}
                      key={hourFormatted}
                    >
                      <HourText selected={hour === selectedHour}>
                        {hourFormatted}
                      </HourText>
                    </Hour>
                  ),
                )}
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>Tarde</SectionTitle>

              <SectionContent>
                {afternonAvailability.map(
                  ({ hour, hourFormatted, available }) => (
                    <Hour
                      enabled={available}
                      selected={hour === selectedHour}
                      onPress={() => handleSelectHour(hour)}
                      available={available}
                      key={hourFormatted}
                    >
                      <HourText selected={hour === selectedHour}>
                        {hourFormatted}
                      </HourText>
                    </Hour>
                  ),
                )}
              </SectionContent>
            </Section>
          </Schedule>

          <CreateAppointmentButton onPress={handleCreateAppointment}>
            <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
          </CreateAppointmentButton>
        </Calendar>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
