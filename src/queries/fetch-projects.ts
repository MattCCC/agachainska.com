import client from "tina/__generated__/client";
import { ProjectNode } from "types/project";

export const fetchProjects = async ({ locale }: { locale: string }) => {
    const projects = [] as ProjectNode[];

    try {
        const { data: dataSrc } = await client.queries.projectConnection();

        if (dataSrc.projectConnection.edges) {
            for (const edge of dataSrc.projectConnection.edges) {
                if (
                    edge?.node &&
                    edge.node.id.startsWith(`content/projects/${locale}/`)
                ) {
                    projects.push(edge.node);
                }
            }
        }
    } catch {
        return null;
    }

    return projects;
};
