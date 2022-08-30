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

const OtherProjectWrapper = styled.div(() => []);

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
                target: "_blank",
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
        <OtherProjectWrapper ref={otherProjectContent}>
            <Post
                postNum={currentIndex + lastProjectNumber}
                post={otherProject}
                onPostTap={() => null}
                setImageAsBg={true}
            />
        </OtherProjectWrapper>
    );
}

export default OtherProject;
