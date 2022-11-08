import { memo, useEffect, useRef } from "react";

import tw, { styled, css } from "twin.macro";

import useMouse from "@react-hook/mouse-position";

import { BigNumber } from "components/big-number";
import { H4 } from "components/h4";
import { Link } from "components/link";
import { useStoreProp } from "store/index";
import { up } from "utils/screens";

interface Props {
    nameSlug: string;
    name: string;
    category: string;
    index: number;
    cover: string;
}

interface BadgeProps {
    rowNo: number;
    colNo: number;
}

export const ProjectsList = styled.ol(() => [
    tw`grid max-w-full grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-flow-col gap-x-20 gap-y-8`,
    css`
        grid-template-rows: repeat(3, minmax(0, max-content));
        line-height: 24px;
        margin-bottom: 80px;
    `,
]);

const StyledNumber = styled(BigNumber)(() => [
    tw`max-w-full translate-x-1/2`,
    tw`w-[150px] lg:w-[136px] lg:h-[117px] lg:transform-none`,
]);

const Badge = styled.li(({ rowNo, colNo }: BadgeProps) => [
    tw`flex flex-row items-stretch`,
    colNo === 1 && tw`lg:col-start-1`,
    colNo === 2 && tw`lg:col-start-2`,
    rowNo === 1 && tw`lg:row-start-1`,
    rowNo === 2 && tw`lg:row-start-2`,
    rowNo === 3 && tw`lg:row-start-3`,
    rowNo === 4 && tw`lg:row-start-4`,
]);

const BadgeNumber = styled(StyledNumber)(() => [
    tw`w-[110px] select-none cursor-none`,
    css`
        height: 70px;
        margin: -10px 30px -10px -40px;

        ${up("lg")} {
            height: 110px;
            margin: -20px 0;
        }
    `,
]);

const ProjectLink = styled.span(() => [
    tw`flex flex-col select-none cursor-none lg:pt-3`,
]);

const ProjectTitle = styled(H4)(() => [tw`h-auto prose-24 lg:prose-30`]);

const ProjectCaption = styled.p(() => [tw`prose-16 lg:prose-24`]);

export const SingleProject = memo(
    ({ index, nameSlug, name, category, cover }: Props) => {
        const itemsRef = useRef(null);
        const mouse = useMouse(itemsRef, {
            enterDelay: 30,
            leaveDelay: 30,
        });

        const [, { showMotionCursor }] = useStoreProp("showMotionCursor");

        useEffect(() => {
            const isMouseOver = Boolean(mouse.elementWidth);

            showMotionCursor(isMouseOver, {
                text: "explore",
                route: nameSlug,
                size: 80,
                projectCover: cover,
                overlap: false,
            });
        }, [cover, mouse.elementWidth, nameSlug, showMotionCursor]);

        return (
            <Badge
                ref={itemsRef}
                rowNo={index + 1}
                colNo={index % 2 === 0 ? 1 : 2}
            >
                <BadgeNumber value={`${index + 1}.`} />

                <Link to={nameSlug} tw="inline-block w-full">
                    <ProjectLink>
                        <ProjectTitle>{name}</ProjectTitle>
                        <ProjectCaption>{category}</ProjectCaption>
                    </ProjectLink>
                </Link>
            </Badge>
        );
    }
);
