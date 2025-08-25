import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
    subtitle: "Turning ideas into interactive experiences",
    works: [
        {
            title: "PlantAI - Disease Detection",
            description: "AI-powered plant disease identification web application built with React and Cloudflare, featuring Google Gemini AI image recognition for accurate plant disease analysis with confidence scoring and treatment recommendations.",
            image: "https://via.placeholder.com/600x400/4CAF50/ffffff?text=PlantAI+App",
            tags: ["React", "Google Gemini AI", "Cloudflare", "JavaScript", "CSS"],
            slug: "plant-disease-detection",
            featured: true,
            category: "ai",
            liveUrl: "https://plant-ai-detection.pages.dev",
            githubUrl: "https://github.com/sudo-kk/plant-ai-detection"
        }
    ],
    skills: [
        { name: "Frontend Development", level: 100 },
        { name: "UI/UX Design", level: 100 },
        { name: "Backend Development", level: 100 },
        { name: "Mobile Development", level: 100 }
    ]
}; 