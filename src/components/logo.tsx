import tw, { styled } from "twin.macro";
import { Translate } from "@components/translate";

const LogoWrapper = styled.div(() => [
    tw`rounded-full p-3 bg-primary-color text-white font-extrabold text-2xl`,
]);


export function Logo() {
    return (
        <LogoWrapper>
            <Translate id="header.logo.title" />
        </LogoWrapper>
    )
}