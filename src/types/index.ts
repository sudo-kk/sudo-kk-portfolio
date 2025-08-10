export interface PortfolioData {
    subtitle: string;
    works: Work[];
    skills: Skill[];
}

export interface Work {
    title: string;
    description: string;
    image: string;
    tags: string[];
    slug: string;
    featured: boolean;
    category: 'ai' | 'cybersecurity' | 'web' | 'mobile';
    liveUrl: string;
    githubUrl: string;
}

export interface Skill {
    name: string;
    level: number;
}

export interface ContactInfo {
    email: string;
    location: string;
} 