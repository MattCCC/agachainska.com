import { useReducer, useMemo, FC, PropsWithChildren, Context } from "react";

import { createContext, useContextSelector } from "use-context-selector";

import { isDev } from "./detect-env";

type Funct<T, TT> = (prevState: T, payload: TT) => any;

/**
 * Toggle state boolean
 * @param {string} type      State key
 * @returns {function}
 */
export const set = <T, T1, T2 = T>(type: keyof T): Funct<T2, T1> => (
    prevState,
    payload
): any => {
    if (isDev()) {
        // eslint-disable-next-line no-console
        console.log("store:", type, payload, " prev:", prevState);
    }

    return {
        ...prevState,
        [type]: payload,
    };
};

export interface Mutations<S> {
    [name: string]: (state: S, ...args: any) => Partial<S>;
}

export type Payload<M> = M extends (state: any, ...args: infer P) => any
    ? P
    : never;

export type Actions<M> = {
    [name in keyof M]: (...args: Payload<M[name]>) => void;
};

export type StoreContext<S, A> = Context<Array<S | Actions<A>>>;

export interface Store<S, M> {
    Provider: React.FC<React.PropsWithChildren<Record<string, unknown>>>;
    useStore: () => [S, Actions<M>];
    useStoreProp: (v: keyof S) => [any, Actions<M>, S | Actions<M>];
}

function getEmptyActions<S, M extends Mutations<S>>(mutations: M): Actions<M> {
    const actions: Actions<M> = Object.assign({}, mutations);

    Object.keys(mutations).forEach((name: keyof M) => {
        actions[name] = (): void => {};
    });

    return actions;
}

/**
 * Create a lit-store instance with the initial state and reducer.
 * @param initialState Initial store state
 * @param reducer Reducer to mutate state
 * @returns Store instance with `Provider` component and `useStore` hook.
 */
export function createStore<S, M extends Mutations<S>>(
    initialState: S,
    mutations: M
): Store<S, M> {
    const context = createContext([
        initialState,
        getEmptyActions<S, M>(mutations),
    ]);
    let actions: Actions<M> | null = null;

    function reducer(
        prevState: S,
        action: {
            type: keyof M;
            payload: Payload<M[keyof M]>;
        }
    ): S {
        return {
            ...prevState,
            ...mutations[action.type](prevState, ...(action.payload as any[])),
        };
    }

    function Provider({
        children,
    }: React.PropsWithChildren<Record<string, unknown>>): JSX.Element {
        const [state, dispatch] = useReducer(reducer, initialState);

        actions = useMemo(() => {
            const result: Actions<M> = Object.assign({}, mutations);

            Object.keys(mutations).forEach((name: keyof M) => {
                result[name] = (...args): void => {
                    dispatch({ type: name, payload: args });
                };
            });

            return result;
        }, [dispatch]);

        return (
            <context.Provider value={[state, actions]}>
                {children}
            </context.Provider>
        );
    }

    function useStore() {
        return useContextSelector(context, (state) => state);
    }

    function useStoreProp(prop: keyof M) {
        const state = useContextSelector(
            context,
            (v) => (v[0] as Actions<M>)[prop]
        );
        const setState = useContextSelector(context, (v) => v[1]);

        return [state, actions, setState];
    }

    return { Provider, useStore, useStoreProp } as any;
}

/**
 * A custom hook to combine multiple stores and returns a single Provider.
 * @param stores List of stores
 * @returns A single Provider component that provides all the stores
 */
export function useStoreProvider(
    ...stores: Array<Store<any, any>>
): FC<PropsWithChildren<Record<string, unknown>>> {
    function Provider({
        children,
    }: React.PropsWithChildren<Record<string, unknown>>): JSX.Element {
        let wrapped = children;

        stores.forEach(({ Provider: ProviderWrapper }) => {
            wrapped = <ProviderWrapper>{wrapped}</ProviderWrapper>;
        });

        return <>{wrapped}</>;
    }

    return Provider;
}

/**
 * Merge State while preserving initial state's sub-objects
 * @param initialState Initial state
 * @param prevState Previous state
 * @param obj New object to be updated
 * @param key State property
 * @returns Merged object
 */
export const mergeState = (
    initialState: { [x: string]: any },
    prevState: { [x: string]: any },
    obj: { [x: string]: any } | undefined,
    key: string
) => {
    const newObj = obj
        ? {
              ...initialState[key],
              ...obj,
          }
        : prevState[key] || initialState[key];

    return { [key]: newObj };
};
