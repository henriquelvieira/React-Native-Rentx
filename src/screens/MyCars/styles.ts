import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

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


export const Content = styled.ScrollView.attrs({
    contentContainerStyle: {
        padding: 24,
        alignItems: 'center',
    },
    showsVerticalScrollIndicator: false,
})`
    width: 100%;
`;