import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { portfolioData } from '../utils/data';
import { Container, Section } from '../styles/StyledComponents';
import HolographicCard from './HolographicCard';
import NetworkNodes from './NetworkNodes';

const ProjectDetailContainer = styled(Container)`
    max-width: 1200px;
    padding: 2rem 0;
`;

const BackButton = styled(motion.button)`
    background: transparent;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    
    &:hover {
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.text};
        transform: translateX(-5px);
    }
`;

const ProjectHero = styled.div`
    text-align: center;
    margin-bottom: 4rem;
`;

const ProjectTitle = styled(motion.h1)`
    font-size: 3rem;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, 
        ${({ theme }) => theme.colors.primary}, 
        ${({ theme }) => theme.colors.secondary}
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: none;
    font-weight: 700;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 2.5rem;
    }
`;

const ProjectSubtitle = styled(motion.p)`
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto 2rem;
    line-height: 1.6;
    text-shadow: none;
`;

const ProjectInfo = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
`;

const ProjectDescription = styled.div`
    h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: ${({ theme }) => theme.colors.primary};
        text-shadow: none;
    }
    
    p {
        font-size: 1.1rem;
        line-height: 1.7;
        margin-bottom: 1.5rem;
        opacity: 0.95;
        text-shadow: none;
    }
`;

const ProjectMeta = styled.div`
    h3 {
        font-size: 1.3rem;
        margin-bottom: 1rem;
        color: ${({ theme }) => theme.colors.primary};
        text-shadow: none;
    }
`;

const TechStack = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-bottom: 2rem;
`;

const TechTag = styled(motion.span)`
    padding: 0.5rem 1rem;
    background: ${({ theme }) => `${theme.colors.primary}20`};
    color: ${({ theme }) => theme.colors.primary};
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    border: 1px solid ${({ theme }) => `${theme.colors.primary}30`};
    text-shadow: ${({ theme }) => 
        theme.colors.primary === '#FF6B35' 
            ? 'none' 
            : '0 0 8px rgba(0, 0, 0, 0.7)'
    };
`;

const ProjectLinks = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ProjectLink = styled(motion.a)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    
    &.primary {
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.text};
    }
    
    &.secondary {
        background: transparent;
        border: 2px solid ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.primary};
    }
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(108, 99, 255, 0.2);
    }
`;

// Mobile-specific components
const MobileFeatures = styled.div`
    display: block;
    margin-bottom: 3rem;
    padding: 0 1.5rem; // Add side padding for mobile
    
    @media (min-width: 769px) {
        display: none;
    }
    
    h3 {
        font-size: 1.8rem;
        margin-bottom: 2rem;
        color: ${({ theme }) => theme.colors.primary};
        text-align: center;
        text-shadow: ${({ theme }) => 
            theme.colors.primary === '#FF6B35' 
                ? 'none' 
                : '0 0 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(108, 99, 255, 0.4)'
        };
    }
`;

const MobileFeatureList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem; // Increased gap for better spacing
    margin: 0 auto;
    max-width: 100%;
`;

const MobileFeatureItem = styled.div`
    background: ${({ theme }) => `${theme.colors.primary}15`};
    border: 1px solid ${({ theme }) => `${theme.colors.primary}40`};
    border-radius: 20px;
    padding: 2rem 1.5rem;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    
    .feature-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.2rem;
        
        .emoji {
            font-size: 2.5rem;
        }
        
        h4 {
            font-size: 1.4rem;
            margin: 0;
            color: ${({ theme }) => theme.colors.primary};
            text-shadow: ${({ theme }) => 
                theme.colors.primary === '#FF6B35' 
                    ? 'none' 
                    : '0 0 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(108, 99, 255, 0.4)'
            };
            line-height: 1.3;
        }
    }
    
    p {
        font-size: 1.1rem;
        line-height: 1.6;
        opacity: 0.95;
        margin: 0;
        text-shadow: ${({ theme }) => 
            theme.colors.primary === '#FF6B35' 
                ? 'none' 
                : '0 0 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.6)'
        };
    }
`;

// Mobile-optimized layout components
const MobileLayout = styled.div`
    display: none;
    
    @media (max-width: 768px) {
        display: block;
    }
`;

const DesktopLayout = styled.div`
    display: block;
    
    @media (max-width: 768px) {
        display: none;
    }
`;

const MobileHeroSection = styled.div`
    text-align: center;
    margin-bottom: 2rem;
    padding: 0 1rem;
`;

const MobileProjectCard = styled.div`
    background: ${({ theme }) => `${theme.colors.primary}15`};
    border: 1px solid ${({ theme }) => `${theme.colors.primary}40`};
    border-radius: 20px;
    padding: 2rem 1.5rem;
    margin: 1.5rem 1rem;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    
    h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: ${({ theme }) => theme.colors.primary};
        text-shadow: ${({ theme }) => 
            theme.colors.primary === '#FF6B35' 
                ? 'none' 
                : '0 0 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(108, 99, 255, 0.4)'
        };
    }
    
    p {
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 1.5rem;
        opacity: 0.95;
        text-shadow: ${({ theme }) => 
            theme.colors.primary === '#FF6B35' 
                ? 'none' 
                : '0 0 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.6)'
        };
    }
`;

const MobileTechStack = styled.div`
    margin-top: 2rem;
    
    h4 {
        font-size: 1.3rem;
        margin-bottom: 1rem;
        color: ${({ theme }) => theme.colors.primary};
        text-shadow: ${({ theme }) => 
            theme.colors.primary === '#FF6B35' 
                ? 'none' 
                : '0 0 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(108, 99, 255, 0.4)'
        };
    }
`;

const DesktopHero = styled.div`
    display: block;
    
    @media (max-width: 768px) {
        display: none;
    }
`;

const MobileProjectLinks = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
`;

// Desktop-specific components
const DesktopFeatures = styled.div`
    display: block;
    margin-bottom: 3rem;
    
    @media (max-width: 768px) {
        display: none;
    }
    
    h3 {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        color: ${({ theme }) => theme.colors.primary};
        text-align: center;
        text-shadow: ${({ theme }) => 
            theme.colors.primary === '#FF6B35' 
                ? 'none' 
                : '0 0 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(108, 99, 255, 0.4)'
        };
    }
`;

const FeatureGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
`;

const FeatureCard = styled(motion.div)`
    padding: 2rem;
    text-align: left;
    
    .feature-header {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1rem;
        
        .bullet {
            color: ${({ theme }) => theme.colors.primary};
            font-size: 1.5rem;
            font-weight: bold;
            margin-top: 0.2rem;
            text-shadow: ${({ theme }) => 
                theme.colors.primary === '#FF6B35' 
                    ? 'none' 
                    : '0 0 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(108, 99, 255, 0.6)'
            };
        }
        
        h4 {
            font-size: 1.2rem;
            margin: 0;
            color: ${({ theme }) => theme.colors.primary};
            text-shadow: ${({ theme }) => 
                theme.colors.primary === '#FF6B35' 
                    ? 'none' 
                    : '0 0 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(108, 99, 255, 0.4)'
            };
        }
    }
    
    p {
        font-size: 1rem;
        line-height: 1.6;
        opacity: 0.9;
        margin: 0;
        padding-left: 2.5rem;
        text-shadow: ${({ theme }) => 
            theme.colors.primary === '#FF6B35' 
                ? 'none' 
                : '0 0 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.6)'
        };
    }
`;

const BulletPoint = styled(motion.span)`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 0.2rem;
    text-shadow: ${({ theme }) => 
        theme.colors.primary === '#FF6B35' 
            ? 'none' 
            : '0 0 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(108, 99, 255, 0.6)'
    };
`;

const FeatureTitle = styled(motion.h4)`
    font-size: 1.2rem;
    margin: 0;
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: ${({ theme }) => 
        theme.colors.primary === '#FF6B35' 
            ? 'none' 
            : '0 0 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(108, 99, 255, 0.4)'
    };
`;

const FeatureDescription = styled(motion.p)`
    font-size: 1rem;
    line-height: 1.6;
    opacity: 0.9;
    margin: 0;
    padding-left: 2.5rem;
    text-shadow: ${({ theme }) => 
        theme.colors.primary === '#FF6B35' 
            ? 'none' 
            : '0 0 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.6)'
    };
`;

// Enhanced animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const slideUpVariants = {
    hidden: { 
        opacity: 0, 
        y: 60,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94] // Custom cubic bezier
        }
    }
};

const slideInFromLeft = {
    hidden: { 
        opacity: 0, 
        x: -60,
        rotateY: -15
    },
    visible: {
        opacity: 1,
        x: 0,
        rotateY: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

const slideInFromRight = {
    hidden: { 
        opacity: 0, 
        x: 60,
        rotateY: 15
    },
    visible: {
        opacity: 1,
        x: 0,
        rotateY: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
    }
};



const ProjectDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { works } = portfolioData;
    
    const [isMobile, setIsMobile] = useState(false);
    
    // Ensure scroll to top immediately on component mount
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, []); // Run only on mount
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    const project = works.find((p: any) => p.slug === slug);
    
    const features = [
        {
            emoji: "🤖",
            title: "Google Gemini AI Integration",
            description: "Powered by Google Gemini AI's advanced image recognition technology for accurate plant disease identification and analysis."
        },
        {
            emoji: "⚡",
            title: "FlutterFlow Development",
            description: "Built using FlutterFlow's visual development platform, enabling rapid prototyping and seamless deployment of cross-platform applications."
        },
        {
            emoji: "📱",
            title: "Intelligent Image Analysis",
            description: "Upload plant images and receive instant AI-powered diagnostic results with detailed analysis and treatment recommendations."
        }
    ];
    
    if (!project) {
        return (
            <Section>
                <Container>
                    <h1>Project not found</h1>
                    <button onClick={() => navigate('/')}>Go back to home</button>
                </Container>
            </Section>
        );
    }

    return (
        <Section>
            <NetworkNodes section="projects" isVisible={true} />
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <ProjectDetailContainer>
                    <motion.div variants={slideUpVariants}>
                        <BackButton
                            onClick={() => navigate('/')}
                            whileHover={{ 
                                scale: 1.05,
                                x: -5,
                                boxShadow: "0 5px 15px rgba(108, 99, 255, 0.4)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            ← Back to Portfolio
                        </BackButton>
                    </motion.div>
                    
                    <DesktopHero>
                        <ProjectHero>
                            <motion.div variants={slideUpVariants}>
                                <ProjectTitle
                                    animate={floatingAnimation}
                                >
                                    {project.title}
                                </ProjectTitle>
                            </motion.div>
                            <motion.div variants={slideUpVariants}>
                                <ProjectSubtitle>
                                    {project.description}
                                </ProjectSubtitle>
                            </motion.div>
                        </ProjectHero>
                    </DesktopHero>

                {/* Desktop Layout */}
                <DesktopLayout>
                    <motion.div variants={slideInFromLeft}>
                        <HolographicCard disableTilt={isMobile}>
                            <ProjectInfo>
                                <ProjectDescription>
                                    <motion.h3
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6 }}
                                        viewport={{ once: true }}
                                    >
                                        About This Project
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        This plant disease identification web application leverages Google Gemini AI's advanced image recognition capabilities to help farmers, gardeners, and agricultural professionals quickly identify plant diseases through intelligent image analysis. Built with FlutterFlow, the app provides an intuitive interface for uploading plant images and receiving instant AI-powered diagnostic results.
                                    </motion.p>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        viewport={{ once: true }}
                                    >
                                        By integrating Google Gemini AI's powerful vision models, the application delivers highly accurate disease detection and analysis, helping users take timely action to protect their crops and maintain healthy plant growth.
                                    </motion.p>
                                </ProjectDescription>
                                
                                <motion.div variants={slideInFromRight}>
                                    <ProjectMeta>
                                        <motion.h3
                                            initial={{ opacity: 0, x: 30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6 }}
                                            viewport={{ once: true }}
                                        >
                                            Technologies
                                        </motion.h3>
                                        <TechStack>
                                            {project.tags.map((tech: string, index: number) => (
                                                <TechTag
                                                    key={index}
                                                    initial={{ opacity: 0, scale: 0.8, rotateZ: -10 }}
                                                    whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
                                                    whileHover={{ 
                                                        scale: 1.1, 
                                                        rotateZ: 5,
                                                        boxShadow: "0 5px 15px rgba(108, 99, 255, 0.3)"
                                                    }}
                                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                                    viewport={{ once: true }}
                                                >
                                                    {tech}
                                                </TechTag>
                                            ))}
                                        </TechStack>
                                        
                                        <ProjectLinks>
                                            <ProjectLink
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="primary"
                                                as={motion.a}
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                whileHover={{ 
                                                    scale: 1.05,
                                                    boxShadow: "0 8px 25px rgba(108, 99, 255, 0.4)",
                                                    y: -3
                                                }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ duration: 0.6, delay: 0.3 }}
                                                viewport={{ once: true }}
                                            >
                                                View Live Demo
                                            </ProjectLink>
                                            <ProjectLink
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="secondary"
                                                as={motion.a}
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                whileHover={{ 
                                                    scale: 1.05,
                                                    boxShadow: "0 8px 25px rgba(108, 99, 255, 0.2)",
                                                    y: -3
                                                }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ duration: 0.6, delay: 0.4 }}
                                                viewport={{ once: true }}
                                            >
                                                View Source Code
                                            </ProjectLink>
                                        </ProjectLinks>
                                    </ProjectMeta>
                                </motion.div>
                            </ProjectInfo>
                        </HolographicCard>
                    </motion.div>
                </DesktopLayout>

                {/* Mobile Layout */}
                <MobileLayout>
                    <MobileHeroSection>
                        <ProjectTitle
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {project.title}
                        </ProjectTitle>
                        <ProjectSubtitle
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {project.description}
                        </ProjectSubtitle>
                    </MobileHeroSection>

                    <MobileProjectCard>
                        <h3>About This Project</h3>
                        <p>
                            This plant disease identification web application leverages Google Gemini AI's advanced image recognition capabilities to help farmers, gardeners, and agricultural professionals quickly identify plant diseases through intelligent image analysis. Built with FlutterFlow, the app provides an intuitive interface for uploading plant images and receiving instant AI-powered diagnostic results.
                        </p>
                        <p>
                            By integrating Google Gemini AI's powerful vision models, the application delivers highly accurate disease detection and analysis, helping users take timely action to protect their crops and maintain healthy plant growth.
                        </p>

                        <MobileTechStack>
                            <h4>Technologies Used</h4>
                            <TechStack>
                                {project.tags.map((tech: string, index: number) => (
                                    <TechTag
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        {tech}
                                    </TechTag>
                                ))}
                            </TechStack>

                            <MobileProjectLinks>
                                <ProjectLink
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="primary"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    View Live Demo
                                </ProjectLink>
                                <ProjectLink
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="secondary"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    View Source Code
                                </ProjectLink>
                            </MobileProjectLinks>
                        </MobileTechStack>
                    </MobileProjectCard>
                </MobileLayout>

                {/* Mobile Features - Simple List */}
                <MobileFeatures>
                    <h3>Key Features</h3>
                    
                    <MobileFeatureList>
                        {features.map((feature, index) => (
                            <MobileFeatureItem key={index}>
                                <div className="feature-header">
                                    <span className="emoji">{feature.emoji}</span>
                                    <h4>{feature.title}</h4>
                                </div>
                                <p>{feature.description}</p>
                            </MobileFeatureItem>
                        ))}
                    </MobileFeatureList>
                </MobileFeatures>

                {/* Desktop Features - Grid Layout */}
                <DesktopFeatures>
                    <motion.h3
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        animate={floatingAnimation}
                    >
                        Key Features
                    </motion.h3>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <FeatureGrid>
                            <motion.div variants={slideInFromLeft}>
                                <HolographicCard disableTilt={isMobile}>
                                    <FeatureCard
                                        whileHover={{ 
                                            scale: 1.05,
                                            rotateY: 5,
                                            boxShadow: "0 15px 35px rgba(108, 99, 255, 0.3)"
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="feature-header">
                                            <BulletPoint
                                                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                                whileHover={{ 
                                                    scale: 1.3, 
                                                    rotate: 360,
                                                    color: "#FF6B6B"
                                                }}
                                                transition={{ 
                                                    duration: 0.6, 
                                                    delay: 0.1,
                                                    rotate: { duration: 0.8 }
                                                }}
                                                viewport={{ once: true }}
                                            >
                                                •
                                            </BulletPoint>
                                            <FeatureTitle
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                                viewport={{ once: true }}
                                            >
                                                Google Gemini AI Integration
                                            </FeatureTitle>
                                        </div>
                                        <FeatureDescription
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                            viewport={{ once: true }}
                                        >
                                            Powered by Google Gemini AI's advanced image recognition technology for accurate plant disease identification and analysis.
                                        </FeatureDescription>
                                    </FeatureCard>
                                </HolographicCard>
                            </motion.div>
                            
                            <motion.div variants={slideUpVariants}>
                                <HolographicCard disableTilt={isMobile}>
                                    <FeatureCard
                                        whileHover={{ 
                                            scale: 1.05,
                                            rotateY: -5,
                                            boxShadow: "0 15px 35px rgba(255, 107, 107, 0.3)"
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="feature-header">
                                            <BulletPoint
                                                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                                whileHover={{ 
                                                    scale: 1.3, 
                                                    rotate: 360,
                                                    color: "#4ECDC4"
                                                }}
                                                transition={{ 
                                                    duration: 0.6, 
                                                    delay: 0.2,
                                                    rotate: { duration: 0.8 }
                                                }}
                                                viewport={{ once: true }}
                                            >
                                                •
                                            </BulletPoint>
                                            <FeatureTitle
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.3 }}
                                                viewport={{ once: true }}
                                            >
                                                FlutterFlow Development
                                            </FeatureTitle>
                                        </div>
                                        <FeatureDescription
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.4 }}
                                            viewport={{ once: true }}
                                        >
                                            Built using FlutterFlow's visual development platform, enabling rapid prototyping and seamless deployment of cross-platform applications.
                                        </FeatureDescription>
                                    </FeatureCard>
                                </HolographicCard>
                            </motion.div>
                            
                            <motion.div variants={slideInFromRight}>
                                <HolographicCard disableTilt={isMobile}>
                                    <FeatureCard
                                        whileHover={{ 
                                            scale: 1.05,
                                            rotateY: 5,
                                            boxShadow: "0 15px 35px rgba(69, 183, 209, 0.3)"
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="feature-header">
                                            <BulletPoint
                                                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                                whileHover={{ 
                                                    scale: 1.3, 
                                                    rotate: 360,
                                                    color: "#45B7D1"
                                                }}
                                                transition={{ 
                                                    duration: 0.6, 
                                                    delay: 0.3,
                                                    rotate: { duration: 0.8 }
                                                }}
                                                viewport={{ once: true }}
                                            >
                                                •
                                            </BulletPoint>
                                            <FeatureTitle
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.4 }}
                                                viewport={{ once: true }}
                                            >
                                                Intelligent Image Analysis
                                            </FeatureTitle>
                                        </div>
                                        <FeatureDescription
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.5 }}
                                            viewport={{ once: true }}
                                        >
                                            Upload plant images and receive instant AI-powered diagnostic results with detailed analysis and treatment recommendations.
                                        </FeatureDescription>
                                    </FeatureCard>
                                </HolographicCard>
                            </motion.div>
                        </FeatureGrid>
                    </motion.div>
                </DesktopFeatures>
                </ProjectDetailContainer>
            </motion.div>
        </Section>
    );
};

export default ProjectDetail;
