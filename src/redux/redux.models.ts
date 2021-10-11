import { IAuthState } from "./auth/auth.models";
import { IChatState } from "./chat/chat.models";

export interface IAction<T> {
  type: string;
  payload?: T;
}

export interface IRootReducer {
  chat: IChatState;
  auth: IAuthState;
}
