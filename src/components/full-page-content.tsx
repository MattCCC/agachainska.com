import { FunctionComponent } from "react";
import { ReactNode } from "react";

import tw, { css, styled } from "twin.macro";

import { up } from "@utils/screens";

interface Props {
    widthPct?: number;
    border?: boolean;
    children: ReactNode;
}

export const FullPageContentWrapper = styled.figure(
    ({ widthPct = 100, border = true }: Props) => [
        tw`overflow-hidden w-full max-w-full`,
        border &&
            css`
                border: 1px solid #979797;
            `,
        css`
            margin-bottom: 40px;

            ${up("lg")} {
                ${tw`max-w-none relative`}

                width: ${widthPct}vw;
                height: 80vh;
                margin: 0 auto 90px -${widthPct / 2}vw;
                left: calc(50% - 8px);
            }
        `,
    ]
);

export const FullPageContent: FunctionComponent<Props> = ({
    widthPct = 100,
    border = true,
    children,
    ...props
}) => (
    <FullPageContentWrapper widthPct={widthPct} border={border} {...props}>
        {children}
    </FullPageContentWrapper>
);
