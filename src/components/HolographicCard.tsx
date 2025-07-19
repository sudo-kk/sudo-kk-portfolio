import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CardContainer = styled(motion.div)`
    position: relative;
    perspective: 1000px;
    width: 100%;
    height: 100%;
`;

const Card = styled(motion.div)<{ 
    rotateX: number; 
    rotateY: number; 
    isHovered: boolean;
    disableTilt: boolean;
}>`
    position: relative;
    width: 100%;
    height: 100%;
    padding: 2rem;
    border-radius: 20px;
    background: ${({ theme }) => theme.colors.cardBg};
    backdrop-filter: ${({ disableTilt }) => 
        disableTilt 
            ? 'blur(10px)' 
            : 'blur(15px)'
    };
    border: ${({ theme }) => `1px solid ${theme.colors.border}`};
    transform-style: preserve-3d;
    transform: rotateX(${({ rotateX }) => rotateX}deg) rotateY(${({ rotateY }) => rotateY}deg);
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    box-shadow: ${({ disableTilt, theme }) => 
        disableTilt 
            ? `0 8px 32px ${theme.colors.primary}20` 
            : `0 8px 32px ${theme.colors.primary}15`
    };
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 20px;
        background: ${({ theme }) => 
            theme.colors.primary === '#FF6B35' 
                ? 'linear-gradient(135deg, rgba(255, 107, 53, 0.06) 0%, rgba(255, 107, 53, 0.02) 50%, rgba(255, 107, 53, 0.06) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.06) 100%)'
        };
        opacity: ${({ isHovered, disableTilt }) => 
            disableTilt ? 0 : (isHovered ? 1 : 0.4)
        };
        transition: opacity 0.3s ease;
        pointer-events: none;
        z-index: 1;
    }
    
    &::after {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border-radius: 22px;
        background: ${({ theme }) => 
            theme.colors.primary === '#FF6B35' 
                ? 'linear-gradient(45deg, #ff6b35, #ff8c42, #ffa726, #ff7043, #ff5722, #f4511e, #ff6b35)'
                : 'linear-gradient(45deg, #ff006e, #fb5607, #ffbe0b, #8338ec, #3a86ff, #06ffa5, #ff006e)'
        };
        background-size: 400% 400%;
        animation: ${({ isHovered }) => (isHovered ? 'holographicGlow 2s ease infinite' : 'none')};
        opacity: ${({ isHovered, disableTilt, theme }) => 
            disableTilt ? 0 : (isHovered ? 0.6 : (theme.colors.primary === '#FF6B35' ? 0.25 : 0.15))
        };
        z-index: -1;
        transition: opacity 0.3s ease;
    }
    
    @keyframes holographicGlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
`;

const HolographicOverlay = styled.div<{ 
    mouseX: number; 
    mouseY: number; 
    isHovered: boolean;
}>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background: radial-gradient(
        circle at ${({ mouseX }) => mouseX}% ${({ mouseY }) => mouseY}%,
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0.05) 40%,
        transparent 70%
    );
    opacity: ${({ isHovered }) => (isHovered ? 1 : 0)};
    transition: opacity 0.3s ease;
    pointer-events: none;
    mix-blend-mode: overlay;
`;

const TextBackdrop = styled.div<{ disableTilt: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ disableTilt, theme }) => 
        disableTilt 
            ? 'transparent' 
            : theme.colors.primary === '#FF6B35'
                ? 'rgba(255, 244, 230, 0.15)'
                : 'rgba(10, 10, 15, 0.85)'
    };
    backdrop-filter: ${({ disableTilt }) => 
        disableTilt 
            ? 'none' 
            : 'blur(8px)'
    };
    -webkit-backdrop-filter: ${({ disableTilt }) => 
        disableTilt 
            ? 'none' 
            : 'blur(8px)'
    };
    border-radius: 18px;
    z-index: 5;
    pointer-events: none;
`;

const CardContent = styled.div<{ theme: any }>`
    position: relative;
    z-index: 10;
    height: 100%;
    display: flex;
    flex-direction: column;
    
    h1, h2, h3, h4, h5, h6 {
        text-shadow: ${({ theme }) => 
            theme.colors.primary === '#FF6B35' 
                ? 'none' 
                : '0 0 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)'
        };
        position: relative;
        z-index: 11;
    }
    
    p, span, div {
        text-shadow: ${({ theme }) => 
            theme.colors.primary === '#FF6B35' 
                ? 'none' 
                : '0 0 8px rgba(0, 0, 0, 0.7)'
        };
        position: relative;
        z-index: 11;
    }
`;

const CardShadow = styled.div<{ 
    rotateX: number; 
    rotateY: number; 
    isHovered: boolean;
}>`
    position: absolute;
    top: 20px;
    left: 10px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    filter: blur(20px);
    transform: rotateX(${({ rotateX }) => rotateX * 0.5}deg) rotateY(${({ rotateY }) => rotateY * 0.5}deg);
    opacity: ${({ isHovered }) => (isHovered ? 0.6 : 0.2)};
    transition: all 0.3s ease;
    z-index: -2;
`;

interface HolographicCardProps {
    children: React.ReactNode;
    className?: string;
    maxRotation?: number;
    disableTilt?: boolean;
}

const HolographicCard: React.FC<HolographicCardProps> = ({ 
    children, 
    className,
    maxRotation = 15,
    disableTilt = false
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [mouseX, setMouseX] = useState(50);
    const [mouseY, setMouseY] = useState(50);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current || disableTilt) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseXPercent = ((e.clientX - rect.left) / rect.width) * 100;
        const mouseYPercent = ((e.clientY - rect.top) / rect.height) * 100;
        
        const rotateXValue = ((e.clientY - centerY) / rect.height) * -maxRotation;
        const rotateYValue = ((e.clientX - centerX) / rect.width) * maxRotation;
        
        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
        setMouseX(mouseXPercent);
        setMouseY(mouseYPercent);
    };

    const handleMouseEnter = () => {
        if (!disableTilt) {
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        if (!disableTilt) {
            setIsHovered(false);
            setRotateX(0);
            setRotateY(0);
            setMouseX(50);
            setMouseY(50);
        }
    };

    return (
        <CardContainer 
            className={className}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            whileHover={disableTilt ? {} : { scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <CardShadow 
                rotateX={disableTilt ? 0 : rotateX} 
                rotateY={disableTilt ? 0 : rotateY} 
                isHovered={disableTilt ? false : isHovered}
            />
            <Card 
                rotateX={disableTilt ? 0 : rotateX} 
                rotateY={disableTilt ? 0 : rotateY} 
                isHovered={disableTilt ? false : isHovered}
                disableTilt={disableTilt}
            >
                <HolographicOverlay 
                    mouseX={disableTilt ? 50 : mouseX} 
                    mouseY={disableTilt ? 50 : mouseY} 
                    isHovered={disableTilt ? false : isHovered}
                />
                <TextBackdrop disableTilt={disableTilt} />
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </CardContainer>
    );
};

export default HolographicCard;
