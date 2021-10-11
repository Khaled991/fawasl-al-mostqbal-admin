import { createSelector } from "reselect";
import { IRootReducer } from "../redux.models";
import { IChatState } from "./chat.models";

export const selectChat = (state: IRootReducer) => state.chat;

export const selectChatTabs = createSelector(
  [selectChat],
  (chat: IChatState) => chat.chatTabs
);

// export const selectScrollHeight = createSelector(
//   [selectChat],
//   (chat: IChatState) => chat.scrollHeight
// );

// export const selectFirstMessageUid = createSelector(
//   [selectChat],
//   (chat: IChatState) => chat.firstMessageUid
// );
