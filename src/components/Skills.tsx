import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { portfolioData } from '../utils/data';
import { Container, GlassCard } from '../styles/StyledComponents';

const SkillsSection = styled.section`
    padding: 3rem 0;
    position: relative;
`;

const SectionTitle = styled(motion.h2)`
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
`;

const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    padding: 1rem;
`;

const SkillItem = styled(GlassCard)`
    h3 {
        font-size: 1.2rem;
        margin-bottom: 1rem;
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
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

    return (
        <SkillsSection id="skills">
            <Container>
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
                        <SkillItem
                            key={index}
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
                    ))}
                </SkillsGrid>
            </Container>
        </SkillsSection>
    );
};

export default Skills; 