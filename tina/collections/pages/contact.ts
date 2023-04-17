import { Collection } from "tinacms";

export default {
    label: "Contact",
    name: "contact",
    fields: [
        {
            label: "Page Title",
            name: "title",
            type: "string",
            required: true,
            isTitle: true,
        },
        {
            label: "Email address",
            name: "email",
            type: "string",
            required: true,
        },
        {
            label: "Form Submission Link",
            name: "formUrl",
            type: "string",
            required: true,
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
                    label: "H1 Title",
                    name: "h1Title",
                    type: "string",
                    required: true,
                },
                {
                    label: "Message Label",
                    name: "messageLabel",
                    type: "string",
                    required: true,
                },
                {
                    label: "Name Label",
                    name: "nameLabel",
                    type: "string",
                    required: true,
                },
                {
                    label: "Email Label",
                    name: "emailLabel",
                    type: "string",
                    required: true,
                },
                {
                    label: "Send Button Text",
                    name: "sendButtonText",
                    type: "string",
                    required: true,
                },
                {
                    label: "Find Me Text",
                    name: "findMeText",
                    type: "string",
                    required: true,
                },
            ],
        },
    ],
} as Collection;
