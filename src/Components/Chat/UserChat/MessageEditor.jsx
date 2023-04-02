import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { configureEmojiPanel} from "../../../features/emoji/emojiSlice";


// message editor component which is responsible for showing emoji picker, attachment button and message input field
const MessageEditor = () => {

  const [emojiSelected, setEmojiSelected] = useState(false)
  const emoji = useSelector((state) => {console.log(state);return state.emojipicker.emoji});
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  function toggleEmojiPicker(){

    setEmojiSelected(!emojiSelected)
    dispatch(configureEmojiPanel(!emojiSelected))
  }

  return (
    <div className="bg-blue-400 p-4 grid grid-rows-1 grid-cols-[45px,45px,1fr,45px,45px]  md:grid-cols-[60px,60px,1fr,60px,60px]  place-items-center ">
      {/* Emoji picker */}
      <div className="bg-white rounded-full p-2" onClick={toggleEmojiPicker}>
        <button>
          <img
            src="Images/emoji.gif"
            alt=""
            className="w-6 h-6 md:w-8 md:h-8"
          />
        </button>
      </div>
      {/* Attachment button */}
      <div className="rounded-full bg-white p-2" id="attachment">
        <button>
          <img
            src="Images/attachment.gif"
            alt=""
            className="w-6 h-6 md:w-8 md:h-8"
          />
        </button>
      </div>
      {/* Message input field */}
      <div className="w-full h-full flex">
        <input
          type="text"
          name=""
          id=""
          className="inline-block w-full h-full p-2 placeholder:text-gray-600 rounded-md focus:outline-none  break-words"
          placeholder="Enter messages"
          value={""}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {/* Send button */}
      <div>
        <button className="inline-block">
          <img
            src="Images/message-send.gif"
            alt=""
            className=" rounded-full w-10 h-10  md:w-12 md:h-12"
          />
        </button>
      </div>
      {/* Voice message button */}
      <div className="rounded-full bg-white p-2">
        <button className="inline-block">
          <img
            src="Images/microphone.gif"
            alt=""
            className="w-6 h-6  md:w-8 md:h-8"
          />
        </button>
      </div>
    </div>
  );
};

export default MessageEditor;
