import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const NavbarContainer = styled(motion.nav)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 10%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 70px;
    z-index: 1000;
    background: rgba(10, 10, 15, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 0.8rem 5%;
    }
`;

const Logo = styled.div`
    font-size: 1.8rem;
    font-weight: 700;
    background: linear-gradient(45deg, 
        ${({ theme }) => theme.colors.primary}, 
        ${({ theme }) => theme.colors.secondary}
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    cursor: pointer;
    transition: transform 0.3s ease;
    margin-right: auto;

    &:hover {
        transform: scale(1.05);
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 1.5rem;
    }
`;

const NavList = styled(motion.ul)<{ isOpen: boolean }>`
    display: flex;
    gap: 3rem;
    list-style: none;
    margin: 0;
    padding: 0;
    align-items: center;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        position: fixed;
        top: 0;
        right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
        height: 100vh;
        width: 70%;
        background: rgba(10, 10, 15, 0.95);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: right 0.3s ease;
        margin: 0;
        padding: 2rem;
        z-index: 999;
        gap: 2rem;
    }
`;

const NavItem = styled(motion.li)`
    a {
        color: ${({ theme }) => theme.colors.text};
        text-decoration: none;
        position: relative;
        padding: 0.5rem;
        font-size: 1rem;
        font-weight: 500;

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: ${({ theme }) => theme.colors.primary};
            transition: width 0.3s ease;
        }

        &:hover::after {
            width: 100%;
        }
    }
`;

const MenuToggle = styled.div`
    display: none;
    cursor: pointer;
    z-index: 1001;
    margin-left: 1rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        display: block;
    }

    svg {
        width: 30px;
        height: 30px;
        fill: ${({ theme }) => theme.colors.text};
    }
`;

const navItems = [
    { title: 'Home', href: '#home' },
    { title: 'About', href: '#about' },
    { title: 'Projects', href: '#projects' },
    { title: 'Skills', href: '#skills' },
    { title: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <NavbarContainer
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.2
            }}
        >
            <Logo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                sudo_kk
            </Logo>
            <MenuToggle onClick={toggleMenu} className="no-select">
                <svg viewBox="0 0 100 100">
                    <rect width="80" height="10" x="10" y="25" rx="5" />
                    <rect width="80" height="10" x="10" y="45" rx="5" />
                    <rect width="80" height="10" x="10" y="65" rx="5" />
                </svg>
            </MenuToggle>
            <AnimatePresence>
                <NavList isOpen={isOpen} className="no-select">
                    {navItems.map((item, index) => (
                        <NavItem
                            key={item.href}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 100
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <a href={item.href} onClick={closeMenu}>
                                {item.title}
                            </a>
                        </NavItem>
                    ))}
                </NavList>
            </AnimatePresence>
        </NavbarContainer>
    );
};

export default Navbar; 