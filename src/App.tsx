import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { GlobalStyles } from './styles/GlobalStyles';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Welcome from './components/Welcome';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import ThemeToggle from './components/ThemeToggle';
import ScrollToTop from './components/ScrollToTop';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

const MainContent = styled(motion.div)`
    position: relative;
    z-index: 1;
    width: 100%;
    padding-top: 70px;
`;

const PageWrapper = styled.div`
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
`;

const ContentContainer = styled(motion.div)`
    width: 100%;
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.background};
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
        <Skills />
        <Contact />
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
    const [showWelcome, setShowWelcome] = useState(true);

    const handleWelcomeComplete = () => {
        setShowWelcome(false);
    };

    return (
        <ThemeContextProvider>
            <Router>
                <ScrollToTop />
                <GlobalStyles />
                <PageWrapper>
                    <Background />
                    <ThemeToggle />
                    <AnimatePresence mode="wait">
                        {showWelcome ? (
                            <Welcome key="welcome" onComplete={handleWelcomeComplete} />
                        ) : (
                            <ContentContainer
                                key="content"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeOut"
                                }}
                            >
                                <Navbar />
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/project/:slug" element={<ProjectPage />} />
                                </Routes>
                            </ContentContainer>
                        )}
                    </AnimatePresence>
                </PageWrapper>
            </Router>
        </ThemeContextProvider>
    );
};

export default App;
