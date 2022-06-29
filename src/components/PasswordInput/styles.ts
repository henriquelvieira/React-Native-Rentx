import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface InputProps {
    isFocused: boolean;
}

export const Container = styled.View`
    flex-direction: row;
    margin-bottom: 8px;
`;

export const IconContainer = styled.View<InputProps>`
    height: 56px;
    width: 55px;
    justify-content: center;
    align-items: center;

    margin-right: 2px;
    background-color: ${({ theme }) => theme.colors.background_secondary};

    ${({ theme, isFocused }) => isFocused && css`
        border-bottom-width: 2px;
        border-bottom-color: ${theme.colors.main};
    `};
`;

export const InputText = styled(TextInput)<InputProps>`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_secondary};
    font-size: ${RFValue(15)}px;    
    font-family: ${({ theme }) => theme.fonts.primary_400}; 
    color: ${({ theme }) => theme.colors.text};
    padding: 0 23px;

    ${({ theme, isFocused }) => isFocused && css`
        border-bottom-width: 2px;
        border-bottom-color: ${theme.colors.main};
    `};
`;
