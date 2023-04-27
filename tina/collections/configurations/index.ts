import { Collection } from "tinacms";
import translations from "./translations";

export default {
    label: "Configuration",
    name: "configuration",
    path: "content/configurations",
    ui: {
        // Don't allow editors to create new navigation items
        allowedActions: {
            create: true,
            delete: true,
        },
    },
    templates: [translations],
} as Collection;
