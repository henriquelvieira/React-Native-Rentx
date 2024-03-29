import React, { useEffect } from 'react';
import Animated, { 
    Extrapolate, 
    interpolate, 
    useAnimatedStyle, 
    useSharedValue, 
    withTiming,
    runOnJS
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import BrandSvg from '@assets/brand.svg';
import LogoSvg from '@assets/logo.svg';

import { Container } from './styles';


export function Splash () {
    const spashAnimation = useSharedValue(0);

    const navigation = useNavigation();

    const brandStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(spashAnimation.value, [0, 50], [1, 0]),
            transform: [
                {
                    translateX: interpolate(spashAnimation.value,
                        [0, 50],
                        [0, -50],
                        Extrapolate.CLAMP),
                }
            ],
        }
     });

    const logoStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(spashAnimation.value, [0, 25, 50], [0, .3, 1]),
            transform: [
                {
                    translateX: interpolate(spashAnimation.value,
                        [0, 50],
                        [-50, 0],
                        Extrapolate.CLAMP),
                }
            ],
        }
     });
     
     function startApp() {
        navigation.navigate('SignIn');
    };
     
    useEffect(() => {
        spashAnimation.value = withTiming(
            50, 
            {duration: 1000},
            () => {
                'worlet' 
                runOnJS(startApp)();
            }
        );

    }, []);

    return (
    <Container>
        <StatusBar 
            barStyle='light-content' 
            backgroundColor="transparent" 
            translucent
        />
        <Animated.View style={[brandStyle, {position: 'absolute'}]}>
            <BrandSvg width={80} height={59} />
        </Animated.View>

        <Animated.View style={[logoStyle, {position: 'absolute'}]}>
            <LogoSvg width={180} height={20} />
        </Animated.View>
        
    </Container>
    );
};