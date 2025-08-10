import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { portfolioData } from '../utils/data';
import { Container } from '../styles/StyledComponents';
import HolographicCard from './HolographicCard';
import NetworkNodes from './NetworkNodes';

const SkillsSection = styled.section`
    padding: 3rem 0;
    position: relative;
    overflow: hidden;
`;

const SkillsContainer = styled(Container)`
    position: relative;
    z-index: 2;
`;

const SectionTitle = styled(motion.h2)`
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    text-shadow: ${({ theme }) => 
        theme.colors.primary === '#FF6B35' 
            ? 'none' 
            : '0 0 15px rgba(0, 0, 0, 0.9), 0 0 25px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 0, 0, 0.5)'
    };
    font-weight: 700;
    position: relative;
    z-index: 20;
`;

const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    padding: 1rem;
    position: relative;
    z-index: 2;
`;

const SkillItem = styled.div`
    h3 {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        text-shadow: ${({ theme }) => 
            theme.colors.primary === '#FF6B35' 
                ? 'none' 
                : '0 0 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)'
        };
        font-weight: 600;
    }
`;

const SkillBar = styled.div`
    width: 100%;
    height: 10px;
    background: ${({ theme }) => theme.colors.glass};
    border-radius: 5px;
    overflow: hidden;
    position: relative;
`;

const SkillProgress = styled(motion.div)<{ level: number }>`
    height: 100%;
    background: linear-gradient(90deg, 
        ${({ theme }) => theme.colors.primary}, 
        ${({ theme }) => theme.colors.secondary}
    );
    border-radius: 5px;
    width: ${({ level }) => level}%;
`;

const Skills: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <SkillsSection id="skills">
            <NetworkNodes section="skills" isVisible={true} />
            <SkillsContainer>
                <SectionTitle
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Skills & Expertise
                </SectionTitle>
                <SkillsGrid>
                    {portfolioData.skills.map((skill, index) => (
                        <HolographicCard key={index} disableTilt={isMobile}>
                            <SkillItem
                                as={motion.div}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h3>{skill.name}</h3>
                                <SkillBar>
                                    <SkillProgress
                                        level={skill.level}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ 
                                            duration: 1,
                                            ease: "easeOut",
                                            delay: index * 0.2
                                        }}
                                    />
                                </SkillBar>
                            </SkillItem>
                        </HolographicCard>
                    ))}
                </SkillsGrid>
            </SkillsContainer>
        </SkillsSection>
    );
};

export default Skills; 