import { ICreatedAt } from "../../utils/firebase";

export interface IChatState {
  chatTabs: IChatTab[];
}

export interface IChatTab {
  id: string;
  createdAt: ICreatedAt;
  text: string;
}
