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
    Add = "ADD_ITEM",
    SetActive = "SET_ACTIVE_ITEM",
}

export interface Payloads {
    [ActionTypes.Add]: {
        item: number;
    };
    [ActionTypes.SetActive]: {
        activeItem: number;
    };
}

export type Actions = ActionMap<Payloads>[keyof ActionMap<Payloads>];

export const reducer = (prevState: State, action: Actions): State => {
    switch (action.type) {
        case ActionTypes.Add:
            return {
                ...prevState,
                items: [...prevState.items, action.payload.item],
            };

        case ActionTypes.SetActive:
            return {
                ...prevState,
                activeItem: action.payload.activeItem,
            };

        default:
            return prevState;
    }
};
