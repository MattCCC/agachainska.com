import tw, { css, styled } from "twin.macro";

import ViewOnDesktopStar from "svg/view-on-desktop-star.svg";

const ViewOnDeskCon = styled.div(
    () => tw`absolute z-50 lg:hidden`,
    css`
        top: 2%;
        left: 59%;
    `
);

const ViewOnDeskContentCon = styled.div(() => tw`relative`);

const ViewOnDeskDesc = styled.p(
    () => tw`absolute text-center font-fbold`,
    css`
        width: 95px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 11px;
        line-height: 15px;
    `
);

export default function ViewOnDeskStar() {
    return (
        <ViewOnDeskCon>
            <ViewOnDeskContentCon>
                <ViewOnDesktopStar />
                <ViewOnDeskDesc>
                    FOR BEST EXPERIENCE VIEW ON DESKTOP
                </ViewOnDeskDesc>
            </ViewOnDeskContentCon>
        </ViewOnDeskCon>
    );
}
