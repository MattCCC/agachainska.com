import { Layout } from "@layouts/default";
import { MainContainer } from "@components/main-container";
import { Header } from "@components/header";
import { MainTitle } from "@components/main-title";
import { Translate } from "@components/translate";
import { Timeline } from "@components/timeline";
import { motion } from "@components/animation";

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
    return (
        <Layout>
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
                            sections={[
                                {
                                    title: "UX",
                                    items: [],
                                },
                                {
                                    title: "UI",
                                    isActive: true,
                                    items: [
                                        { name: "RE/MAX", isActive: true },
                                        { name: "Addidas" },
                                        { name: "Nike" },
                                        { name: "Pepsi" },
                                        { name: "Topshop" },
                                    ],
                                },
                                {
                                    title: "Illustrations",
                                    items: [],
                                },
                            ]}
                        />
                    </MainTitle>
                </MainContainer>
            </motion.div>
        </Layout>
    );
}
