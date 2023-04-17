import { Template } from "tinacms";

export const Statistics = {
    label: "Statistics",
    name: "statistics",
    ui: {
        defaultItem: {
            content: "",
        },
        itemProps: (item: { id: string; title: string }) => ({
            label: item.title,
        }),
    },
    fields: [
        {
            label: "Statistics",
            name: "stats",
            type: "object",
            list: true,
            ui: {
                component: "group-list",
                visualSelector: false,
                itemProps: (item: { id: string; title: string }) => ({
                    label: item.title,
                }),
                defaultItem: () => ({
                    title: "",
                    id: String(Math.random()).substring(2, 9),
                }),
            },
            fields: [
                {
                    label: "Title",
                    name: "title",
                    type: "string",
                    required: true,
                },
                {
                    label: "Number",
                    name: "stat",
                    type: "number",
                    ui: {
                        component: "number",
                    },
                    required: true,
                },
            ],
        },
    ],
} as Template;
