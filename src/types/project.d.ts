type ProjectCategory = "UX" | "UI" | "Others";

interface ProjectSection {
    section:
        | "challenge"
        | "approach"
        | "results"
        | "credits"
        | "other-projects";
    elements: Array<Record<string, string>>;
}

interface Project {
    uid: number;
    name: string;
    cover: string;
    subCategory: string;
    bgColor: string;
    starColor: string;
    nameSlug: string;
    category: ProjectCategory;
    client: string;
    agency: string;
    timeframe: string;
    roleInProject: string;
    shortDescription: string;
    challenge: Record<string, string>;
    approach: Record<string, string>;
    stats: Record<string, number>;
    credits: Record<string, string>;
    sections: ProjectSection[];
    dribbbleLink?: string;
}
