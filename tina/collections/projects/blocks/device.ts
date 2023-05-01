import { Template } from "tinacms";

export const Device = {
    label: "Device",
    name: "device",
    ui: {
        defaultItem: {
            content: "Device",
        },
        itemProps: (item: { id: string; title: string }) => ({
            label: item.title,
        }),
    },
    fields: [
        {
            label: "Type",
            name: "type",
            type: "string",
            ui: {
                component: "select",
            },
            options: ["iPhoneX", "iPhone13pro", "iPhone8", "laptop"],
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
} as Template;
