import { Template } from "tinacms";

export const Images = {
    label: "Images",
    name: "images",
    ui: {
        defaultItem: {
            content: "",
        },
    },
    fields: [
        {
            label: "One or Two Column Images",
            name: "images",
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
                    label: "Stretch to full page",
                    name: "fullPageImage",
                    type: "boolean",
                    required: false,
                    ui: {
                        component: "toggle",
                    },
                },
                {
                    type: "string",
                    name: "image",
                    label: "Image",
                    required: true,
                    ui: {
                        component: "image",
                        parse: (fullSrc: any) =>
                            `${
                                typeof fullSrc === "string"
                                    ? fullSrc
                                    : `/img/projects/${fullSrc.filename}`
                            }`,
                    },
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    uploadDir: () => "/img/projects/",
                    previewSrc: (fullSrc: string) =>
                        fullSrc.replace("/public", ""),
                },
            ],
        },
    ],
} as Template;
