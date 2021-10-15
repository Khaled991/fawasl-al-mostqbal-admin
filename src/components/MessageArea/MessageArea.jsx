// import React, { useEffect } from 'react';
import { ReactComponent as Seen } from '../../assets/icons/seen.svg';
import { ReactComponent as Check } from '../../assets/icons/check.svg';

import './MessageArea.scss';
// import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
// import { socketState } from '../../App';
// import { searchMessageData } from '../UserInfo/UserInfo';
// import { usersState } from '../Users/Users';

// export const messageState = atom({
//   key: 'messageState',
//   default: [],
// });

// const charCountState = selector({
//   key: 'msadsadasd', // unique ID (with respect to other atoms/selectors)
//   get: ({ get }) => {
//     const text = get(usersState);
//     return text.length ? text[0].messages : [];
//   },
// });

const MessageArea = ({ img, imgSender }) => {
  // const [socket] = useRecoilState(socketState);
  // const [searchMessage] = useRecoilState(searchMessageData);
  // const [users, setUsers] = useRecoilState(usersState);
  // const [{ id: myId }] = useRecoilState(socketState);
  // const userMessages = useRecoilValue(charCountState);

  // useEffect(() => {
  //   socket.on('receive:message', messageData => {
  //     const findIndex = users.findIndex(({ id }) => id === messageData.id);
  //     if (findIndex !== -1) {
  //       const updatedMessages = [...users[findIndex].messages, messageData];
  //       let copyUsers = users;
  //       copyUsers[findIndex].messages = updatedMessages;
  //       setUsers(copyUsers);
  //     }
  //   });
  // }, [setUsers, socket, users]);
  // const filterMessages = userMessages.filter(({ msg }) =>
  //   msg.toLowerCase().includes(searchMessage.toLowerCase())
  // );
  const uuid = 'pldgfdfg-dg-fdsh-fdsh';
  const messages = Array.from({ length: 10 }).map((x, i) => ({
    id: i % 2 ? uuid : 'askjcsahlkcsaj-safc-saf-a-fsa-f',
    createdAt: new Date(),
    isSeen: true,
    text: i % 2 ? 'السلام عليكم' : 'عليكم السلام',
  }));
  return (
    <div className="message-area-container">
      {messages.map(({ id, ...otherMessageProps }, i) => (
        <ChatMessage key={i} isMe={id === uuid} {...otherMessageProps} />
      ))}
    </div>
  );
};

const ChatMessage = ({ isMe, createdAt, isSeen, text }) => (
  <div className={`message-area-box ${isMe ? 'isMe' : ''}`}>
    <div className="message-from">
      <span className="message-contint">{text}</span>
      <div className="sent-date-seen-icon">
        {isMe ? (
          <>
            {isSeen ? (
              <Seen fill="#fff" className="seen-icon" />
            ) : (
              <Check fill="#fff" className="seen-icon" />
            )}
          </>
        ) : null}
        <div className="sent-date">{createdAt.toDateString()}</div>
      </div>
    </div>
    {/* <img
  // src={isMe ? img : imgSender}
  alt=""
  className="img-message sender"
/> */}
  </div>
);

export default MessageArea;
