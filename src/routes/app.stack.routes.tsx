import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '@screens/Home';
import { CarDetails } from '@screens/CarDetails';
import { Scheduling } from '@screens/Scheduling';
import { SchedulingDetails } from '@screens/SchedulingDetails';
import { Confirmation, ConfirmationProps } from '@screens/Confirmation';
import { MyCars } from '@screens/MyCars';
import { Splash } from '@screens/Splash';
import { SignIn } from '@screens/SignIn';
import { SignUpFirstStep } from '@screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep, UserDTO } from '@screens/SignUp/SignUpSecondStep';
import { Car as ModelCar } from '@database/model/Car';


const { Navigator, Screen } = createStackNavigator();

export type RootStackParamList = {
    Home: undefined;
    CarDetails: undefined;
    Scheduling: { car: ModelCar };
    SchedulingDetails: undefined;
    Confirmation: ConfirmationProps;
    MyCars: undefined;
    SignIn: undefined;
    SignUpFirstStep: undefined;
    SignUpSecondStep: UserDTO;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList{}
    }
};

export function AppStackRoutes() {
    return (
        <Navigator 
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Home"
        >
            <Screen 
                name="Home" 
                component={Home} 
                options={{
                    gestureEnabled: false
                }}
            />
            <Screen name="CarDetails" component={CarDetails} />
            <Screen name="Scheduling" component={Scheduling} />
            <Screen name="SchedulingDetails" component={SchedulingDetails} />
            <Screen name="Confirmation" component={Confirmation} />
            <Screen name="MyCars" component={MyCars} />
        </Navigator>

    );
}