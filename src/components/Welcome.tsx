import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeContainer = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => 
        theme.colors.primary === '#FF6B35' 
            ? 'linear-gradient(135deg, #FFF4E6 0%, #FFE5CC 50%, #FFD6B3 100%)' 
            : 'linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 50%, #16213E 100%)'
    };
    z-index: 2000;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 50% 50%, 
            ${({ theme }) => theme.colors.primary}20 0%, 
            transparent 70%);
        animation: pulse 4s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.1); }
    }
`;

const SkipButton = styled(motion.button)`
    position: absolute;
    top: 2rem;
    right: 2rem;
    background: transparent;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    z-index: 20;
    
    &:hover {
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.background};
        transform: translateY(-2px);
        box-shadow: 0 5px 15px ${({ theme }) => theme.colors.primary}40;
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        top: 1rem;
        right: 1rem;
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
    }
`;

const WelcomeText = styled(motion.div)`
    text-align: center;
    width: 100%;
    max-width: 800px;
    position: relative;
    z-index: 10;
    
    h1 {
        font-size: 5rem;
        margin-bottom: 1rem;
        background: linear-gradient(45deg, 
            ${({ theme }) => theme.colors.primary}, 
            ${({ theme }) => theme.colors.secondary},
            ${({ theme }) => theme.colors.primary}
        );
        background-size: 200% 200%;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: gradientShift 3s ease-in-out infinite;
        font-weight: 800;
        letter-spacing: -2px;
        
        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            font-size: 3rem;
            letter-spacing: -1px;
        }
    }

    p {
        font-size: 1.8rem;
        margin-bottom: 2rem;
        color: ${({ theme }) => theme.colors.text};
        opacity: 0.9;
        font-weight: 500;

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            font-size: 1.4rem;
        }
    }
`;

const TypedText = styled(motion.div)`
    font-size: 1.4rem;
    font-family: 'Courier New', monospace;
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.9;
    margin-top: 2rem;
    background: ${({ theme }) => `${theme.colors.primary}15`};
    padding: 1rem 2rem;
    border-radius: 50px;
    border: 2px solid ${({ theme }) => `${theme.colors.primary}30`};
    backdrop-filter: blur(10px);
    display: inline-block;
    position: relative;
    
    &::before {
        content: '> ';
        color: ${({ theme }) => theme.colors.secondary};
        font-weight: bold;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 1.1rem;
        padding: 0.8rem 1.5rem;
    }
`;

interface WelcomeProps {
    onComplete: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onComplete }) => {
    const [typedText, setTypedText] = useState('');
    const [currentPhrase, setCurrentPhrase] = useState(0);
    
    const phrases = [
        'sudo-kk.pages.dev',
        'cybersecurity.expert',
        'fullstack.developer'
    ];

    // Enhanced typing effect with multiple phrases
    useEffect(() => {
        let currentIndex = 0;
        let isDeleting = false;
        const currentText = phrases[currentPhrase];
        
        const typingInterval = setInterval(() => {
            if (!isDeleting) {
                if (currentIndex < currentText.length) {
                    setTypedText(currentText.slice(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    setTimeout(() => isDeleting = true, 1500);
                }
            } else {
                if (currentIndex > 0) {
                    setTypedText(currentText.slice(0, currentIndex - 1));
                    currentIndex--;
                } else {
                    isDeleting = false;
                    setCurrentPhrase((prev) => (prev + 1) % phrases.length);
                }
            }
        }, isDeleting ? 50 : 120);

        return () => clearInterval(typingInterval);
    }, [currentPhrase]);

    // Auto-complete after extended time
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 6000); // Increased time for better experience

        return () => clearTimeout(timer);
    }, [onComplete]);

    const handleSkip = () => {
        onComplete();
    };

    // Enhanced animation variants
    const containerVariants = {
        initial: {
            opacity: 0,
            scale: 0.9
        },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1,
                ease: [0.43, 0.13, 0.23, 0.96],
                staggerChildren: 0.3
            }
        },
        exit: {
            opacity: 0,
            scale: 1.1,
            transition: {
                duration: 0.8,
                ease: [0.43, 0.13, 0.23, 0.96]
            }
        }
    };

    const textVariants = {
        initial: {
            opacity: 0,
            y: 50,
            rotateX: -15
        },
        animate: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.8,
                ease: [0.43, 0.13, 0.23, 0.96]
            }
        },
        exit: {
            opacity: 0,
            y: -30,
            rotateX: 15,
            transition: {
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96]
            }
        }
    };

    const subtextVariants = {
        initial: {
            opacity: 0,
            y: 30,
            scale: 0.8
        },
        animate: {
            opacity: 0.9,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.43, 0.13, 0.23, 0.96],
                delay: 0.3
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.4
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
            {/* Skip Button */}
            <SkipButton
                onClick={handleSkip}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
            >
                Skip Intro
            </SkipButton>

            {/* Main Content */}
            <WelcomeText>
                <motion.h1 variants={textVariants}>
                    Hey, I'm Karthik! 👋
                </motion.h1>
                <motion.p variants={subtextVariants}>
                    Welcome to my digital portfolio
                </motion.p>
                <TypedText
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                >
                    {typedText}
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                        style={{ marginLeft: '2px' }}
                    >
                        |
                    </motion.span>
                </TypedText>
            </WelcomeText>
        </WelcomeContainer>
    );
};

export default Welcome; 