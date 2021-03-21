import { useCallback, useState } from "react";
import tw, { css, styled } from "twin.macro";
import { Link } from "@components/link";
import { Translate } from "@components/translate";
import { getLinkProps, LinkProps } from "@utils/route";
import { Logo } from "@components/logo";
import { useStore } from "@store/index";
import { useLocation } from "@reach/router";
import { up } from "@utils/screens";

/**
 * Styles
 */
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
    tw`w-56 lg:w-96 flex items-center justify-end`,
]);

const LinkItem = styled(Link)(({ isCurrentPage }: LinkProps) => [
    tw`relative font-medium text-primary-color prose-18px select-none`,
    css`
        line-height: 48px;
        margin-left: 40px;

        ${up("lg")} {
            margin-left: 56px;
        }
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
    const [
        isMotionCursorVisibleCache,
        setIsMotionCursorVisibleCache,
    ] = useState(false);
    const location = useLocation();

    const onMouseEnter = useCallback((): void => {
        const isVisible = !state.isMotionCursorHidden;

        if (isVisible) {
            setIsMotionCursorVisibleCache(isVisible);
            dispatch.hideMotionCursor(true);
        }
    }, [dispatch, state.isMotionCursorHidden]);

    const onMouseLeave = useCallback((): void => {
        if (isMotionCursorVisibleCache) {
            setIsMotionCursorVisibleCache(false);
            dispatch.hideMotionCursor(false);
        }
    }, [dispatch, isMotionCursorVisibleCache]);

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
