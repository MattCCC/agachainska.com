type ProjectCategory = "UX" | "UI" | "Others";

interface ProjectSection {
    section: string;
    showInTimeline?: "yes" | "no";
    elements: Array<Record<string, string>>;
}

interface Project {
    uid: number;
    name: string;
    cover: string;
    subCategory: string;
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
