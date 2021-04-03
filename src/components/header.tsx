import tw, { css, styled } from "twin.macro";

import { Link } from "@components/link";
import { Logo } from "@components/logo";
import { useHideCursorPreserveVisibility } from "@components/motion-cursor";
import { Translate } from "@components/translate";
import { useLocation } from "@reach/router";
import { getLinkProps, LinkProps } from "@utils/route";
import { up } from "@utils/screens";

interface Props {
    showLogoOnDesktop?: boolean;
}

const HeaderWrapper = styled.header(() => [
    tw`mx-auto flex items-center justify-between flex-wrap absolute top-0 z-50 lg:py-6`,
    css`
        max-width: 1213px;
        left: 15px;
        right: 15px;
        padding: 15px 0;
    `,
]);

const Navigation = styled.nav(() => [
    tw`w-56 lg:w-auto flex items-center justify-end`,
    css`
        line-height: 48px;
        gap: 40px;

        ${up("lg")} {
            gap: 56px;
        }
    `,
]);

const LinkItem = styled(Link)(({ isCurrentPage }: LinkProps) => [
    tw`relative font-medium text-primary-color prose-18px select-none`,
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
            bottom: -2px;
            content: "";
            height: 2px;
            left: 0;
            position: absolute;
            transform: scaleX(0);
            transform-origin: right top 0;
            transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
            width: 100%;
            background-color: var(--primary-color);
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

export function Header({ showLogoOnDesktop = true }: Props): JSX.Element {
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
