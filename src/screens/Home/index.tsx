import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { api } from '@services/api';
import { CarDTO } from '@dtos/carDTO';

import { Car } from '@components/Car';
import { Load } from '@components/Load';

import Logo from '@assets/logo.svg';

import { 
    CarList, 
    Container, 
    Header, 
    HeaderContent, 
    TotalCars,
    MyCarButton
} from './styles';


export function Home () {

    const navigation = useNavigation();
    const theme = useTheme();

    const [loading, setLoading] = useState<boolean>(true);
    const [cars, setCars] = useState<CarDTO[]>([]);

    function handleCarDetails(car: CarDTO){
        navigation.navigate('CarDetails', { car });
    };

    function handleOpenMyCars(){
        navigation.navigate('MyCars');
    };

    async function fetchCars(){
        try {
            const response = await api.get('/cars');
            setCars(response.data);       
        } catch (error) {
            console.log(error);            
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const response = fetchCars();
    }, []);

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
                <TotalCars>{`Total de ${cars.length} carros`}</TotalCars>
            </HeaderContent>
        </Header>
        
        {loading ? 
        <Load /> :
        <CarList
          keyExtractor={(item) => item.id}
          data={cars}
          renderItem={({ item }) => 
            <Car 
                data={item} 
                onPress={() => handleCarDetails(item)}  
            />}
        />
        }

        <MyCarButton onPress={handleOpenMyCars} >
            <Ionicons 
                name="ios-car-sport" 
                size={32}
                color={theme.colors.shape}
            />
        </MyCarButton>

    </Container>
    );
};