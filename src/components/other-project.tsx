import { useEffect, useRef } from "react";

import tw, { styled } from "twin.macro";

import useMouse from "@react-hook/mouse-position";

import { Post, PostItem } from "components/post";
import { useStoreProp } from "store/index";

interface Props {
    otherProject: PostItem;
    currentIndex: number;
    lastProjectNumber: number;
}

const OtherProjectWrapper = styled.div(() => [tw`cursor-none h-max`]);

function OtherProject({
    otherProject,
    currentIndex,
    lastProjectNumber,
}: Props) {
    const mouseoverItemRef = useRef(null);
    const mouse = useMouse(mouseoverItemRef, {
        enterDelay: 30,
        leaveDelay: 30,
    });

    const [, { showMotionCursor }] = useStoreProp("motionCursorData");
    const onNavigate = () => {
        const linkToOpen: string = otherProject["dribbbleLink"];

        if (window !== undefined) {
            window.open(linkToOpen, "_blank");
        }
    };

    useEffect(() => {
        const isMouseOver = Boolean(mouse.elementWidth);

        showMotionCursor(isMouseOver, {
            text: "work.viewDribbbleShot",
            target: "_blank",
            overlap: false,
        });
    }, [mouse.elementWidth, showMotionCursor]);

    return (
        <OtherProjectWrapper ref={mouseoverItemRef}>
            <Post
                postNum={currentIndex + lastProjectNumber}
                post={otherProject}
                onPostTap={(e) => onNavigate(e)}
                setImageAsBg={true}
            />
        </OtherProjectWrapper>
    );
}

export default OtherProject;
