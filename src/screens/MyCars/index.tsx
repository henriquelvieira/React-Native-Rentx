import { BackButton } from '@components/BackButton';
import { Load } from '@components/Load';
import { CarDTO } from '@dtos/carDTO';
import { useNavigation } from '@react-navigation/native';
import { api } from '@services/api';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { Container, Content, Header, SubTitle, Title } from './styles';

export function MyCars () {
    const theme = useTheme();
    const navigation = useNavigation();
    
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);    

    function handleBack(){
        navigation.goBack();
    };

    async function fetchMyCars() {
        const user_id = 1;
        try {
            const response = await api.get(`/schedules_byuser/${user_id}`);
            setCars(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        fetchMyCars();

    }, []);


    return (
    <Container>
        <StatusBar 
            barStyle='light-content' 
            backgroundColor="transparent" 
            translucent
        />        
        <Header> 
            <BackButton 
                color={theme.colors.shape}
                onPress={handleBack}
            />  
            <Title>
                Seus agendamentos,{'\n'}
                estão aqui.{'\n'}
            </Title>
            
            <SubTitle>
                Conforto, segurança e praticidade.
            </SubTitle>
        </Header>

        <Content>
            {loading ? 
            <Load /> :
            null
            }            
        </Content>



        
    </Container>
    );
};