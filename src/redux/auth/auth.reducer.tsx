import { IAction } from "../redux.models";
import { IAuthState } from "./auth.models";
import { authActionTypes } from "./auth.types";

const INITIAL_STATE: IAuthState = {
  currentUser: undefined,
};

export const authReducer = (
  state: IAuthState = INITIAL_STATE,
  action: IAction<any>
) => {
  switch (action.type) {
    case authActionTypes.SET_USER:
      return { ...state, currentUser: action.payload! };

    default:
      return state;
  }
};
