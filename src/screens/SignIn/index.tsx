import React from 'react';
import { StatusBar } from 'react-native';

import { Button } from '@components/Button';

import { useTheme } from 'styled-components';
import { 
    Container,
    Header,
    Title,
    SubTitle,
    Footter,
} from './styles';


export function SignIn () {

    const theme = useTheme();
    
    return (
    <Container>
        <StatusBar 
            barStyle='light-content' 
            backgroundColor="transparent" 
            translucent
        />
        <Header>
            <Title>Estamos{'\n'}quase lá.</Title>
            <SubTitle>
                Faça seu login para começar{'\n'}
                uma experiência incrível.
            </SubTitle>
        </Header>
        
        <Footter>
            <Button 
                title='Login' 
                onPress={() => {}}
                enabled={false}
                loading={false}
            />
            <Button 
                title='Criar conta gratuita' 
                color={theme.colors.background_secondary}
                light
                onPress={() => {}}
                enabled={false}
                loading={false}
            />
        </Footter>
    </Container>
    );
};