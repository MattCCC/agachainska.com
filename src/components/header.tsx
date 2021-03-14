import { useCallback } from "react";
import tw, { css, styled } from "twin.macro";
import { Link } from "@components/link";
import { Translate } from "@components/translate";
import { getLinkProps, LinkProps } from "@utils/route";
import { Logo } from "@components/logo";
import { useStore } from "@store/index";
import { useLocation } from "@reach/router";

/**
 * Styles
 */
const HeaderWrapper = styled.header(() => [
    tw`container mx-auto flex items-center justify-between flex-wrap absolute top-0 left-0 right-0 z-50 py-2 lg:py-6`,
]);

const Navigation = styled.div(() => [
    tw`w-56 lg:w-96 space-x-6 lg:space-x-3 flex items-center justify-evenly`,
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

/**
 * Interfaces
 */
interface Props {
    showLogoOnDesktop?: boolean;
}

/**
 * Component
 * @param props
 */
export function Header({ showLogoOnDesktop = true }: Props): JSX.Element {
    const [state, dispatch] = useStore();
    const location = useLocation();

    const onMouseEnter = useCallback((): void => {
        if (!state.isHovered) {
            dispatch.hoverLink(true);
        }
    }, [state, dispatch]);

    const onMouseLeave = useCallback((): void => {
        if (state.isHovered) {
            dispatch.hoverLink(false);
        }
    }, [state, dispatch]);

    return (
        <HeaderWrapper>
            <Logo showOnDesktop={showLogoOnDesktop} />
            <Navigation>
                <LinkItem
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    {...getLinkProps("work", location)}
                >
                    <Translate id="header.link.work" />
                </LinkItem>
                <LinkItem
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    {...getLinkProps("about", location)}
                >
                    <Translate id="header.link.about" />
                </LinkItem>
                <LinkItem
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    {...getLinkProps("contact", location)}
                >
                    <Translate id="header.link.contact" />
                </LinkItem>
            </Navigation>
        </HeaderWrapper>
    );
}
