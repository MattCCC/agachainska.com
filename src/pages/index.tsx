import { Fragment, useCallback, useEffect } from "react";

import { GetStaticProps } from "next";
import tw, { css, styled } from "twin.macro";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import { BottomCircle } from "components/bottom-circle";
import { CountDown } from "components/count-down";
import HomepageTitle from "components/homepage-title";
import { MainContainer } from "components/main-container";
import { MainSection } from "components/main-section";
import { Meta } from "components/meta";
import { pageContentVariants } from "components/overlays";
import { Translate } from "components/translate";
import { useLockBodyScroll } from "hooks/use-lock-body-scroll";
import { useStoreProp } from "store/index";
import { isDev } from "utils/detect-env";
import { getRoutePath } from "utils/route";

const Desc = styled.h2(() => [
    tw`inline-block leading-8 select-none prose-24 lg:prose-30 lg:leading-11`,
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

    return (
        <Fragment>
            <Meta title="Aga Chainska" />

            <MainSection
                className="grid items-center grid-flow-col grid-cols-1 grid-rows-1 lg:cursor-none"
                initial="exit"
                animate="enter"
                exit="exit"
                variants={pageContentVariants}
            >
                <MainContainer>
                    <div tw="col-start-1 col-end-13">
                        <HomepageTitle />
                        <Desc>
                            <Translate id="home.description" />
                        </Desc>
                    </div>
                </MainContainer>
            </MainSection>
            <BottomCircle />
            <CountDown seconds={10} onFinishedCallback={onCountDownFinished} />
        </Fragment>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => ({
    props: {
        ...(await serverSideTranslations(locale)),
    },
});
