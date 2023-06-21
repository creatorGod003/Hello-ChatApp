import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const initialState={
    user:null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        updateuser:(state, action)=>{
            console.log(action.payload)
            state.user = action.payload

        }
    }
})

export default userSlice.reducer
export const {updateuser} = userSlice.actions   