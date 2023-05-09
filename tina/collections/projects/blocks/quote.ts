import { Template } from "tinacms";

export const Quote = {
    label: "Quote",
    name: "quote",
    ui: {
        defaultItem: {
            content: "Quote",
        },
        itemProps: () => ({
            label: "Quote",
        }),
    },
    fields: [
        {
            label: "Quote",
            name: "quote",
            type: "rich-text",
            required: true,
        },
    ],
} as Template;
