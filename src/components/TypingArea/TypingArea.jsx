import { useRef, useState } from 'react';
// import { ReactComponent as Mic } from '../../assets/icons/mic.svg';
import { ReactComponent as Emoji } from '../../assets/icons/emoji.svg';
import { ReactComponent as Attachment } from '../../assets/icons/attachment.svg';
import { ReactComponent as Send } from '../../assets/icons/send.svg';
import { Picker } from 'emoji-mart';
// import { myIdState, socketState } from '../../App';
// import { getHHMM } from '../../utils/TimeHHMM';
// import { messageState } from '../MessageArea/MessageArea';

import 'emoji-mart/css/emoji-mart.css';
import './TypingArea.scss';
// import { usersState } from '../Users/Users';

// export const inputMessageState = atom({
//   key: 'inputMessageState', // unique ID (with respect to other atoms/selectors)
//   default: '', // default value (aka initial value)
// });

const TypingArea = () => {
  // const [inputValue, setInputValue] = useRecoilState(inputMessageState);
  // const [socket] = useRecoilState(socketState);
  // const [messages, setMessges] = useRecoilState(messageState);
  const [hiddeEmoji, setHiddeEmoji] = useState(false);
  // const [users, setUsers] = useRecoilState(usersState);
  // const myId = useRecoilValue(myIdState);
  const inputRef = useRef();

  // const onChange = ({ target: { value } }) => {
  //   setInputValue(value);
  // };
  // const onClick = () => {
  //   if (!inputValue.length) return;
  //   const messageData = {
  //     // id: socket.id,
  //     id: myId,
  //     msg: inputValue,
  //   };
  //   socket.emit('send:message', messageData);
  //   setMessges([...messages, messageData]);
  //   setInputValue('');
  // };
  // useEffect(() => {
  //   if (inputValue.length > 0) {
  //     //emit "typing..." to server
  //     socket.emit('send:typing-state', true);
  //   } else socket.emit('send:typing-state', false);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [inputValue]);

  const onSelectEmoji = ({ native: emoji }) => {
    inputRef.current.focus();
    document.execCommand('insertText', false, emoji);

    // const addEmoji = (lastInputValue, emoji, inputRef) => {
    //   const start = inputRef.selectionStart;
    //   const end = inputRef.selectionEnd;
    //   const sec1 = lastInputValue.substring(0, start);
    //   const sec2 = lastInputValue.substring(end);
    //   return sec1 + emoji + sec2;
    // };
    // setInputValue(lastInputValue =>
    //   addEmoji(lastInputValue, emoji, inputRef.current)
    // );
  };

  return (
    <div className="typing-area">
      {hiddeEmoji && (
        <Picker
          style={{ position: 'absolute', bottom: 70, direction: 'ltr' }}
          onSelect={onSelectEmoji}
          set="twitter"
          // theme="dark"
        />
      )}
      <div className="leading">
        <Attachment className="message-input-icon" />
        <div
          className="d"
          onClick={() => {
            setHiddeEmoji(!hiddeEmoji);
          }}
        >
          <Emoji className="message-input-icon" />
        </div>
      </div>
      <input
        ref={inputRef}
        className="messages-input"
        placeholder="اكتب رسالة..."
        type="text"
        // onChange={onChange}
        // value={inputValue}
        // onKeyPress={({ charCode }) => {
        //   if (charCode === 13) {
        //     onClick();
        //   }
        // }}
      />
      <div className="trailing">
        {/* <Mic className="message-input-icon" /> */}
        <div className="send-button">
          <Send
            className="send-icon"
            // onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};

export default TypingArea;
