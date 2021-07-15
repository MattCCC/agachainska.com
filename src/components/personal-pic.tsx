import { Fragment } from "react";

import tw, { css, styled } from "twin.macro";

import { useWindowSize } from "@hooks/use-window-size";

import personalPicDesktop from "../img/personal-pic-desktop.png";
import personalPicMobile from "../img/personal-pic-rectangle.png";
import personalPictureWhiteBackground from "../svg/personal-pic-bg-black&white-mobile.svg";
import personalPictureBlackBackground from "../svg/personal-pic-bg-black-mobile.svg";
import personalPicBlackBgDesk from "../svg/personal-pic-black-bg-desk.svg";
import personalPicWhiteBgDesk from "../svg/personal-pic-white-bg-desk.svg";


const PersonalPicContainerMobile = styled.div(() => [
    tw`relative flex justify-center items-center mb-8 bg-contain`,
    css`
        width: 157px;
        height: 157px;
        background: url(${personalPictureBlackBackground}) no-repeat;

        img {
            width: 149px;
            height: 149px;
        }

        &:after {
            content: url(${personalPictureWhiteBackground});
            position: absolute;
            top: 59%;
            left: 56%;
            transform: translate(-50%, -50%);
            z-index: -1;
        }
    `
]);


const PersonalPicContainerDesktop = styled(PersonalPicContainerMobile)(() => [
    tw`col-start-1 col-span-3 mb-0`,
    css`
        width: 275px;
        height: 378px;
        background: url(${personalPicBlackBgDesk}) no-repeat;

        img {
            width: 261px;
            height: 366px;
        }

        &:after {
            content: url(${personalPicWhiteBgDesk});
            top: 53%;
            left: 53%;
        }
    `
]);


export default function PersonalPic() {
    const windowSize = useWindowSize();

return(
        <Fragment>
            {windowSize.width < 1024 ? (
                <PersonalPicContainerMobile>
                    <img src={personalPicMobile} alt="Aga" />
                </PersonalPicContainerMobile>
            ) : (
                <PersonalPicContainerDesktop>
                    <img src={personalPicDesktop} alt="Aga" />
                </PersonalPicContainerDesktop>
            )}
        </Fragment>
    );
}
