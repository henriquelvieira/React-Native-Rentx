import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '@screens/Home';
import { MyCars } from '@screens/MyCars';


const { Navigator, Screen } = createBottomTabNavigator();

export type RootStackParamList = {
    Home: undefined;
    Profile: undefined;
    MyCars: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList{}
    }
};

export function AppTabRoutes() {
    return (
        <Navigator>
            <Screen name="Home" component={Home} />
            <Screen name="Profile" component={Home} />
            <Screen name="MyCars" component={MyCars} />
        </Navigator>

    );
}