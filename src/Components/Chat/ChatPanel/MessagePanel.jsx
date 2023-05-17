import ShowMessage from "./ShowMessage";
import { useDispatch, useSelector } from "react-redux";
import Picker, { EmojiStyle } from "emoji-picker-react";
import { configureEmojiPanel } from "../../../features/emoji/emojiSlice";
import { useEffect, useState } from "react";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../../FirebaseConfigs/FirebaseConfig";


const MessagePanel = (props) => {
  
  const[senderMessage, setSenderMessage] = useState([])
  const[receiverMessage, setReceiverMessage] = useState([])
  const [userSelected, setUserSelected] = useState(props.userSelected);
  const loggedInUser = useSelector((state) => {
    return JSON.parse(state.userSignIn.user);
  });

  useEffect(() => {    
    
    async function fetchSenderMessage() {
      const docRef = doc(db, `/conversation/CoolCat23/conversation_with_whom`, "creatorGod003");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let data = docSnap.data().chat; 

        let tempSenderMessage = []
        for(let key in data){
          if(data.hasOwnProperty(key)){
            tempSenderMessage.push([String(key), data[key]])
          }
        }
        setSenderMessage(tempSenderMessage)
      } else {
        console.log("No such document!");
      }
    }
  

    async function fetchReceiverMessage(){
      const docRef = doc(db, "/conversation/creatorGod003/conversation_with_whom", "CoolCat23");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let data = docSnap.data().chat;

        let tempReceiverMessage = []
        for(let key in data){
          if(data.hasOwnProperty(key)){
            tempReceiverMessage.push([String(key), data[key]])
          }
        }
        setReceiverMessage(tempReceiverMessage)
      } else {
        console.log("No such document!");
      }
    }

    fetchReceiverMessage()
    fetchSenderMessage()

  },[])

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
  
  return (
    <div className="overflow-y-auto bg-pattern1">
      <div className="">
          <ShowMessage receiverMessage={receiverMessage} senderMessage={senderMessage}/>
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