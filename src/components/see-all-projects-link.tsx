import tw, { css, styled } from "twin.macro";

import { useRouter } from "next/router";

import { getLinkProps } from "utils/route";

import { Button } from "./button";
import { Translate } from "./translate";
import { Link } from "components/link";
import { PropsWithChildren } from "react";

interface Props {
    screenSize: "sm" | "lg";
}

const ButtonWrapper = styled.span(() => [
    css`
        button span {
            ${tw`border-none bg-primary text-tertiary`}
        }
    `,
]);

function LinkWrapper({ screenSize, children }: PropsWithChildren<Props>) {
    if (screenSize === "sm") {
        return <div tw="inline lg:hidden">{children}</div>;
    }

    if (screenSize === "lg") {
        return (
            <div tw="self-end hidden col-start-13 lg:inline">{children}</div>
        );
    }

    return null;
}

export default function SeeAllProjectsLink({ screenSize }: Props) {
    const location = useRouter();
    const linkProps = getLinkProps("work", location);

    return (
        <LinkWrapper screenSize={screenSize}>
            <Link to={linkProps.to} tw="inline-block w-full">
                <ButtonWrapper>
                    <Button>
                        <Translate id="seeAllProjects" />
                    </Button>
                </ButtonWrapper>
            </Link>
        </LinkWrapper>
    );
}
