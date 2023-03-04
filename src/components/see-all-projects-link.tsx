import tw, { css, styled } from "twin.macro";

import NextLink from "next/link";
import { useRouter } from "next/router";

import { getLinkProps } from "utils/route";
import { excludeProps } from "utils/styled";

import { Button } from "./button";
import { Translate } from "./translate";

interface Props {
    screenSize: "sm" | "lg";
}

const SeeAllProjectsBtn = styled(Button)(() => [
    css`
        span {
            ${tw`border-none bg-primary text-tertiary`}
        }

        div {
            ${tw`top-[0px]`}
        }

        span,
        div {
            ${tw`w-[160px] h-[37px]`}
        }
    `,
]);

const SeeAllProjectsLinkContainer = styled(
    NextLink,
    excludeProps(["screenSize"])
)(({ screenSize }: Props) => [
    screenSize === "sm" && tw`inline lg:hidden`,
    screenSize === "lg" && tw`self-end hidden col-start-13 lg:inline`,
]);

export default function SeeAllProjectsLink({ screenSize }: Props) {
    const location = useRouter();
    const linkProps = getLinkProps("work", location);

    return (
        <SeeAllProjectsLinkContainer
            {...linkProps}
            href={linkProps.to}
            screenSize={screenSize}
        >
            <SeeAllProjectsBtn as="span">
                <Translate id="seeAllProjects" />
            </SeeAllProjectsBtn>
        </SeeAllProjectsLinkContainer>
    );
}
