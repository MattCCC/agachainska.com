import { Collection } from "tinacms";
import sections from "./sections";

export default {
    name: "project",
    label: "Projects",
    path: "content/projects",
    fields: [
        {
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true,
        },
        {
            type: "string",
            name: "shortDescription",
            label: "Short Description",
            required: true,
        },
        {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
        },
        {
            type: "string",
            name: "subCategory",
            label: "Sub Category (type 'Others' or leave empty)",
        },
        {
            type: "string",
            name: "dribbbleLink",
            label: "Dribbble Link",
        },
        {
            type: "string",
            name: "timelineTitle",
            label: "Timeline Title",
            required: true,
        },
        {
            type: "string",
            name: "workPageColor",
            label: "Work Page Color",
            required: true,
            ui: {
                component: "color",
            },
            colorFormat: "hex",
        },
        {
            type: "string",
            name: "starColor",
            label: "Star Color",
            required: true,
            ui: {
                component: "color",
            },
            colorFormat: "hex",
        },
        {
            type: "string",
            name: "cover",
            label: "Main Image",
            required: true,
            ui: {
                component: "image",
            },
            parse: (fullSrc: Record<string, string>) =>
                `${
                    typeof fullSrc === "string"
                        ? fullSrc
                        : `/img/projects/${fullSrc["filename"]}`
                }`,
            uploadDir: () => "/img/projects/",
            previewSrc: (fullSrc: string) => fullSrc.replace("/public", ""),
        },
        {
            label: "Key Info",
            name: "keyInfo",
            type: "object",
            list: true,
            required: false,
            ui: {
                component: "group-list",
            },
            itemProps: (item: { id: string; title: string }) => ({
                key: item.id,
                label: item.title,
            }),
            defaultItem: () => ({
                title: "",
                id: String(Math.random()).substring(2, 9),
            }),
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
        ...sections,
    ],
} as Collection;
