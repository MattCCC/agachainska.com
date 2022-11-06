type ProjectCategory = "UX" | "UI" | "Others";

interface ProjectSectionImage {
    image: string;
}

interface ProjectSectionElementDevice {
    type: string;
    link: string;
}

interface ProjectSectionElementStat {
    title: number;
    stat: number;
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
    type: string;
    link: string;
    stats?: ProjectSectionElementStat[];
    list?: ProjectSectionElementDevice[];
}

interface ProjectSection {
    section: string;
    showInTimeline?: "yes" | "no";
    showSectionTitle?: "yes" | "no";
    elements: ProjectSectionElement[];
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
    sections: ProjectSection[];
    dribbbleLink?: string;
}
