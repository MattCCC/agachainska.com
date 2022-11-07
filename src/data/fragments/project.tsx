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
                description
                image
                quote
                category
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
                images {
                    image
                }
                content {
                    title
                    text
                }
            }
        }
    }
`;
