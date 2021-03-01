import tw, { css, styled } from "twin.macro";
import { Link, Translate } from "@components/translate";
import routes from "@config/routes";

/**
 * Styles
 */
const SiteTitle = styled.div(() => [
    tw`text-primary-color`,
    css`
        font-size: 24px;
        letter-spacing: 0;
        line-height: 30px;
    `,
]);

const HeaderWrapper = styled.header(({ hasSiteTitle }: HeaderWrapperProps) => [
    tw`container mx-auto flex items-center justify-between flex-wrap absolute top-0 left-0 right-0 z-50`,
    !hasSiteTitle && tw`flex-row-reverse`,
]);

const Navigation = styled.div(() => [tw`py-8`]);

const LinkItem = styled(Link)(({ isCurrentPage }: LinkProps) => [
    tw`font-medium text-primary-color border-primary-color`,
    css`
        font-size: 18px;
        letter-spacing: 0;
        line-height: 20px;
        margin: 1.5rem;
        padding-bottom: 0.3rem;
    `,
    isCurrentPage && tw`border-b-2`,
]);

/**
 * Interfaces
 */
interface Props {
    location: any;
    hasSiteTitle?: boolean;
}

interface LinkProps {
    isCurrentPage: boolean;
}

interface HeaderWrapperProps {
    hasSiteTitle?: boolean;
}

/**
 * Component
 * @param props
 */
export function Header({ hasSiteTitle, location }: Props) {
    //const [text, setText] = useState('');

    return (
        <HeaderWrapper hasSiteTitle={hasSiteTitle}>
            {hasSiteTitle && (
                <SiteTitle>
                    <Translate id="header.title" />
                </SiteTitle>
            )}
            <Navigation>
                <LinkItem
                    to={routes.work.path}
                    isCurrentPage={location.pathname === routes.work.path}
                >
                    <Translate id="header.link.work" />
                </LinkItem>
                <LinkItem
                    to={routes.about.path}
                    isCurrentPage={location.pathname === routes.about.path}
                >
                    <Translate id="header.link.about" />
                </LinkItem>
                <LinkItem
                    to={routes.contact.path}
                    isCurrentPage={location.pathname === routes.contact.path}
                >
                    <Translate id="header.link.contact" />
                </LinkItem>
            </Navigation>
        </HeaderWrapper>
    );
}
