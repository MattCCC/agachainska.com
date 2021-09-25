import { useEffect } from "react";

import { Item } from "@components/timeline";

interface OtherProject {
    category: string;
    projects?: Item[];
}

interface Props {
    otherProjects: OtherProject[];
    activeSectionId: string;
}

export default function OtherProjects({otherProjects, activeSectionId}: Props) {

    const currentCategoryProjects = otherProjects.filter((section) => section.category === activeSectionId).map((section) => section.projects);

    useEffect(() => {
        console.log(otherProjects);

        console.log(currentCategoryProjects[0]);
    });

    return <div>The other projects</div>;
}
