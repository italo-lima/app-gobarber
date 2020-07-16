import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 0 25px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin-top: 50px;
  text-align: center;
`;

export const Description = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: #999591;
  margin-top: 15px;
`;

export const OKButton = styled(RectButton)`
  background: #ff9000;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 25px;
  padding: 15px 25px;
`;

export const OKButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
  font-size: 18px;
`;
