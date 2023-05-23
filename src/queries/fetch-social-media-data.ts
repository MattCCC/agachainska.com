import client from "tina/__generated__/client";
import {
    ConfigurationQuery,
    ConfigurationQueryVariables,
} from "tina/__generated__/types";

interface Configuration {
    data: ConfigurationQuery;
    query: string;
    variables: ConfigurationQueryVariables;
}

export type ConfigurationPage = Extract<
    ConfigurationQuery["configuration"],
    {
        __typename?: "ConfigurationSocialMedia";
    }
>;

export const fetchSocialMediaData = async ({ locale }: { locale: string }) => {
    let socialMediaData = {
        data: {},
        query: "",
        variables: {
            relativePath: `${locale}/social-media.md`,
        },
    } as Configuration;

    try {
        const { variables, data, query } = await client.queries.configuration(
            socialMediaData.variables
        );

        socialMediaData = { variables, data, query };
    } catch {
        return null;
    }

    return socialMediaData.data.configuration;
};
