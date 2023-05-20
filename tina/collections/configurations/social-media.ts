import { Template } from "tinacms";

export default {
    label: "Social Media",
    name: "socialMedia",
    ui: {
        defaultItem: {
            content: "",
        },
    },
    fields: [
        {
            label: "Title",
            name: "title",
            type: "string",
            isTitle: true,
            required: true,
        },
        {
            label: "Social Media",
            name: "socialMedia",
            type: "object",
            list: true,
            required: false,
            ui: {
                component: "group-list",
                visualSelector: false,
                itemProps: (item: { id: string; name: string }) => ({
                    label: item.name,
                }),
                defaultItem: () => ({
                    name: "",
                    id: String(Math.random()).substring(2, 9),
                }),
            },
            fields: [
                {
                    label: "Name",
                    name: "name",
                    type: "string",
                    required: true,
                },
                {
                    label: "Link",
                    name: "link",
                    type: "string",
                    required: true,
                    validate: (value: string) => {
                        try {
                            new URL(value);

                            return false;
                        } catch (err) {
                            return true;
                        }
                    },
                },
            ],
        },
    ],
} as Template;
