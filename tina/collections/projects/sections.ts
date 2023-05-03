import { TinaField } from "tinacms";
import { Text } from "./blocks/text";
import { Images } from "./blocks/images";
import { Slider } from "./blocks/slider";
import { Quote } from "./blocks/quote";
import { Statistics } from "./blocks/statistics";
import { Device } from "./blocks/device";
import { Devices } from "./blocks/devices";
import { Credits } from "./blocks/credits";
import { ProjectsList } from "./blocks/projects-list";

export default [
    {
        label: "Sections",
        name: "sections",
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
                label: "Show in timeline",
                name: "showInTimeline",
                type: "boolean",
                required: true,
                ui: {
                    component: "toggle",
                },
            },
            {
                label: "Show Section Title",
                name: "showSectionTitle",
                type: "boolean",
                required: true,
                ui: {
                    component: "toggle",
                },
            },
            {
                label: "Element",
                name: "elements",
                type: "object",
                list: true,
                required: true,
                ui: {
                    visualSelector: false,
                },
                templates: [
                    Text,
                    Images,
                    Slider,
                    Device,
                    Devices,
                    Quote,
                    Statistics,
                    Credits,
                    ProjectsList,
                ],
            },
        ],
    },
] as TinaField[];
