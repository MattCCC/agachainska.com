import { ProjectsList, SingleProject } from "./projects-list";


interface Props {
    projects: Project[];
}

const selectedProjectsUids = [8, 9, 10, 11];

export default function SelectedProjects({ projects }: Props): JSX.Element {

    const selectedProjects = projects.filter((project) =>
        selectedProjectsUids.includes(project.uid)
    );

    return (
        <ProjectsList>
            {selectedProjects
            .map(({nameSlug, name, category}: Project, index: number) => (
                <SingleProject
                    nameSlug={nameSlug}
                    name={name}
                    category={category}
                    index={index}
                />
            ))}
        </ProjectsList>
    );
}
