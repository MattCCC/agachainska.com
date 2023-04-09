declare module "*.yml" {
    const value: any;

    export default value;
  }

declare module "lerp" {
    const lerp: (v1: number, v2: number, v3: number) => number;

    export default lerp;
}
