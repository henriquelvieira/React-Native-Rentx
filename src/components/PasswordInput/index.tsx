import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { 
    Container,
    IconContainer,
    InputText
} from './styles';

interface PasswordInputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export function PasswordInput ({
    iconName,
    value,
    ...rest
}: PasswordInputProps) {

    const theme = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    function handleInputFocus (){
        setIsFocused(true);
    };

    function handleInputBlur (){
        setIsFocused(false);
        setIsFilled(!!value);
    };


    function handleVisibilityChange(){
        setIsPasswordVisible(!isPasswordVisible);
    }

    return (
    <Container>
        <IconContainer isFocused={isFocused}>
            <Feather 
                name={iconName}
                size={24}
                color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
            />
        </IconContainer>

        <InputText
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            isFocused={isFocused}
            secureTextEntry={isPasswordVisible} 
            autoCorrect={false}
            {...rest} 
        />
        
        <BorderlessButton onPress={handleVisibilityChange}>
            <IconContainer>
                <Feather
                    name={isPasswordVisible ? 'eye' : 'eye-off'}
                    size={24}
                    color={theme.colors.text_detail}
                />
            </IconContainer>
        </BorderlessButton>

    </Container>
    );
};