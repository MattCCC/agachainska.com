import tw, { css, styled } from "twin.macro";

import { up } from "@utils/screens";

interface Item {
    name: string;
    url: string;
}

interface Props {
    items?: Item[];
    variant?: "normal" | "big";
}

const SocialMediaWrapper = styled.div(() => [tw`flex items-center`, css``]);

const ListItem = styled.a(({ variant }: Props) => [
    tw`inline-block text-center text-white border border-white select-none prose-18px`,
    variant === "normal" &&
        css`
            height: 40px;
            line-height: 40px;
            width: 40px;
        `,
    variant === "big" &&
        css`
            height: 61px;
            line-height: 61px;
            width: 61px;
        `,
    variant === "big" && tw`prose-24`,
    css`
        margin: 0 20px;

        ${up("lg")} {
            margin: 0 10px;
        }
    `,
    tw`transition-all`,
]);

export function SocialMedia({
    variant = "normal",
    items = [],
}: Props): JSX.Element {
    return (
        <SocialMediaWrapper>
            {items.map((item, itemIndex: number) => (
                <ListItem
                    href={item.url}
                    rel="nofollow noreferrer"
                    target="_blank"
                    key={itemIndex}
                    variant={variant}
                >
                    {item.name}
                </ListItem>
            ))}
        </SocialMediaWrapper>
    );
}
