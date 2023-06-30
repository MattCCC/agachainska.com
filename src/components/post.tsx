import { Fragment } from "react";

import tw, { css, styled } from "twin.macro";

import { BigNumber } from "components/big-number";
import { MainTitleTop } from "components/main-title";

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
    tw`w-[348px] h-[181px] xl:w-[398px] xl:h-[231px]`,
]);

const PostDescription = styled.div(() => [
    tw`w-3/4 leading-6 text-[16px]`,
    css`
        margin-top: 10px;
    `,
]);

const StyledNumber = styled(BigNumber)(() => [
    tw`absolute right-0 z-10 max-w-full font-bold font-fbold`,
    css`
        bottom: 2.5rem;
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
            <PostWrapper
                onClick={(
                    e: React.MouseEvent<
                        HTMLDivElement | HTMLAnchorElement,
                        MouseEvent
                    >
                ): void => onPostTap(e, post)}
            >
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
                {postNum > 0 && (
                    <StyledNumber
                        id={`${postNum}.`}
                        value={`${postNum}.`}
                        viewBox="0 0 160 200"
                        preserveAspectRatio="xMaxYMin meet"
                    />
                )}
            </PostWrapper>
        </Fragment>
    );
}
