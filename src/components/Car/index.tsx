import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Car as ModelCar } from '@database/model/Car';
import { getAcessoryIcon } from '@utils/getAcessoryIcon';

import { 
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage,
} from './styles';

export interface CarProps extends RectButtonProps {
    data: ModelCar;
};

export function Car ({
    data,
    ...rest
}: CarProps) {
    const MotorIcon = getAcessoryIcon(data.fuel_type);

    return (
    <Container {...rest}>
        <Details>
            <Brand>{data.brand}</Brand>
            <Name>{data.name}</Name>

            <About>
                <Rent>
                    <Period>{data.period}</Period>
                    <Price>{`R$ ${data.price}`}</Price>
                </Rent>

                <Type>
                    <MotorIcon />
                </Type>
            </About>

        </Details>

        <CarImage 
            source={{ uri: data.thumbnail }} 
            resizeMode='contain'
            />
        
    </Container>
    );
};