import { useCallback, useEffect } from "react";

import tw, { css, styled } from "twin.macro";

import { useRouter } from "next/router";

import { BottomCircle } from "components/bottom-circle";
import { CountDown } from "components/count-down";
import HomepageTitle from "components/homepage-title";
import { MainContainer } from "components/main-container";
import { MainSection } from "components/main-section";
import { Meta } from "components/meta";
import { Translate } from "components/translate";
import { useLockBodyScroll } from "hooks/use-lock-body-scroll";
import { useStoreProp } from "store/index";
import { isDev } from "utils/detect-env";
import { getRoutePath } from "utils/route";

const Desc = styled.h2(() => [
    tw`inline-block leading-8 select-none text-[24px] lg:text-[30px] lg:leading-11`,
    css`
        max-height: 84px;
        width: 18rem;
        max-width: 100%;
    `,
]);

export default function Home() {
    const router = useRouter();
    const workLink = getRoutePath("work");
    const [, { showMotionCursor }] = useStoreProp("motionCursorData");

    useLockBodyScroll();

    const onCountDownFinished = useCallback(() => {
        if (!isDev()) {
            router.push(workLink.to);
        }
    }, [router, workLink]);

    useEffect(() => {
        showMotionCursor(true, {
            text: "viewWork",
            to: workLink.to,
        });
    }, [showMotionCursor, workLink.to]);

    useEffect(() => {
        const el = document.getElementById("main-section");

        if (el) {
            el.style.setProperty("--tw-translate-y", "0%");
            el.style.setProperty("opacity", "1");
        }
    }, []);

    return (
        <>
            <Meta title="Aga Chainska" />

            <MainSection
                id="main-section"
                className="grid items-center grid-flow-col grid-cols-1 grid-rows-1 translate-y-full opacity-0 lg:cursor-none"
                style={
                    {
                        transition:
                            "transform 1s cubic-bezier(0.43, 0.13, 0.23, 0.96) 0.3s, opacity 2s cubic-bezier(0.43, 0.13, 0.23, 0.96) 1s",
                    } as React.CSSProperties
                }
            >
                <MainContainer>
                    <div className="col-start-1 col-end-13">
                        <HomepageTitle />
                        <Desc>
                            <Translate id="home.description" />
                        </Desc>
                    </div>
                </MainContainer>
            </MainSection>
            <BottomCircle />
            <CountDown seconds={10} onFinishedCallback={onCountDownFinished} />
        </>
    );
}
