import { createSlice } from "@reduxjs/toolkit";


const initialState={
    user:null,
    userId:null
}
const userLoginSlice = createSlice({
    name: 'userSignIn',
    initialState,
    reducers:{
        logout:(state)=>{
            state.user = null
        },
        login(state, action){
            state.user = action.payload
        },
        updateUserId(state, action){
            state.userId = action.payload
        }
    }
})

export default userLoginSlice.reducer
export const {logout, login, updateUserId} = userLoginSlice.actions   