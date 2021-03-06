import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Provider } from './index';
import { RectButton } from 'react-native-gesture-handler';

interface SelectedContainerProps {
  selected: boolean;
}

interface SelectedNameProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}
export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 25px;
  padding-top: ${getStatusBarHeight() + 25}px;
  background: #28262e;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  color: #fdf5e8;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  margin-left: 15px;
`;

export const Content = styled.ScrollView``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 30px 25px;
`;

export const ProviderContainer = styled(RectButton)<SelectedContainerProps>`
  background: ${({ selected }) => (selected ? '#ff9000' : '#3e3b47')};
  flex-direction: row;
  padding: 10px 15px;
  align-items: center;
  margin-right: 15px;
  border-radius: 10px;
`;
export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;
export const ProviderName = styled.Text<SelectedNameProps>`
  margin-left: 10px;
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: ${({ selected }) => (selected ? '#232129' : '#f4ede8')};
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 24px;
  margin: 0 25px 25px;
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 45px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 25px;
`;

export const OpenDatePickerButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #232129;
`;

export const Schedule = styled.View`
  padding: 25px 0 15px;
`;

export const Section = styled.View`
  margin-bottom: 25px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  margin: 0 25px 10px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Hour = styled(RectButton)<HourProps>`
  padding: 15px;
  border-radius: 10px;
  margin-right: 10px;

  background: ${({ selected }) => (selected ? '#ff9000' : '#3e3b47')};
  opacity: ${({ available }) => (available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourTextProps>`
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: ${({ selected }) => (selected ? '#232129' : '#f4ede8')};
`;

export const CreateAppointmentButton = styled(RectButton)`
  height: 50px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 25px 25px;
`;

export const CreateAppointmentButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #232129;
`;
