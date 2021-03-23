import { FunctionComponent, memo } from "react";

import tw, { css, styled } from "twin.macro";

import { Circle } from "@components/circle";
import { Link } from "@components/link";
import { ReactComponent as ArrowDown } from "@svg/arrow-down.svg";
import { getRoutePath } from "@utils/route";

/**
 * Styles
 */
export const BottomCircleStyled = styled(Circle)(() => [
    tw`absolute z-50 inset-x-2/4 block lg:hidden`,
    css`
        bottom: 33px;
    `,
]);

export const ArrowDownStyled = styled(ArrowDown)(() => [
    tw`inline-block text-center`,
]);

/**
 * Interfaces
 */
interface Props {}

/**
 * Component
 * @param props
 */
export const BottomCircle: FunctionComponent<Props> = memo(() => {
    const workLink = getRoutePath("work");

    return (
        <Link {...workLink}>
            <BottomCircleStyled>
                <ArrowDownStyled />
            </BottomCircleStyled>
        </Link>
    );
});
