import { graphql } from "gatsby";

export const ProjectFragment = graphql`
    fragment ProjectFields on Project {
        uid
        category
        subCategory
        pageBackgroundColor
        starColor
        name
        cover
        shortDescription
        timelineTitle
        dribbbleLink
        keyInfo {
            elements {
                title
                text
            }
        }
        sections {
            section
            showInTimeline
            showSectionTitle
            elements {
                element
                title
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
