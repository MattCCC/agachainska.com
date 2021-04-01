import { Fragment } from "react";

import tw, { css, styled } from "twin.macro";

import { BigNumber } from "@components/big-number";
import { MainTitleTop } from "@components/main-title";

export interface PostItem {
    [x: string]: any;
    name: string;
    cover: string;
    shortDescription: string;
}

interface Props {
    post: PostItem;
    postNum?: number;
    onPostTap: (e: any, post: PostItem) => void;
}

const PostWrapper = styled.div(() => [tw`relative h-auto pt-11 pb-11`]);

const PostImg = styled.img(() => [
    tw`overflow-hidden relative w-full h-48 z-10`,
]);

const PostDescription = styled.div(() => [
    tw`prose-16px w-3/4`,
    css`
        line-height: 24px;
    `,
]);

const StyledNumber = styled(BigNumber)(() => [
    tw`absolute right-7 z-10`,
    css`
        bottom: 2.5rem;
        max-width: 100%;
        transform: translateX(50%);
        height: 120px;
    `,
]);

const Title = styled(MainTitleTop)(() => [
    tw`absolute uppercase z-50 select-none top-0`,
]);

export function Post({ post, postNum = -1, onPostTap }: Props): JSX.Element {
    return (
        <Fragment>
            <PostWrapper onClick={(e): void => onPostTap(e, post)}>
                <Title percentage={63} data-text={post.name}>
                    {post.name}
                </Title>
                <PostImg src={post.cover || ""} />
                <PostDescription>{post.shortDescription}</PostDescription>
                {postNum && <StyledNumber value={`${postNum}.`} />}
            </PostWrapper>
        </Fragment>
    );
}
