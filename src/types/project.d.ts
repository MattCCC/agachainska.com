type ProjectCategory = "UX" | "UI" | "Others";

interface ProjectSectionImage {
    readonly image: string;
}

interface ProjectSectionElementDevice {
    readonly type: string;
    readonly link: string;
}

interface ProjectSectionElementStat {
    readonly title: string;
    readonly stat: number;
}

interface ProjectSectionElementCredit {
    readonly title: string;
    readonly text: string;
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
    readonly element: ProjectSectionElementText;
    readonly title?: string;
    readonly description?: string;
    readonly image?: string;
    readonly quote?: string;
    readonly images?: ProjectSectionImage[];
    readonly content: ProjectSectionElementCredit[];
    readonly stats?: ProjectSectionElementStat[];
    readonly list?: ProjectSectionElementDevice[];
}

interface ProjectSection {
    readonly section: string;
    readonly showInTimeline?: "yes" | "no";
    readonly showSectionTitle?: "yes" | "no";
    readonly elements: ProjectSectionElement[];
}

interface ProjectKeyInfo {
    readonly elements: ProjectKeyInfoElement[];
}

interface ProjectKeyInfoElement {
    readonly title: string;
    readonly text: string;
}

interface Project {
    readonly uid: number;
    readonly name: string;
    readonly cover: string;
    readonly workPageColor: string;
    readonly starColor: string;
    readonly nameSlug: string;
    readonly category: ProjectCategory;
    readonly shortDescription: string;
    readonly sections: ProjectSection[];
    readonly dribbbleLink?: string;
    readonly subCategory?: string;
    readonly timelineTitle?: string;
    readonly keyInfo?: ProjectKeyInfo;
}
