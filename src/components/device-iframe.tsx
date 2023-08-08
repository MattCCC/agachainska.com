import { memo, useEffect, useRef } from "react";
import { DeviceResource, RingIcon, RingIconContainer } from "./device-mockup";
import { useStoreProp } from "store/index";

interface Props {
    isImage: boolean;
    type: string;
    link: string;
}

export const DeviceIframe = memo(({ isImage, type, link }: Props) => {
    const [isIframeCurrentlyLoading] = useStoreProp("isIframeCurrentlyLoading");
    const [, { setIsIframeCurrentlyLoading }] = useStoreProp(
        "isIframeCurrentlyLoading",
    );

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const iframeCurrent = iframeRef.current;

    useEffect(() => {
        if (!isImage && !isIframeCurrentlyLoading) {
            setIsIframeCurrentlyLoading(true);
        }

        const handleOnIframeLoaded = () => {
            iframeCurrent?.addEventListener("load", () => {
                setIsIframeCurrentlyLoading(false);
            });

            return () => {
                iframeCurrent?.removeEventListener("load", () => {
                    setIsIframeCurrentlyLoading(false);
                });
            };
        };

        return handleOnIframeLoaded();
    }, [
        iframeCurrent,
        isImage,
        isIframeCurrentlyLoading,
        setIsIframeCurrentlyLoading,
    ]);

    return (
        <>
            <DeviceResource
                src={isIframeCurrentlyLoading ? link : ""}
                type={type}
                ref={iframeRef}
            />

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
