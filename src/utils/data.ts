import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
    subtitle: "Turning ideas into interactive experiences",
    works: [
        {
            title: "Plant Disease Identification",
            description: "AI-powered plant disease identification web application built with FlutterFlow, featuring Google Gemini AI image recognition for real-time plant disease analysis and detection.",
            image: "https://via.placeholder.com/600x400/4CAF50/ffffff?text=Plant+Disease+App",
            tags: ["FlutterFlow", "Google Gemini AI"],
            slug: "plant-disease-detection",
            featured: true,
            category: "ai",
            liveUrl: "https://plant-disease-app.flutterflow.app",
            githubUrl: "nil"
        }
    ],
    skills: [
        { name: "Frontend Development", level: 100 },
        { name: "UI/UX Design", level: 100 },
        { name: "Backend Development", level: 100 },
        { name: "Mobile Development", level: 100 }
    ]
}; 