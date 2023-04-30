import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Project } from "types/project";

interface HookArgs {
    category: string;
    projects: Project[];
}

type HookState = [
    ProjectsByCategory,
    Dispatch<SetStateAction<ProjectsByCategory>>
];

export interface ProjectsByCategory {
    others: Project[];
    filteredProjects: ProjectByCurrentCategory[];
}

export interface ProjectByCurrentCategory {
    uid: string;
    nameSlug: string;
}

export const useProjectsByCategory = ({
    category,
    projects,
}: HookArgs): HookState => {
    const [projectsByCategory, setProjectsByCategory] = useState({
        others: [],
        filteredProjects: [],
    } as ProjectsByCategory);

    useEffect(() => {
        if (!projects || projects.length === 0) {
            return;
        }

        const filteredProjectsInState = projectsByCategory.filteredProjects;
        const otherProjectsInState = projectsByCategory.others;

        const filteredProjectsByCategory: ProjectByCurrentCategory[] = projects
            .filter((project) => project.category === category)
            .map((currentProject) => ({
                uid: currentProject.id,
                nameSlug: currentProject.nameSlug,
            }));

        const otherProjects = projects.filter(
            (project) => project.subCategory === "Others"
        );

        if (
            (otherProjects.length === 0 &&
                filteredProjectsByCategory.length === 0) ||
            (otherProjects.length === otherProjectsInState.length &&
                filteredProjectsByCategory.length ===
                    filteredProjectsInState.length)
        ) {
            return;
        }

        setProjectsByCategory((prevState) => ({
            ...prevState,
            others: otherProjects,
            filteredProjects: filteredProjectsByCategory,
        }));
    }, [category, projects, projectsByCategory]);

    return [projectsByCategory, setProjectsByCategory];
};
