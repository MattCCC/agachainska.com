import { memo } from "react";

import tw, { css, styled } from "twin.macro";

import MobileFrame from "../img/iPhoneX.png";

const MobileDeviceContainer = styled.div(() => [tw`relative h-[530px]`]);

const MobileDevice = styled.iframe(() => [
    tw`w-[245px] h-[530px] absolute bg-white border-0 z-10 top-[13px] left-[18px]`,
    tw`rounded-[20px]`,
    css`
        outline: none;
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
    <MobileDeviceContainer className="testing-con">
        <MobileDevice src={prototypeSrc}></MobileDevice>
        <PhoneFrame />
    </MobileDeviceContainer>
));
