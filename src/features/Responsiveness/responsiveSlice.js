import { createSlice } from "@reduxjs/toolkit";


const responsiveSlice = createSlice({
    name: 'responsive',
    initialState: {
        isMobile: false,
    },
    reducers: {
        updateMobile: (state, action) => {
            if(window.innerWidth < 768) {
                state.isMobile = true
            }
        }
    }
})

export default responsiveSlice.reducer;
export const { updateMobile } = responsiveSlice.actions