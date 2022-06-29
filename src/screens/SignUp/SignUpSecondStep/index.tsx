import React, { useState } from 'react';
import { 
    Alert,
    Keyboard, 
    KeyboardAvoidingView, 
    StatusBar, 
    TouchableWithoutFeedback 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Yup from 'yup';
import { useTheme } from 'styled-components';

import { api } from '@services/api';
import { UserProps } from '../SignUpFirstStep';

import { BackButton } from '@components/BackButton';
import { Bullet } from '@components/Bullet';
import { Button } from '@components/Button';
import { PasswordInput } from '@components/PasswordInput';
import { 
    Container, 
    Form, 
    FormTitle, 
    Header,
    Steps
} from './styles';

export interface UserDTO {
    user: UserProps;
};

export function SignUpSecondStep () {
    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const { user } = route.params as UserDTO;

    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    function handleBack(){
        navigation.goBack();
    };

    async function handleRegister(){

        try {
            const schemaPassword = Yup.object().shape({
                password: Yup.string().required('Informe a Senha'),
                passwordConfirmation: Yup.string().required('Confirme a Senha').oneOf([Yup.ref('password')], 'Senhas não conferem'),
            });
            await schemaPassword.validate({ password, passwordConfirmation });

            const data = {
                user: {
                    ...user, 
                    password: password
                }
            };
            
            await api.post('/users', {
                name: data.user.name,
                email: data.user.email,
                password: data.user.password,
                driver_license: data.user.driverLicense,
            }).then(() => {        
                navigation.navigate('Confirmation', {
                    title: 'Conta criada!',
                    message: 'Agora é só fazer login\ne aproveitar o app!',
                    nextScreenRoute: 'SignIn',
                })
            }).catch(() => {
                Alert.alert('Opa', 'Ocorreu um erro ao criar a conta, tente novamente.');
            });

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Opa', error.message);
            } else {
                // Alert.alert('Erro na autenticação', 'Ocorreu um erro ao efetuar o login, por favor verifique as credenciais')
            }
            
        }
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
                    <BackButton onPress={handleBack} />
                    <Steps>
                        <Bullet />
                        <Bullet active /> 
                    </Steps>
                </Header>

                <Form>
                    <FormTitle>2. Senha</FormTitle>

                    <PasswordInput 
                        iconName='lock' 
                        placeholder='Senha'
                        onChangeText={setPassword}
                        value={password}
                    />

                    <PasswordInput 
                        iconName='lock' 
                        placeholder='Repetir Senha'
                        onChangeText={setPasswordConfirmation}
                        value={passwordConfirmation}
                    />
                </Form>

                <Button 
                    title='Cadastrar'
                    onPress={handleRegister}
                    enabled={true}
                    loading={false}
                    color={theme.colors.success}
                />

                
            </Container>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
};