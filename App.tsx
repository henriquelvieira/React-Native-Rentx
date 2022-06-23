import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';
import { 
  useFonts, 
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';

import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';


import theme from '@theme/theme';
import { Routes } from '@routes/index';
import { AppProvider } from '@hooks/';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }; 

  return (
    <GestureHandlerRootView style={{ flex: 1 }} >
      <ThemeProvider theme={theme}>
        <AppProvider>
          <StatusBar 
                barStyle='light-content' 
                backgroundColor="transparent" 
                translucent
            />  
          <Routes />      
        </AppProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};
