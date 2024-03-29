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
import { CarDTO } from '@dtos/carDTO';


const { Navigator, Screen } = createStackNavigator();

export type RootStackParamList = {
    Home: undefined;
    CarDetails: undefined;
    Scheduling: { car: CarDTO };
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

export function AuthRoutes() {
    return (
        <Navigator 
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Splash"
        >
            <Screen name="Splash" component={Splash} />
            <Screen name="SignIn" component={SignIn} />
            <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
            <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
            <Screen name="Confirmation" component={Confirmation} />
        </Navigator>

    );
}