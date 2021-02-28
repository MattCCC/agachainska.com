import tw, { css, styled } from "twin.macro";
import { Link, Translate } from "@components/translate";

/**
 * Styles
 */
const SiteTitle = styled.div(() => [
    css`
        color: #020202;
        font-size: 24px;
        letter-spacing: 0;
        line-height: 30px;
    `
])

const HeaderTag = styled.header(() => [
    tw`container mx-auto flex items-center justify-between flex-wrap relative z-50`,
])

const Navigation = styled.div(() => [
    tw`py-8`,
])

const LinkItem = styled(Link)((props: LinkProps) => [
    tw`font-medium`,
    css`
        color: #0B0B0B;
        font-size: 18px;
        letter-spacing: 0;
        line-height: 20px;
        margin: 1.5rem;
        padding-bottom: 0.3rem;
    `,
    props.currentLocation === props.to && css`
        border-bottom: 3px solid #000000;
    `
])

/**
 * Interfaces
 */
interface Props {
    location: any
}

interface LinkProps {
    currentLocation: string
    to: string
}

/**
 * Component
 * @param props
 */
export function Header({ ...props }: Props) {
    
    //const [text, setText] = useState('');

    return (
        <HeaderTag {...props}>
            <SiteTitle>
                <Translate id="header.title" />
            </SiteTitle>
            <Navigation>
                <LinkItem 
                    to="/work/re-max"
                    currentLocation={location.pathname}
                >
                    <Translate id="header.link.work" />
                </LinkItem>
                <LinkItem to="/about"
                    currentLocation={location.pathname}
                >
                    <Translate id="header.link.about" />
                </LinkItem>
                <LinkItem to="/contact"
                    currentLocation={location.pathname}
                >
                    <Translate id="header.link.contact" />
                </LinkItem>
            </Navigation>
        </HeaderTag>
    );
}
