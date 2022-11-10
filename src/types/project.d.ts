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

interface ProjectSectionElementCredit {
    title: string;
    text: string;
}

type ProjectSectionElementText =
    | "text"
    | "full-size-image"
    | "two-images"
    | "full-page-image"
    | "slider"
    | "quote"
    | "device"
    | "devices"
    | "stats"
    | "credits"
    | "other-projects";

interface ProjectSectionElement extends ProjectSectionElementDevice {
    element: ProjectSectionElementText;
    title?: string;
    description?: string;
    image?: string;
    quote?: string;
    images?: ProjectSectionImage[];
    content: ProjectSectionElementCredit[];
    stats?: ProjectSectionElementStat[];
    list?: ProjectSectionElementDevice[];
}

interface ProjectSection {
    section: string;
    showInTimeline?: "yes" | "no";
    showSectionTitle?: "yes" | "no";
    elements: ProjectSectionElement[];
}

interface ProjectKeyInfo {
    elements: ProjectKeyInfoElement[];
}

interface ProjectKeyInfoElement {
    title: string;
    text: string;
}

interface Project {
    uid: number;
    name: string;
    cover: string;
    workPageColor: string;
    starColor: string;
    nameSlug: string;
    category: ProjectCategory;
    shortDescription: string;
    sections: ProjectSection[];
    dribbbleLink?: string;
    subCategory?: string;
    timelineTitle?: string;
    keyInfo?: ProjectKeyInfo;
}
