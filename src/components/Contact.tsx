import React from 'react';
import styled from 'styled-components';
import { Container } from '../styles/StyledComponents';
import NetworkNodes from './NetworkNodes';

const ContactSection = styled.section`
    padding: 3rem 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
    overflow: hidden;
`;

const ContactContainer = styled(Container)`
    position: relative;
    z-index: 2;
`;

const Contact: React.FC = () => {
    return (
        <ContactSection id="contact">
            <NetworkNodes section="contact" isVisible={true} />
            <ContactContainer>
            </ContactContainer>
        </ContactSection>
    );
};

export default Contact; 