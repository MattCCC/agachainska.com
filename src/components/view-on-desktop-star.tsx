import tw, { css, styled } from "twin.macro";

import ViewOnDesktopStar from "svg/view-on-desktop-star.svg";

const ViewOnDeskContainer = styled.div(
    () => tw`absolute z-50 lg:hidden`,
    css`
        top: -35px;
        right: 25px;
    `
);

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
        <ViewOnDeskContainer>
            <ViewOnDesktopStar />
            <ViewOnDeskDesc>FOR BEST EXPERIENCE VIEW ON DESKTOP</ViewOnDeskDesc>
        </ViewOnDeskContainer>
    );
}
