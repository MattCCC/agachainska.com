import { memo, useEffect, useRef, useState } from "react";
import { DeviceResource, RingIcon, RingIconContainer } from "./device-mockup";
import { useStoreProp } from "store/index";

interface Props {
    isImage: boolean;
    type: string;
    link: string;
}

export const DeviceIframe = memo(({ isImage, type, link }: Props) => {
    const [isIframeCurrentlyLoading] = useStoreProp("isIframeCurrentlyLoading");
    const [iframeQueue] = useStoreProp("iframeQueue");
    const [, { setIsIframeCurrentlyLoading }] = useStoreProp(
        "isIframeCurrentlyLoading",
    );
    const [, { enqueueIframe }] = useStoreProp("iframeQueue");
    const [, { dequeueIframe }] = useStoreProp("iframeQueue");

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const iframeCurrent = iframeRef.current;

    const [linkToLoad, setLinkToLoad] = useState("");

    useEffect(() => {
        if (
            !isImage &&
            !iframeQueue.includes(link) &&
            !isIframeCurrentlyLoading
        ) {
            setIsIframeCurrentlyLoading(true);
            enqueueIframe(link);
            setLinkToLoad(link);

            iframeCurrent?.addEventListener("load", () => {
                setTimeout(() => {
                    dequeueIframe();
                    setIsIframeCurrentlyLoading(false);
                }, 1500);
            });
        }
    }, [
        iframeCurrent,
        isImage,
        enqueueIframe,
        dequeueIframe,
        link,
        isIframeCurrentlyLoading,
        setIsIframeCurrentlyLoading,
        iframeQueue,
    ]);

    return (
        <>
            <DeviceResource src={linkToLoad} type={type} ref={iframeRef} />

            {!isIframeCurrentlyLoading && (
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
    );
});
