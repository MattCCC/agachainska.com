import tw, { css, styled } from "twin.macro";

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
    tw`inline-block leading-5 text-center text-white border border-white select-none prose-18`,
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
    tw`m-[0_20px] lg:m-[0_10px]`,
    tw`transition-all hover:bg-white hover:text-black`,
]);

export function SocialMedia({ variant = "normal", items = [] }: Props) {
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
