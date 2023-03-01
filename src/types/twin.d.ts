import "twin.macro";
import { css as cssImport } from "@emotion/react";

// The css prop
// https://emotion.sh/docs/typescript#css-prop
import {} from "@emotion/react/types/css-prop";
import styled from 'styled-components';

declare module "twin.macro" {
    const styled: typeof styled;
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
