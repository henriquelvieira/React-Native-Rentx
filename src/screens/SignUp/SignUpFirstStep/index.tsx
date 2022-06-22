import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '@components/BackButton';
import { Bullet } from '@components/Bullet';
import { 
    Container, 
    Footter, 
    Form, 
    FormTitle, 
    Header,
    Steps, 
    SubTitle, 
    Title
} from './styles';
import { Input } from '@components/Input';
import { Button } from '@components/Button';


export function SignUpFirstStep () {
    
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cnh, setCnh] = useState('');

    function handleBack(){
        navigation.goBack();
    };

    return (
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
                keyboardType='email-address'
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
                autoCorrect={false}
                onChangeText={setCnh}
                value={cnh}
            />
        </Form>

        <Footter>
            <Button 
                title='Próximo'
                onPress={() => {}}
                enabled={true}
                loading={false}
            />
        </Footter>

        
    </Container>
    );
};