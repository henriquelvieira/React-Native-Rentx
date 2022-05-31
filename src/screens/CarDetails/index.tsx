import React from 'react';
import { Text } from 'react-native';
import { BackButton } from '@components/BackButton';
import { ImageSlider } from '@components/ImageSlider';
import { 
    Brand, 
    CarImages, 
    Container, 
    Content, 
    Description, 
    Details, 
    Header, 
    Name, 
    Period, 
    Price, 
    Rent,
    About
} from './styles';


export function CarDetails () {
    return (
    <Container>
        <Header>
            <BackButton onPress={() => {}}/>
        </Header>

        <CarImages>
            <ImageSlider 
                imagesUrl={['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']} 
            />            
        </CarImages>

        <Content>
            <Details>
                <Description>
                    <Brand>Lamborghini</Brand>
                    <Name>Huracan</Name>
                </Description>

                <Rent>
                    <Period>Ao dia</Period>
                    <Price>R$ 580</Price>
                </Rent>

            </Details>

            <About>
                Este é automóvel desportivo. Surgiu do lendário
                touro de lide indultado na praça Real Maestranza de Sevilla. 
                É um belíssimo carro para quem gosta de acelerar.
            </About>
        </Content>
        
    </Container>
    );
};

