// import axios from 'axios';
import React, { useState } from 'react';

import { ReactComponent as Search } from '../../assets/icons/search.svg';
// import { isTypingState } from '../UserInfo/UserInfo';
import './Users.scss';

// export const usersState = atom({ key: 'usersState', default: [] });

const Users = ({ img, name }) => {
  // const [isTyping] = useRecoilState(isTypingState);
  // const [users, setUsers] = useRecoilState(usersState);
  const [searchValue, setSearchValue] = useState('');
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

  const onChangeSearchField = ({ target: { value } }) => {
    setSearchValue(value);
  };
  // const allMsgCount = filterUsers.reduce((accumulator, currentValue) => {
  //   return accumulator + currentValue.messages.length;
  // }, 0);
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
      <div className="my-friends-container">
        {/* {filterUsers.map(({ id, img, name, messages }) => ( */}
        <div className="friend">
          <div className="image-name-message-sent">
            <img src={img} alt="userImage" className="user-image" />
            <div className="name-messages-sent">
              <span className="friend-name">{name}</span>
              <span className="message-sent-in-users">
                يكتب...
                {/* {isTyping ? 'Typing...' : 'voice messages'} */}
              </span>
            </div>
          </div>
          <div className="messages-number-last-seen">
            <span className="last-seen">منذ 15 دقيقة</span>
            {/* {messages.length > 0 ? ( */}
            {/* <div className="messages-receve-number">{messages.length}</div> */}
            {/* ) : null} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
