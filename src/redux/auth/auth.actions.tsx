import { IAction } from "../redux.models";
import { ICurrentUser } from "./auth.models";
import { authActionTypes } from "./auth.types";

export const setCurrentUserAction = (
  currentUser: ICurrentUser | null
): IAction<ICurrentUser | null> => ({
  type: authActionTypes.SET_USER,
  payload: currentUser,
});
