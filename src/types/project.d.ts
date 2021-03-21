type ProjectCategory = "UX" | "UI" | "Others";

interface Project {
    uid: number;
    name: string;
    nameSlug: string;
    category: ProjectCategory;
    client: string;
    agency: string;
    timeframe: string;
    roleInProject: string;
    challenge: Record<string, string>;
    approach: Record<string, string>;
    stats: Record<string, number>;
    credits: Record<string, string>;
}
