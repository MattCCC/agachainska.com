import { useCallback, useEffect } from "react";

import { styled } from "twin.macro";
import useMouseLeave from "use-mouse-leave";

import { Post, PostItem } from "@components/post";
import { useStoreProp } from "@store/index";

interface Props {
    otherProject: PostItem;
    currentIndex: number;
    lastProjectNumber: number;
}

const OtherProjectContainer = styled.div(() => []);

function OtherProject({
    otherProject,
    currentIndex,
    lastProjectNumber,
}: Props) {
    const [mouseLeft, otherProjectContent] = useMouseLeave();

    const [, dispatch] = useStoreProp("showMotionGrid");

    const onSliderContentMouseEventChange = useCallback(
        (mouseDidLeave = false) => {
            dispatch.showMotionCursor(!mouseDidLeave, {
                text: "work.viewDribbbleShot",
                route: otherProject.dribbbleLink,
            });
        },
        [dispatch, otherProject.dribbbleLink]
    );

    useEffect((): void => {
        if (mouseLeft) {
            onSliderContentMouseEventChange(true);
        } else if (onSliderContentMouseEventChange) {
            onSliderContentMouseEventChange(false);
        }
    }, [mouseLeft, onSliderContentMouseEventChange]);

    return (
        <OtherProjectContainer
            ref={otherProjectContent}
            className="other-project-container"
        >
            <Post
                postNum={currentIndex + lastProjectNumber}
                post={otherProject}
                onPostTap={() => null}
                setImageAsBg={true}
            />
        </OtherProjectContainer>
    );
}

export default OtherProject;
