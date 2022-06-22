import React, { useState } from 'react';
import { 
    Alert,
    Keyboard, 
    KeyboardAvoidingView, 
    StatusBar, 
    TouchableWithoutFeedback 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { BackButton } from '@components/BackButton';
import { Bullet } from '@components/Bullet';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { 
    Container, 
    Form, 
    FormTitle, 
    Header,
    Steps, 
    SubTitle, 
    Title
} from './styles';

export interface UserProps {
    name: string;
    email: string;
    driverLicense: string;
};

export function SignUpFirstStep () {
    
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [driverLicense, setDriverLicense] = useState('');

    function handleBack(){
        navigation.goBack();
    };

    async function handleNextStep(){

        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string().required('CNH é obrigatório'),
                email: Yup.string().email('Digite um E-mail válido').required('E-mail é obrigatório'),
                name: Yup.string().required('Nome é obrigatória'),
            });

            const data: UserProps = { name, email, driverLicense };
            await schema.validate(data);
         
            navigation.navigate('SignUpSecondStep', { user: data }); 
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
                        <Bullet active />
                        <Bullet /> 
                    </Steps>
                </Header>

                <Title>Crie{'\n'}sua conta.</Title>
                <SubTitle>
                    Faça seu cadastro de{'\n'}
                    forma rápida e fácil.
                </SubTitle>

                <Form>
                    <FormTitle>1. Dados</FormTitle>

                    <Input 
                        iconName='user' 
                        placeholder='Nome'
                        autoCorrect={false}
                        onChangeText={setName}
                        value={name}
                    />

                    <Input 
                        iconName='mail' 
                        placeholder='E-mail'
                        keyboardType='email-address'
                        autoCorrect={false}
                        onChangeText={setEmail}
                        value={email}
                    />

                    <Input 
                        iconName='credit-card' 
                        placeholder='CNH'
                        keyboardType='numeric'
                        autoCorrect={false}
                        onChangeText={setDriverLicense}
                        value={driverLicense}
                    />
                </Form>

                <Button 
                    title='Próximo'
                    onPress={handleNextStep}
                    enabled={true}
                    loading={false}
                />

                
            </Container>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
};