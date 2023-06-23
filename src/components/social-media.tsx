import { ConfigurationPage } from "queries/fetch-social-media-data";
import tw, { css, styled } from "twin.macro";

interface Props {
    items?: ConfigurationPage["socialMedia"];
    variant?: "normal" | "big";
}

const SocialMediaWrapper = styled.div(() => [tw`flex items-center`, css``]);

const ListItem = styled.a(({ variant }: Props) => [
    tw`inline-block leading-5 text-center text-white border border-white select-none text-[18px]`,
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
    variant === "big" && tw`text-[24px]`,
    tw`m-[0_20px] lg:m-[0_10px]`,
    tw`transition-all hover:bg-white hover:text-black`,
]);

export function SocialMedia({ variant = "normal", items = [] }: Props) {
    if (!items) {
        return null;
    }

    return (
        <SocialMediaWrapper>
            {items.map((item, itemIndex: number) => (
                <ListItem
                    href={item?.link || ""}
                    rel="nofollow noreferrer"
                    target="_blank"
                    key={itemIndex}
                    variant={variant}
                >
                    {item?.name || ""}
                </ListItem>
            ))}
        </SocialMediaWrapper>
    );
}
