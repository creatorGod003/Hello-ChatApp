import ShowMessage from "./ShowMessage";
import { useDispatch, useSelector } from "react-redux";
import Picker, { EmojiStyle } from "emoji-picker-react";
import { configureEmojiPanel } from "../../../features/emoji/emojiSlice";
import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../FirebaseConfigs/FirebaseConfig";

const MessagePanel = (props) => {
  const senderMessage = useRef([]);
  const receiverMessage = useRef([]);
  const senderUserId = useSelector((state) => state.userSignIn.userId);
  const receiverUserId = useSelector((state) => state.user.user.username);

  const [updatedSenderMessage, setUpdatedSenderMessage] = useState([]);
  const [updatedReceiverMessage, setUpdatedReceiverMessage] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    onSnapshot(
      doc(
        db,
        `/conversation/${senderUserId}/conversation_with_whom`,
        receiverUserId
      ),
      (doc) => {
        console.log("Rendered sender message ✅");
        let data = doc.data().chat;

        console.log(data);

        let tempSenderMessage = [];
        for (let key in data) {
          tempSenderMessage.push([String(key), data[key]]);
        }
        senderMessage.current = tempSenderMessage;
        setUpdatedSenderMessage(senderMessage.current);
        senderMessage.current.sort((a, b) => {
          return new Date(a[0]) - new Date(b[0]);
        });
      }
    );
  }, [receiverUserId]);

  useEffect(() => {
    onSnapshot(
      doc(
        db,
        `/conversation/${receiverUserId}/conversation_with_whom`,
        senderUserId
      ),
      (doc) => {
        if (!doc.exists) {
          receiverMessage.curent = [];
        } else {
          console.log("Rendered receiver message ✅");
          let data = doc.data().chat;
          console.log(data);

          let tempReceiverMessage = [];
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
              tempReceiverMessage.push([String(key), data[key]]);
            }
          }
          receiverMessage.current = tempReceiverMessage;
          receiverMessage.current.sort((a, b) => {
            return new Date(a[0]) - new Date(b[0]);
          });
        }

        setUpdatedReceiverMessage(receiverMessage.current);
      }
    );
  }, [receiverUserId]);

  useEffect(() => {
    dispatch(configureEmojiPanel(false));
  }, []);

  const [text, setText] = useSelector((state) => {
    return state.emojipicker.update_textEditor;
  });

  const emojiSelected = useSelector((state) => {
    return state.emojipicker.selected;
  });

  const onEmojiClick = (event) => {
    setText(text + event.emoji);
  };

  
  const scrollHeight = useRef(0);
  const scrollMaxHeight = useRef(0);
  const reachedBottom = useRef(false);

  console.log("component rendered✅");
  console.log("senderId", senderUserId);
  console.log("receiverId", receiverUserId);
  console.log("Sender Message ✉️\n", updatedSenderMessage);
  console.log("Receiver Message ✉️\n", updatedReceiverMessage);

  return (
    <div
      className="overflow-y-auto bg-pattern1"
      id="messagePanel"
      onClick={() => {
        dispatch(configureEmojiPanel(false));
      }}

      onScroll={
        (e)=>{
          scrollHeight.current = e.target.scrollTop;
          scrollMaxHeight.current = e.target.scrollHeight-e.target.clientHeight;
          reachedBottom.current = Math.round(scrollHeight.current) !== scrollMaxHeight.current;
          console.log(reachedBottom.current)
        }
      }
    >
      <div className="">
        <ShowMessage
          receiverMessage={updatedReceiverMessage}
          senderMessage={updatedSenderMessage}
        />
      </div>
      {emojiSelected && (
        <div className="inline-block sticky bottom-0">
          <Picker
            className=""
            onEmojiClick={onEmojiClick}
            autoFocusSearch={false}
            lazyLoadEmojis={true}
            emojiStyle={EmojiStyle.NATIVE}
          />
        </div>
      )}

      {reachedBottom.current===true &&
       (<div className="fixed right-10 bottom-[100px]">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded-md  shadow-lg hover:bg-blue-600"
            onClick={() => {
              document
                .getElementById("messagePanel")
                .scrollTo(
                0,
                  scrollMaxHeight.current
                );
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          </button>
        </div>
       )
      }
    </div>
  );
};

export default MessagePanel;
