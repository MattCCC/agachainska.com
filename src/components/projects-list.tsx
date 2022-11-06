import { Fragment, PropsWithChildren } from "react";

import tw, { styled, css } from "twin.macro";

import { ProjectBadge } from "@domain/single-project/project-badge";

const Table = styled.ol(() => [
    tw`grid max-w-full grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-flow-col gap-x-20 gap-y-8`,
    css`
        grid-template-rows: repeat(3, minmax(0, max-content));
        line-height: 24px;
        margin-bottom: 80px;
    `,
]);

interface Props {
    nameSlug: string;
    name: string;
    category: string;
    index: number;
    cover: string;
}

export const SingleProject = ({
    nameSlug,
    name,
    category,
    index,
    cover,
}: Props) => (
    <Fragment>
        <ProjectBadge
            key={index}
            index={index}
            nameSlug={nameSlug}
            name={name}
            category={category}
            cover={cover}
        />
    </Fragment>
);

export const ProjectsList = ({
    children,
    ...props
}: PropsWithChildren<Props>) => <Table {...props}>{children}</Table>;
