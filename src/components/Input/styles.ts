import styled, {css} from "styled-components/native"
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 15px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  border-width: 2px;
  border-color: #232129;

  ${(props) =>props.isErrored && css`
  border-color: #c53030;
  `}

  ${(props) =>props.isFocused && css`
    border-color: #ff9000;
  `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSalb-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 15px;
`;
