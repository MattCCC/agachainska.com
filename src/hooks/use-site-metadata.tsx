export const useSiteMetadata = () => {
    // const data = useStaticQuery(graphql`
    //     query {
    //         site {
    //             siteMetadata {
    //                 title
    //                 description
    //                 twitterUsername
    //                 image
    //                 siteUrl
    //             }
    //         }
    //     }
    // `);

    return {
        title: '',
        description: '',
        image: '',
        siteUrl: '',
        twitterUsername: '',
    };
};