import { createSlice } from "@reduxjs/toolkit";

const initialState={
    selected:false,
    update_textEditor:[],
}

const emojiSlice = createSlice({
    name: 'emojipicker',
    initialState,
    reducers:{
        configureEmojiPanel:(state, action)=>{
            state.selected = action.payload
        },
        updateTextEditor: (state, action)=>{
            state.update_textEditor = action.payload
        }
    }
})

export default emojiSlice.reducer
export const {configureEmojiPanel, updateTextEditor} = emojiSlice.actions