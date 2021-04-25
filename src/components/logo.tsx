import tw, { css, styled } from "twin.macro";

import { Link } from "@components/link";
import { Translate } from "@components/translate";
import { useLocation } from "@reach/router";
import { getLinkProps } from "@utils/route";

/**
 * Styles
 */
const LogoWrapper = styled.div(() => [
    tw`flex items-center text-primary-color h-12`,
]);

const SiteTitle = styled.div(
    ({ showOnDesktop }: { showOnDesktop: Props["showOnDesktop"] }) => [
        tw`prose-24px text-primary-color hidden select-none`,
        showOnDesktop && tw`lg:block`,
        css`
            line-height: 30px;
        `,
    ]
);

const LogoIcon = styled.div(() => [
    tw`rounded-full bg-primary-color text-white text-center font-extrabold prose-16 lg:prose-18px block lg:hidden select-none`,
    css`
        width: 48px;
        height: 48px;
        line-height: 48px;
    `,
]);

/**
 * Interfaces
 */
interface Props {
    showOnDesktop?: boolean;
}

/**
 * Component
 */
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
