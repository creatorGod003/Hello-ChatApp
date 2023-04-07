import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { configureEmojiPanel, updateTextEditor} from "../../../features/emoji/emojiSlice";

const MessageEditor = () => {


  const [emojiSelected, setEmojiSelected] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTextEditor([text, setText]))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  function toggleEmojiPicker(){
    setEmojiSelected(!emojiSelected)
    dispatch(configureEmojiPanel(!emojiSelected))
  }
  function inputOnChangeHandler(e){
    setText(e.target.value)
  }

  console.log("Rendered from bottom")

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
          id="text-editor"
          className="inline-block w-full h-full p-2 placeholder:text-gray-600 rounded-md focus:outline-none  break-words"
          placeholder="Enter messages"
          value={text}
          onChange={inputOnChangeHandler}
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

export default MessageEditor