import { chatActionTypes } from "./chat.types";
import { IChatState } from "./chat.models";
import { IAction } from "../redux.models";

const INITIAL_STATE: IChatState = {
  chatTabs: [],
};

const chatReducer = (
  state: IChatState = INITIAL_STATE,
  action: IAction<any>
): IChatState | any => {
  switch (action.type) {
    case chatActionTypes.SET_CHAT_TABS:
      return {
        ...state,
        chatTabs: action.payload,
      };

    default:
      return state;
  }
};

export default chatReducer;
