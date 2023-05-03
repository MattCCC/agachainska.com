import { Template } from "tinacms";

export const Credits = {
    label: "Credits",
    name: "credits",
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
            label: "Credits",
            name: "credits",
            type: "object",
            list: true,
            required: true,
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
                    label: "Text",
                    name: "text",
                    type: "string",
                    required: true,
                },
            ],
        },
    ],
} as Template;
