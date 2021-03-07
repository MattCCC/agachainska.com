import React, { createContext, Dispatch, FunctionComponent, SetStateAction, useState } from "react";

const LinkStateContext = createContext({
    isHovered: false,
    setLinkContext: ((isHovered: boolean) => ({
        isHovered,
    })) as unknown as Dispatch<SetStateAction<{ isHovered: boolean }>>
});

/**
 * Interfaces
 */
interface Props { }

/**
 * Component
 * @param Props
 */
export const LinkProvider: FunctionComponent<Props> = ({ children }) => {
    const [linkContext, setLinkContext] = useState({
        isHovered: false,
    });

    return (
        <LinkStateContext.Provider value={{ ...linkContext, setLinkContext }}>
            {children}
        </LinkStateContext.Provider>
    );
};

export { LinkStateContext };
