import { Collection } from "tinacms";

export default {
    label: "About",
    name: "about",
    fields: [
        {
            label: "Page Title",
            name: "title",
            type: "string",
            required: true,
            isTitle: true,
        },
        {
            label: "Hero",
            name: "hero",
            type: "object",
            ui: {
                component: "group",
            },
            fields: [
                {
                    type: "rich-text",
                    name: "description",
                    label: "Description",
                    isBody: true,
                },
            ],
        },
        {
            label: "Expertise",
            name: "expertise",
            type: "object",
            ui: {
                component: "group",
            },
            fields: [
                {
                    type: "rich-text",
                    name: "description",
                    label: "Description",
                    isBody: true,
                },
            ],
        },
        {
            label: "Skills",
            name: "skills",
            type: "object",
            list: true,
            ui: {
                itemProps: (item) =>
                    // Field values are accessed by title?.<Field name>
                    ({ label: item?.["title"] || "" }),
            },
            fields: [
                {
                    label: "Title",
                    name: "title",
                    type: "string",
                },
            ],
        },
        {
            label: "Design Process",
            name: "design_process",
            type: "object",
            ui: {
                component: "group",
            },
            fields: [
                {
                    type: "rich-text",
                    name: "description",
                    label: "Description",
                    isBody: true,
                    required: true,
                },
                {
                    label: "Phases",
                    name: "phases",
                    type: "object",
                    list: true,
                    required: true,
                    ui: {
                        itemProps: (item) =>
                            // Field values are accessed by title?.<Field name>
                            ({
                                label:
                                    (item?.["phaseNum"] || "") +
                                    " " +
                                    (item?.["title"] || ""),
                            }),
                    },
                    fields: [
                        {
                            label: "Phase Number",
                            name: "phaseNum",
                            type: "string",
                            required: true,
                        },
                        {
                            label: "Title",
                            name: "title",
                            type: "string",
                            required: true,
                        },
                        {
                            type: "rich-text",
                            name: "description",
                            label: "Description",
                            isBody: true,
                            required: true,
                        },
                    ],
                },
            ],
        },
        {
            label: "Translations",
            name: "translations",
            type: "object",
            ui: {
                component: "group",
            },
            fields: [
                {
                    label: "Expertise",
                    name: "expertise",
                    type: "string",
                    required: true,
                },
                {
                    label: "Design Process",
                    name: "designProcess",
                    type: "string",
                    required: true,
                },
                {
                    label: "Selected Projects",
                    name: "selectedProjects",
                    type: "string",
                    required: true,
                },
            ],
        },
    ],
} as Collection;
