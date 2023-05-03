import { Collection } from "tinacms";
import translations from "./translations";
import socialMedia from "./social-media";

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
    templates: [translations, socialMedia],
} as Collection;
