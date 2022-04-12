import { graphql } from "gatsby";

export const ProjectFragment = graphql`
    fragment ProjectFields on Project {
        uid
        category
        subCategory
        name
        cover
        client
        agency
        timeframe
        roleInProject
        shortDescription
        dribbbleLink
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
        sections {
            section
            elements {
                element
                description
                image
                imageOne
                imageTwo
                quote
                screens
                iterations
                prototypes
                concept
                conceptDesc
                design
                designDesc
                projectManagement
                projectManagementDesc
                category
            }
        }
    }
`;
