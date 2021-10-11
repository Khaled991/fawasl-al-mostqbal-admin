import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { firestore } from "../../utils/firebase";
import { toJsDateAndTimeFromFirestoreDate } from "./../../utils/firebase";

// export async function sendMessageToFireStore(
//   myMessageText: string,
//   myUuid: string
// ) {
//   const myMessage: IMessageFirebase = createMessageFirebaseObjectFromText(
//     myMessageText,
//     myUuid
//   );

//   const batch = writeBatch(firestore);

//   const chatMessagesRef = doc(
//     firestore,
//     "chats",
//     myUuid,
//     "chatMessages",
//     myMessage.msgId!
//   );
//   batch.set(chatMessagesRef, myMessage);

//   const lastMessageSentRef = doc(firestore, "chats", myUuid);
//   batch.set(lastMessageSentRef, { lastMessageSent: myMessage.msgId });

//   await batch.commit();
// }

// const createMessageFirebaseObjectFromText = (
//   myMessageText: string,
//   myUuid: string
// ): IMessageFirebase => {
//   return {
//     senderId: myUuid,
//     text: myMessageText,
//     createdAt: new Date(),
//   };
// };

// export function modifyMessagesState(
//   modifiedMessage: IMessageFirebase,
//   messagesBeforeModification: IMessageFirebase[]
// ) {
//   return messagesBeforeModification.map((message) =>
//     message.msgId === modifiedMessage.msgId ? modifiedMessage : message
//   );
// }

export const collectionMyMessagesRef = (myUuid: string) =>
  collection(firestore, "chats", myUuid, "chatMessages");

// export const getMoreTenMessagesQuery = () => {
//   return query(
//     collectionMyMessagesRef(store.getState().auth.uuid),
//     orderBy("createdAt", "desc"),
//     startAfter(store.getState().chat.lastLoadedMessageDocument),
//     limit(10)
//   );
// };

// export const getLastTenMessagesQuery = () => {
//   return query(
//     collectionMyMessagesRef(store.getState().auth.uuid),
//     orderBy("createdAt", "desc"),
//     limit(10)
//   );
// };

// export async function getTenMessages(): Promise<
//   [IMessageFirebase[], QueryDocumentSnapshot<DocumentData>]
// > {
//   const lastLoadedMessageDocument =
//     store.getState().chat.lastLoadedMessageDocument;

//   const messagesDocSnap = await getDocs(
//     lastLoadedMessageDocument
//       ? getMoreTenMessagesQuery()
//       : getLastTenMessagesQuery()
//   );

//   const messages: IMessageFirebase[] = messagesDocSnap.docs.map(
//     (doc) => doc.data() as IMessageFirebase
//   );

//   const lastLoadedMessageDocumentIndex = messagesDocSnap.docs.length - 1;

//   return [
//     messages.reverse(),
//     messagesDocSnap.docs[lastLoadedMessageDocumentIndex],
//   ];
// }

export const getChatTabs = async () => {
  const chatsRef = collection(firestore, "chats");

  const chatsSnapShot = await getDocs(chatsRef);

  const chatTabs = await Promise.all(
    chatsSnapShot.docs.map(async (chatsDoc) => {
      const { lastMessageSent } = chatsDoc.data();
      const lastMessageSentRef = doc(
        firestore,
        "chats",
        chatsDoc.id,
        "chatMessages",
        lastMessageSent
      );
      const lasMessage = await getDoc(lastMessageSentRef);
      const { createdAt, text } = lasMessage.data()!;

      return {
        id: chatsDoc.id,
        createdAt: toJsDateAndTimeFromFirestoreDate(createdAt),
        text,
      };
    })
  );
  return chatTabs;
};
