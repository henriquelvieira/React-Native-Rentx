import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ConfirmButton } from '@components/ConfirmButton';

import LogoSvg from '@assets/logo_background_gray.svg';
import DoneSvg from '@assets/done.svg';

import { 
    Container,
    Content,
    Title,
    Message,
    Footer, 

} from './styles';

export interface ConfirmationProps {
    message: string;
    title: string;
    nextScreenRoute: string;
};


export function Confirmation () {
    const { width } = useWindowDimensions(); //get the width of the screen
    const navigation = useNavigation();

    const route = useRoute();
    const { title, message, nextScreenRoute } = route.params as ConfirmationProps;

    function handleConfirmRental(){
        navigation.navigate(nextScreenRoute);
    };

    return (
    <Container>
        <StatusBar 
            barStyle='light-content' 
            backgroundColor="transparent" 
            translucent
        />   
        <LogoSvg width={width} />

        <Content>
            <DoneSvg width={80} height={80} />
            <Title>{title}</Title>

            <Message>{message}</Message>
        </Content>

        <Footer>
            <ConfirmButton 
                title='OK' 
                onPress={handleConfirmRental}
            />
        </Footer>
        
    </Container>
    );
};