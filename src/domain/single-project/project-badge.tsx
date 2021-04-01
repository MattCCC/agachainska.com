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
}

const Badge = styled.li(() => [tw`flex`]);

const BadgeNumber = styled(StyledNumber)(() => [
    css`
        height: 70px;
        width: auto;
        margin: -10px 30px -10px -40px;

        ${up("lg")} {
            height: 92px;
            width: auto;
            margin: -20px 0;
        }
    `,
]);

const ProjectLink = styled.div(() => [
    tw`flex flex-col select-none cursor-pointer`,
]);

const ProjectTitle = styled(H4)(() => [
    css`
        font-size: 24px;

        ${up("lg")} {
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
    ({ index, nameSlug, name, category }: Props): JSX.Element => {
        const [, dispatch] = useStoreProp("currentDelayedRoute");
        const [mouseLeft, itemsRef] = useMouseLeave();

        useEffect(() => {
            dispatch.showMotionCursor(!mouseLeft);
        }, [mouseLeft, dispatch]);

        return (
            <Badge
                ref={itemsRef}
                className={`lg:col-start-${
                    index % 2 === 0 ? 1 : 2
                } lg:row-start-${index + 1}`}
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
