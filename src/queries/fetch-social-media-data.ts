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
    let socialMediaData = {} as ConfigurationQuery;

    try {
        const { data } = await client.queries.configuration({
            relativePath: `${locale}/social-media.md`,
        });

        socialMediaData = data;
    } catch {
        return null;
    }

    return socialMediaData.configuration;
};
