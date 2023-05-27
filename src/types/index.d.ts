declare module "lerp" {
    const lerp: (v1: number, v2: number, v3: number) => number;

    export default lerp;
}

declare module "*.svg?url" {
    const content: string;

    export default content;
}
