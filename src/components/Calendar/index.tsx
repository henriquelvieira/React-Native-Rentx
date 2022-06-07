import React from 'react';
import { 
    Calendar as CustomCalendar,
    LocaleConfig,
    CalendarProps
} from 'react-native-calendars';
import { ptBR } from './localeConfig';

import { Feather } from '@expo/vector-icons';
import { generateInterval } from './generateInterval';

import { useTheme } from 'styled-components';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDateProps {
    [date: string]: {
        color: string;
        textColor: string;
        disabled?:boolean;
        disableTouchEvent?: boolean;
    },
};

interface DayProps {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
};

function Calendar ({ 
    markedDates, 
    onDayPress 
}: CalendarProps) {

    const theme = useTheme();
    return (
    <CustomCalendar 
        firstDay={1}
        minDate={new Date().toString()}
        markingType='period'
        markedDates={markedDates}
        onDayPress={onDayPress}
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

export {
    Calendar,
    MarkedDateProps,
    DayProps,
    generateInterval
}