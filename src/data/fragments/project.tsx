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
        sections {
            section
            showInTimeline
            elements {
                element
                description
                image
                images {
                    image
                }
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
