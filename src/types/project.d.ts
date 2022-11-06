type ProjectCategory = "UX" | "UI" | "Others";

interface ProjectSectionImage {
    image: string;
}

interface ProjectSectionElementList {
    type: string;
    link: string;
}

interface ProjectSectionElement {
    element: string;
    images?: ProjectSectionImage[];
    description?: string;
    image?: string;
    quote?: string;
    concept: string;
    conceptDesc: string;
    design: string;
    designDesc: string;
    projectManagement: string;
    projectManagementDesc: string;
    screens: number;
    iterations: number;
    prototypes: number;
    list?: ProjectSectionElementList[];
}

interface ProjectSection {
    section: string;
    showInTimeline?: "yes" | "no";
    elements: ProjectSectionElement[];
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
