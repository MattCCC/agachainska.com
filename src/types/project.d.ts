type ProjectCategory = "UX" | "UI" | "Others";

interface ProjectImage {
    image: string;
}

interface ProjectElement {
    element: string;
    images?: ProjectImage[];
    description?: string;
    image?: string;
    quote?: string;
}

interface ProjectSection {
    section: string;
    showInTimeline?: "yes" | "no";
    elements: ProjectElement[];
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
    sections: ProjectSection[];
    dribbbleLink?: string;
}
