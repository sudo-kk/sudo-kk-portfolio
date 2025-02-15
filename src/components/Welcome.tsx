import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const WelcomeContainer = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.colors.background};
    z-index: 2000;
`;

const WelcomeText = styled(motion.div)`
    text-align: center;
    width: 100%;
    max-width: 800px;
    h1 {
        font-size: 4rem;
        margin-bottom: 1rem;
        background: linear-gradient(45deg, 
            ${({ theme }) => theme.colors.primary}, 
            ${({ theme }) => theme.colors.secondary}
        );
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        opacity: 0;
        transform: translateY(20px);

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            font-size: 2.5rem;
        }
    }

    p {
        font-size: 1.5rem;
        opacity: 0;
        transform: translateY(20px);

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            font-size: 1.2rem;
        }
    }
`;

const TypedText = styled(motion.p)`
    font-size: 1.2rem;
    font-family: monospace;
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.9;
    margin-top: 1rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 1rem;
    }
`;

interface WelcomeProps {
    onComplete: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onComplete }) => {
    const [typedText, setTypedText] = useState('');
    const fullText = 'test10101.pages.dev';

    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex < fullText.length) {
                setTypedText(fullText.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    const containerVariants = {
        initial: {
            opacity: 0,
            scale: 0.98
        },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.43, 0.13, 0.23, 0.96]
            }
        },
        exit: {
            opacity: 0,
            scale: 1.02,
            transition: {
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96]
            }
        }
    };

    const textVariants = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96],
                delay: 0.05
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.4,
                ease: [0.43, 0.13, 0.23, 0.96]
            }
        }
    };

    const subtextVariants = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 0.8,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96],
                delay: 0.1
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <WelcomeContainer
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <WelcomeText>
                <motion.h1
                    variants={textVariants}
                >
                    Welcome to my website
                </motion.h1>
                <motion.p
                    variants={subtextVariants}
                >
                    Let's explore together
                </motion.p>
                <TypedText
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    {typedText}
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                    >
                        |
                    </motion.span>
                </TypedText>
            </WelcomeText>
        </WelcomeContainer>
    );
};

export default Welcome; 