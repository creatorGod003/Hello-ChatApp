import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import emojiReducer from "../features/emoji/emojiSlice";
import responsiveReducer from "../features/Responsiveness/responsiveSlice";
import userLoginInReducer from "../features/user/userLoginSlice";

const store = configureStore({
    reducer:{
        user:userReducer,
        emojipicker: emojiReducer,
        responsive: responsiveReducer,
        userSignIn: userLoginInReducer,
    }
})

export default store