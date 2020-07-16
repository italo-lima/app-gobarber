import styled from 'styled-components/native';
import {getBottomSpace} from "react-native-iphone-x-helper"
import {Platform} from "react-native"

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px 100px;padding: 0 30px ${Platform.OS === 'android' ? 160 : 40}px;
`

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 65px 0 25px;
`;

export const BackSingIn = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 15px 0 ${16 + getBottomSpace()}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BackSingInText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: "RobotoSlab-Regular";
  margin-left: 15px;
`;
