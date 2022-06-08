import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '@screens/Home';
import { CarDetails } from '@screens/CarDetails';
import { Scheduling } from '@screens/Scheduling';
import { SchedulingDetails } from '@screens/SchedulingDetails';
import { SchedulingComplete } from '@screens/SchedulingComplete';
import { MyCars } from '@screens/MyCars';

const { Navigator, Screen } = createStackNavigator();

export type RootStackParamList = {
    Home: undefined;
    CarDetails: undefined;
    Scheduling: undefined;
    SchedulingDetails: undefined;
    SchedulingComplete: undefined;
    MyCars: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList{}
    }
};

export function StackRoutes() {
    return (
        <Navigator 
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen name="Home" component={Home} />
            <Screen name="CarDetails" component={CarDetails} />
            <Screen name="Scheduling" component={Scheduling} />
            <Screen name="SchedulingDetails" component={SchedulingDetails} />
            <Screen name="SchedulingComplete" component={SchedulingComplete} />
            <Screen name="MyCars" component={MyCars} />
        </Navigator>

    );
}