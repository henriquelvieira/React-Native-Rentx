import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car, CarProps } from '@components/Car';

import Logo from '@assets/logo.svg';
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';

export function Home () {

    const navigation = useNavigation();

    const carData = [
        {        
            data: {
                id: 'adada',
                brand: 'AUDI',
                name: 'RS 5 Coupé',
                rent: {
                    period: 'AO DIA',
                    price: 120
                },
                thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
            }
        },
        {        
            data: {
                id: '2',
                brand: 'AUDI',
                name: 'RS 5 Coupé',
                rent: {
                    period: 'AO DIA',
                    price: 120
                },
                thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
            }
        },    
    ] as CarProps[];

    function handleCarDetails(){
        navigation.navigate('CarDetails');
    };

    return (
    <Container>
        <StatusBar 
            barStyle='light-content' 
            backgroundColor="transparent" 
            translucent
        />
        
        <Header>
            <HeaderContent>
                <Logo
                    width={RFValue(108)}
                    height={RFValue(12)}
                />
                <TotalCars>Total de 12 carros</TotalCars>
            </HeaderContent>
        </Header>
        
        <CarList
          keyExtractor={(item) => item.data.id}
          data={carData}
          renderItem={({ item }) => <Car data={item.data} onPress={handleCarDetails}  />}
        />

    </Container>
    );
};