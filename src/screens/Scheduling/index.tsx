import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '@components/BackButton';
import { Button } from '@components/Button';
import { Calendar } from '@components/Calendar';

import ArrowSvg from '@assets/arrow.svg';

import { 
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Footer,
    Content,
} from './styles';

export function Scheduling () {
    const theme = useTheme();
    const navigation = useNavigation();

    function handleConfirmRental(){
        navigation.navigate('SchedulingDetails');
    };

    function handleBack(){
        navigation.goBack();
    };

    return (
    <Container>
        <StatusBar 
            barStyle='light-content' 
            backgroundColor="transparent" 
            translucent
        />        
        <Header> 
            <BackButton 
                color={theme.colors.shape}
                onPress={handleBack}
            />  
            <Title>
                Escolha uma{'\n'}
                data de início e{'\n'}
                fim do aluguel{'\n'}
            </Title>
            
            <RentalPeriod>
                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValue selected={false}>18/06/2021</DateValue>
                </DateInfo>

                <ArrowSvg />

                <DateInfo>
                    <DateTitle>ATÉ</DateTitle>
                    <DateValue selected={false} >18/06/2021</DateValue>
                </DateInfo>                
            </RentalPeriod>

        </Header>

        <Content>
            <Calendar />
        </Content>

        <Footer>
            <Button 
                title="Confirmar"
                onPress={handleConfirmRental}
            />
        </Footer>
        
    </Container>
    );
};