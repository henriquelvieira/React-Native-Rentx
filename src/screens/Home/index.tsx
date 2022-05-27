import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';
import { Car, CarProps } from '@components/Car';

import Logo from '@assets/logo.svg';

export function Home () {

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
                thumbnail: 'x'
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
                thumbnail: 'x'
            }
        },    
    ] as CarProps[];

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
          renderItem={({ item }) => <Car data={item.data} />}
        />

    </Container>
    );
};