import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import emojiReducer from "../features/emoji/emojiSlice";


const store = configureStore({
    reducer:{
        user:userReducer,
        emojipicker: emojiReducer
    }
})

export default store