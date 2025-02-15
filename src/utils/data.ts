import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
    subtitle: "Turning ideas into interactive experiences",
    works: [
        {
            title: "Project One",
            description: "Interactive Dashboard",
            image: "https://via.placeholder.com/600x400",
            tags: ["React", "Node.js", "D3.js"]
        },
        {
            title: "Project Two",
            description: "E-commerce Platform",
            image: "https://via.placeholder.com/600x400",
            tags: ["Vue.js", "Firebase", "Tailwind"]
        },
        {
            title: "Project Three",
            description: "Mobile App",
            image: "https://via.placeholder.com/600x400",
            tags: ["React Native", "GraphQL", "AWS"]
        }
    ],
    skills: [
        { name: "Frontend Development", level: 90 },
        { name: "UI/UX Design", level: 85 },
        { name: "Backend Development", level: 80 },
        { name: "Mobile Development", level: 75 }
    ]
}; 