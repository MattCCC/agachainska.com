import { memo } from "react";

import tw, { styled, css } from "twin.macro";

import { ProjectBadge } from "@domain/single-project/project-badge";
import { ProjectsByCategory } from "@hooks/use-projects-by-category";

interface Props {
    limit?: number;
    projectsByCategory: ProjectsByCategory;
}

const Table = styled.ol(() => [
    tw`grid grid-cols-1 lg:grid-cols-2 grid-flow-row lg:grid-flow-col gap-x-20 gap-y-8`,
    css`
        grid-template-rows: repeat(3, minmax(0, max-content));
        width: 827px;
        max-width: 100%;
        line-height: 24px;
        margin-bottom: 80px;
    `,
]);

export const OtherProjects = memo(
    ({ projectsByCategory, limit = 4, ...props }: Props): JSX.Element => (
        <Table {...props}>
            {projectsByCategory.others
                .slice(0, limit)
                .map(({ nameSlug, name, category }: Project, index: number) => (
                    <ProjectBadge
                        key={index}
                        index={index}
                        nameSlug={nameSlug}
                        name={name}
                        category={category}
                    />
                ))}
        </Table>
    ),
    (prev, next) =>
        prev.projectsByCategory.filteredProjects.length ===
        next.projectsByCategory.filteredProjects.length
);
