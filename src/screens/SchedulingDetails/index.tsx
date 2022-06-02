import React from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import { Header } from '@components/Header';
import { ImageSlider } from '@components/ImageSlider';
import { Accessory } from '@components/Accessory'; 
import { Button } from '@components/Button';

import speedSvg from '@assets/speed.svg';
import accelerationSvg from '@assets/acceleration.svg';
import forceSvg from '@assets/force.svg';
import gasolineSvg from '@assets/gasoline.svg';
import exchangeSvg from '@assets/exchange.svg';
import peopleSvg from '@assets/people.svg';

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
    About,
    Accessories,
    Footer,
    RentalPeriod,
    CalendarIcon
} from './styles';


export function SchedulingDetails () {
    return (
    <Container>
        
        <Header onPress={() => {}} />

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
            
            <Accessories>
                <Accessory name='380km/h' icon={speedSvg} />
                <Accessory name='3.2s' icon={accelerationSvg} />
                <Accessory name='800 HP' icon={forceSvg} />
                <Accessory name='Gasolina' icon={gasolineSvg} />
                <Accessory name='Auto' icon={exchangeSvg} />
                <Accessory name='2 pessoas' icon={peopleSvg} />                
            </Accessories>

            <RentalPeriod>
                <CalendarIcon>
                    <Feather 
                        name='calendar' 
                        size={RFValue(24)} 
                        color={theme.colors.shape}
                    />
                </CalendarIcon>

            </RentalPeriod>
        </Content>
        
        <Footer>
            <Button 
                title="Confirmar"
                onPress={()=>{}}
            />
        </Footer>
        
    </Container>
    );
};
