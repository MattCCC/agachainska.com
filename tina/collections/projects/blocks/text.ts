import { Template } from "tinacms";

export const Text = {
    label: "Text",
    name: "text",
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
            label: "Title",
            name: "title",
            type: "string",
            required: true,
        },
        {
            label: "Text",
            name: "content",
            type: "rich-text",
            required: true,
            children: [],
            validate: (value: string) => (value || "").length > 0,
        },
    ],
} as Template;
