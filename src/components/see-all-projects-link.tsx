import { Link } from "gatsby";
import tw, { css, styled } from "twin.macro";

import { useLocation } from "@reach/router";

import { getLinkProps } from "utils/route";

import { Button } from "./button";
import { Translate } from "./translate";

interface Props {
    screenSize: "sm" | "lg";
}

const SeeAllProjectsBtn = styled(Button)(() => [
    css`
        span {
            ${tw`bg-primary text-tertiary border-none`}
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

const SeeAllProjectsLinkMobile = styled(Link)(() => [tw`inline lg:hidden`]);

const SeeAllProjectsLinkDesktop = styled(Link)(() => [
    tw`hidden col-start-13 self-end lg:inline`,
]);

export default function SeeAllProjectsLink({ screenSize }: Props) {
    const location = useLocation();

    if (screenSize === "sm") {
        return (
            <SeeAllProjectsLinkMobile {...getLinkProps("work", location)}>
                <SeeAllProjectsBtn as="span">
                    <Translate id="seeAllProjects" />
                </SeeAllProjectsBtn>
            </SeeAllProjectsLinkMobile>
        );
    }

    return (
        <SeeAllProjectsLinkDesktop {...getLinkProps("work", location)}>
            <SeeAllProjectsBtn as="span">
                <Translate id="seeAllProjects" />
            </SeeAllProjectsBtn>
        </SeeAllProjectsLinkDesktop>
    );
}
