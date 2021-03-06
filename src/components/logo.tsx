import tw, { css, styled } from "twin.macro";
import { Link, Translate } from "@components/translate";
import { getLinkProps } from "@utils/route";

/**
 * Styles
 */
const LogoWrapper = styled.div(() => [
    tw`w-14 lg:w-80 text-primary-color flex items-center justify-center`,
]);

const SiteTitle = styled.div(({ showOnDesktop }: Props) => [
    tw`prose-24px text-primary-color p-3 hidden`,
    showOnDesktop && tw`lg:block`,
    css`
        line-height: 30px;
    `,
]);

const LogoIcon = styled.div(() => [
    tw`rounded-full bg-primary-color text-white text-center font-extrabold prose-16px lg:prose-18px block lg:hidden`,
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
 * @param props
 */
export function Logo({ showOnDesktop = true }: Props) {
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
