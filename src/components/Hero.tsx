import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '../styles/StyledComponents';
import NetworkNodes from './NetworkNodes';

const HeroSection = styled.section`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 40px 20px;
    overflow: hidden;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        min-height: calc(100vh - 70px);
        padding: 30px 16px;
    }
`;

const StyledContainer = styled(motion(Container))`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    position: relative;
    z-index: 2;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        flex-direction: column;
        gap: 3rem;
    }
`;

const HeroContent = styled(motion.div)`
    width: 100%;
    max-width: 600px;
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        gap: 16px;
        align-items: center;
        text-align: center;
    }
`;

const GifContainer = styled(motion.div)`
    border-radius: 20px;
    overflow: hidden;
    flex-shrink: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: fit;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 0px;
        height: 0px;
    }
`;

const Title = styled(motion.h1)`
    font-size: 5rem;
    font-weight: 700;
    animation: glitch 5s infinite;
    margin: 0;
    padding: 0;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.text};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 3rem;
        margin-bottom: 10px;
    }
`;

const Subtitle = styled(motion.h2)`
    font-size: 3rem;
    background: linear-gradient(45deg, 
        ${({ theme }) => theme.colors.primary}, 
        ${({ theme }) => theme.colors.secondary}
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
    padding: 0;
    line-height: 1.3;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 2rem;
        margin-bottom: 15px;
    }
`;

const TypingText = styled(motion.p)`
    font-size: 1.2rem;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    min-height: 3em;
    max-width: 600px;
    color: ${({ theme }) => theme.colors.text};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 1rem;
        padding: 0 10px;
    }
`;

const ButtonContainer = styled(motion.div)`
    display: flex;
    gap: 20px;
    margin-top: 10px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        flex-direction: column;
        width: 100%;
        padding: 0 20px;
        gap: 12px;
    }
`;

const SocialIconsContainer = styled(motion.div)`
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-top: 20px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        justify-content: center;
        margin-top: 16px;
    }
`;

const SocialIcon = styled(motion.a)`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => `${theme.colors.primary}20`};
    border: 1px solid ${({ theme }) => `${theme.colors.primary}30`};
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: all 0.3s ease;
    
    svg {
        width: 20px;
        height: 20px;
    }

    &:hover {
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.background};
        transform: translateY(-2px);
        box-shadow: 0 5px 15px ${({ theme }) => theme.colors.primary}40;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 36px;
        height: 36px;
        
        svg {
            width: 18px;
            height: 18px;
        }
    }
`;

const Button = styled(motion.a)`
    padding: 12px 32px;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 150px;

    &.primary {
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.background};
    }

    &.secondary {
        background: transparent;
        border: 2px solid ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.primary};
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px ${({ theme }) => theme.colors.primary}40;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 100%;
        padding: 10px 24px;
        font-size: 0.95rem;
    }
`;

const containerVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.3,
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const Hero: React.FC = () => {
    const [displayText, setDisplayText] = useState('');
    const phrases = [
        "Turning ideas into interactive experiences",
        "Did you know? 95% of cybersecurity breaches are due to human error",
        "The first computer virus was created in 1983",
        "The term 'bug' originated from an actual moth in a computer",
        "The average cost of a data breach is $3.86 million",
        "There's a new cyber attack every 39 seconds",
        "Cyberattacks are increasing globally, affecting individuals and organizations.",
        "Phishing tricks people into revealing sensitive personal information.",
        "Strong passwords and 2FA improve online account security.",
        "Public Wi-Fi risks hacking and data theft vulnerabilities.",
        "Software updates fix security flaws to block threats.",
        "Social engineering manipulates victims to access confidential data.",
        "Ransomware locks data, demanding payment for decryption keys.",
        "Data breaches expose sensitive information, risking identity theft.",
        "Did you know 90% of cyberattacks start with phishing?",
        "Can you imagine how quickly your data can be stolen online?",
        "What if your personal data is already on the dark web?",
        "Have you ever wondered who's watching your online activity?",
        "Did you know hackers can breach your device through Wi-Fi?",
        "Could a simple email cost you millions in damages?",
        "What if your smartphone has been compromised without you knowing?",
        "Do you realize how vulnerable your online accounts truly are?"

    ];
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const typingSpeed = 30;
    const deletingSpeed = 5;
    const pauseTime = 2000;

    const socials = [
        {
            name: 'GitHub',
            url: 'https://github.com/sudo-kk',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            )
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/karthik-v-k-b38170335',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
            )
        },
        {
            name: 'X',
            url: 'https://x.com/sudo__kk',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
            )
        },
        {
            name: 'Instagram',
            url: 'https://instagram.com/sudo_kk',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
            )
        }
    ];

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        
        const animateText = () => {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (!isDeleting) {
                if (displayText !== currentPhrase) {
                    timeout = setTimeout(() => {
                        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
                    }, typingSpeed);
                } else {
                    timeout = setTimeout(() => {
                        setIsDeleting(true);
                    }, pauseTime);
                }
            } else {
                if (displayText === '') {
                    setIsDeleting(false);
                    let nextIndex;
                    do {
                        nextIndex = Math.floor(Math.random() * phrases.length);
                    } while (nextIndex === currentPhraseIndex);
                    setCurrentPhraseIndex(nextIndex);
                } else {
                    timeout = setTimeout(() => {
                        setDisplayText(displayText.slice(0, -1));
                    }, deletingSpeed);
                }
            }
        };

        timeout = setTimeout(animateText, 50);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentPhraseIndex]);

    return (
        <HeroSection id="home">
            <NetworkNodes section="hero" isVisible={true} />
            <StyledContainer
                variants={containerVariants}
                initial="initial"
                animate="animate"
            >
                <HeroContent
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div variants={itemVariants}>
                        <Title
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            sudo_kk
                        </Title>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Subtitle
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Techie & Cyber Expert
                        </Subtitle>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <TypingText
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            {displayText}
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                                style={{ display: 'inline-block', marginLeft: '2px', borderRight: '2px solid currentColor' }}
                            >
                                &nbsp;
                            </motion.span>
                        </TypingText>
                    </motion.div>
                    <ButtonContainer
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Button
                            href="#about"
                            className="primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            About Me
                        </Button>
                    </ButtonContainer>
                    <SocialIconsContainer
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.0 }}
                    >
                        {socials.map((social, index) => (
                            <SocialIcon
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0 + index * 0.1 }}
                            >
                                {social.icon}
                            </SocialIcon>
                        ))}
                    </SocialIconsContainer>
                </HeroContent>
                <GifContainer
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                        opacity: 1, 
                        x: 0,
                        y: [-15, 15, -15]
                    }}
                    transition={{ 
                        opacity: { duration: 0.8, delay: 0.4 },
                        x: { duration: 0.8, delay: 0.4 },
                        y: {
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatType: "reverse"
                        }
                    }}
                >
                    <img src="/QHG.gif" alt="Animated GIF" />
                </GifContainer>
            </StyledContainer>
        </HeroSection>
    );
};

export default Hero;