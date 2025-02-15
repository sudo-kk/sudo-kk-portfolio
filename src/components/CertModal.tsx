import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ModalOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled(motion.div)`
    position: relative;
    background: #fff;
    padding: 1rem;
    border-radius: 8px;
    max-width: 90%;
    max-height: 90%;
    overflow: auto;
    img {
        width: auto;
        max-width: 100%;
        max-height: 80vh;
        border-radius: 8px;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    left: 10px;
    background: #87CEEB; /* Light blue color */
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #fff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

interface CertModalProps {
    isOpen: boolean;
    onClose: () => void;
    imgSrc: string;
}

const CertModal: React.FC<CertModalProps> = ({ isOpen, onClose, imgSrc }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <ModalOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ModalContent
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                    >
                        <CloseButton onClick={onClose}>&times;</CloseButton>
                        <img src={imgSrc} alt="Certification" style={{ width: '100%', borderRadius: '8px' }} />
                    </ModalContent>
                </ModalOverlay>
            )}
        </AnimatePresence>
    );
};

export default CertModal;
