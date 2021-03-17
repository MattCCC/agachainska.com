import { Fragment, useEffect } from "react";
import { graphql, PageProps } from "gatsby";
import { Header } from "@components/header";
import { MainContainer } from "@components/main-container";
import { MainSection } from "@components/main-section";
import { MainTitle } from "@components/main-title";
import { useStore } from "@store/index";

/**
 * Interfaces
 */
interface Project {
    name: string;
    client: string;
    agency: string;
    timeframe: string;
    roleInProject: string;
    challenge: Record<string, string>;
    approach: Record<string, string>;
    stats: Record<string, number>;
    credits: Record<string, string>;
}

interface Props extends PageProps {
    data: {
        project: Project;
    };
}

/**
 * Component
 * @param props
 */
export default function Project({ data }: Props): JSX.Element {
    const [, dispatch] = useStore();

    useEffect(() => {
        dispatch.showMotionGrid(false);
    }, [dispatch]);

    const {
        name,
        client,
        agency,
        timeframe,
        roleInProject,
        challenge,
        approach,
        stats,
        credits,
    } = data.project;

    return (
        <Fragment>
            <Header />
            <MainSection className="grid grid-flow-col grid-cols-1 grid-rows-1 items-center">
                <MainContainer className="lg:pt-20">
                    <MainTitle>{name}</MainTitle>
                </MainContainer>
            </MainSection>
        </Fragment>
    );
}

export const query = graphql`
    query($id: String!) {
        project(id: { eq: $id }) {
            ...ProjectFields
        }
    }
`;
