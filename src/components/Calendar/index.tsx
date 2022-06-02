import React from 'react';
import { 
    Calendar as CustomCalendar,
    LocaleConfig
} from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

LocaleConfig.locales['pt-br'] = {
    monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'],
    today: "Hoje"
  };
  LocaleConfig.defaultLocale = 'pt-br';

export function Calendar () {
    const theme = useTheme();
    return (
    <CustomCalendar 
        firstDay={1}
        minDate={new Date()}
        renderArrow={(direction) => 
            <Feather 
                size={24} 
                color={theme.colors.shape} 
                name={direction === 'left' ? 'chevron-left' : 'chevron-right'} 
            /> 
        }
        headerStyle={{
            backgroundColor: theme.colors.background_secondary,
            borderBottomWidth: 0.5,
            borderBottomColor: theme.colors.text_detail,
            paddingBottom: 10,
            marginBottom: 10
        }}
        theme={{
            textDayHeaderFontFamily: theme.fonts.primary_500,
            textDayHeaderFontSize: 10,
            textDayFontFamily: theme.fonts.primary_400,
            
            textMonthFontSize: 20,
            textMonthFontFamily: theme.fonts.secondary_600,
            monthTextColor: theme.colors.title,
            
            arrowStyle: {
                marginHorizontal: -15
            }
        }}
    
    />
        
    );
};