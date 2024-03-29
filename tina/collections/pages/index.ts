import { Collection } from "tinacms";
import about from "./about";
import contact from "./contact";

export default {
    label: "Pages",
    name: "page",
    path: "content/pages",
    ui: {
        // Don't allow editors to create new navigation items
        allowedActions: {
            create: true,
            delete: true,
        },
    },
    templates: [about, contact],
} as Collection;
