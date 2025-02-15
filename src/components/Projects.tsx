import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '../styles/StyledComponents';

const ProjectsSection = styled.section`
    width: 100%;
    min-height: 100vh;
    padding: 100px 0;
<<<<<<< HEAD
    background: transparent;
    position: relative;
    overflow: visible;
    z-index: 2;
=======
    background: ${({ theme }) => theme.colors.background};
    position: relative;
    overflow: hidden;
>>>>>>> 0085b5437c39ac88e032f184515ffa638d5b049c
`;

const ProjectsContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 200px);
    gap: 3rem;
    position: relative;
<<<<<<< HEAD
    z-index: 2;
=======
    z-index: 1;
>>>>>>> 0085b5437c39ac88e032f184515ffa638d5b049c
`;

const SectionTitle = styled(motion.h2)`
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 2rem;
    background: linear-gradient(45deg, 
        ${({ theme }) => theme.colors.primary}, 
        ${({ theme }) => theme.colors.secondary}
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const ComingSoonCard = styled(motion.div)`
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 3rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    max-width: 600px;
    width: 90%;
`;

const ComingSoonTitle = styled.h3`
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
`;

const ComingSoonText = styled.p`
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    opacity: 0.8;
`;

const TechStack = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    justify-content: center;
    margin-top: 2rem;
`;

const TechTag = styled(motion.span)`
    padding: 0.5rem 1rem;
    border-radius: 20px;
    background: ${({ theme }) => theme.colors.primary}22;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1rem;
`;

const Projects: React.FC = () => {
    const techStack = ["React", "TypeScript", "Node.js", "Python", "Cybersecurity"];

    return (
        <ProjectsSection id="projects">
            <ProjectsContainer>
                <SectionTitle
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    Featured Projects
                </SectionTitle>
                <ComingSoonCard
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <ComingSoonTitle>Coming Soon</ComingSoonTitle>
                    <ComingSoonText>
                        Exciting projects are in the works! Stay tuned for a showcase of my latest work in development and cybersecurity.
                    </ComingSoonText>
                    <TechStack>
                        {techStack.map((tech, index) => (
                            <TechTag
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                {tech}
                            </TechTag>
                        ))}
                    </TechStack>
                </ComingSoonCard>
            </ProjectsContainer>
        </ProjectsSection>
    );
};

export default Projects; 