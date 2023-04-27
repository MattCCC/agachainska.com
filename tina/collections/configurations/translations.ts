import { Collection } from "tinacms";

export default {
    label: "Translations",
    name: "translations",
    path: "content/translations",
    fields: [
        {
            label: "Title",
            name: "title",
            type: "string",
            isTitle: true,
            required: true,
        },
        {
            label: "Site Title",
            name: "siteTitle",
            type: "string",
            required: true,
        },
        {
            label: "Header - Logo",
            name: "headerLogoTitle",
            type: "string",
            required: true,
        },
        {
            label: "Header - Work",
            name: "headerWorkTitle",
            type: "string",
            required: true,
        },
        {
            label: "Header - About Us",
            name: "headerAboutTitle",
            type: "string",
            required: true,
        },
        {
            label: "Header - Contact",
            name: "headerContactTitle",
            type: "string",
            required: true,
        },
        {
            label: "Homepage Title",
            name: "homepageTitle",
            type: "string",
            required: true,
        },
        {
            label: "Homepage Description",
            name: "homepageDescription",
            type: "string",
            required: true,
        },
        {
            label: "About Us Title",
            name: "aboutTitle",
            type: "string",
            required: true,
        },
        {
            label: "Work Title",
            name: "workTitle",
            type: "string",
            required: true,
        },
        {
            label: "Not Found",
            name: "notFound",
            type: "string",
            required: true,
        },
        {
            label: "View Work",
            name: "viewWork",
            type: "string",
            required: true,
        },
        {
            label: "View dribbble shot",
            name: "viewDribbleShot",
            type: "string",
            required: true,
        },
        {
            label: "Explore",
            name: "explore",
            type: "string",
            required: true,
        },
        {
            label: "Contact",
            name: "contact",
            type: "string",
            required: true,
        },
        {
            label: "Drag",
            name: "drag",
            type: "string",
            required: true,
        },
        {
            label: "See all projects",
            name: "seeAllProjects",
            type: "string",
            required: true,
        },
    ],
} as Collection;
