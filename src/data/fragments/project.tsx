import { graphql } from "gatsby";

export const ProjectFragment = graphql`
    fragment ProjectFields on Project {
        uid
        category
        subCategory
        bgColor
        starColor
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
            showSectionTitle
            elements {
                element
                type
                link
                list {
                    type
                    link
                }
                stats {
                    title
                    stat
                }
                description
                image
                images {
                    image
                }
                quote
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
