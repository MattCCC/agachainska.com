import { memo, useEffect, useState } from "react";

import tw, { css, styled } from "twin.macro";

import IphoneX from "../img/iphone-x.png";
import Iphone8 from "../img/iphone-8.png";
import Iphone13Pro from "../img/iphone-13-pro.png";
import MacbookPro from "../img/macbook-pro.png";

const MobileDeviceContainer = styled.div(() => [
    tw`relative w-[245px] h-[560px]`,
]);

const MobileDevice = styled.iframe(() => [
    tw`absolute z-10 bg-white border-0 outline-none cursor-grabbing`,
    tw`w-[245px] h-[532px] rounded-[20px] top-[13px] left-[18px]`,
    css`
        box-shadow: 0px 42px 102px -8px rgba(0, 0, 0, 0.36);
    `,
]);

const DeviceFrame = styled.div((deviceFrameToUse: ReactElement) => [
    tw`w-[293px] h-[555px] absolute pointer-events-none z-20`,
    css`
        background: url(${deviceFrameToUse}) no-repeat;
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
                <>
                    <MobileDevice as={tag} src={link}></MobileDevice>
                    <DeviceFrame deviceFrameToUse={IphoneX} />
                </>
            );

        case "iPhone13pro":
            return (
                <>
                    <MobileDevice as={tag} src={link}></MobileDevice>
                    <DeviceFrame deviceFrameToUse={Iphone13Pro} />
                </>
            );

        case "iPhone8":
            return (
                <>
                    <MobileDevice as={tag} src={link}></MobileDevice>
                    <DeviceFrame deviceFrameToUse={Iphone8} />
                </>
            );

        case "laptop":
            return (
                <>
                    <MobileDevice as={tag} src={link}></MobileDevice>
                    <DeviceFrame deviceFrameToUse={MacbookPro} />
                </>
            );
    }
};

export const DeviceMockup = memo(({ type, link }: Props) => {
    const [isImage, setIsImage] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const isImageUrl = await isImageURL(link);

            setIsImage(isImageUrl);
        };

        getData();
    }, []);

    return (
        <MobileDeviceContainer>
            {renderSwitch({ isImage, type, link })}
        </MobileDeviceContainer>
    );
});
