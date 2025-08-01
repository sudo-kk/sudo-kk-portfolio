import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
        scroll-behavior: smooth;
    }

    html {
        height: 100%;
        overflow-x: hidden;
        scroll-behavior: smooth;
    }

    body {
        font-family: ${({ theme }) => theme.fonts.primary};
        background: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};
        overflow-x: hidden;
        min-height: 100%;
        position: relative;
        -webkit-overflow-scrolling: touch;
    }

    /* Enhanced text readability for holographic cards */
    .holographic-text {
        text-shadow: ${({ theme }) => 
            theme.colors.background === '#0A0A0F' 
                ? '0 0 10px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 0, 0, 0.5)' 
                : 'none'
        };
        font-weight: 500;
        letter-spacing: 0.02em;
    }

    .holographic-title {
        text-shadow: ${({ theme }) => 
            theme.colors.background === '#0A0A0F' 
                ? '0 0 15px rgba(0, 0, 0, 0.9), 0 0 25px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 0, 0, 0.6)' 
                : 'none'
        };
        font-weight: 600;
        letter-spacing: 0.03em;
    }

    @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0px); }
    }

    @keyframes glitch {
        0% {
            transform: translate(0);
            text-shadow: none;
        }
        20% {
            transform: translate(-2px, 2px);
            text-shadow: ${({ theme }) => 
                theme.colors.primary === '#FF6B35' 
                    ? 'none' 
                    : `2px 2px ${theme.colors.secondary}`
            };
        }
        40% {
            transform: translate(-2px, -2px);
            text-shadow: ${({ theme }) => 
                theme.colors.primary === '#FF6B35' 
                    ? 'none' 
                    : `2px -2px ${theme.colors.primary}`
            };
        }
        60% {
            transform: translate(2px, 2px);
            text-shadow: ${({ theme }) => 
                theme.colors.primary === '#FF6B35' 
                    ? 'none' 
                    : `-2px 2px ${theme.colors.secondary}`
            };
        }
        80% {
            transform: translate(2px, -2px);
            text-shadow: ${({ theme }) => 
                theme.colors.primary === '#FF6B35' 
                    ? 'none' 
                    : `-2px -2px ${theme.colors.primary}`
            };
        }
        100% {
            transform: translate(0);
            text-shadow: none;
        }
    }

    .no-select {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
`; 