import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList, FlatListProps } from 'react-native';
import { Car as ModelCar } from '@database/model/Car'
// import { RectButton } from 'react-native-gesture-handler';


export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_primary};    
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(113)}px;
    background-color: ${({ theme }) => theme.colors.header};
    justify-content: flex-end;
    padding: 32px 24px;
`;

export const HeaderContent = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const TotalCars = styled.Text`
    font-size: ${RFValue(15)}px;    
    font-family: ${({ theme }) => theme.fonts.primary_400}; 
    color: ${({ theme }) => theme.colors.text};
`;

export const CarList = styled(
    FlatList as new (props: FlatListProps<ModelCar>) => FlatList<ModelCar>
  ).attrs({
    ContentContainerStyle: {
        padding: 24
    },
    showsVerticalScrollIndicator: false
  })``;

// export const MyCarButton = styled(RectButton)`
//     width: 60px;
//     height: 60px;

//     justify-content: center;
//     align-items: center;

//     border-radius: 30px;

//     position: absolute;
//     bottom: 13px;
//     right: 22px;


//     background-color: ${({ theme }) => theme.colors.main};

// `;  