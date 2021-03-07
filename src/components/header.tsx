import { useContext } from "react";
import tw, { css, styled } from "twin.macro";
import { Link, Translate } from "@components/translate";
import { getLinkProps, LinkProps } from "@utils/route";
import { Logo } from "@components/logo";
import { LinkDispatchContext, LinkStateContext } from "@store/link-context";

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
    tw`font-medium text-primary-color border-primary-color prose-18px relative select-none`,
    isCurrentPage && tw`border-b-2`,
    isCurrentPage &&
        css`
            margin-bottom: -2px;
        `,
    css`
        & > ::before {
            bottom: -0.15rem;
            content: "";
            height: 0.15rem;
            left: 0;
            position: absolute;
            transform: scaleX(0);
            transform-origin: right top 0;
            transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
            width: 100%;
            background-color: hsla(0, 0%, 100%, 0.6);
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

/**
 * Component
 * @param props
 */
export function Header({
    showLogoOnDesktop = true,
    location,
}: Props): JSX.Element {
    const setLinkContext = useContext(LinkDispatchContext);
    const linkContext = useContext(LinkStateContext);

    const onMouseEnter = (): void => {
        if (linkContext.isHovered) {
            return;
        }

        setLinkContext({
            isHovered: true,
        });
    };

    const onMouseLeave = (): void => {
        if (!linkContext.isHovered) {
            return;
        }

        setLinkContext({
            isHovered: false,
        });
    };

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
