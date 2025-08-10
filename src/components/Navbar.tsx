import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const NavbarContainer = styled(motion.nav)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    position: fixed;
    top: 20px;
    left: 2rem;
    right: 2rem;
    width: auto;
    max-width: none;
    height: 60px;
    z-index: 1000;
    
    /* Enhanced Glassy Effect */
    background: ${({ theme }) => 
        theme.colors.primary === '#FF6B35' 
            ? 'rgba(255, 244, 230, 0.15)' 
            : 'rgba(10, 10, 15, 0.25)'
    };
    backdrop-filter: blur(20px) saturate(1.8);
    -webkit-backdrop-filter: blur(20px) saturate(1.8);
    
    border: 1px solid ${({ theme }) => 
        theme.colors.primary === '#FF6B35'
            ? 'rgba(255, 107, 53, 0.3)'
            : 'rgba(255, 255, 255, 0.18)'
    };
    border-radius: 50px;
    
    /* Enhanced Shadow */
    box-shadow: 
        0 8px 32px ${({ theme }) => theme.colors.primary}15,
        0 4px 16px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);

    /* Responsive Design */
    @media (max-width: 1280px) {
        left: 1.5rem;
        right: 1.5rem;
        padding: 0.8rem 1.5rem;
    }

    @media (max-width: 768px) {
        top: 15px;
        left: 1rem;
        right: 1rem;
        padding: 0.6rem 1rem;
        height: 50px;
        border-radius: 25px;
    }

    @media (max-width: 480px) {
        top: 10px;
        left: 0.5rem;
        right: 0.5rem;
        padding: 0.5rem 0.8rem;
        height: 45px;
        border-radius: 22px;
    }

    /* Hover Effects */
    transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    
    &:hover {
        background: ${({ theme }) => 
            theme.colors.primary === '#FF6B35' 
                ? 'rgba(255, 244, 230, 0.25)' 
                : 'rgba(10, 10, 15, 0.35)'
        };
        border-color: ${({ theme }) => 
            theme.colors.primary === '#FF6B35'
                ? 'rgba(255, 107, 53, 0.5)'
                : 'rgba(255, 255, 255, 0.25)'
        };
        box-shadow: 
            0 12px 40px ${({ theme }) => theme.colors.primary}20,
            0 6px 20px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
    }
`;

const Logo = styled.div`
    font-size: 1.6rem;
    font-weight: 800;
    background: linear-gradient(135deg, 
        ${({ theme }) => theme.colors.primary}, 
        ${({ theme }) => theme.colors.secondary}
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    margin-right: auto;
    position: relative;
    
    /* Glass text effect */
    text-shadow: 0 0 20px rgba(108, 99, 255, 0.3);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));

    &:hover {
        transform: scale(1.05);
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
        text-shadow: 0 0 25px rgba(108, 99, 255, 0.5);
    }

    /* Responsive scaling */
    @media (max-width: 768px) {
        font-size: 1.4rem;
    }

    @media (max-width: 480px) {
        font-size: 1.2rem;
    }
`;

const NavList = styled(motion.ul)<{ isOpen: boolean }>`
    display: flex;
    gap: 2.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
    align-items: center;

    @media (max-width: 768px) {
        position: fixed;
        top: 80px;
        right: ${({ isOpen }) => (isOpen ? '1rem' : '-100%')};
        width: calc(100% - 2rem);
        max-width: 300px;
        
        /* Enhanced Glass Mobile Menu */
        background: ${({ theme }) => 
            theme.colors.primary === '#FF6B35' 
                ? 'rgba(255, 244, 230, 0.2)' 
                : 'rgba(10, 10, 15, 0.3)'
        };
        backdrop-filter: blur(25px) saturate(2);
        -webkit-backdrop-filter: blur(25px) saturate(2);
        
        border: 1px solid ${({ theme }) => 
            theme.colors.primary === '#FF6B35'
                ? 'rgba(255, 107, 53, 0.3)'
                : 'rgba(255, 255, 255, 0.2)'
        };
        border-radius: 20px;
        
        box-shadow: 
            0 15px 35px ${({ theme }) => theme.colors.primary}15,
            0 8px 20px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
            
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
        margin: 0;
        padding: 2rem 1rem;
        z-index: 999;
        gap: 1.5rem;
    }

    @media (max-width: 480px) {
        top: 65px;
        padding: 1.5rem 0.8rem;
        gap: 1.2rem;
        border-radius: 15px;
    }
`;

const NavItem = styled(motion.li)`
    a {
        color: ${({ theme }) => theme.colors.text};
        text-decoration: none;
        position: relative;
        padding: 0.6rem 1.2rem;
        font-size: 0.95rem;
        font-weight: 600;
        border-radius: 25px;
        transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
        backdrop-filter: blur(10px);
        letter-spacing: 0.5px;
        
        /* Glass button effect on hover */
        &:hover {
            background: ${({ theme }) => 
                theme.colors.primary === '#FF6B35' 
                    ? 'rgba(255, 107, 53, 0.15)' 
                    : 'rgba(108, 99, 255, 0.15)'
            };
            
            box-shadow: 
                0 4px 15px ${({ theme }) => theme.colors.primary}20,
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
                
            border: 1px solid ${({ theme }) => 
                theme.colors.primary === '#FF6B35'
                    ? 'rgba(255, 107, 53, 0.3)'
                    : 'rgba(108, 99, 255, 0.3)'
            };
            
            transform: translateY(-1px);
            color: ${({ theme }) => theme.colors.primary};
        }

        &:active {
            transform: translateY(0);
        }
    }

    /* Mobile specific styling */
    @media (max-width: 768px) {
        width: 100%;
        
        a {
            display: block;
            text-align: center;
            padding: 0.8rem 1.5rem;
            font-size: 1rem;
            width: 100%;
            
            &:hover {
                background: ${({ theme }) => 
                    theme.colors.primary === '#FF6B35' 
                        ? 'rgba(255, 107, 53, 0.2)' 
                        : 'rgba(108, 99, 255, 0.2)'
                };
            }
        }
    }

    @media (max-width: 480px) {
        a {
            padding: 0.7rem 1.2rem;
            font-size: 0.9rem;
        }
    }
`;

const MenuToggle = styled.div`
    display: none;
    cursor: pointer;
    z-index: 1001;
    margin-left: 1rem;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);

    @media (max-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
        
        /* Glass button effect */
        background: ${({ theme }) => 
            theme.colors.primary === '#FF6B35' 
                ? 'rgba(255, 107, 53, 0.1)' 
                : 'rgba(108, 99, 255, 0.1)'
        };
        
        border: 1px solid ${({ theme }) => 
            theme.colors.primary === '#FF6B35'
                ? 'rgba(255, 107, 53, 0.2)'
                : 'rgba(108, 99, 255, 0.2)'
        };
        
        &:hover {
            background: ${({ theme }) => 
                theme.colors.primary === '#FF6B35' 
                    ? 'rgba(255, 107, 53, 0.2)' 
                    : 'rgba(108, 99, 255, 0.2)'
            };
            transform: scale(1.05);
            box-shadow: 0 4px 15px ${({ theme }) => theme.colors.primary}20;
        }

        &:active {
            transform: scale(0.95);
        }
    }

    svg {
        width: 24px;
        height: 24px;
        fill: ${({ theme }) => theme.colors.text};
        transition: transform 0.3s ease;
        
        @media (max-width: 480px) {
            width: 20px;
            height: 20px;
        }
    }

    &:hover svg {
        transform: rotate(90deg);
    }
`;

const navItems = [
    { title: 'Home', href: '#home' },
    { title: 'About', href: '#about' },
    { title: 'Projects', href: '#projects' },
    { title: 'Skills', href: '#skills' },
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
                Karthik V K
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