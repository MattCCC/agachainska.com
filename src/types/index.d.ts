declare module "*.svg" {
    import React = require("react");
    export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
    const src: string;

    export default src;
}

declare module "*.gif" {
    const content: string;

    export default content;
}

declare module "*.jpg" {
    const content: string;

    export default content;
}

declare module "*.webp" {
    const content: string;

    export default content;
}

declare module "*.png" {
    const content: string;

    export default content;
}

declare module "lerp" {
    const lerp: (v1: number, v2: number, v3: number) => number;

    export default lerp;
}
