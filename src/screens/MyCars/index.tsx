import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';

import { api } from '@services/api';
import { CarDTO } from '@dtos/carDTO';

import { BackButton } from '@components/BackButton';
import { Car } from '@components/Car';
import { Load } from '@components/Load';

import { 
    Container, 
    Content, 
    Header, 
    SubTitle, 
    Title,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarList,
    CarWrapper,
    RentalPeriod,
    Period,
    DateValueContainer,
    DateValue,    
} from './styles';
import { format, parseISO } from 'date-fns';

export interface CarProps {
    id: string;
    user_id: string;
    car: CarDTO;
    startDate: string;
    endDate: string;
};

export function MyCars () {
    const theme = useTheme();
    const navigation = useNavigation();
    
    const [cars, setCars] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);    

    function handleBack(){
        navigation.goBack();
    };

    async function fetchMyCars() {
        const user_id = 1;
        try {
            const response = await api.get(`/schedules_byuser?user_id=${user_id}`);
            setCars(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        fetchMyCars();

    }, []);


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
                Seus agendamentos,{'\n'}
                estão aqui.{'\n'}
            </Title>
            
            <SubTitle>
                Conforto, segurança e praticidade.
            </SubTitle>
        </Header>

        <Content>
            <Appointments>
                <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
            </Appointments>

            {
            loading ? 
            <Load /> :
            <CarList
                keyExtractor={(item) => String(item.id)}
                data={cars}
                renderItem={({ item }) => (
                    <CarWrapper>
                        <Car data={item.car} />
                        <RentalPeriod>
                            <Period>Período</Period>
                            <DateValueContainer>
                                <DateValue>{item.startDate}</DateValue>
                                <AntDesign
                                    name="arrowright"
                                    size={20}
                                    color={theme.colors.text_detail}
                                />
                                <DateValue>{item.endDate}</DateValue>
                            </DateValueContainer>
                        </RentalPeriod>
                    </CarWrapper>
                )}
            />
            }

        </Content>
        
    </Container>
    );
};