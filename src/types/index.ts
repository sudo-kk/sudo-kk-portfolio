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
}

export interface Skill {
    name: string;
    level: number;
}

export interface ContactInfo {
    email: string;
    location: string;
} 