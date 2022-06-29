import React, { useEffect, useState } from 'react';
import { BackHandler, StatusBar, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler';
import { synchronize } from '@nozbe/watermelondb/sync'
import { useNetInfo } from '@react-native-community/netinfo'

import { api } from '@services/api';
import { CarDTO } from '@dtos/carDTO';

import { database } from '@database/index'
import { Car as ModelCar } from '@database/model/Car'

import { Car } from '@components/Car';
import { LoadAnimation } from '@components/LoadAnimation';

import Logo from '@assets/logo.svg';

import { 
    CarList, 
    Container, 
    Header, 
    HeaderContent, 
    TotalCars
} from './styles';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home () {

    const navigation = useNavigation();
    const theme = useTheme();
    const netInfo = useNetInfo();

    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);
    const myCarsButtonStyle = useAnimatedStyle(() => {
            return {
                transform: [
                    { translateX: positionX.value },
                    { translateY: positionY.value }
                ]
            }
    });

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx: any) {
            //Guardar a posição inicial do Botão
            ctx.positionX = positionX.value
            ctx.positionY = positionY.value
        },
        onActive(event, ctx: any) {
            //Calcular a distância do movimento e reposicionar o botão
            positionX.value = ctx.positionX + event.translationX
            positionY.value = ctx.positionY + event.translationY
        },
        onEnd() {
            //Voltar o botão para a posição original
            positionX.value = withSpring(0)
            positionY.value = withSpring(0)
        }
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [cars, setCars] = useState<ModelCar[]>([]);

    async function offlineSyncronize() {
        await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) => {
                const response = await api
                    .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)

                const { changes, latestVersion } = response.data
                return { changes, timestamp: latestVersion }
            },
            pushChanges: async ({ changes }) => {
                const user = changes.users
                await api.post('/users/sync', user)
            }
        })
    }

    function handleCarDetails(car: CarDTO){
        navigation.navigate('CarDetails', { car });
    };

    function handleOpenMyCars(){
        navigation.navigate('MyCars');
    };

    async function fetchCars(isMounted: boolean){
        try {
            const carCollection = database.get<ModelCar>('cars')
            const cars = await carCollection.query().fetch()

            if (isMounted) {
                setCars(cars)
            }
        } catch (error) {
            console.log(error)
        } finally {
            if (isMounted) {
                setLoading(false)
            }
        }
    };

    useEffect(() => {
        let isMounted = true;

        fetchCars(isMounted);
        return () => {
            isMounted = false
        }
    }, []);

    useEffect(() => {
        if (netInfo.isConnected === true) {
            offlineSyncronize()
        }
    }, [netInfo.isConnected])

    // useEffect(() => {
    //     //Prevenir voltar para a tela de Splash
    //     BackHandler.addEventListener('hardwareBackPress', () => {
    //         return true;
    //     });
    // }, []);

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
                {
                    !loading && <TotalCars>{`Total de ${cars.length} carros`}</TotalCars> 
                }
                
            </HeaderContent>
        </Header>
        
        {loading ? 
        <LoadAnimation /> :
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

        {/* Botão flutuante */}
        {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View
                style={[
                    myCarsButtonStyle,
                    {
                        position: 'absolute',
                        bottom: 13,
                        right: 22
                    }
                ]}
            >
                <ButtonAnimated 
                    onPress={handleOpenMyCars} 
                    style={[styles.button, {backgroundColor: theme.colors.main}]}        
                >
                    <Ionicons 
                        name="ios-car-sport" 
                        size={32}
                        color={theme.colors.shape}
                    />
                </ButtonAnimated>
            </Animated.View>
        </PanGestureHandler> */}


    </Container>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})