import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

import { getPlataformDate } from '@utils/getPlataformDate';
import { CarDTO } from '@dtos/carDTO';

import { BackButton } from '@components/BackButton';
import { Button } from '@components/Button';

import ArrowSvg from '@assets/arrow.svg';
import { 
    Calendar, 
    DayProps, 
    MarkedDateProps,
    generateInterval 
} from '@components/Calendar';


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

interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;
};

interface Params { 
    car: CarDTO;
};

export function Scheduling () {
    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const { car } = route.params as Params;

    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [rentalPeriod, setRentalPeriod] = useState({} as RentalPeriod);

    function handleConfirmRental(){

        navigation.navigate('SchedulingDetails', {
            car,
            dates: Object.keys(markedDates)
        });
        
    };

    function handleBack(){
        navigation.goBack();
    };

    function handleChangeDate(date: DayProps){
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;
        
        if (start.timestamp > end.timestamp){
            start = end;
            end = start;
        };

        setLastSelectedDate(end);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        const ObjectKeys = Object.keys(interval);
        const firstDate = ObjectKeys[0];
        const endDate = ObjectKeys[ObjectKeys.length - 1];

        setRentalPeriod({
            startFormatted: format(getPlataformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlataformDate(new Date(endDate)), 'dd/MM/yyyy')
        });

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
                    <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
                </DateInfo>

                <ArrowSvg />

                <DateInfo>
                    <DateTitle>ATÉ</DateTitle>
                    <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DateValue>
                </DateInfo>                
            </RentalPeriod>

        </Header>

        <Content>
            <Calendar 
                markedDates={markedDates}
                onDayPress={handleChangeDate}
            />
        </Content>

        <Footer>
            <Button 
                title="Confirmar"
                onPress={handleConfirmRental}
                enabled={!!rentalPeriod.startFormatted}
            />
        </Footer>
        
    </Container>
    );
};