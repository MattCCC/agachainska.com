import {
    Fragment,
} from "react";

import tw, { css, styled } from "twin.macro";


import { BigNumber } from "@components/big-number";

/**
 * Style
 */
const PostWrapper = styled.div(() => [tw`relative h-auto pt-11 pb-11`]);

const PostImg = styled.img(() => [
    tw`overflow-hidden relative w-full h-48 z-10`,
]);

const PostDescription = styled.div(() => [
    tw`prose-16px w-3/4`,
    css`
        line-height: 24px;
    `
]);

const StyledNumber = styled(BigNumber)(() => [
    tw`absolute right-7 z-10`,
    css`
        bottom: 2.5rem;
        max-width: 100%;
        transform: translateX(50%);
        height: 120px;
    `
]);

const Title = styled.h1(() => [
    tw`absolute prose-70px uppercase z-50 select-none top-0`,
    css`
        width: 100%;
        line-height: 70px;
        color: var(--black-color);
        background: linear-gradient(
            180deg,
            var(--black-color) 44px,
            transparent 45px
        );
        background-clip: text;
        -webkit-text-fill-color: transparent;

        ::before {
            position: absolute;
            left: 0;
            bottom: 0;
            content: attr(data-text);
            color: transparent;
            clip-path: circle(500px at 100px 100px);
            -webkit-text-stroke-width: 2px;
            -webkit-text-stroke-color: rgba(0, 0, 0, 0.8);
            background-color: transparent;
            color: transparent;
        }
    `,
]);

/**
 * Interfaxces
 */

export interface PostItem {
    name: string;
    cover: string;
    id: string;
    routeTo: string;
    category: string;
    description: string;
}

interface Props {
    post: PostItem;
    postNum?: number;
    onPostTap: (post: PostItem) => void;
}

/**
 * Component
 * @param props
 */
export function Post({
    post,
    postNum = -1,
    onPostTap,
}: Props): JSX.Element {
    return (
        <Fragment>
            <PostWrapper>
                <Title data-text={post.name}>{post.name}</Title>
                <PostImg onClick={(): void => onPostTap(post)}
                    src={post.cover || ""}>
                </PostImg>
                <PostDescription>
                    {post.description.split(" ").slice(0, 8)
                        .join(" ")}
                    {post.description.split(" ").slice(0, 5)
                        .join(" ")}
                </PostDescription>
                {
                    postNum && <StyledNumber value={`${postNum}.`} />
                }
            </PostWrapper>
        </Fragment>
    );
}
