import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NetworkContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
`;

const NetworkSvg = styled.svg`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;

const NetworkNode = styled(motion.circle)<{ nodeType: string }>`
    fill: ${({ nodeType, theme }) => {
        switch (nodeType) {
            case 'skill': return theme.colors.primary;
            case 'project': return '#4ECDC4';
            case 'achievement': return '#FFD700';
            case 'security': return '#FF6B6B';
            default: return theme.colors.primary;
        }
    }};
    stroke: rgba(255, 255, 255, 0.3);
    stroke-width: 1;
    filter: drop-shadow(0 0 8px currentColor);
    opacity: 0.8;
`;

const NetworkLine = styled(motion.line)`
    stroke: rgba(108, 99, 255, 0.4);
    stroke-width: 1;
    stroke-dasharray: 5, 5;
    opacity: 0.6;
`;

const DataParticle = styled(motion.circle)`
    fill: #00ffff;
    stroke: rgba(0, 255, 255, 0.5);
    stroke-width: 0.5;
    filter: drop-shadow(0 0 4px #00ffff);
    opacity: 0.9;
`;

const NodeLabel = styled(motion.text)`
    fill: ${({ theme }) => theme.colors.text};
    font-size: 10px;
    font-weight: 500;
    text-anchor: middle;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
`;

interface Node {
    id: string;
    x: number;
    y: number;
    type: 'skill' | 'project' | 'achievement' | 'security';
    label: string;
    radius: number;
    connections: string[];
}

interface Connection {
    from: string;
    to: string;
    strength: number;
}

interface DataParticleType {
    id: string;
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    progress: number;
    connectionId: string;
}

interface NetworkNodesProps {
    section: 'hero' | 'about' | 'skills' | 'projects' | 'contact';
    isVisible: boolean;
}

const NetworkNodes: React.FC<NetworkNodesProps> = ({ section, isVisible }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [dataParticles, setDataParticles] = useState<DataParticleType[]>([]);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    // Generate nodes based on section
    useEffect(() => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });

        const generateNodes = () => {
            switch (section) {
                case 'hero':
                    return [
                        { id: 'main', x: 50, y: 50, type: 'security' as const, label: 'sudo_kk', radius: 8, connections: ['dev', 'cyber', 'student'] },
                        { id: 'dev', x: 20, y: 30, type: 'skill' as const, label: 'Developer', radius: 6, connections: ['main', 'cyber'] },
                        { id: 'cyber', x: 80, y: 30, type: 'security' as const, label: 'Cybersecurity', radius: 6, connections: ['main', 'dev'] },
                        { id: 'student', x: 50, y: 80, type: 'achievement' as const, label: 'Student', radius: 5, connections: ['main'] },
                    ];
                case 'about':
                    return [
                        { id: 'profile', x: 30, y: 40, type: 'achievement' as const, label: 'Profile', radius: 7, connections: ['education', 'passion'] },
                        { id: 'education', x: 70, y: 25, type: 'skill' as const, label: 'Education', radius: 5, connections: ['profile'] },
                        { id: 'passion', x: 70, y: 55, type: 'project' as const, label: 'Passion', radius: 5, connections: ['profile'] },
                    ];
                case 'skills':
                    return [
                        { id: 'frontend', x: 25, y: 30, type: 'skill' as const, label: 'Frontend', radius: 6, connections: ['backend', 'mobile'] },
                        { id: 'backend', x: 75, y: 30, type: 'skill' as const, label: 'Backend', radius: 6, connections: ['frontend', 'security'] },
                        { id: 'mobile', x: 25, y: 70, type: 'skill' as const, label: 'Mobile', radius: 5, connections: ['frontend'] },
                        { id: 'security', x: 75, y: 70, type: 'security' as const, label: 'Security', radius: 6, connections: ['backend'] },
                    ];
                case 'projects':
                    return [
                        { id: 'project1', x: 30, y: 25, type: 'project' as const, label: 'Project 1', radius: 6, connections: ['project2'] },
                        { id: 'project2', x: 70, y: 25, type: 'project' as const, label: 'Project 2', radius: 6, connections: ['project1', 'project3'] },
                        { id: 'project3', x: 50, y: 60, type: 'project' as const, label: 'Project 3', radius: 6, connections: ['project2'] },
                    ];
                case 'contact':
                    return [
                        { id: 'github', x: 25, y: 40, type: 'skill' as const, label: 'GitHub', radius: 5, connections: ['linkedin'] },
                        { id: 'linkedin', x: 75, y: 40, type: 'achievement' as const, label: 'LinkedIn', radius: 5, connections: ['github', 'twitter'] },
                        { id: 'twitter', x: 50, y: 70, type: 'project' as const, label: 'Twitter', radius: 5, connections: ['linkedin'] },
                    ];
                default:
                    return [];
            }
        };

        const newNodes = generateNodes();
        setNodes(newNodes);

        // Generate connections
        const newConnections: Connection[] = [];
        newNodes.forEach(node => {
            node.connections.forEach(targetId => {
                if (!newConnections.some(conn => 
                    (conn.from === node.id && conn.to === targetId) ||
                    (conn.from === targetId && conn.to === node.id)
                )) {
                    newConnections.push({
                        from: node.id,
                        to: targetId,
                        strength: Math.random() * 0.5 + 0.5
                    });
                }
            });
        });
        setConnections(newConnections);

    }, [section]);

    // Animate data particles
    useEffect(() => {
        if (!isVisible || connections.length === 0) return;

        const interval = setInterval(() => {
            const randomConnection = connections[Math.floor(Math.random() * connections.length)];
            const fromNode = nodes.find(n => n.id === randomConnection.from);
            const toNode = nodes.find(n => n.id === randomConnection.to);

            if (fromNode && toNode) {
                const newParticle: DataParticleType = {
                    id: `particle-${Date.now()}-${Math.random()}`,
                    x: (fromNode.x / 100) * containerSize.width,
                    y: (fromNode.y / 100) * containerSize.height,
                    targetX: (toNode.x / 100) * containerSize.width,
                    targetY: (toNode.y / 100) * containerSize.height,
                    progress: 0,
                    connectionId: `${randomConnection.from}-${randomConnection.to}`
                };

                setDataParticles(prev => [...prev, newParticle]);

                // Remove particle after animation
                setTimeout(() => {
                    setDataParticles(prev => prev.filter(p => p.id !== newParticle.id));
                }, 2000);
            }
        }, 1500);

        return () => clearInterval(interval);
    }, [isVisible, connections, nodes, containerSize]);

    // Update particle positions
    useEffect(() => {
        if (dataParticles.length === 0) return;

        const animationInterval = setInterval(() => {
            setDataParticles(prev => prev.map(particle => {
                const newProgress = Math.min(particle.progress + 0.02, 1);
                const x = particle.x + (particle.targetX - particle.x) * newProgress;
                const y = particle.y + (particle.targetY - particle.y) * newProgress;

                return {
                    ...particle,
                    x,
                    y,
                    progress: newProgress
                };
            }));
        }, 16);

        return () => clearInterval(animationInterval);
    }, [dataParticles]);

    return (
        <NetworkContainer ref={containerRef}>
            <NetworkSvg>
                {/* Render connections */}
                {connections.map((connection, index) => {
                    const fromNode = nodes.find(n => n.id === connection.from);
                    const toNode = nodes.find(n => n.id === connection.to);

                    if (!fromNode || !toNode) return null;

                    return (
                        <NetworkLine
                            key={`${connection.from}-${connection.to}`}
                            x1={`${fromNode.x}%`}
                            y1={`${fromNode.y}%`}
                            x2={`${toNode.x}%`}
                            y2={`${toNode.y}%`}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ 
                                pathLength: isVisible ? 1 : 0, 
                                opacity: isVisible ? 0.6 : 0 
                            }}
                            transition={{ 
                                duration: 1, 
                                delay: index * 0.2,
                                ease: "easeInOut"
                            }}
                        />
                    );
                })}

                {/* Render nodes */}
                {nodes.map((node, index) => (
                    <g key={node.id}>
                        <NetworkNode
                            cx={`${node.x}%`}
                            cy={`${node.y}%`}
                            r={node.radius}
                            nodeType={node.type}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ 
                                scale: isVisible ? 1 : 0, 
                                opacity: isVisible ? 0.8 : 0 
                            }}
                            transition={{ 
                                duration: 0.5, 
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 300,
                                damping: 30
                            }}
                            whileHover={{ 
                                scale: 1.5, 
                                opacity: 1,
                                transition: { duration: 0.2 }
                            }}
                        />
                        <NodeLabel
                            x={`${node.x}%`}
                            y={`${node.y - 15}%`}
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            {node.label}
                        </NodeLabel>
                    </g>
                ))}

                {/* Render data particles */}
                {dataParticles.map((particle) => (
                    <DataParticle
                        key={particle.id}
                        cx={particle.x}
                        cy={particle.y}
                        r={2}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                ))}
            </NetworkSvg>
        </NetworkContainer>
    );
};

export default NetworkNodes;
