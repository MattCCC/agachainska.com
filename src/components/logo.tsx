import tw, { css, styled } from "twin.macro";

import { Link } from "@components/link";
import { Translate } from "@components/translate";
import { useLocation } from "@reach/router";
import { getLinkProps } from "@utils/route";

interface Props {
    showOnDesktop?: boolean;
}

const LogoWrapper = styled.div(() => [
    tw`flex items-center h-12 text-primary-color`,
]);

const SiteTitle = styled.div(
    ({ showOnDesktop }: { showOnDesktop: Props["showOnDesktop"] }) => [
        tw`hidden subpixel-antialiased select-none font-flight prose-24px text-primary-color`,
        showOnDesktop && tw`lg:block`,
        css`
            line-height: 30px;
        `,
    ]
);

const LogoIcon = styled.div(() => [
    tw`block font-extrabold text-center text-white rounded-full select-none bg-primary-color prose-16 lg:prose-18px lg:hidden`,
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
