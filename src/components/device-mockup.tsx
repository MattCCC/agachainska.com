import {
    memo,
    useEffect,
    useState,
    Fragment,
    useRef,
    MutableRefObject,
} from "react";

import { useInView } from "framer-motion";
import tw, { css, styled } from "twin.macro";

import isImageURL from "utils/is-image-url";

import Iphone13Pro from "../img/iphone-13-pro.png";
import Iphone8 from "../img/iphone-8.png";
import IphoneX from "../img/iphone-x.png";
import MacbookPro from "../img/macbook-pro.png";

const DeviceContainer = styled.div(() => [tw`relative w-[245px] h-[560px]`]);

const DeviceResourceWrapper = styled.div(() => [
    tw`absolute z-10 bg-white border-0 outline-none cursor-grabbing`,
    tw`w-[245px] h-[532px] rounded-[20px] top-[13px] left-[18px]`,
    tw`shadow-[0px_4px_12px_-1px_rgba(0,0,0,0.36)] lg:shadow-[0px_42px_102px_-8px_rgba(0,0,0,0.36)]`,
]);

const DeviceResource = styled.iframe(() => [
    tw`bg-white border-0 outline-none`,
    tw`w-[245px] h-[532px]`,
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

const renderSwitch = ({
    type,
    link,
    isImage,
    inViewData,
}: {
    type: string;
    link: string;
    isImage: boolean;
    inViewData: [MutableRefObject<null>, boolean];
}) => {
    const tag = isImage ? "img" : "iframe";
    const [ref, isVisible] = inViewData;

    return (
        <Fragment>
            <DeviceResourceWrapper ref={ref}>
                {((isVisible && tag === "iframe") || tag !== "iframe") && (
                    <DeviceResource as={tag} src={link} />
                )}
            </DeviceResourceWrapper>

            {type === "iPhoneX" && <DeviceFrameIphoneX />}
            {type === "iPhone13pro" && <DeviceFrameIphone13Pro />}
            {type === "iPhone8" && <DeviceFrameIphone8 />}
            {type === "laptop" && <DeviceFrameMacbookPro />}
        </Fragment>
    );
};

export const DeviceMockup = memo(({ type, link }: Props) => {
    const [isImage, setIsImage] = useState(false);
    const ref = useRef(null);
    const isVisible = useInView(ref, {
        once: true,
    });

    useEffect(() => {
        const getData = () => {
            const isImageUrl = isImageURL(link);

            setIsImage(isImageUrl);
        };

        getData();
    }, [link]);

    return (
        <DeviceContainer>
            {renderSwitch({
                isImage,
                type,
                link,
                inViewData: [ref, isVisible],
            })}
        </DeviceContainer>
    );
});
