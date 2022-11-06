import { memo } from "react";

import tw, { css, styled } from "twin.macro";

import { DeviceMockup } from "./device-mockup";

const DevicesCarouselContainer = styled.div(() => [
    tw`max-w-full flex justify-evenly lg:relative lg:max-w-none lg:w-[100vw]`,
    css`
        margin: 10rem auto 90px -50vw;
        left: calc(50% - 8px);
    `,
]);

export const DevicesCarousel = memo(
    ({ list }: { list: ProjectSectionElementDevice[] }) => (
        <DevicesCarouselContainer>
            {list.map(({ type, link }) => (
                <DeviceMockup type={type} link={link} />
            ))}
        </DevicesCarouselContainer>
    )
);
