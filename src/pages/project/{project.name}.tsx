import { Fragment } from "react";
import { graphql, PageProps } from "gatsby";
import { Header } from "@components/header";
import { MainContainer } from "@components/main-container";
import { MainTitle } from "@components/main-title";

/**
 * Interfaces
 */
interface Props extends PageProps {
    data: {
        project: Project;
    };
}

interface Project {
    name: string;
    description: string;
}

/**
 * Component
 * @param props
 */
export default function Project({ data }: Props): JSX.Element {
    const { project } = data;

    return (
        <Fragment>
            <Header />
            <MainContainer className="lg:pt-20">
                <MainTitle>{project.name}</MainTitle>
                <MainTitle>{project.description}</MainTitle>
            </MainContainer>
        </Fragment>
    );
}

export const query = graphql`
    query($id: String!) {
        project(id: { eq: $id }) {
            name
            description
        }
    }
`;
