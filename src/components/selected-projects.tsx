import SeeAllProjectsLink from "./see-all-projects-link";
import { ProjectsList, SingleProject } from "./single-project";
import { Project } from "types/project";

interface Props {
    projects: Project[];
    limit: number;
}

export default function SelectedProjects({ projects, limit = 4 }: Props) {
    return (
        <ProjectsList>
            {projects
                .slice(0, limit)
                .map(
                    (
                        { _sys, name, category, cover }: Project,
                        index: number
                    ) => (
                        <SingleProject
                            key={name}
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
}
