import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import emojiReducer from "../features/emoji/emojiSlice";
import responsiveReducer from "../features/Responsiveness/responsiveSlice";

const store = configureStore({
    reducer:{
        user:userReducer,
        emojipicker: emojiReducer,
        responsive: responsiveReducer,
    }
})

export default store