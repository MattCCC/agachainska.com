import {
    FunctionComponent,
    memo,
    ReactNode,
    useContext,
    useEffect,
} from "react";

import { motion, MotionValue, useTransform } from "framer-motion";
import useDimensios from "react-use-dimensions";
import { css, styled } from "twin.macro";

import { Context } from "./context";
import { ActionTypes } from "./reducers";

export interface Props {
    children: ReactNode;
    padding?: number;
    gap?: number;
    index: number;
    offset: MotionValue<number>;
    allowSlideToLast?: boolean;
}

const ItemWrapper = styled(motion.div)(
    ({ gap }: { gap: number | undefined }) => [
        css`
            flex: 0 0 auto;

            &:not(:last-child) {
                margin-right: ${gap}px;
            }
        `,
    ]
);

export const Item: FunctionComponent<Props> = memo(
    ({ children, gap = 0, padding = 0, index = 0, offset }) => {
        const { dispatch } = useContext(Context);
        const [itemRef, { x, width }] = useDimensios({ liveMeasure: false });
        const scaleOffest = -1 * (width + gap);

        const scale = useTransform(
            offset,
            [
                (index - 1) * scaleOffest,
                index * scaleOffest,
                (index + 1) * scaleOffest,
            ],
            [0.9, 1, 0.9]
        );

        useEffect(() => {
            if (x !== undefined) {
                dispatch({
                    type: ActionTypes.Add,
                    payload: { item: x - padding },
                });
            }
        }, [x, dispatch, padding]);

        return (
            <ItemWrapper ref={itemRef} gap={gap} style={{ scale }}>
                {children}
            </ItemWrapper>
        );
    }
);
