import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '../styles/StyledComponents';
import CertModal from './CertModal';
import HolographicCard from './HolographicCard';
import NetworkNodes from './NetworkNodes';

const AboutSection = styled.section`
    padding: 3rem 0;
    position: relative;
    overflow: hidden;
`;

const AboutContainer = styled(Container)`
    position: relative;
    z-index: 2;
`;

const SectionTitle = styled(motion.h2)`
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
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
            : `drop-shadow(0 0 10px ${theme.colors.primary}50)`
    };
`;

const AboutContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    position: relative;
    z-index: 2;
`;

const AboutText = styled.div`
    h3 {
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
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
                : 'drop-shadow(0 0 10px rgba(108, 99, 255, 0.5))'
        };
    }

    p {
        font-size: 1.1rem;
        line-height: 1.8;
        margin-bottom: 1.5rem;
        opacity: 0.95;
        color: ${({ theme }) => theme.colors.text};
        text-shadow: ${({ theme }) => 
            theme.colors.primary === '#FF6B35' 
                ? 'none' 
                : '0 0 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.6)'
        };
        font-weight: 450;
    }
`;

const TechStack = styled.div`
    margin-top: 2rem;
    
    h4 {
        font-size: 1.4rem;
        margin-bottom: 1rem;
        color: ${({ theme }) => theme.colors.primary};
    }

    .tech-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }

    .tech-item {
        background: ${({ theme }) => `${theme.colors.primary}15`};
        padding: 0.5rem 1rem;
        border-radius: 8px;
        text-align: center;
        font-size: 0.9rem;
        transition: all 0.3s ease;

        &:hover {
            background: ${({ theme }) => `${theme.colors.primary}30`};
            transform: translateY(-2px);
        }
    }
`;

const Certifications = styled.div`
    margin-top: 2rem;
    h4 {
        font-size: 1.4rem;
        margin-bottom: 1rem;
        color: ${({ theme }) => theme.colors.primary};
    }
    .cert-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-top: 1rem;
        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        }
    }
    .cert-item {
        background: ${({ theme }) => `${theme.colors.primary}15`};
        padding: 0.5rem 1rem;
        border-radius: 8px;
        text-align: center;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        &:hover {
            background: ${({ theme }) => `${theme.colors.primary}30`};
            transform: translateY(-2px);
        }
        img {
            max-width: 100%;
            border-radius: 8px;
            cursor: pointer;
        }
    }
`;

const About: React.FC = () => {
    const techStack = [
        'JavaScript', 'Kotlin', 'HTML5', 'Python', 'React', 'Node.js',
        'Flutter', 'OpenCV', 'MongoDB', 'TensorFlow', 'Docker', 'AWS',
        'Azure', 'Cloudflare', 'Vercel', 'GitHub'
    ];
    const certifications = [
        '/cert1.jpg' // Add your certification image paths here
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCert, setSelectedCert] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const openModal = (cert: string) => {
        setSelectedCert(cert);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCert('');
    };

    return (
        <AboutSection id="about">
            <NetworkNodes section="about" isVisible={true} />
            <AboutContainer>
                <SectionTitle
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    About Me
                </SectionTitle>
                <HolographicCard disableTilt={isMobile}>
                    <AboutContent
                        as={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <AboutText>
                            <h3>Student Coder & Cybersecurity Enthusiast</h3>
                            <p>
                                Hi there! I'm Karthik V K, a passionate student coder and cybersecurity enthusiast.
                                I create projects like phishing awareness tools and a plant disease identification website.
                            </p>
                            <p>
                                Currently pursuing BTech in Computer Science with a specialization in Cybersecurity at SRM Institute of Science and Technology.
                                I'm deeply interested in exploring technology and cybersecurity to make the digital world safer.
                            </p>
                            <p>
                                My projects combine creativity with technical skills, focusing on real-world applications
                                that can make a difference. Whether it's developing security tools or working on AI-powered
                                plant disease detection, I'm always eager to learn and innovate.
                            </p>
                        </AboutText>
                        <TechStack>
                            <h4>Tech Stack</h4>
                            <div className="tech-grid">
                                {techStack.map((tech, index) => (
                                    <motion.div
                                        key={tech}
                                        className="tech-item"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {tech}
                                    </motion.div>
                                ))}
                            </div>
                        </TechStack>
                        <Certifications>
                            <h4>My Certifications</h4>
                            <div className="cert-grid">
                                {certifications.map((cert, index) => (
                                    <motion.div
                                        key={index}
                                        className="cert-item"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <img src={cert} alt={`Certification ${index + 1}`} onClick={() => openModal(cert)} />
                                    </motion.div>
                                ))}
                            </div>
                        </Certifications>
                    </AboutContent>
                </HolographicCard>
            </AboutContainer>
            <CertModal isOpen={isModalOpen} onClose={closeModal} imgSrc={selectedCert} />
        </AboutSection>
    );
};

export default About;