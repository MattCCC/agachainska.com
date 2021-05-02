import tw, { css, styled } from "twin.macro";

import { Link } from "@components/link";
import { Logo } from "@components/logo";
import { useHideCursorPreserveVisibility } from "@components/motion-cursor";
import { Translate } from "@components/translate";
import { useLocation } from "@reach/router";
import { useStoreProp } from "@store/index";
import { getLinkProps, LinkProps } from "@utils/route";
import { up } from "@utils/screens";

const HeaderWrapper = styled.header(() => [
    tw`absolute top-0 z-50 flex flex-wrap items-center justify-between mx-auto lg:py-6`,
    css`
        max-width: 1213px;
        left: 15px;
        right: 15px;
        padding: 15px 0;
    `,
]);

const Navigation = styled.nav(() => [
    tw`flex items-center justify-end w-56 lg:w-auto`,
    css`
        line-height: 48px;
        gap: 40px;

        ${up("lg")} {
            gap: 56px;
        }
    `,
]);

const LinkItem = styled(Link)(({ isCurrentPage }: LinkProps) => [
    tw`relative font-medium select-none text-primary-color prose-18px`,
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
            ${tw`absolute left-0 w-full bg-primary-color`}
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

export function Header(): JSX.Element {
    const [showLogoOnDesktop] = useStoreProp("showLogoOnDesktop");
    const [onMouseEnter, onMouseLeave] = useHideCursorPreserveVisibility();
    const location = useLocation();

    return (
        <HeaderWrapper>
            <Logo showOnDesktop={showLogoOnDesktop} />
            <Navigation onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <LinkItem {...getLinkProps("work", location)}>
                    <Translate id="header.link.work" />
                </LinkItem>
                <LinkItem {...getLinkProps("about", location)}>
                    <Translate id="header.link.about" />
                </LinkItem>
                <LinkItem {...getLinkProps("contact", location)}>
                    <Translate id="header.link.contact" />
                </LinkItem>
            </Navigation>
        </HeaderWrapper>
    );
}
