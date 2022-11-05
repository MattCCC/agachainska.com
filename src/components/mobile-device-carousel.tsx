import { memo } from "react";

import tw, { css, styled } from "twin.macro";

import { up } from "@utils/screens";

import { MobileDeviceMockup } from "./mobile-device-mockup";

const MobileDeviceCarouselContainer = styled.div(() => [
    tw`max-w-full flex justify-evenly lg:relative lg:max-w-none lg:w-[100vw]`,
    css`
        // ${up("lg")} {
            margin: 10rem auto 90px -50vw;
            left: calc(50% - 8px);
        // }
    `
]);

/* eslint-disable max-len */
const listOfPhones = [
    "https://www.figma.com/embed?embed_host=share&amp;url=https%3A%2F%2Fwww.figma.com%2Fproto%2FQaKvvMvwwFov4qwUMN79N1%2FPayMe%3Fnode-id%3D4%253A1113%26scaling%3Dscale-down-width%26page-id%3D2%253A475%26starting-point-node-id%3D4%253A600%26show-proto-sidebar%3D1&amp;hide-ui=1",
    "https://www.figma.com/embed?embed_host=share&amp;url=https%3A%2F%2Fwww.figma.com%2Fproto%2FQaKvvMvwwFov4qwUMN79N1%2FPayMe%3Fnode-id%3D4%253A1113%26scaling%3Dscale-down-width%26page-id%3D2%253A475%26starting-point-node-id%3D4%253A600%26show-proto-sidebar%3D1&amp;hide-ui=1",
    "https://www.figma.com/embed?embed_host=share&amp;url=https%3A%2F%2Fwww.figma.com%2Fproto%2FQaKvvMvwwFov4qwUMN79N1%2FPayMe%3Fnode-id%3D4%253A1113%26scaling%3Dscale-down-width%26page-id%3D2%253A475%26starting-point-node-id%3D4%253A600%26show-proto-sidebar%3D1&amp;hide-ui=1",
    "https://www.figma.com/embed?embed_host=share&amp;url=https%3A%2F%2Fwww.figma.com%2Fproto%2FQaKvvMvwwFov4qwUMN79N1%2FPayMe%3Fnode-id%3D4%253A1113%26scaling%3Dscale-down-width%26page-id%3D2%253A475%26starting-point-node-id%3D4%253A600%26show-proto-sidebar%3D1&amp;hide-ui=1",
];
/* eslint-enable max-len */

export const MobileDeviceCarousel = memo(() => (
    <MobileDeviceCarouselContainer>
        {listOfPhones.map((phone) => (
            <MobileDeviceMockup prototypeSrc={phone} />
        ))}
    </MobileDeviceCarouselContainer>
));
