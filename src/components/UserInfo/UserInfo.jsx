// import React, { useEffect } from 'react';

import './UserInfo.scss';

// import { ReactComponent as Search } from '../../assets/icons/search.svg';
// import { ReactComponent as Account } from '../../assets/icons/account.svg';
import { ReactComponent as More } from '../../assets/icons/more.svg';
import { ReactComponent as Call } from '../../assets/icons/call.svg';
// import { atom, useRecoilState } from 'recoil';
// import { socketState } from '../../App';

// export const isTypingState = atom({
//   key: 'isTypingState',
//   default: false,
// });

// export const searchMessageData = atom({
//   key: 'searchMessageData',
//   default: '',
// });

const UserInfo = ({ img, name }) => {
  // const [socket] = useRecoilState(socketState);
  // const [isTyping, setIsTyping] = useRecoilState(isTypingState);
  // const [searchMessage, setSearchMessage] = useRecoilState(searchMessageData);
  // useEffect(() => {
  //   socket.on('receive:typing-state', isTyping => {
  //     setIsTyping(isTyping);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // const onChangeSearchMessage = ({ target: { value } }) => {
  //   setSearchMessage(value);
  // };
  return (
    <div className="user-info">
      <div className="img-name-last-seen-user-info">
        <img src={img} alt="user" className="image-user-info" />
        <div className="name-last-seen-user-info-constainer">
          <span className="name-user-info">{name}</span>
          <span className="last-seen-user-info">
            يكتب...
            {/* {isTyping ? 'Typing...' : 'Last seen today at 17:38'} */}
          </span>
        </div>
      </div>
      <div className="actions">
        {/* <div className="user-info-search-box-constainer">
          <input
            // value={searchMessage}
            // onChange={onChangeSearchMessage}
            className="user-info-search-box"
            placeholder="البحث..."
          />
          <Search className="user-info-search-icon" />
        </div> */}
        {/* <Account className="action-icon" /> */}
        <Call className="action-icon" />
        <More className="action-icon" />
      </div>
    </div>
  );
};

export default UserInfo;
