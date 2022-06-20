import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { 
    Container,
    IconContainer,
    InputText
} from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';

interface PasswordInputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
}

export function PasswordInput ({
    iconName,
    ...rest
}: PasswordInputProps) {
    const theme = useTheme();

    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    function handleVisibilityChange(){
        setIsPasswordVisible(!isPasswordVisible);
    }

    return (
    <Container>
        <IconContainer>
            <Feather 
                name={iconName}
                size={24}
                color={theme.colors.text_detail}
            />
        </IconContainer>

        <InputText
            secureTextEntry={isPasswordVisible} 
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