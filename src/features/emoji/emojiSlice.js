import { createSlice } from "@reduxjs/toolkit";

const initialState={
    selected:false,
    emoji:''
}

const emojiSlice = createSlice({
    name: 'emojipicker',
    initialState,
    reducers:{
        configureEmojiPanel:(state, action)=>{
            state.selected = action.payload
        },
        updateEmoji:(state, action)=>{
            state.emoji = action.payload
        }
    }
})

export default emojiSlice.reducer
export const {configureEmojiPanel, updateEmoji} = emojiSlice.actions