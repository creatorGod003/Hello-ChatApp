import ShowMessage from "./ShowMessage";
import { useDispatch, useSelector } from "react-redux";
import Picker, { EmojiStyle } from "emoji-picker-react";
import { configureEmojiPanel } from "../../../features/emoji/emojiSlice";
import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../FirebaseConfigs/FirebaseConfig";
import { m } from "framer-motion";

const MessagePanel = (props) => {

  const senderMessage = useRef([]);
  const receiverMessage = useRef([]);

  const [message, setMessage] = useState({
    senderMessage: [],
    receiverMessage: [],
  });

  const senderUserId = useSelector( (state) => state.userSignIn.userId);
  const receiverUserId = useSelector((state) => state.user.user.username);

  useEffect(() => {

    onSnapshot(
      doc(
        db,
        `/conversation/${senderUserId}/conversation_with_whom`,
        senderUserId
      ),
      (doc) => {
        let data = doc.data().chat;
        let tempSenderMessage = [];
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            tempSenderMessage.push([String(key), data[key]]);
          }
        }
        senderMessage.current = tempSenderMessage;
      }
    );

    onSnapshot(
      doc(
        db,
        `/conversation/${receiverUserId}/conversation_with_whom`,
        senderUserId
      ),
      (doc) => {
        let data = doc.data().chat;

        let tempReceiverMessage = [];
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            tempReceiverMessage.push([String(key), data[key]]);
          }
        }
        receiverMessage.current = tempReceiverMessage;
      }
    );
    
      const messageObj = {
        senderMessage: senderMessage.current,
        receiverMessage: receiverMessage.current,
      }
      console.log("message obj",messageObj)

    setMessage(messageObj)

  }, []);

  const dispatch = useDispatch();
  const [text, setText] = useSelector((state) => {
    return state.emojipicker.update_textEditor;
  });

  useEffect(() => {
    console.log("re-rendered");
    dispatch(configureEmojiPanel(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emojiSelected = useSelector((state) => {
    return state.emojipicker.selected;
  });

  const onEmojiClick = (event) => {
    setText(text + event.emoji);
  };

  return (
    <div className="overflow-y-auto bg-pattern1">
      <div className="">
        <ShowMessage
          receiverMessage={message.receiverMessage}
          senderMessage={message.senderMessage}
        />
      </div>
      {emojiSelected && (
        <div className="inline-block sticky bottom-0">
          <Picker
            onEmojiClick={onEmojiClick}
            autoFocusSearch={false}
            lazyLoadEmojis={true}
            emojiStyle={EmojiStyle.NATIVE}
          />
        </div>
      )}
    </div>
  );
};

export default MessagePanel;
