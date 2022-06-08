import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

import { CarDTO } from '@dtos/carDTO';
import { getAcessoryIcon } from '@utils/getAcessoryIcon';
import { getPlataformDate } from '@utils/getPlataformDate';

import { Header } from '@components/Header';
import { ImageSlider } from '@components/ImageSlider';
import { Accessory } from '@components/Accessory'; 
import { Button } from '@components/Button';

import theme from '@theme/theme';
import { 
    Brand, 
    CarImages, 
    Container, 
    Content, 
    Description, 
    Details, 
    Name, 
    Period, 
    Price, 
    Rent,
    Accessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,
} from './styles';
import { api } from '@services/api';
import { Alert } from 'react-native';


interface Params { 
    car: CarDTO;
    dates: string[];
};

interface RentalDetails {
    start: string;
    end: string;
    totalPrice: number;
    totalRentDays: number;
};

export function SchedulingDetails () {
    const navigation = useNavigation();
    const route = useRoute();   

    const [rentalDetails, setRentalDetails] = useState<RentalDetails>({} as RentalDetails);

    const { car, dates } = route.params as Params;
    
    async function handleConfirmRental(){
        const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
        const unavailable_dates = [
            ...schedulesByCar.data.unavailable_dates, 
            ...dates
        ];

        
        await api.post('schedules_byuser', {
            user_id: 1,
            car
        });
        
    
        api.put(`/schedules_bycars/${car.id}`, {
            id: car.id,
            unavailable_dates          
        })
        .then(() => navigation.navigate('SchedulingComplete'))
        .catch(() => Alert.alert('Não foi possivel confirmar o agendamento'));        
    };

    function handleBack(){
        navigation.goBack();
    };


    function calculateRental(){
        const totalPrice = Number(dates.length * car.rent.price);

        setRentalDetails({
            start: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
            totalPrice: totalPrice,
            totalRentDays: dates.length
        });   
    }

    useEffect(() => {
        calculateRental();

    }, []);

    return (
    <Container>
   
        <Header onPress={handleBack} />

        <CarImages>
            <ImageSlider imagesUrl={car.photos} />            
        </CarImages>

        <Content>
            <Details>
                <Description>
                    <Brand>{car.brand}</Brand>
                    <Name>{car.name}</Name>
                </Description>

                <Rent>
                    <Period>{car.rent.period}</Period>
                    <Price>R$ {car.rent.price}</Price>
                </Rent>
            </Details>
            
            <Accessories>
                {
                    car.accessories.map(accessory => {                        
                        return <Accessory 
                                    key={accessory.type}
                                    name={accessory.name} 
                                    icon={getAcessoryIcon(accessory.type)} 
                                />
                    })
                }                                   
            </Accessories>

            <RentalPeriod>
                <CalendarIcon>
                    <Feather 
                        name='calendar' 
                        size={RFValue(24)} 
                        color={theme.colors.shape}
                    />
                </CalendarIcon>

                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValue>{rentalDetails.start}</DateValue>
                </DateInfo>

                <Feather 
                    name='chevron-right' 
                    size={RFValue(10)} 
                    color={theme.colors.text}
                >

                <DateInfo>
                    <DateTitle>ATÉ</DateTitle>
                    <DateValue>{rentalDetails.end}</DateValue>
                </DateInfo>
            </RentalPeriod>

            <RentalPrice>
                <RentalPriceLabel>TOTAL</RentalPriceLabel>
                <RentalPriceDetails>
                    <RentalPriceQuota>{`R$ ${car.rent.price} x${rentalDetails.totalRentDays} diárias`}</RentalPriceQuota>
                    <RentalPriceTotal>R$ {rentalDetails.totalPrice}</RentalPriceTotal>
                </RentalPriceDetails>
            </RentalPrice>

        </Content>
        
        <Footer>
            <Button 
                title="Alugar agora"
                color={theme.colors.success}
                onPress={handleConfirmRental}
            />
        </Footer>
        
    </Container>
    );
};

