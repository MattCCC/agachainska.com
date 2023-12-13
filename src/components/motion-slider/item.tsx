import { memo, PropsWithChildren, useContext, useEffect } from "react";

import { motion, MotionValue, useTransform } from "framer-motion";
import useMeasure from "react-use-measure";
import { css, styled } from "twin.macro";

import { Context } from "./context";
import { ActionTypes } from "./reducers";

export interface Props {
    padding?: number;
    gap?: number;
    index: number;
    offset: MotionValue<number>;
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

const outputRange = [0.9, 1, 0.9];

export const Item = memo(
    ({
        children,
        gap = 0,
        padding = 0,
        index = 0,
        offset,
    }: PropsWithChildren<Props>) => {
        const { dispatch } = useContext(Context);
        const [itemRef, { x, width }] = useMeasure();
        const scaleOffest = -1 * (width + gap);

        const scale = useTransform(
            offset,
            [
                (index - 1) * scaleOffest,
                index * scaleOffest,
                (index + 1) * scaleOffest,
            ],
            outputRange
        );

        useEffect(() => {
            if (x !== undefined) {
                dispatch({
                    type: ActionTypes.AddItem,
                    payload: { position: x - padding, index },
                });
            }
        }, [x, dispatch, padding, index]);

        return (
            <ItemWrapper ref={itemRef} gap={gap} style={{ scale }}>
                {children}
            </ItemWrapper>
        );
    }
);
