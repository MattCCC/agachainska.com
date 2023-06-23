import tw, { styled } from "twin.macro";

export const H2 = styled.h2(() => [
    tw`uppercase border-b border-solid font-fbold border-primary`,
    tw`text-[30px] leading-10 pb-[5px] mt-10 mb-8 max-w-[820px]`,
    tw`lg:text-[54px] lg:leading-[100px] lg:pb-[20px] lg:border-b-2 lg:mt-20 lg:mb-10`,
]);
