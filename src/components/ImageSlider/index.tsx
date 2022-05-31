import React from 'react';
import { 
    CarImage, 
    CarImageWrapper, 
    Container, 
    ImageIndex, 
    ImageIndexes 
} from './styles';

interface ImageSliderProps {
    imagesUrl: string[];
};

export function ImageSlider ({
    imagesUrl
}: ImageSliderProps) {
    return (
    <Container>
        <ImageIndexes>
            <ImageIndex active={false} />
            <ImageIndex active={true} />
            <ImageIndex active={false} />
        </ImageIndexes>
    
        <CarImageWrapper>
            <CarImage 
                source={{uri: imagesUrl[0]}}
                resizeMode='contain'
            />
        </CarImageWrapper>
    </Container>
    );
};