import { useCallback, useContext } from "react";
import tw, { css, styled } from "twin.macro";
import { Link, Translate } from "@components/translate";
import { getLinkProps, LinkProps } from "@utils/route";
import { Logo } from "@components/logo";
import { LinkStateContext } from "@store/link-context";

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
    location: Location;
    showLogoOnDesktop?: boolean;
}

type LinkContext = (arg0: { isHovered?: boolean }) => void;

/**
 * Component
 * @param props
 */
export function Header({
    showLogoOnDesktop = true,
    location,
}: Props): JSX.Element {
    const linkContext = useContext(LinkStateContext);
    const setLinkContext = linkContext.setLinkContext as LinkContext;

    const onMouseEnter = useCallback((): void => {
        if (linkContext.isHovered) {
            return;
        }

        setLinkContext({
            isHovered: true,
        });
    }, [linkContext, setLinkContext]);

    const onMouseLeave = useCallback((): void => {
        if (!linkContext.isHovered) {
            return;
        }

        setLinkContext({
            isHovered: false,
        });
    }, [linkContext, setLinkContext]);

    return (
        <HeaderWrapper>
            <Logo showOnDesktop={showLogoOnDesktop} location={location} />
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
