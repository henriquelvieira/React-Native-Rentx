import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { 
    StatusBar, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback, 
    Keyboard,
    Alert
} from 'react-native';
import * as Yup from 'yup';
import { useTheme } from 'styled-components';

import { useAuth } from '@hooks/auth';

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
    const navigation = useNavigation();
    const { signIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSingIn() {

        try {
            const schema = Yup.object().shape({
                email: Yup.string().email('Digite um E-mail válido').required('E-mail é obrigatório'),
                password: Yup.string().required('Senha é obrigatória'),
            });
            await schema.validate({ email, password });  

            signIn({ email, password });

        } catch (error) {
            console.log(error)
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Opa', error.message);
            } else {
                Alert.alert('Erro na autenticação', 'Ocorreu um erro ao efetuar o login, por favor verifique as credenciais')
            }
            
        };
    };

    function handleNewAccount () {
        navigation.navigate('SignUpFirstStep');
    }
    
    return (
    <KeyboardAvoidingView behavior='position' enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <StatusBar 
                    barStyle='dark-content' 
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
                        onChangeText={setEmail}
                        value={email}
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
                        onPress={handleSingIn}
                        enabled={true}
                        loading={false}
                    />
                    <Button 
                        title='Criar conta gratuita' 
                        color={theme.colors.background_secondary}
                        light
                        onPress={handleNewAccount}
                        enabled={true}
                        loading={false}
                    />
                </Footter>
            </Container>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
};