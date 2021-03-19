import { Section } from "@components/timeline";

/**
 * Interfaces
 */
type WorkPageTimeline = Section[];

export const workPageTimeline: WorkPageTimeline = [
    {
        title: "UX",
        id: "ux",
        items: [
            { id: "nike", name: "Nike" },
            { id: "pepsi", name: "Pepsi" },
        ],
    },
    {
        title: "UI",
        id: "ui",
        items: [
            { id: "rem-max", name: "RE/MAX" },
            { id: "addidas", name: "Addidas" },
            { id: "nike", name: "Nike" },
            { id: "pepsi", name: "Pepsi" },
            { id: "topshop", name: "Topshop" },
        ],
    },
    {
        title: "Illustrations",
        id: "illustrations",
        items: [
            { id: "addidas", name: "Addidas" },
            { id: "topshop", name: "Topshop" },
        ],
    },
];
