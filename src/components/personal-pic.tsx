import { Fragment, useState, useEffect} from "react";

import { css, styled } from "twin.macro";

import {getWindowSize} from "@utils/window-size";

import personalPicDesktop from "../img/personal-pic-desktop.png";
import personalPicMobile from "../img/personal-pic-rectangle.png";
import personalPictureWhiteBackground from "../svg/personal-pic-bg-black&white-mobile.svg";
import personalPictureBlackBackground from "../svg/personal-pic-bg-black-mobile.svg";
import personalPicBlackBgDesk from "../svg/personal-pic-black-bg-desk.svg";
import personalPicWhiteBgDesk from "../svg/personal-pic-white-bg-desk.svg";


const PersonalPicContainerMobile = styled.div(() => [
    css`
        width: 157px;
        height: 157px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url(${personalPictureBlackBackground}) no-repeat;
        background-size: contain;
        position: relative;
        margin-bottom: 32px;

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
    const [screenSize, setScreenSize] = useState(getWindowSize());

    useEffect(() => {
        const updateState =  () => setScreenSize(getWindowSize());

        updateState();

        window.addEventListener("resize", updateState);

        return () => window.removeEventListener("resize", updateState);
    }, []);

return(
        <Fragment>
            {screenSize.width < 1024 ? (
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
