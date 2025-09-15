import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { GlobalStyles } from './styles/GlobalStyles';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import ThemeToggle from './components/ThemeToggle';
import ScrollToTop from './components/ScrollToTop';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const MainContent = styled(motion.div)`
    position: relative;
    z-index: 1;
    width: 100%;
    padding-top: 70px;
    padding-bottom: 0;
    margin-bottom: 0;
`;

const PageWrapper = styled.div`
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
`;

const ContentContainer = styled(motion.div)`
    width: 100%;
    background: ${({ theme }) => theme.colors.background};
`;

const RedesignMessage = styled(motion.div)`
    position: relative;
    width: 100%;
    padding: 1.5rem 1rem;
    text-align: center;
    background: ${({ theme }) => theme.colors.cardBackground};
    backdrop-filter: blur(20px);
    border-top: 1px solid ${({ theme }) => theme.colors.primary}20;
    margin-top: -2rem;
    margin-bottom: 0;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 2px;
        background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
        border-radius: 2px;
    }
    
    p {
        font-size: 1.2rem;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.text};
        margin: 0;
        letter-spacing: 0.5px;
        
        &::before {
            content: '🚧';
            margin-right: 0.5rem;
        }
        
        &::after {
            content: '🚧';
            margin-left: 0.5rem;
        }
    }
    
    @media (max-width: 768px) {
        padding: 1rem 1rem;
        margin-top: -1.5rem;
        
        p {
            font-size: 0.9rem;
        }
    }
`;

const HomePage: React.FC = () => (
    <MainContent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
            duration: 0.3,
            delay: 0.1,
            ease: "easeOut"
        }}
    >
        <Hero />
        <About />
        <Projects />
        <Contact />
        <RedesignMessage
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.6,
                delay: 0.8,
                ease: "easeOut"
            }}
        >
            <p>Pshhh!... A new look is coming...</p>
        </RedesignMessage>
    </MainContent>
);

const ProjectPage: React.FC = () => (
    <MainContent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
            duration: 0.3,
            delay: 0.1,
            ease: "easeOut"
        }}
    >
        <ProjectDetail />
    </MainContent>
);

const App: React.FC = () => {
    return (
        <ThemeContextProvider>
            {/* Use Vite provided BASE_URL so routes work when deployed under a subdirectory (e.g., GitHub Pages project site) */}
            <Router basename={import.meta.env.BASE_URL}>
                <ScrollToTop />
                <GlobalStyles />
                <PageWrapper>
                    <Background />
                    <ThemeToggle />
                    <ContentContainer
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut"
                        }}
                    >
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/project/:slug" element={<ProjectPage />} />
                        </Routes>
                    </ContentContainer>
                </PageWrapper>
            </Router>
        </ThemeContextProvider>
    );
};

export default App;
