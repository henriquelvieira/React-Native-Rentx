import React from 'react';

import { BackButton } from '@components/BackButton';
import { Container } from './styles';

interface HeaderProps {
    onPress: () => void;
};

export function Header ({
    onPress
}: HeaderProps) {
    return (
    <Container>
        <BackButton 
            onPress={onPress}
        />        
    </Container>
    );
};