import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Welcome from './components/Welcome';
import Projects from './components/Projects';
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

const App: React.FC = () => {
    const [showWelcome, setShowWelcome] = useState(true);

    const handleWelcomeComplete = () => {
        setShowWelcome(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <PageWrapper>
                <Background />
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
                        </ContentContainer>
                    )}
                </AnimatePresence>
            </PageWrapper>
        </ThemeProvider>
    );
};

export default App;
