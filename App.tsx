import React from 'react';
import { StatusBar } from 'expo-status-bar';
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

import { Home } from '@screens/Home';

import theme from '@theme/theme';


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
          <StatusBar style="light" translucent backgroundColor="transparent" />
          <Home />
          
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};
