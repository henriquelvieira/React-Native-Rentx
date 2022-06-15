import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    position: absolute;
    margin-top: ${getStatusBarHeight() + 18}px;
    margin-left: 24px;
`;