import { memo } from "react";

import tw, { css, styled } from "twin.macro";

import { Circle } from "components/circle";
import { Link } from "components/link";
import ArrowDown from "svg/arrow-down.svg";
import { getRoutePath } from "utils/route";

export const BottomCircleStyled = styled(Circle)(() => [
    tw`absolute z-50 flex items-center justify-center inset-x-2/4 lg:hidden`,
    css`
        width: 60px;
        height: 60px;
        bottom: 33px;
    `,
]);

export const ArrowDownStyled = styled(ArrowDown)(() => [
    tw`inline-block text-center`,
]);

export const BottomCircle = memo(() => {
    const workLink = getRoutePath("work");

    return (
        <Link {...workLink}>
            <BottomCircleStyled>
                <ArrowDownStyled aria-label="Work" />
            </BottomCircleStyled>
        </Link>
    );
});
