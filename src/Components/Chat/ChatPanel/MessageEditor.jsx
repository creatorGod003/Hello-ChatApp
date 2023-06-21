import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  configureEmojiPanel,
  updateTextEditor,
} from "../../../features/emoji/emojiSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfigs/FirebaseConfig";

const MessageEditor = (props) => {

  const dispatch = useDispatch();
  const micRef = useRef();
  const panelRef = useRef();
  const inputFieldRef = useRef();

  const emojiSelected = useSelector((state) => state.emojipicker.selected);


  const [inputOnFocus, setInputOnFocus] = useState(false);
  const [text, setText] = useState("");


  const senderUserId = useSelector((state) => state.userSignIn.userId);
  const receiverUserId = useSelector((state) => state.user.user.username);

  useEffect(() => {

    if(text.trim() !== "")
      setInputOnFocus(true);
    else
      setInputOnFocus(false);    

    dispatch(updateTextEditor([text, setText]));
    // inputFieldRef.current.focus();

  }, [text]);

  function toggleEmojiPicker() {

    if(emojiSelected){
      dispatch(configureEmojiPanel(false));
    }
    else{
      dispatch(configureEmojiPanel(true));
    }

  }
  function inputOnChangeHandler(e) {
    setText(e.target.value);
  }

  function handleFocus() {
    
  }

  function handleBlur(){
    // inputFieldRef.current.focus();
  }

  async function handleMessageSending() {
    if (text.trim() === "") {
      return;
    }

    const docRef = doc(
      db,
      `conversation/${senderUserId}/conversation_with_whom`,
      receiverUserId
    );
    const docSnap = await getDoc(docRef);

    let message = {};

    if (docSnap.exists() && docSnap.data().chat) message = docSnap.data().chat;

    console.log("message sending");

    var dateString = new Date().toString();

    message[dateString] = text.trim();

    console.log("message", message);
    await setDoc(
      doc(
        db,
        `conversation/${senderUserId}/conversation_with_whom`,
        receiverUserId
      ),
      {
        chat: message,
      }
    );

    setText("");
    console.log("message sent");
  }

  return (
    <div
      className={`bg-blue-400 p-4 grid grid-rows-1 ${inputOnFocus?"grid-cols-[45px,1fr,45px]":"grid-cols-[45px,45px,1fr,45px]"} ${inputOnFocus?"md:grid-cols-[60px,1fr,60px]":"md:grid-cols-[60px,60px,1fr,60px]"} place-items-center` }
      ref={panelRef}
    >

      <div className="bg-white rounded-full p-2" onClick={toggleEmojiPicker}>
        <button>
          <img
            src="Images/emoji.gif"
            alt=""
            className="w-6 h-6 md:w-8 md:h-8"
          />
        </button>
      </div>

      {
        !inputOnFocus &&(
          <div className="rounded-full bg-white p-2" id="attachment">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 md:w-8 md:h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
            />
          </svg>
        </button>
      </div>
        )
      }
      
      <div className="w-full h-full flex">
        <textarea
          name="description"
          id="description"
          className="w-full h-full rounded-md p-2 placeholder-slate-600 resize-none border-gray-400 shadow-sm"
          placeholder="Enter your message here..."
          value={text}
          onChange={inputOnChangeHandler}
          onBlur={handleBlur}
          spellCheck="false"
          onClick={
            ()=>{
              if(emojiSelected){
                dispatch(configureEmojiPanel(false));
              }
            }
          }
          ref={inputFieldRef}
        ></textarea>
      </div>
      
      {
        inputOnFocus && (
          <div>
        <button className="inline-block" onClick={handleMessageSending}>
          <img
            src="Images/message-send.gif"
            alt=""
            className=" rounded-full w-10 h-10  md:w-12 md:h-12"
          />
        </button>
      </div>
        )
      }
    
      {
        !inputOnFocus && (
          <div className="rounded-full bg-white p-2 md:block" ref={micRef}>
        <button className="inline-block">
          <img
            src="Images/microphone.gif"
            alt=""
            className="w-6 h-6  md:w-8 md:h-8"
          />
        </button>
      </div>
        )
      }
    </div>
  );
};

export default MessageEditor;
