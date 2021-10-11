import { IAction } from "../redux.models";
import { chatActionTypes } from "./chat.types";

export const modifyScrollHeightAction = (
  scrollHeight: number
): IAction<any> => ({
  type: chatActionTypes.MODIFY_SCROLL_HEIGHT,
  payload: scrollHeight,
});

export const updateFirstMessageUidAction = (): IAction<any> => ({
  type: chatActionTypes.UPDATE_FIRST_MESSAGE_UID,
});

export const setChatTabsAction = (chatTabs: any): IAction<any> => ({
  type: chatActionTypes.SET_CHAT_TABS,
  payload: chatTabs,
});
