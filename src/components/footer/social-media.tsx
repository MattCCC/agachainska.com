import tw, { css, styled } from "twin.macro";

import { up } from "@utils/screens";

const SocialMediaWrapper = styled.div(() => [
    tw`w-56 lg:w-auto flex items-center`,
    css``,
]);

const ListItem = styled.div(() => [
    tw`border border-white prose-18px text-center text-white`,
    css`
        height: 40px;
        line-height: 40px;
        width: 40px;
        margin: 0 20px;

        ${up("lg")} {
            margin: 0 10px;
        }
    `,
    tw`hover:bg-white hover:text-primary-color transition-all`,
]);

interface Item {
    name: string;
    url: string;
}

interface Props {
    items?: Item[];
}

export function SocialMedia({ items = [] }: Props): JSX.Element {
    return (
        <SocialMediaWrapper>
            {items.map((item, itemIndex: number) => (
                <a
                    href={item.url}
                    rel="nofollow noreferrer"
                    target="_blank"
                    key={itemIndex}
                >
                    <ListItem>{item.name}</ListItem>
                </a>
            ))}
        </SocialMediaWrapper>
    );
}
