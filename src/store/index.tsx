import { createContext, FunctionComponent, useReducer } from "react";
import { Reducer } from "./actions";

const initialState = {
    isHovered: false,
    isPressedWithDelay: false,

    dispatch: (_arg0: string, _arg1: any): null => null,
};

/**
 * Interfaces
 */
interface Props {}

export const Store: FunctionComponent<Props> = ({ children }) => {
    const [state, dispatchAction] = useReducer(Reducer, initialState);
    const dispatch = (type: string, payload: any): any =>
        dispatchAction({
            type,
            payload,
        });

    return (
        <Context.Provider value={{ ...state, dispatch }}>
            {children}
        </Context.Provider>
    );
};

export const Context = createContext(initialState);
