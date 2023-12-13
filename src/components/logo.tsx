import tw, { css, styled } from "twin.macro";
import { useStoreProp } from "store/index";

import { useRouter } from "next/router";

import { Link } from "components/link";
import { Translate } from "components/translate";
import { getLinkProps } from "utils/route";

const LogoWrapper = styled.div(() => [tw`flex items-center h-12 text-primary`]);

const SiteTitle = styled.div(() => [
    tw`subpixel-antialiased select-none font-flight text-[24px] text-primary leading-[30px]`,
]);

const LogoIcon = styled.div(() => [
    tw`block text-center rounded-full select-none font-fbold text-tertiary bg-primary text-[18px] lg:leading-5 lg:hidden`,
    css`
        width: 48px;
        height: 48px;
        line-height: 48px;
    `,
]);

export function Logo() {
    const [showLogoOnDesktop] = useStoreProp("showLogoOnDesktop");
    const location = useRouter();
    const homeLink = getLinkProps("home", location);

    return (
        <LogoWrapper>
            <SiteTitle
                className={showLogoOnDesktop ? "hidden lg:block" : "hidden"}
            >
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
