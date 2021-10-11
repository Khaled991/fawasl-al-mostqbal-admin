import { combineReducers } from "redux";
import { IRootReducer } from "./redux.models";
import chatReducer from "./chat/chat.reducer";
import { authReducer } from "./auth/auth.reducer";

export const rootReducer = combineReducers<IRootReducer>({
  chat: chatReducer,
  auth: authReducer,
});
