import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
`;

export const Section = styled.section`
    padding: 5rem 0;
    position: relative;
    overflow: hidden;
`;

export const GlassCard = styled(motion.div)`
    background: ${({ theme }) => theme.colors.glass};
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 2rem;
`;

export const Button = styled(motion.button)<{ variant?: 'primary' | 'secondary' }>`
    padding: 1rem 2rem;
    border-radius: 30px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    background: ${({ theme, variant }) => 
        variant === 'secondary' ? 'transparent' : theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    border: ${({ theme, variant }) => 
        variant === 'secondary' ? `2px solid ${theme.colors.primary}` : 'none'};
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(108, 99, 255, 0.2);
    }
`;

export const GradientText = styled.h2`
    background: linear-gradient(45deg, 
        ${({ theme }) => theme.colors.primary}, 
        ${({ theme }) => theme.colors.secondary}
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 3rem;
    margin: 1rem 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 2rem;
    }
`;

export const GlitchText = styled.h1`
    font-size: 5rem;
    font-weight: 700;
    animation: glitch 5s infinite;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 3rem;
    }
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    padding: 1rem;
`; 