import tw, { css, styled } from "twin.macro";
import { Link, Translate } from "@components/translate";
import { excludeProps } from "@utils/styled";
import { getLinkProps, LinkProps } from "@utils/route";

/**
 * Styles
 */
const SiteTitle = styled.div(() => [
    tw`text-primary-color p-3`,
    css`
        font-size: 24px;
        letter-spacing: 0;
        line-height: 30px;
    `,
]);

const HeaderSubject = styled.div(() => [
    tw`w-14 lg:w-80 text-primary-color flex items-center justify-center`,
    css`
        font-size: 24px;
        letter-spacing: 0;
        line-height: 30px;
    `,
]);

const HeaderWrapper = styled.header(() => [
        tw`container mx-auto flex h-12 items-center justify-between flex-wrap absolute top-0 left-0 right-0 z-50 p-2 lg:p-6`,
]);

const Navigation = styled.div(() => [
    tw`w-56 lg:w-96 space-x-6 lg:space-x-3 flex justify-evenly`,
]);

const LinkItem = styled(
    Link,
    excludeProps(["isCurrentPage"])
)(({ isCurrentPage }: LinkProps) => [
    tw`font-medium text-primary-color border-primary-color`,
    css`
        font-size: 18px;
        letter-spacing: 0;
        line-height: 20px;
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
    Logo?: Function;
}

/**
 * Component
 * @param props
 */
export function Header({ hasSiteTitle = false, Logo, location }: Props) {
    const titleClasses = hasSiteTitle ? `hidden lg:block` : `hidden`;

    return (
        <HeaderWrapper>
            <HeaderSubject>
                <span className={titleClasses}>
                    <SiteTitle>
                        <Translate id="header.title" />
                    </SiteTitle>
                </span>
            {Logo && (
                <span className="block lg:hidden">
                    <Logo />
                </span>
            )}
            </HeaderSubject>
            <Navigation>
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
