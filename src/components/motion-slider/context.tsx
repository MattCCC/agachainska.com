import {
    createContext,
    Dispatch,
    FC,
    useReducer,
    PropsWithChildren,
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

export const ContextProvider: FC = ({
    children,
}: PropsWithChildren<unknown>) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
};
