import React, { createContext, FunctionComponent, useState } from "react";

const LinkStateContext = createContext({
    isHovered: false,
});
const LinkDispatchContext = createContext({});

/**
 * Interfaces
 */
interface Props {}

/**
 * Component
 * @param Props
 */
export const LinkProvider: FunctionComponent<Props> = ({ children }) => {
    const [linkContext, setLinkContext] = useState({
        isHovered: false,
    });

    return (
        <LinkStateContext.Provider value={linkContext}>
            <LinkDispatchContext.Provider value={setLinkContext}>
                {children}
            </LinkDispatchContext.Provider>
        </LinkStateContext.Provider>
    );
};

export { LinkStateContext, LinkDispatchContext };
