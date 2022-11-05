import tw, { css, styled } from "twin.macro";

import { useLocation } from "@reach/router";

import { Link } from "@components/link";
import { Translate } from "@components/translate";
import { getLinkProps } from "@utils/route";

interface Props {
    showOnDesktop?: boolean;
}

const LogoWrapper = styled.div(() => [tw`flex items-center h-12 text-primary`]);

const SiteTitle = styled.div(({ showOnDesktop }: Props) => [
    tw`hidden subpixel-antialiased leading-8 select-none font-flight prose-24 text-primary`,
    showOnDesktop && tw`lg:block`,
    css`
        line-height: 30px;
    `,
]);

const LogoIcon = styled.div(() => [
    tw`block text-center rounded-full select-none font-fbold text-tertiary bg-primary prose-18 lg:leading-5 lg:hidden`,
    css`
        width: 48px;
        height: 48px;
        line-height: 48px;
    `,
]);

export function Logo({ showOnDesktop = true }: Props): JSX.Element {
    const location = useLocation();
    const homeLink = getLinkProps("home", location);

    return (
        <LogoWrapper>
            <SiteTitle showOnDesktop={showOnDesktop}>
                <Link {...homeLink}>
                    <Translate id="header.title" />
                </Link>
            </SiteTitle>
            <LogoIcon>
                <Link {...homeLink}>
                    <Translate id="header.logo.title" />
                </Link>
            </LogoIcon>
        </LogoWrapper>
    );
}
