import { memo, useEffect, useState } from "react";

import tw, { css, styled } from "twin.macro";

import MobileFrame from "../img/iphone-x.png";

const MobileDeviceContainer = styled.div(() => [tw`relative h-[530px]`]);

const MobileDevice = styled.iframe(() => [
    tw`absolute z-10 bg-white border-0 outline-none`,
    tw`w-[245px] h-[532px] rounded-[20px] top-[13px] left-[18px]`,
    css`
        box-shadow: 0px 42px 102px -8px rgba(0, 0, 0, 0.36);
    `,
]);

const PhoneFrame = styled.div(() => [
    tw`w-[293px] h-[555px] absolute pointer-events-none z-20`,
    css`
        background: url(${MobileFrame}) no-repeat;
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
            return <MobileDevice as={tag} src={link}></MobileDevice>;

        case "iPhone13pro":
            return <MobileDevice as={tag} src={link}></MobileDevice>;

        case "iPhone8":
            return <MobileDevice as={tag} src={link}></MobileDevice>;

        case "laptop":
            return <MobileDevice as={tag} src={link}></MobileDevice>;
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
            <PhoneFrame />
        </MobileDeviceContainer>
    );
});
