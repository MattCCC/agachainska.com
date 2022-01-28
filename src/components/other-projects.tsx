import { Post, PostItem } from "@components/post";

interface OtherProject {
    category: string;
    projects?: Project[];
}

interface Props {
    otherProjects: OtherProject[];
    lastProjectNumber: number;
}

export default function OtherProjects({
    otherProjects,
    lastProjectNumber,
}: Props) {
    return (
        <div>
            {otherProjects[0].projects?.map((post: PostItem, index: number) => (
                <Post
                    key={index}
                    postNum={index + 1 + lastProjectNumber}
                    post={post}
                    onPostTap={() => null}
                />
            ))}
        </div>
    );
}
