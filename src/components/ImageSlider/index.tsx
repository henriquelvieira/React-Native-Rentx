import { Bullet } from '@components/Bullet';
import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { 
    CarImage, 
    CarImageWrapper, 
    Container, 
    ImageIndexes 
} from './styles';

interface ImageSliderProps {
    imagesUrl: {
        id: string;
        photo: string;
    }[];
};

interface ChangeImageProps {
    viewableItems: ViewToken[];
    changed: ViewToken[];
};

export function ImageSlider ({
    imagesUrl
}: ImageSliderProps) {
    const [imageIndex, setImageIndex] = useState(0);

    const indexChanged = useRef((info: ChangeImageProps) => {
        const index = info.viewableItems[0].index!;
        setImageIndex(index);
    });

    return (
    <Container>
        <ImageIndexes>
            {
                imagesUrl.map((item, index) => (
                    <Bullet 
                        key={item.id} 
                        active={index === imageIndex}
                    />)
                )
            }
        </ImageIndexes>
    
        <FlatList 
            data={imagesUrl}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <CarImageWrapper>
                    <CarImage 
                        source={{uri: item.photo}}
                        resizeMode='contain'
                    />
                </CarImageWrapper>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={indexChanged.current}
        />
    </Container>
    );
};