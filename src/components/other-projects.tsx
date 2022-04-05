import tw, { css, styled } from "twin.macro";

import { Post, PostItem } from "@components/post";

interface OtherProject {
    category: string;
    projects?: Project[];
}

interface Props {
    otherProjects: OtherProject[];
    lastProjectNumber: number;
}

const OtherProjectsContainer = styled.div(() => [
    tw`grid grid-cols-2 col-start-1 col-end-5 row-start-1 row-end-6 -mt-16 gap-x-28 gap-y-20`,
    css`
        div[class*="PostWrapper"]:nth-of-type(even) {
            position: relative;
            top: 8rem;
            left: 30px;
        }

        h1[class*="MainTitleTop"] {
            font-size: 52px;
        }
    `,
]);

export default function OtherProjects({
    otherProjects,
    lastProjectNumber,
}: Props) {
    return (
        <OtherProjectsContainer>
            {otherProjects[0].projects?.map((post: PostItem, index: number) => (
                <Post
                    key={index}
                    postNum={index + lastProjectNumber}
                    post={post}
                    onPostTap={() => null}
                    setImageAsBg={true}
                />
            ))}
        </OtherProjectsContainer>
    );
}
