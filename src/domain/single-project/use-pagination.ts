import { useCallback, useEffect, useState } from "react";

import { ProjectByCurrentCategory } from "hooks/use-projects-by-category";

interface Pagination {
    hasPreviousButton: boolean;
    hasNextButton: boolean;
    previousTo: string;
    nextTo: string;
}

interface Args {
    projects: ProjectByCurrentCategory[];
    uid: string;
}

export const usePagination = ({ projects, uid }: Args): Pagination[] => {
    const [navigation, setNavigation] = useState({
        hasPreviousButton: false,
        hasNextButton: false,
    } as Pagination);

    const onPaginate = useCallback(
        (num: number): Pagination["previousTo"] | Pagination["nextTo"] => {
            if (!projects || projects.length === 0) {
                return "";
            }

            const projectIndex = projects.findIndex(
                (currentProject) => currentProject.uid === uid
            );

            if (projectIndex <= -1 || !projects[projectIndex + num]) {
                return "";
            }

            const { nameSlug } = projects[projectIndex + num];

            return nameSlug;
        },
        [projects, uid]
    );

    useEffect(() => {
        if (!projects || projects.length === 0) {
            return;
        }

        const previousTo = onPaginate(-1);
        const nextTo = onPaginate(1);

        setNavigation({
            previousTo,
            nextTo,
            hasPreviousButton: projects[0]?.uid !== uid,
            hasNextButton: projects[projects.length - 1]?.uid !== uid,
        });
    }, [onPaginate, projects, uid]);

    return [navigation];
};
