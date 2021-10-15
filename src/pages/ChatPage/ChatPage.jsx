import Users from '../../components/Users/Users';
import UserInfo from '../../components/UserInfo/UserInfo';
import TypingArea from '../../components/TypingArea/TypingArea';
import MessageArea from '../../components/MessageArea/MessageArea';
import AnnetteBlack from '../../assets/img/jenny-Wilson.jpg';
import FloydMiles from '../../assets/img/Floyd-Miles.jpg';
import './ChatPage.scss';

const ChatPage = () => {
  return (
    <div className="home-page">
      <div className="users">
        <Users name="Floyd Miles" img={FloydMiles} />
      </div>
      <div className="chat-area">
        <div className="user-info">
          <UserInfo name="Floyd Miles" img={FloydMiles} />
        </div>
        <div className="messages-area">
          <MessageArea
            // name="Annette Black"
            img={AnnetteBlack}
            imgSender={FloydMiles}
          />
        </div>
        <TypingArea />
      </div>
    </div>
  );
};

export default ChatPage;
