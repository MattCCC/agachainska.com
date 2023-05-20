import type {
    ProjectConnectionQuery,
    ProjectQuery,
} from "tina/__generated__/types";

export type ProjectCategory = "UX" | "UI" | "Others";

export type ProjectNode = NonNullable<
    NonNullable<ProjectConnectionQuery["projectConnection"]["edges"]>[0]
>["node"];

export interface ProjectSectionImage {
    readonly image: string | null;
}

export interface ProjectSectionElementDevice {
    type: string;
    link: string;
}

export type ProjectSection = NonNullable<
    ProjectQuery["project"]["sections"]
>[0];

export type ProjectSectionsElement = NonNullable<
    NonNullable<ProjectSection>["elements"]
>[0];

export interface ProjectKeyInfo {
    readonly elements: ProjectKeyInfoElement[];
}

export interface ProjectKeyInfoElement {
    readonly title: string;
    readonly text: string;
}

export type Project = ProjectQuery["project"];
