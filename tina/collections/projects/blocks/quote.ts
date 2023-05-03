import { Template } from "tinacms";

export const Quote = {
    label: "Quote",
    name: "quote",
    ui: {
        defaultItem: {
            content: "Quote",
        },
        itemProps: (item: { id: string; title: string }) => ({
            label: item.title,
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
            label: "Quote",
            name: "quote",
            type: "rich-text",
            required: true,
            children: [],
            validate: (value: string) => (value || "").length > 0,
        },
    ],
} as Template;
