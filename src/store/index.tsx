import { createStore } from "react-lit-store";
import { toggle } from "@utils/store";

const initialState = {
    isHovered: false,
    isPressedWithDelay: false,
};

type State = Partial<typeof initialState>;

const actions = {
    hoverLink: toggle<State>("isHovered"),
    setPressedWithDelay: toggle<State>("isPressedWithDelay"),
};

export { useStoreProvider } from "react-lit-store";

const globalStore = createStore(initialState, actions);
const useStore = globalStore.useStore;

export { globalStore, useStore };
