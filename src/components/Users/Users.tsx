// import axios from 'axios';
import { useEffect, useState } from "react";

import { ReactComponent as Search } from "../../assets/icons/search.svg";
// import { isTypingState } from '../UserInfo/UserInfo';
import "./Users.scss";
import { getChatTabs } from "../../redux/chat/chat.utils";
import { useDispatch, useSelector } from "react-redux";
import { setChatTabsAction } from "../../redux/chat/chat.actions";
import { selectChatTabs } from "../../redux/chat/chat.selector";
import { IChatTab } from "../../redux/chat/chat.models";
import { Dispatch } from "redux";

// export const usersState = atom({ key: 'usersState', default: [] });

const Users = ({ img, name }: any) => {
  // const [isTyping] = useRecoilState(isTypingState);
  // const [users, setUsers] = useRecoilState(usersState);
  const [searchValue, setSearchValue] = useState("");
  const dispatch: Dispatch = useDispatch();
  const chatTabs: IChatTab[] = useSelector(selectChatTabs);
  // useEffect(() => {
  //   axios
  //     .post('/users')
  //     .then(({ data }) => setUsers(data))
  //     .catch(e => console.log('error'));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const filterUsers = users.filter(user =>
  //   user.name.toLowerCase().includes(searchValue.toLowerCase())
  // );
  // const filterUsersNotiMsg = users.filter(user => user.messages.length);

  const onChangeSearchField = ({ target: { value } }: any) => {
    setSearchValue(value);
  };
  // const allMsgCount = filterUsers.reduce((accumulator, currentValue) => {
  //   return accumulator + currentValue.messages.length;
  // }, 0);

  useEffect(() => {
    (async () => {
      const chatTabs = await getChatTabs();
      dispatch(setChatTabsAction(chatTabs));
    })();
  }, [dispatch]);

  return (
    <div className="users-container">
      <div className="users-header-container">
        <div className="messages-title-number-container">
          <span className="messages-title">الرسائل</span>
          {/* {allMsgCount ? ( */}
          {/* <div className="messages-receve-number">{allMsgCount}</div> */}
          {/* ) : null} */}
        </div>
        <div className="search-box">
          <Search fill="#fff" className="search-icon" />
          <input
            onChange={onChangeSearchField}
            value={searchValue}
            className="search-input"
            placeholder="بحث..."
            type="text"
          />
        </div>
      </div>
      {chatTabs.map(({ id, createdAt, text }: IChatTab) => (
        <div className="my-friends-container" key={id}>
          {/* {filterUsers.map(({ id, img, name, messages }) => ( */}
          <div className="friend">
            <div className="image-name-message-sent">
              <img src={img} alt="userImage" className="user-image" />
              <div className="name-messages-sent">
                <span className="friend-name">{id}</span>
                <span className="message-sent-in-users">
                  {text}
                  {/* {isTyping ? 'Typing...' : 'voice messages'} */}
                </span>
              </div>
            </div>
            <div className="messages-number-last-seen">
              <span className="last-seen">{createdAt.atTime}</span>
              {/* {messages.length > 0 ? ( */}
              {/* <div className="messages-receve-number">{messages.length}</div> */}
              {/* ) : null} */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
