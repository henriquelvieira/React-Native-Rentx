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
import { UserProps } from '../SignUpFirstStep';

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
            console.log(data);
         
            navigation.navigate('Confirmation', {
                title: 'Conta criada!',
                message: 'Agora é só fazer login\ne aproveitar o app!',
                nextScreenRoute: 'SignIn',
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