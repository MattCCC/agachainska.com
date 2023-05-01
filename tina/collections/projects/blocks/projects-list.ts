import { Template } from "tinacms";

export const ProjectsList = {
    label: "Projects List",
    name: "projects",
    ui: {
        defaultItem: {
            content: "Project",
        },
        itemProps: (item: { id: string; title: string }) => ({
            label: item.title,
        }),
    },
    fields: [
        {
            label: "Limit",
            description: "Limit of projects to show (default: 4)",
            name: "limit",
            type: "number",
            ui: {
                component: "number",
            },
            required: true,
        },
    ],
} as Template;
