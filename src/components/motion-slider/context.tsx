import {
    createContext,
    Dispatch,
    useReducer,
    PropsWithChildren,
    useMemo,
} from "react";

import { Actions, reducer, State } from "./reducers";

const initialState = {
    items: [],
    activeItem: 0,
};

export const Context = createContext<{
    state: State;
    dispatch: Dispatch<Actions>;
}>({
    state: initialState,
    dispatch: () => null,
});

export const ContextProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(() => ({ state, dispatch }), [state]);

    return <Context.Provider value={value}>{children}</Context.Provider>;
};
