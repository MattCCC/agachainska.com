import { defineConfig } from "tinacms";
import collections from "./collections";

const branch =
    process.env["HEAD"] ||
    process.env["VERCEL_GIT_COMMIT_REF"] ||
    process.env["NEXT_PUBLIC_TINA_BRANCH"] ||
    process.env["NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF"] ||
    "main";

export default defineConfig({
    branch,
    clientId: String(process.env["TINA_CLIENT_ID"] || ""),
    token: String(process.env["TINA_TOKEN"]),
    build: {
        outputFolder: "admin",
        publicFolder: "public",
    },
    media: {
        tina: {
            mediaRoot: "",
            publicFolder: "public",
        },
    },
    schema: {
        collections,
    },
});
