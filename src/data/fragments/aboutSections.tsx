import { graphql } from "gatsby";

export const AboutSectionsFragment = graphql`
    fragment aboutSectionsFields on AboutPageData {
        hero {
            description
        }
        expertise {
            description
            skills
        }
        designProcess {
            description
            designProcessPhases {
                phaseNum
                title
                description 
            }
        }
    }
`;
