interface StoreAction {
    type: string;
    payload: any;
}

export const Reducer = (state: any, action: StoreAction): any => {
    switch (action.type) {
        case "LINK_HOVER":
            return {
                ...state,
                isHovered: action.payload,
            };

        default:
            return state;
    }
};
