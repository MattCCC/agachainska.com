import { memo } from "react";

import SeeAllProjectsLink from "components/see-all-projects-link";
import { SingleProject, ProjectsList } from "components/single-project";
import { Project } from "types/project";

interface Props {
    limit?: number;
    otherProjects: Project[] | null;
}

export const OtherProjects = memo(({ otherProjects, limit = 4 }: Props) => {
    if (!otherProjects) {
        return null;
    }

    return (
        <ProjectsList>
            {otherProjects
                .slice(0, limit)
                .map(
                    (
                        { _sys, name, category, cover }: Project,
                        index: number
                    ) => (
                        <SingleProject
                            key={index}
                            nameSlug={_sys.filename}
                            name={name}
                            category={category}
                            index={index}
                            cover={cover}
                        />
                    )
                )}
            <SeeAllProjectsLink screenSize="sm" />
        </ProjectsList>
    );
});
