import tw, { css, styled } from "twin.macro";

import { useRouter } from "next/router";

import { Link } from "components/link";
import { Translate } from "components/translate";
import { getLinkProps } from "utils/route";

interface Props {
    showOnDesktop?: boolean;
}

const LogoWrapper = styled.div(() => [tw`flex items-center h-12 text-primary`]);

const SiteTitle = styled.div(({ showOnDesktop }: Props) => [
    tw`hidden subpixel-antialiased leading-8 select-none font-flight text-[24px] text-primary`,
    showOnDesktop && tw`lg:block`,
    css`
        line-height: 30px;
    `,
]);

const LogoIcon = styled.div(() => [
    tw`block text-center rounded-full select-none font-fbold text-tertiary bg-primary text-[18px] lg:leading-5 lg:hidden`,
    css`
        width: 48px;
        height: 48px;
        line-height: 48px;
    `,
]);

export function Logo({ showOnDesktop = true }: Props) {
    const location = useRouter();
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
