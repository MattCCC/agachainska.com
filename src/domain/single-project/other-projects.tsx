import { memo } from "react";

import { SingleProject, ProjectsList } from "@components/projects-list";
import { ProjectsByCategory } from "@hooks/use-projects-by-category";

interface Props {
    limit?: number;
    projectsByCategory: ProjectsByCategory;
}

export const OtherProjects = memo(
    ({ projectsByCategory, limit = 4, ...props }: Props): JSX.Element => (
        <ProjectsList {...props}>
            {projectsByCategory.others
                .slice(0, limit)
                .map(
                    (
                        { nameSlug, name, category, cover }: Project,
                        index: number
                    ) => (
                        <SingleProject
                            key={index}
                            nameSlug={nameSlug}
                            name={name}
                            category={category}
                            index={index}
                            cover={cover}
                        />
                    )
                )}
        </ProjectsList>
    ),
    (prev, next) =>
        prev.projectsByCategory.filteredProjects.length ===
        next.projectsByCategory.filteredProjects.length
);
