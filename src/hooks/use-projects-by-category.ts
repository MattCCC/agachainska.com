import { useMemo } from "react";
import { Project } from "types/project";

interface HookArgs {
    category: string;
    nameSlug: string;
    projects: Project[];
}

export type ProjectsByCategory = [Project[], ProjectByCurrentCategory[]];

export interface ProjectByCurrentCategory {
    uid: string;
    nameSlug: string;
}

export const useProjectsByCategory = ({
    category,
    projects,
    nameSlug,
}: HookArgs): ProjectsByCategory => {
    const otherProjects = useMemo(
        () =>
            projects.filter(
                (project) =>
                    project.subCategory === "Others" &&
                    project.category === category &&
                    project._sys.filename !== nameSlug
            ),
        [category, nameSlug, projects]
    );

    const filteredProjects = useMemo(() => {
        const filteredProjectsByCategory: ProjectByCurrentCategory[] = projects
            .filter((project) => project.category === category)
            .map((currentProject) => ({
                uid: currentProject.id,
                nameSlug: `${currentProject._sys.filename}`,
            }));

        return filteredProjectsByCategory;
    }, [projects, category]);

    return [otherProjects, filteredProjects];
};
