import { memo, useEffect } from "react";

import tw, { css, styled } from "twin.macro";
import useMouseLeave from "use-mouse-leave";

import { H4 } from "@components/h4";
import { Link } from "@components/link";
import { StyledNumber } from "@domain/single-project/styled";
import { useStoreProp } from "@store/index";
import { up } from "@utils/screens";

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
    tw`w-auto select-none`,
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
    tw`flex flex-col cursor-pointer select-none lg:pt-3`,
]);

const ProjectTitle = styled(H4)(() => [
    css`
        font-size: 24px;

        ${up("lg")} {
            height: 47px;
            font-size: 30px;
        }
    `,
]);

const ProjectCaption = styled.p(() => [
    css`
        font-size: 16px;

        ${up("lg")} {
            font-size: 24px;
        }
    `,
]);

export const ProjectBadge = memo(
    ({ index, nameSlug, name, category, cover }: Props): JSX.Element => {
        const [, dispatch] = useStoreProp("currentDelayedRoute");
        const [mouseLeft, itemsRef] = useMouseLeave();

        useEffect(() => {
            dispatch.showMotionCursor(!mouseLeft, {
                text: "explore",
                route: nameSlug,
                size: 80,
                projectCover: cover,
            });
        }, [mouseLeft, dispatch, nameSlug, cover]);

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
