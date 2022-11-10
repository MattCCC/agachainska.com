import { memo } from "react";

import SeeAllProjectsLink from "components/see-all-projects-link";
import { SingleProject, ProjectsList } from "components/single-project";
import { ProjectsByCategory } from "hooks/use-projects-by-category";

interface Props {
    limit?: number;
    projectsByCategory: ProjectsByCategory;
}

export const OtherProjects = memo(
    ({ projectsByCategory, limit = 4, ...props }: Props) => (
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
            <SeeAllProjectsLink screenSize="sm" />
        </ProjectsList>
    ),
    (prev, next) =>
        prev.projectsByCategory.filteredProjects.length ===
        next.projectsByCategory.filteredProjects.length
);
