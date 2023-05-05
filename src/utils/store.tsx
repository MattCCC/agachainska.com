import { useReducer, useMemo, FC, PropsWithChildren, Context } from "react";

import { createContext, useContextSelector } from "use-context-selector";

type Funct<T, TT> = (prevState: T, payload: TT) => any;

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
    useStoreProp: <K extends S[keyof S]>(
        v: K
        // @ts-expect-error Indexing generic fn param works just okay
    ) => [S[K], Actions<M>, S | Actions<M>];
}

/**
 * Toggle state boolean
 * @param {string} type      State key
 * @returns {object}        Modified state
 */
export const set =
    <T, T1, T2 = T>(type: keyof T): Funct<T2, T1> =>
    (prevState, payload): any => ({
        ...prevState,
        [type]: payload,
    });

function getEmptyActions<S, M extends Mutations<S>>(mutations: M): Actions<M> {
    const actions: Actions<M> = Object.assign({}, mutations);

    Object.keys(mutations).forEach((name: keyof M) => {
        actions[name] = (): void => {};
    });

    return actions;
}

/**
 * Create a simple store instance with the initial state and reducer
 * @param initialState      Initial store state
 * @param reducer           Reducer to mutate state
 * @returns {Store}         Store instance with `Provider` component and `useStore` hook
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
        const fn = mutations[action.type];

        if (typeof fn !== "function") {
            return prevState;
        }

        return {
            ...prevState,
            ...fn(prevState, ...(action.payload as unknown[])),
        };
    }

    function Provider({
        children,
    }: React.PropsWithChildren<Record<string, unknown>>) {
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

        return [state, actions];
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
    }: React.PropsWithChildren<Record<string, unknown>>) {
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
