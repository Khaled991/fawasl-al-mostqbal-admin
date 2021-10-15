import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import {
  DocumentData,
  QueryDocumentSnapshot,
} from "../../../node_modules/firebase/firestore/dist/firestore";
import { firestore } from "../../utils/firebase";
import { store } from "../store";
import { toJsDateAndTimeFromFirestoreDate } from "./../../utils/firebase";

export const getChatTabs = async () => {
  const chatsRef = collection(firestore, "chats");
  const chatsQuery = query(
    chatsRef,
    where("currentAdminPeer", "in", ["ajciascjsac", null])
  );

  const chatsSnapShot = await getDocs(chatsQuery);

  const chatTabs = await Promise.all(
    chatsSnapShot.docs.map(async (chatDoc) => {
      const lasMessage = await getLastSentMessageDetails(chatDoc);
      const { createdAt, text } = lasMessage.data()!;

      const { currentAdminPeer } = chatDoc.data();
      console.log({ currentAdminPeer });

      // const lastTenMessagesSnapShot = await getLastTenMessagesSnapShot();

      // console.log(lastTenMessagesSnapShot);

      return {
        id: chatDoc.id,
        createdAt: toJsDateAndTimeFromFirestoreDate(createdAt),
        text,
      };
    })
  );
  return chatTabs;
};

const getLastSentMessageDetails = async (
  chatDoc: QueryDocumentSnapshot<DocumentData>
) => {
  const { lastMessageSent } = chatDoc.data();
  const chatId = chatDoc.id;

  const lastMessageSentRef = doc(
    firestore,
    "chats",
    chatId,
    "chatMessages",
    lastMessageSent
  );

  return await getDoc(lastMessageSentRef);
};

const getLastTenMessagesSnapShot = async () =>
  await getDocs(getLastTenMessagesQuery);

export const getLastTenMessagesQuery = query(
  collection(
    firestore,
    "chats",
    store.getState().auth.currentUser!.uid!,
    "chatMessages"
  ),
  orderBy("createdAt", "desc"),
  limit(10)
);
