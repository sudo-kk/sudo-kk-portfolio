import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { portfolioData } from '../utils/data';
import { Container, GlassCard, Grid } from '../styles/StyledComponents';

const WorkSection = styled.section`
    padding: 5rem 0;
    position: relative;
`;

const SectionTitle = styled(motion.h2)`
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
`;

const WorkItem = styled(GlassCard)`
    overflow: hidden;
    transition: transform 0.3s ease;

    img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 10px;
        margin-bottom: 1rem;
    }

    h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }

    p {
        color: ${({ theme }) => theme.colors.text};
        opacity: 0.8;
        margin-bottom: 1rem;
    }
`;

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
`;

const Tag = styled(motion.span)`
    background: ${({ theme }) => theme.colors.primary}33;
    color: ${({ theme }) => theme.colors.text};
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.9rem;
`;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
};

const Work: React.FC = () => {
    return (
        <WorkSection id="work">
            <Container>
                <SectionTitle
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Selected Work
                </SectionTitle>
                <Grid
                    as={motion.div}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {portfolioData.works.map((work, index) => (
                        <WorkItem
                            key={index}
                            as={motion.div}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <img src={work.image} alt={work.title} />
                            <h3>{work.title}</h3>
                            <p>{work.description}</p>
                            <Tags>
                                {work.tags.map((tag, tagIndex) => (
                                    <Tag
                                        key={tagIndex}
                                        as={motion.span}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {tag}
                                    </Tag>
                                ))}
                            </Tags>
                        </WorkItem>
                    ))}
                </Grid>
            </Container>
        </WorkSection>
    );
};

export default Work; 