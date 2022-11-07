import { memo, useEffect, useState, Fragment } from "react";

import tw, { css, styled } from "twin.macro";

import Iphone13Pro from "../img/iphone-13-pro.png";
import Iphone8 from "../img/iphone-8.png";
import IphoneX from "../img/iphone-x.png";
import MacbookPro from "../img/macbook-pro.png";

const MobileDeviceContainer = styled.div(() => [
    tw`relative w-[245px] h-[560px]`,
]);

const MobileDevice = styled.iframe(() => [
    tw`absolute z-10 bg-white border-0 outline-none cursor-grabbing`,
    tw`w-[245px] h-[532px] rounded-[20px] top-[13px] left-[18px]`,
    tw`shadow-[0px_42px_102px_-8px_rgba(0,0,0,0.36)]`,
]);

const DeviceFrameIphoneX = styled.div(() => [
    tw`w-[293px] h-[555px] absolute pointer-events-none z-20`,
    css`
        background: url(${IphoneX}) no-repeat;
        background-size: contain;
    `,
]);

const DeviceFrameIphone8 = styled.div(() => [
    tw`w-[293px] h-[555px] absolute pointer-events-none z-20`,
    css`
        background: url(${Iphone8}) no-repeat;
        background-size: contain;
    `,
]);

const DeviceFrameIphone13Pro = styled.div(() => [
    tw`w-[293px] h-[555px] absolute pointer-events-none z-20`,
    css`
        background: url(${Iphone13Pro}) no-repeat;
        background-size: contain;
    `,
]);

const DeviceFrameMacbookPro = styled.div(() => [
    tw`w-[293px] h-[555px] absolute pointer-events-none z-20`,
    css`
        background: url(${MacbookPro}) no-repeat;
        background-size: contain;
    `,
]);

interface Props extends ProjectSectionElementDevice {}

/**
 * TODO: Package
 */
function isImageURL(url: string) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

const renderSwitch = ({
    type,
    link,
    isImage,
}: {
    type: string;
    link: string;
    isImage: boolean;
}) => {
    const tag = isImage ? "img" : "iframe";

    switch (type) {
        case "iPhoneX":
            return (
                <Fragment>
                    <MobileDevice as={tag} src={link}></MobileDevice>
                    <DeviceFrameIphoneX />
                </Fragment>
            );

        case "iPhone13pro":
            return (
                <Fragment>
                    <MobileDevice as={tag} src={link}></MobileDevice>
                    <DeviceFrameIphone13Pro />
                </Fragment>
            );

        case "iPhone8":
            return (
                <Fragment>
                    <MobileDevice as={tag} src={link}></MobileDevice>
                    <DeviceFrameIphone8 />
                </Fragment>
            );

        case "laptop":
        default:
            return (
                <Fragment>
                    <MobileDevice as={tag} src={link}></MobileDevice>
                    <DeviceFrameMacbookPro />
                </Fragment>
            );
    }
};

export const DeviceMockup = memo(({ type, link }: Props) => {
    const [isImage, setIsImage] = useState(false);

    useEffect(() => {
        const getData = () => {
            const isImageUrl = isImageURL(link);

            setIsImage(isImageUrl);
        };

        getData();
    }, [link]);

    return (
        <MobileDeviceContainer>
            {renderSwitch({ isImage, type, link })}
        </MobileDeviceContainer>
    );
});
