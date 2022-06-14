import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Animated, { 
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler, 
    useAnimatedStyle, 
    useSharedValue 
} from 'react-native-reanimated';

import { CarDTO } from '@dtos/carDTO';
import { getAcessoryIcon } from '@utils/getAcessoryIcon';

import { ImageSlider } from '@components/ImageSlider';
import { Accessory } from '@components/Accessory'; 
import { Button } from '@components/Button';

import { 
    Brand, 
    CarImages, 
    Container, 
    Header,
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
import { StatusBar } from 'react-native';
import { BackButton } from '@components/BackButton';
import { useTheme } from 'styled-components';

interface Params { 
    car: CarDTO;
};

export function CarDetails () {
    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const { car } = route.params as Params;

    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
    });

    const statusBarHeight = getStatusBarHeight();
    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, statusBarHeight + 50],
                Extrapolate.CLAMP
            )}
    }); 

    const sliderCarStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            )}
    });
    

    function handleConfirmRental(){
        navigation.navigate('Scheduling', { car });
    };

    function handleBack(){
        navigation.goBack();
    };
    
    return (
    <Container>
        <StatusBar 
            barStyle='dark-content' 
            backgroundColor="transparent" 
            translucent
        />

        <Animated.View 
            style={[
                headerStyleAnimation, 
                styles.header,
                { backgroundColor: theme.colors.background_secondary }
            ]}
        >
            <Header>
                <BackButton onPress={handleBack} /> 
            </Header>

            <Animated.View style={sliderCarStyleAnimation}>
                <CarImages> 
                    <ImageSlider imagesUrl={car.photos} />            
                </CarImages>
            </Animated.View>

        </Animated.View>

        <Animated.ScrollView
            contentContainerStyle={{
                padding: 24,
                paddingTop: getStatusBarHeight() + 160
            }}
            showsVerticalScrollIndicator={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
        >
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

            <About>
                {car.about}
                {car.about}
                {car.about}
            </About>

        </Animated.ScrollView>
        
        <Footer>
            <Button 
                title="Escolher período do aluguel"
                onPress={handleConfirmRental}
            />
        </Footer>
        
    </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1,
    }
});

