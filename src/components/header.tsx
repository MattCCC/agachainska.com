import tw, { css, styled } from "twin.macro";

import { useRouter } from "next/router";

import { Link } from "components/link";
import { Logo } from "components/logo";
import { useHideCursorPreserveVisibility } from "components/motion-cursor";
import { Translate } from "components/translate";
import { useStoreProp } from "store/index";
import { getLinkProps, LinkProps } from "utils/route";

const HeaderWrapper = styled.header(() => [
    tw`absolute top-0 z-50 flex flex-wrap items-center justify-between mx-auto max-w-screen-2xl pb-[15px] px-0`,
    css`
        left: 15px;
        right: 15px;
        padding-top: calc(env(safe-area-inset-top) + 15px);
    `,
]);

const Navigation = styled.nav(() => [
    tw`flex items-center justify-end w-56 leading-12 gap-10 lg:gap-14 lg:w-auto`,
]);

const LinkItem = styled(Link)(({ isCurrentPage }: LinkProps) => [
    tw`relative font-medium leading-5 select-none text-primary prose-18`,
    css`
        line-height: 48px;
    `,
    css`
        &:hover:before {
            transform: scaleX(1);
            transform-origin: left top 0;
        }
    `,
    css`
        &::before {
            ${tw`absolute left-0 w-full bg-primary`}
            bottom: 5px;
            content: "";
            height: 2px;
            transform: scaleX(0);
            transform-origin: right top 0;
            transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
        }
    `,
    isCurrentPage &&
        css`
            &:before {
                transform: scaleX(1);
                transform-origin: left top 0;
            }
        `,
]);

export function Header() {
    const [showLogoOnDesktop] = useStoreProp("showLogoOnDesktop");
    const [onMouseEnter, onMouseLeave] = useHideCursorPreserveVisibility();
    const router = useRouter();

    return (
        <HeaderWrapper>
            <Logo showOnDesktop={showLogoOnDesktop} />
            <Navigation onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <LinkItem {...getLinkProps("work", router)}>
                    <Translate id="header.link.work" />
                </LinkItem>
                <LinkItem {...getLinkProps("about", router)}>
                    <Translate id="header.link.about" />
                </LinkItem>
                <LinkItem {...getLinkProps("contact", router)}>
                    <Translate id="header.link.contact" />
                </LinkItem>
            </Navigation>
        </HeaderWrapper>
    );
}
