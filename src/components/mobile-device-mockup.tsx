import { memo } from "react";

import tw, { css, styled } from "twin.macro";

import MobileFrame from "../img/iPhoneX.png";

const MobileDeviceContainer = styled.div(() => [tw`relative h-[530px]`]);

const MobileDevice = styled.iframe(() => [
    tw`absolute z-10 bg-white border-0 outline-none`,
    tw`w-[245px] h-[532px] rounded-[20px] top-[13px] left-[18px]`,
    css`
        overflow-scrolling: touch;
        -webkit-overflow-scrolling: touch;
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

interface Props {
    prototypeSrc: string;
}

export const MobileDeviceMockup = memo(({ prototypeSrc }: Props) => (
    <MobileDeviceContainer>
        <MobileDevice src={prototypeSrc}></MobileDevice>
        <PhoneFrame />
    </MobileDeviceContainer>
));
