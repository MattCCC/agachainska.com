import tw, { css, styled } from "twin.macro";
import { Link, Translate } from "@components/translate";
import { getLinkProps } from "@utils/route";

/**
 * Styles
 */
const LogoWrapper = styled.div(() => [
    tw`flex items-center text-primary-color h-12`,
]);

const SiteTitle = styled.div(
    ({ showOnDesktop }: { showOnDesktop: Props["showOnDesktop"] }) => [
        tw`prose-24px text-primary-color hidden`,
        showOnDesktop && tw`lg:block`,
        css`
            line-height: 30px;
            user-select: none;
        `,
    ]
);

const LogoIcon = styled.div(() => [
    tw`rounded-full bg-primary-color text-white text-center font-extrabold prose-16px lg:prose-18px block lg:hidden`,
    css`
        width: 48px;
        height: 48px;
        line-height: 48px;
        user-select: none;
    `,
]);

/**
 * Interfaces
 */
interface Props {
    location: Location;
    showOnDesktop?: boolean;
}

/**
 * Component
 * @param props
 */
export function Logo({ showOnDesktop = true, location }: Props): JSX.Element {
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
