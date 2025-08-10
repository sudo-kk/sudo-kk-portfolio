import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { portfolioData } from '../utils/data';
import { Container, Section } from '../styles/StyledComponents';
import HolographicCard from './HolographicCard';
import NetworkNodes from './NetworkNodes';
import gifQHG from '/public/QHG.gif';

const ProjectsContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4rem;
    position: relative;
    z-index: 2;
    max-width: 1200px;
`;

const SectionTitle = styled(motion.h2)`
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
    background: linear-gradient(45deg, 
        ${({ theme }) => theme.colors.primary}, 
        ${({ theme }) => theme.colors.secondary}
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: none;
    filter: ${({ theme }) => 
        theme.colors.primary === '#FF6B35' 
            ? 'none' 
            : 'drop-shadow(0 0 15px rgba(108, 99, 255, 0.6))'
    };
    font-weight: 700;
    position: relative;
    z-index: 20;
`;

const ProjectCard = styled(motion.div)<{ reverse?: boolean }>`
    display: grid;
    grid-template-columns: ${({ reverse }) => reverse ? '1fr 1fr' : '1fr 1fr'};
    gap: 3rem;
    align-items: center;
    width: 100%;
    cursor: pointer;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        grid-template-columns: 1fr;
        gap: 2rem;
        ${({ reverse }) => reverse && `
            > *:first-child { order: 2; }
            > *:last-child { order: 1; }
        `}
    }
`;


const ProjectContent = styled.div<{ reverse?: boolean }>`
    order: ${({ reverse }) => reverse ? 1 : 2};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        order: 2;
        text-align: center;
    }
`;

const ProjectTitle = styled.h3`
    font-size: 2rem;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, 
        ${({ theme }) => theme.colors.primary}, 
        ${({ theme }) => theme.colors.secondary}
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: none;
    font-weight: 600;
    opacity: 1;
    filter: brightness(1.4);
`;

const ProjectDescription = styled.p`
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    opacity: 0.95;
    color: ${({ theme }) => theme.colors.text};
    text-shadow: ${({ theme }) => 
        theme.colors.primary === '#FF6B35' 
            ? 'none' 
            : '0 0 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.6)'
    };
    font-weight: 450;
`;

const ProjectTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-bottom: 2rem;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        justify-content: center;
    }
`;

const Tag = styled.span`
    padding: 0.4rem 1rem;
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

const ProjectButtons = styled.div`
    display: flex;
    gap: 1rem;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        justify-content: center;
    }
`;

const ProjectButton = styled(motion.a)`
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    
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
`;

const ComingSoonCard = styled.div`
    text-align: center;
    padding: 3rem 2rem;
`;

const ComingSoonTitle = styled.h3`
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: ${({ theme }) => 
        theme.colors.primary === '#FF6B35' 
            ? 'none' 
            : '0 0 15px rgba(0, 0, 0, 0.9), 0 0 25px rgba(108, 99, 255, 0.4)'
    };
    font-weight: 600;
`;

const ComingSoonText = styled.p`
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    opacity: 0.95;
    text-shadow: ${({ theme }) => 
        theme.colors.primary === '#FF6B35' 
            ? 'none' 
            : '0 0 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.6)'
    };
    font-weight: 450;
`;

const ComingSoonImage = styled.div`
    img {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 15px;
        opacity: 0.7;
    }
`;

const Projects: React.FC = () => {
    const navigate = useNavigate();
    const { works } = portfolioData;
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleProjectClick = (slug: string) => {
        // Multiple immediate scroll resets for maximum reliability
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Disable scroll restoration temporarily
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        
        // Navigate immediately
        navigate(`/project/${slug}`);
        
        // Force scroll again after navigation starts
        requestAnimationFrame(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        });
    };

    return (
        <Section id="projects">
            <NetworkNodes section="projects" isVisible={true} />
            <ProjectsContainer>
                <SectionTitle
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    My Projects
                </SectionTitle>
                
                {/* Plant Disease Detection Project */}
                <div onClick={() => handleProjectClick('plant-disease-detection')}>
                    <HolographicCard disableTilt={isMobile}>
                        <ProjectCard
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            whileHover={{ scale: 1.02 }}
                            reverse={false}
                        >
                            <ProjectContent reverse={false}>
                                <ProjectTitle>{works[0].title}</ProjectTitle>
                                <ProjectDescription>{works[0].description}</ProjectDescription>
                                <ProjectTags>
                                    {works[0].tags.map((tech: string, index: number) => (
                                        <Tag key={index}>{tech}</Tag>
                                    ))}
                                </ProjectTags>
                                <ProjectButtons>
                                    <ProjectButton
                                        className="primary"
                                        href={works[0].liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Live Demo
                                    </ProjectButton>
                                    <ProjectButton
                                        className="secondary"
                                        href={works[0].githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        View Code
                                    </ProjectButton>
                                </ProjectButtons>
                            </ProjectContent>
                        </ProjectCard>
                    </HolographicCard>
                </div>

                {/* Coming Soon Project */}
                <HolographicCard disableTilt={isMobile}>
                    <ProjectCard
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        reverse={true}
                    >
                        <ComingSoonImage>
                            <img src={gifQHG} alt="Coming Soon" />
                        </ComingSoonImage>
                        <ComingSoonCard>
                            <ComingSoonTitle>Coming Soon...</ComingSoonTitle>
                            <ComingSoonText>
                                Exciting new projects are in development! Stay tuned for innovative web applications featuring modern technologies and cutting-edge design.
                            </ComingSoonText>
                        </ComingSoonCard>
                    </ProjectCard>
                </HolographicCard>
            </ProjectsContainer>
        </Section>
    );
};

export default Projects; 