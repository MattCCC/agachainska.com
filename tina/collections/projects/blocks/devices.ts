import { Template } from "tinacms";
import { Device } from "./device";

export const Devices = {
    label: "Devices",
    name: "devices",
    ui: {
        defaultItem: {
            content: "",
        },
    },
    fields: [
        {
            label: "Devices",
            name: "devices",
            type: "object",
            list: true,
            ui: {
                component: "group-list",
                visualSelector: false,
                itemProps: (item: { id: string; type: string }) => ({
                    label: item.type,
                }),
                defaultItem: () => ({
                    type: "",
                    id: String(Math.random()).substring(2, 9),
                }),
            },
            fields: Device.fields,
        },
    ],
} as Template;
