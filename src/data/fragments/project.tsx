import { graphql } from "gatsby";

export const ProjectFragment = graphql`
    fragment ProjectFields on Project {
        name
        client
        agency
        timeframe
        roleInProject
        challenge {
            overview
            projectGoals
            audience
        }
        approach {
            brandElements
            quote
        }
        stats {
            screens
            iterations
            prototypes
        }
        credits {
            concept
            conceptDesc
            design
            designDesc
            projectManagement
            projectManagementDesc
        }
    }
`;
