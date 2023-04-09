import { useCallback, useEffect, useState } from "react";

import { ProjectsByCategory } from "hooks/use-projects-by-category";

interface Pagination {
    hasPreviousButton: boolean;
    hasNextButton: boolean;
    previousTo: string;
    nextTo: string;
}

interface Args {
    projectsByCategory: ProjectsByCategory;
    uid: number;
}

export const usePagination = ({
    projectsByCategory,
    uid,
}: Args): Pagination[] => {
    const [navigation, setNavigation] = useState({
        hasPreviousButton: false,
        hasNextButton: false,
    } as Pagination);

    const onPaginate = useCallback(
        (num: number): Pagination["previousTo"] | Pagination["nextTo"] => {
            const projectsList = projectsByCategory.filteredProjects;

            if (projectsList.length === 0) {
                return "";
            }

            const projectIndex = projectsList.findIndex(
                (currentProject) => currentProject.uid === uid
            );

            if (projectIndex <= -1 || !projectsList[projectIndex + num]) {
                return "";
            }

            const { nameSlug } = projectsList[projectIndex + num];

            return nameSlug;
        },
        [projectsByCategory, uid]
    );

    useEffect(() => {
        const projectsList = projectsByCategory.filteredProjects;

        if (projectsList.length === 0) {
            return;
        }

        const previousTo = onPaginate(-1);
        const nextTo = onPaginate(1);

        setNavigation({
            previousTo,
            nextTo,
            hasPreviousButton: projectsList[0]?.uid !== uid,
            hasNextButton: projectsList[projectsList.length - 1]?.uid !== uid,
        });
    }, [onPaginate, projectsByCategory, uid]);

    return [navigation];
};
