import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import TuggableLightBulb from './TuggableLightBulb';

const SwitchContainer = styled.div`
    position: fixed;
    top: 5rem;
    right: 1rem;
    z-index: 9999;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        top: 4rem;
        right: -2rem;
    }
`;

const ThemeToggle: React.FC = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    
    console.log('ThemeToggle rendered:', { isDarkMode });

    return (
        <SwitchContainer>
            <TuggableLightBulb 
                isOn={!isDarkMode} // Light bulb ON = light theme
                onToggle={toggleTheme}
                size={100}
            />
        </SwitchContainer>
    );
};

export default ThemeToggle;
