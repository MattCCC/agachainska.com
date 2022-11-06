import { PropsWithChildren, ReactNode } from "react";

import tw, { css, styled } from "twin.macro";

import { up } from "@utils/screens";

interface Props {
    widthPct?: number;
    border?: boolean;
    children: ReactNode;
}

export const FullPageContentWrapper = styled.figure(
    ({ widthPct = 100, border = true }: Props) => [
        tw`w-full max-w-full overflow-hidden`,
        border &&
            css`
                border: 1px solid #979797;
            `,
        css`
            margin-bottom: 40px;

            ${up("lg")} {
                ${tw`relative max-w-none`}

                width: ${widthPct}vw;
                height: max(560px, 80vh);
                margin: 0 auto 90px -${widthPct / 2}vw;
                left: calc(50% - 8px);
            }
        `,
    ]
);

export const FullPageContent = ({
    widthPct = 100,
    border = true,
    children,
    ...props
}: PropsWithChildren<Props>) => (
    <FullPageContentWrapper widthPct={widthPct} border={border} {...props}>
        {children}
    </FullPageContentWrapper>
);
