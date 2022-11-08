import { Fragment } from "react";

import tw, { css, styled } from "twin.macro";

import { BigNumber } from "components/big-number";
import { MainTitleTop } from "components/main-title";
import { up } from "utils/screens";

export interface PostItem {
    [x: string]: any;
    name: string;
    cover: string;
    shortDescription: string;
}

interface Props {
    post: PostItem;
    postNum?: number;
    onPostTap: (
        e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>,
        post: PostItem
    ) => void;
    setImageAsBg?: boolean;
}

const PostWrapper = styled.div(() => [tw`relative h-auto pt-11 pb-11`]);

const PostImg = styled.img(() => [tw`relative z-10 w-full overflow-hidden`]);

const PostBg = styled.div(() => [
    tw`relative z-10 w-full overflow-hidden bg-cover`,
    css`
        width: 348px;
        height: 181px;
        ${up("xl")} {
            width: 398px;
            height: 231px;
        }
    `,
]);

const PostDescription = styled.div(() => [
    tw`w-3/4 leading-6 prose-16`,
    css`
        margin-top: 10px;
    `,
]);

const StyledNumber = styled(BigNumber)(() => [
    tw`absolute right-0 z-10`,
    css`
        bottom: 2.5rem;
        max-width: 100%;
        height: 135px;
    `,
]);

const Title = styled(MainTitleTop)(() => [
    tw`absolute top-0 z-50 uppercase select-none bg-post-title-gradient`,
    tw`text-[70px] leading-[70px] lg:text-[54px] lg:leading-[80px]`,
]);

export function Post({
    post,
    postNum = -1,
    onPostTap,
    setImageAsBg = false,
}: Props) {
    return (
        <Fragment>
            <PostWrapper onClick={(e): void => onPostTap(e, post)}>
                <Title data-text={post.name}>{post.name}</Title>
                {setImageAsBg ? (
                    <PostBg
                        style={{
                            backgroundImage: `url(${post.cover})`,
                        }}
                    />
                ) : (
                    <PostImg src={post.cover || ""} />
                )}
                <PostDescription>{post.shortDescription}</PostDescription>
                {postNum && (
                    <StyledNumber
                        value={`${postNum}.`}
                        viewBox="0 0 160 200"
                        preserveAspectRatio="xMaxYMin meet"
                    />
                )}
            </PostWrapper>
        </Fragment>
    );
}
