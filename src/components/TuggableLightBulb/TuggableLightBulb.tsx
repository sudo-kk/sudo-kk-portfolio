import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

// Register GSAP plugins
gsap.registerPlugin(Draggable);

const BulbContainer = styled.div<{ isOn: boolean; size: number }>`
  --on: ${({ isOn }) => isOn ? 1 : 0};
  --cord: ${({ theme, isOn }) => 
    isOn 
      ? theme.colors.text 
      : theme.colors.text
  };
  --stroke: ${({ theme, isOn }) => 
    isOn 
      ? theme.colors.text 
      : theme.colors.text
  };
  --shine: ${({ isOn }) => 
    isOn 
      ? 'hsla(0, 0%, 100%, 0.25)' 
      : 'hsla(0, 0%, 100%, 0.75)'
  };
  --cap: ${({ theme, isOn }) => 
    isOn 
      ? theme.colors.primary 
      : '#666'
  };
  --filament: ${({ isOn }) => 
    isOn 
      ? 'hsl(45, 80%, 100%)' 
      : 'hsl(45, 0%, 25%)'
  };
  --bulb-fill: ${({ isOn }) => 
    isOn 
      ? `hsla(45, 80%, 80%, 0.5)` 
      : `hsla(180, 80%, 80%, 0.1)`
  };
  
  position: relative;
  cursor: pointer;
  user-select: none;
  
  .toggle-scene {
    overflow: visible !important;
    height: ${({ size }) => size}px;
    width: ${({ size }) => size}px;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      height: ${({ size }) => Math.max(size - 10, 40)}px;
      width: ${({ size }) => Math.max(size - 10, 40)}px;
    }
  }
  
  .toggle-scene__cord {
    stroke: var(--cord);
    cursor: move;
    
    &:nth-of-type(1) {
      display: none;
    }
    
    &:nth-of-type(2),
    &:nth-of-type(3),
    &:nth-of-type(4),
    &:nth-of-type(5) {
      display: none;
    }
  }
  
  .toggle-scene__cord-end {
    stroke: var(--cord);
    fill: var(--cord);
  }
  
  .toggle-scene__dummy-cord {
    stroke-width: 3;
    stroke: var(--cord);
  }
  
  .bulb__filament {
    stroke: var(--filament);
    transition: stroke 0.3s ease;
  }
  
  .bulb__shine {
    stroke: var(--shine);
    transition: stroke 0.3s ease;
  }
  
  .bulb__flash {
    stroke: #f5e0a3;
    display: none;
  }
  
  .bulb__bulb {
    stroke: var(--stroke);
    fill: var(--bulb-fill);
    transition: all 0.3s ease;
  }
  
  .bulb__cap {
    fill: var(--cap);
    transition: fill 0.3s ease;
  }
  
  .bulb__cap-shine {
    fill: var(--shine);
    transition: fill 0.3s ease;
  }
  
  .bulb__cap-outline {
    stroke: var(--stroke);
    transition: stroke 0.3s ease;
  }
  
  @keyframes fadeInSlide {
    from {
      opacity: 0;
      transform: translateY(-50%) translateX(10px);
    }
    to {
      opacity: 1;
      transform: translateY(-50%) translateX(0);
    }
  }
`;

interface TuggableLightBulbProps {
  isOn: boolean;
  onToggle: () => void;
  size?: number;
}

const TuggableLightBulb: React.FC<TuggableLightBulbProps> = ({ 
  isOn, 
  onToggle, 
  size = 60 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dummyCordRef = useRef<SVGLineElement>(null);
  const hitSpotRef = useRef<SVGCircleElement>(null);
  const cordEndRef = useRef<SVGPathElement>(null);
  const proxyElementRef = useRef<HTMLDivElement | null>(null);
  const [dragDistance, setDragDistance] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  
  // Audio for click sound
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Hide welcome message after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animate cord end on mount
  useEffect(() => {
    if (cordEndRef.current) {
      // Start with 10x size and animate to normal size
      gsap.fromTo(cordEndRef.current, {
        scale: 10,
        transformOrigin: "center center"
      }, {
        scale: 1,
        duration: 1,
        delay: 1,
        ease: "power2.out"
      });
    }
  }, []);
  
  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('https://assets.codepen.io/605876/click.mp3');
    audioRef.current.volume = 0.3; // Set volume to 30%
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Starting position values
  const ENDX = 98.7255;
  const ENDY = 380.5405;
  const CORD_DURATION = 0.1;
  
  useEffect(() => {
    if (!containerRef.current || !dummyCordRef.current || !hitSpotRef.current) return;
    
    // Create proxy element for dragging
    const proxy = document.createElement('div');
    proxyElementRef.current = proxy;
    
    // Set initial position
    gsap.set(proxy, { x: ENDX, y: ENDY });
    
    let startX = 0;
    let startY = 0;
    
    // Create draggable instance
    const draggable = Draggable.create(proxy, {
      trigger: hitSpotRef.current,
      type: 'x,y',
      onPress: (e) => {
        startX = e.x;
        startY = e.y;
      },
      onDrag: function() {
        if (dummyCordRef.current) {
          gsap.set(dummyCordRef.current, {
            attr: {
              x2: this.x,
              y2: this.y,
            },
          });
        }
        
        // Calculate current drag distance
        const distX = Math.abs(this.x - ENDX);
        const distY = Math.abs(this.y - ENDY);
        const distance = Math.sqrt(distX * distX + distY * distY);
        setDragDistance(distance);
      },
      onRelease: function(e) {
        const distX = Math.abs(e.x - startX);
        const distY = Math.abs(e.y - startY);
        const travelled = Math.sqrt(distX * distX + distY * distY);
        
        // Animate back to original position
        gsap.to(dummyCordRef.current, {
          attr: { x2: ENDX, y2: ENDY },
          duration: CORD_DURATION,
          onComplete: () => {
            if (travelled > 30) { // Reduced threshold for easier triggering
              // Play sound effect
              if (audioRef.current) {
                audioRef.current.currentTime = 0; // Reset to beginning
                audioRef.current.play().catch(e => console.log('Audio play failed:', e));
              }
              onToggle();
            }
            gsap.set(proxy, { x: ENDX, y: ENDY });
            setDragDistance(0);
          },
        });
      },
    });
    
    return () => {
      draggable[0].kill();
      if (proxyElementRef.current) {
        proxyElementRef.current.remove();
      }
    };
  }, [onToggle]);
  
  // Add visual feedback based on drag distance
  const getDragFeedback = () => {
    if (dragDistance > 30) {
      return 'Ready to toggle!';
    } else if (dragDistance > 15) {
      return 'Keep pulling...';
    }
    return '';
  };
  
  return (
    <BulbContainer 
      ref={containerRef} 
      isOn={isOn} 
      size={size}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <svg 
        className="toggle-scene" 
        xmlns="http://www.w3.org/2000/svg" 
        preserveAspectRatio="xMinYMin" 
        viewBox="0 0 197.451 481.081"
        width={size}
        height={size}
      >
        <defs>
          <marker id="cord-end" orient="auto" overflow="visible" refX="0" refY="0">
            <path 
              ref={cordEndRef}
              className="toggle-scene__cord-end" 
              fillRule="evenodd" 
              strokeWidth=".6" 
              d="M2 0a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </marker>
        </defs>
        
        <g className="toggle-scene__cords">
          <g className="line toggle-scene__dummy-cord">
            <line 
              ref={dummyCordRef}
              markerEnd="url(#cord-end)" 
              x1="98.7255" 
              x2="98.7255" 
              y1="240.5405" 
              y2="380.5405"
            />
          </g>
          <circle 
            ref={hitSpotRef}
            className="toggle-scene__hit-spot" 
            cx="98.7255" 
            cy="380.5405" 
            r="40" 
            fill="transparent"
            style={{ cursor: 'grab' }}
          />
        </g>
        
        <g className="toggle-scene__bulb bulb" transform="translate(844.069 -645.213)">
          <path 
            className="bulb__cap" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="4.677" 
            d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
          />
          
          <path 
            className="bulb__cap-shine" 
            d="M-778.379 802.873h25.512v118.409h-25.512z" 
            clipPath="url(#cap-clip)" 
            transform="matrix(.52452 0 0 .90177 -368.282 82.976)"
          />
          
          <path 
            className="bulb__cap-outline" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="4.677" 
            d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
          />
          
          <g className="bulb__filament" fill="none" strokeLinecap="round" strokeWidth="3">
            <path d="M-752.914 823.875l-8.858-33.06" />
            <path d="M-737.772 823.875l8.858-33.06" />
          </g>
          
          <path 
            className="bulb__bulb" 
            strokeLinecap="round" 
            strokeWidth="3" 
            d="M-783.192 803.855c5.251 8.815 5.295 21.32 13.272 27.774 12.299 8.045 36.46 8.115 49.127 0 7.976-6.454 8.022-18.96 13.273-27.774 3.992-6.7 14.408-19.811 14.408-19.811 8.276-11.539 12.769-24.594 12.769-38.699 0-35.898-29.102-65-65-65-35.899 0-65 29.102-65 65 0 13.667 4.217 26.348 12.405 38.2 0 0 10.754 13.61 14.746 20.31z"
          />
          
          <path 
            className="bulb__shine" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="8" 
            d="M-789.19 757.501a45.897 45.897 0 013.915-36.189 45.897 45.897 0 0129.031-21.957"
          />
        </g>
      </svg>
      
      {/* Welcome message box */}
      {showWelcomeMessage && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          right: '100%', 
          transform: 'translateY(-50%)', 
          fontSize: '13px',
          color: 'white',
          marginRight: '16px',
          whiteSpace: 'nowrap',
          background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.9), rgba(255, 107, 107, 0.9))',
          padding: '8px 12px',
          borderRadius: '8px',
          pointerEvents: 'none',
          zIndex: 1001,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          animation: 'fadeInSlide 0.5s ease-out'
        }}>
          💡 Try pulling the bulb to toggle theme!
        </div>
      )}
      
      {/* Hover tooltip */}
      {isHovering && dragDistance === 0 && !showWelcomeMessage && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          right: '100%', 
          transform: 'translateY(-50%)', 
          fontSize: '12px',
          color: 'white',
          marginRight: '12px',
          whiteSpace: 'nowrap',
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '4px 8px',
          borderRadius: '4px',
          pointerEvents: 'none',
          zIndex: 1000
        }}>
          Pull to toggle
        </div>
      )}
      
      {/* Drag feedback */}
      {dragDistance > 15 && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          right: '100%', 
          transform: 'translateY(-50%)', 
          fontSize: '12px',
          color: 'white',
          marginRight: '12px',
          whiteSpace: 'nowrap',
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '4px 8px',
          borderRadius: '4px',
          pointerEvents: 'none',
          zIndex: 1000
        }}>
          {getDragFeedback()}
        </div>
      )}
    </BulbContainer>
  );
};

export default TuggableLightBulb;
