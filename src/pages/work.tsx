import { Fragment } from "react";
import { MainContainer } from "@components/main-container";
import { Header } from "@components/header";
import { MainTitle } from "@components/main-title";
import { Translate } from "@components/translate";
import { Timeline } from "@components/timeline";
import { motion } from "@components/animation";
import { useCallback } from "react";
import pageTimelines from "@config/page-timlines";

const transition = {
    duration: 1,
    ease: [0.43, 0.13, 0.23, 0.96],
};

const backVariants = {
    exit: { y: 100, opacity: 0, transition },
    enter: { y: 0, opacity: 1, transition: { delay: 0, ...transition } },
};

/**
 * Component
 * @param props
 */
export default function Work(): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const onTimelineItemChange = useCallback((): void => { }, []);

    return (
        <Fragment>
            <motion.div
                className="single"
                initial="exit"
                animate="enter"
                exit="exit"
                variants={backVariants}
            >
                <Header />
                <MainContainer className="lg:pt-20">
                    <MainTitle>
                        <Translate id="work.title" />
                        <Timeline
                            onTimelineItemChange={onTimelineItemChange}
                            sections={pageTimelines["rem-max"]}
                        />
                    </MainTitle>
                </MainContainer>
            </motion.div>
        </Fragment>
    );
}
