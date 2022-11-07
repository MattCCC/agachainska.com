import { memo, useEffect, useRef } from "react";

import tw, { css, styled } from "twin.macro";

import useMouse from "@react-hook/mouse-position";

import { H4 } from "components/h4";
import { Link } from "components/link";
import { StyledNumber } from "domain/single-project/styled";
import { useStoreProp } from "store/index";
import { up } from "utils/screens";

interface Props {
    index: number;
    nameSlug: string;
    name: string;
    category: string;
    cover?: string;
}

interface BadgeProps {
    rowNo: number;
    colNo: number;
}

const Badge = styled.li(({ rowNo, colNo }: BadgeProps) => [
    tw`flex`,
    colNo === 1 && tw`lg:col-start-1`,
    colNo === 2 && tw`lg:col-start-2`,
    rowNo === 1 && tw`lg:row-start-1`,
    rowNo === 2 && tw`lg:row-start-2`,
    rowNo === 3 && tw`lg:row-start-3`,
    rowNo === 4 && tw`lg:row-start-4`,
]);

const BadgeNumber = styled(StyledNumber)(() => [
    tw`w-auto select-none cursor-none`,
    css`
        height: 70px;
        margin: -10px 30px -10px -40px;

        ${up("lg")} {
            height: 110px;
            width: auto;
            margin: -20px 0;
        }
    `,
]);

const ProjectLink = styled.div(() => [
    tw`flex flex-col select-none cursor-none lg:pt-3`,
]);

const ProjectTitle = styled(H4)(() => [tw`h-auto prose-24 lg:prose-30`]);

const ProjectCaption = styled.p(() => [tw`prose-16 lg:prose-24`]);

export const ProjectBadge = memo(
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

                <Link to={nameSlug}>
                    <ProjectLink>
                        <ProjectTitle>{name}</ProjectTitle>
                        <ProjectCaption>{category}</ProjectCaption>
                    </ProjectLink>
                </Link>
            </Badge>
        );
    }
);
