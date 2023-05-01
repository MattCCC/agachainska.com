import SeeAllProjectsLink from "./see-all-projects-link";
import { ProjectsList, SingleProject } from "./single-project";
import { Project } from "types/project";

interface Props {
    projects: Project[];
}

export default function SelectedProjects({ projects }: Props) {
    return (
        <ProjectsList>
            {projects.map(
                ({ _sys, name, category, cover }: Project, index: number) => (
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
