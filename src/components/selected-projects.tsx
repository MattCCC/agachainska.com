import { selectedProjectsUids } from "@data/selected-projects";

import { ProjectsList, SingleProject } from "./projects-list";

interface Props {
    projects: Project[];
}

export default function SelectedProjects({ projects }: Props) {
    const selectedProjects = projects.filter((project) =>
        selectedProjectsUids.includes(project.uid)
    );

    return (
        <ProjectsList>
            {selectedProjects.map(
                (
                    { nameSlug, name, category, cover }: Project,
                    index: number
                ) => (
                    <SingleProject
                        key={name}
                        nameSlug={nameSlug}
                        name={name}
                        category={category}
                        index={index}
                        cover={cover}
                    />
                )
            )}
        </ProjectsList>
    );
}
