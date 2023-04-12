import ShowMessage from "./ShowMessage";
import { useDispatch, useSelector } from "react-redux";
import Picker from "emoji-picker-react";
import { configureEmojiPanel } from "../../../features/emoji/emojiSlice";
import { useEffect } from "react";

const MessagePanel = (props) => {
  
  const dispatch = useDispatch();
  const [text ,setText] = useSelector((state) => {
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
    setText(text+event.emoji)
  };

  const mapper = [];
  const message = props.user.message;
  for (const [key, value] of message) {
    mapper.push([key, value]);
  }

  return (
    <div className="overflow-y-auto bg-pattern1">
      <div className="">
        {mapper &&
          mapper.map((message, index) => {
            return <ShowMessage key={index} message={message} />;
          })}
      </div>
      {emojiSelected && (
        <div className="inline-block sticky bottom-0">
          <Picker
            onEmojiClick={onEmojiClick}
            autoFocusSearch={false}
            lazyLoadEmojis={true}
          />
        </div>
      )}
    </div>
  );
};

export default MessagePanel;
