export type ActionMap<M extends { [x: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
              type: Key;
          }
        : {
              type: Key;
              payload: M[Key];
          };
};

export interface State {
    items: number[];
    activeItem: number;
}

// eslint-disable-next-line no-shadow
export enum ActionTypes {
    AddItem = "ADD_ITEM",
    SetActiveItem = "SET_ACTIVE_ITEM",
}

export interface Payloads {
    [ActionTypes.AddItem]: {
        position: number;
        index: number;
    };
    [ActionTypes.SetActiveItem]: {
        activeItem: number;
    };
}

export type Actions = ActionMap<Payloads>[keyof ActionMap<Payloads>];

export const reducer = (prevState: State, action: Actions): State => {
    switch (action.type) {
        case ActionTypes.AddItem:
            // Prevent recreating slides in the state
            if (typeof prevState.items[action.payload.index] !== "undefined") {
                prevState.items[action.payload.index] = action.payload.position;

                return { ...prevState, items: [...prevState.items] };
            }

            return {
                ...prevState,
                items: [...prevState.items, action.payload.position],
            };

        case ActionTypes.SetActiveItem:
            return {
                ...prevState,
                activeItem: action.payload.activeItem,
            };

        default:
            return prevState;
    }
};
