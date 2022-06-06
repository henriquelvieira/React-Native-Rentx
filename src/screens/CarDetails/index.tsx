import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { CarDTO } from '@dtos/carDTO';
import { getAcessoryIcon } from '@utils/getAcessoryIcon';

import { Header } from '@components/Header';
import { ImageSlider } from '@components/ImageSlider';
import { Accessory } from '@components/Accessory'; 
import { Button } from '@components/Button';

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
    About,
    Accessories,
    Footer
} from './styles';

interface Params { 
    car: CarDTO;
};

export function CarDetails () {

    const navigation = useNavigation();
    const route = useRoute();
    const { car } = route.params as Params;

    function handleConfirmRental(){
        navigation.navigate('Scheduling');
    };

    function handleBack(){
        navigation.goBack();
    };
    
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
                    car.accessories.map(accessoriy => {
                        return <Accessory 
                                    key={accessoriy.type}
                                    name={accessoriy.name} 
                                    icon={getAcessoryIcon(accessoriy.type)} 
                                />
                    })
                }               
            </Accessories>

            <About>
                {car.about}
            </About>

        </Content>
        
        <Footer>
            <Button 
                title="Escolher período do aluguel"
                onPress={handleConfirmRental}
            />
        </Footer>
        
    </Container>
    );
};

