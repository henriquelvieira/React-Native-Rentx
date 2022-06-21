import React, { useState } from 'react';
import { 
    StatusBar, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback, 
    Keyboard
} from 'react-native';
import { useTheme } from 'styled-components';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { PasswordInput } from '@components/PasswordInput';

import { 
    Container,
    Header,
    Title,
    SubTitle,
    Footter,
    Form,
} from './styles';


export function SignIn () {

    const theme = useTheme();
    const [eMail, setEMail] = useState('');
    const [password, setPassword] = useState('');
    
    return (
    <KeyboardAvoidingView behavior='position' enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

                <Form>
                    <Input 
                        iconName='mail' 
                        placeholder='E-mail'
                        keyboardType='email-address'
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={setEMail}
                        value={eMail}
                    />
                    <PasswordInput 
                        iconName='lock' 
                        placeholder='Senha'
                        onChangeText={setPassword}
                        value={password}
                    />
                    
                </Form>

                
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
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
};