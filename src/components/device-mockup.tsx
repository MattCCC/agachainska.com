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
import { excludeProps } from "utils/styled";

interface DeviceResourceProps {
    type: string;
    tag?: string;
}

const DeviceContainer = styled("div").withConfig(excludeProps(["type"]))(
    ({ type }: DeviceResourceProps) => [
        tw`relative w-[245px] h-[560px] m-auto lg:m-0`,
        type === "iPhoneX" && tw`w-[278px]`,
        type === "iPhone13pro" && tw`w-[280px]`,
        type === "iPhone8" && tw`w-[270px]`,
        type === "laptop" && tw`w-[293px]`,
    ]
);

const DeviceResourceWrapper = styled("div").withConfig(
    excludeProps(["type", "tag"])
)(({ type, tag }: DeviceResourceProps) => [
    tw`absolute z-10 bg-white border-0 outline-none cursor-grabbing `,
    tw`w-[245px] h-[532px] top-[13px] left-[18px]`,
    tw`shadow-[0px_4px_12px_-1px_rgba(0,0,0,0.36)] lg:shadow-[0px_42px_102px_-8px_rgba(0,0,0,0.36)]`,
    type === "iPhone8" &&
        tw`w-[249px] h-[441px] max-h-[441px] top-[60px] left-[12px]`,
    type === "iPhoneX" && tw`max-h-[532px]`,
    type === "iPhone13pro" &&
        tw`w-[250px] h-[538px] max-h-[538px] top-[14px] left-[14px]`,
    tag === "img" &&
        tw`h-auto overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`,
]);

const DeviceResource = styled("iframe").withConfig(excludeProps(["type"]))(
    ({ type }: DeviceResourceProps) => [
        tw`w-full h-full bg-white border-0 outline-none`,
        type === "iPhone13pro" && tw`rounded-[25px]`,
    ]
);

const DeviceFrameIphoneX = styled.div(() => [
    tw`w-[278px] h-[555px] absolute pointer-events-none z-20 bg-contain bg-no-repeat`,
    tw`bg-[url('/img/iphone-x.webp')]`,
]);

const DeviceFrameIphone8 = styled.div(() => [
    tw`w-[270px] h-[754px] absolute pointer-events-none z-20 bg-contain bg-no-repeat`,
    tw`bg-[url('/img/iphone-8.png')]`,
]);

const DeviceFrameIphone13Pro = styled.div(() => [
    tw`w-[280px] h-[566.36px] absolute pointer-events-none z-20 bg-contain bg-no-repeat`,
    tw`bg-[url('/img/iphone-13-pro.png')]`,
]);

const DeviceFrameMacbookPro = styled.div(() => [
    tw`w-[293px] h-[555px] absolute pointer-events-none z-20 bg-contain bg-no-repeat`,
    tw`bg-[url('/img/macbook-pro.png')]`,
]);

const ContentLoadLink = styled.a(() => [
    tw`w-full h-full flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]`,
]);

const RingIconContainer = styled.div(() => [
    tw`absolute flex justify-center items-center`,
    tw`top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]`,
]);

const RingIcon = styled.div(() => [
    tw`relative inline-block w-[40px] h-[40px]`,
    css`
        div {
            ${tw`absolute w-[32px] h-[32px] rounded-[50%] border-4 border-solid border-[#191919_transparent_transparent_transparent]`}
            animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

            &:nth-of-type(1) {
                animation-delay: -0.45s;
            }

            &:nth-of-type(2) {
                animation-delay: -0.3s;
            }

            &:nth-of-type(3) {
                animation-delay: -0.15s;
            }

            @keyframes lds-ring {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        }
    `,
]);

interface Props {
    type: string;
    link: string;
}

const renderSwitch = ({
    type,
    link,
    isImage,
    iFrameLoadingData,
}: {
    type: string;
    link: string;
    isImage: boolean;
    iFrameLoadingData: [
        HTMLIFrameElement,
        boolean,
        (status: boolean) => void,
        boolean
    ];
}) => {
    const tag = isImage ? "img" : "iframe";
    const [
        iFrameRef,
        isIframeLoadingStarted,
        setIframeLoadingStarted,
        isIframeLoaded,
    ] = iFrameLoadingData;

    const handleOnIframeLoadBtnClick = () => {
        setIframeLoadingStarted(true);
    };

    return (
        <Fragment>
            <DeviceResourceWrapper type={type} tag={tag}>
                {tag === "iframe" ? (
                    <>
                        <DeviceResource
                            as={tag}
                            src={isIframeLoaded ? link : ""}
                            type={type}
                            name={link}
                            ref={iFrameRef}
                        />

                        {!isIframeLoaded && (
                            <>
                                {!isIframeLoadingStarted ? (
                                    <ContentLoadLink
                                        href={link}
                                        target={link}
                                        onClick={handleOnIframeLoadBtnClick}
                                    >
                                        <span>
                                            Click here to interact with the
                                            screen.
                                        </span>
                                    </ContentLoadLink>
                                ) : (
                                    <RingIconContainer>
                                        <RingIcon>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </RingIcon>
                                    </RingIconContainer>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <DeviceResource as={tag} src={link} type={type} />
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
    const [isImage, setIsImage] = useState<boolean>(false);
    const iFrameRef = useRef<HTMLIFrameElement>(null);
    const iframeCurrent = iFrameRef.current;
    const [isIframeLoaded, setIsIframeLoaded] = useState<boolean>(false);
    const [isIframeLoadingStarted, setIframeLoadingStarted] = useState(false);

    useEffect(() => {
        const getData = () => {
            const isImageUrl = isImageURL(link);

            setIsImage(isImageUrl);
        };

        getData();

        const handleOnIframeLoaded = () => {
            iframeCurrent?.addEventListener("load", () =>
                setIsIframeLoaded(true)
            );

            return () => {
                iframeCurrent?.removeEventListener("load", () =>
                    setIsIframeLoaded(true)
                );
            };
        };

        return handleOnIframeLoaded();
    }, [link, iframeCurrent]);

    return (
        <DeviceContainer type={type}>
            {renderSwitch({
                isImage,
                type,
                link,
                iFrameLoadingData: [
                    iFrameRef,
                    isIframeLoadingStarted,
                    setIframeLoadingStarted,
                    isIframeLoaded,
                ],
            })}
        </DeviceContainer>
    );
});
