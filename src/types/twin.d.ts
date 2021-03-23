// twin.d.ts
import "twin.macro";
import { css as cssImport } from "@emotion/react";
import styledImport from "@emotion/styled";

// The css prop
// https://emotion.sh/docs/typescript#css-prop
import {} from "@emotion/react/types/css-prop";

declare module "twin.macro" {
    // The styled and css imports
    const styled: typeof styledImport;
    const css: typeof cssImport;
}

// The 'as' prop on styled components
declare global {
    namespace JSX {
        interface IntrinsicAttributes<T> extends DOMAttributes<T> {
            as?: string;
        }
    }
}
