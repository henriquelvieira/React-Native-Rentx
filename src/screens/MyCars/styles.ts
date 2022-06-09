import { FlatList, FlatListProps } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { CarDTO } from '@dtos/carDTO';
import { CarProps } from '.';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_secondary}; 
`;

export const Header = styled.View`
    width: 100%;
    height: 325px;
    
    background-color: ${({ theme }) => theme.colors.header}; 

    justify-content: center;
    padding: 25px;
    padding-top: ${getStatusBarHeight() + 30}px;
`;

export const Title = styled.View`
    font-size: ${RFValue(30)}px;    
    font-family: ${({ theme }) => theme.fonts.secondary_600}; 
    color: ${({ theme }) => theme.colors.shape};

    line-height: ${RFValue(34)}px;    
`;

export const SubTitle = styled.View`
    font-size: ${RFValue(15)}px;    
    font-family: ${({ theme }) => theme.fonts.secondary_400}; 
    color: ${({ theme }) => theme.colors.shape};

    line-height: ${RFValue(34)}px;    
`;

export const Content = styled.View`
    flex: 1;
    width: 100%;
    padding: 0 16px;
`;

export const Appointments = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;

    padding: 24px 0;
`;

export const AppointmentsTitle = styled.Text`
    font-size: ${RFValue(15)}px;    
    font-family: ${({ theme }) => theme.fonts.primary_400}; 
    color: ${({ theme }) => theme.colors.text};
`; 

export const AppointmentsQuantity = styled.Text`
    font-size: ${RFValue(15)}px;    
    font-family: ${({ theme }) => theme.fonts.secondary_500}; 
    color: ${({ theme }) => theme.colors.title};
`; 

export const CarList = styled(
    FlatList as new (props: FlatListProps<CarProps>) => FlatList<CarProps>
  ).attrs({
    ContentContainerStyle: {
        padding: 24
    },
    showsVerticalScrollIndicator: false
  })``;


  export const CarWrapper = styled.View`
    margin-bottom: 16px;
  `;

  export const RentalPeriod = styled.View`
    width: 100%;
    padding: 12px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: -10px;
    background-color: ${({ theme }) => theme.colors.background_secondary};
  `;

  export const Period = styled.Text`
    font-size: ${RFValue(10)}px;    
    font-family: ${({ theme }) => theme.fonts.secondary_500}; 
    color: ${({ theme }) => theme.colors.text_detail};
    margin-left: 24px;
  `;

  export const DateValueContainer = styled.View`
      flex-direction: row;
      align-items: center;
  `;

  export const DateValue  = styled.Text`
    font-size: ${RFValue(13)}px;    
    font-family: ${({ theme }) => theme.fonts.primary_400}; 
    color: ${({ theme }) => theme.colors.title};
    padding: 10px;
`;
