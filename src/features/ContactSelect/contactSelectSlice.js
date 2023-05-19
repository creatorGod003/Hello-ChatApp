import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contactSelect: "[]",
  previouslySelected: -1,
};
const contactSelectSlice = createSlice({
  name: "contactSelect",
  initialState,
  reducers: {
    selectContact: (state, action) => {
      console.log(action.payload);
      const arr = JSON.parse(state.contactSelect);

      if (action.payload < arr.length) {
        arr[action.payload] = true;

        if (
          state.previouslySelected !== -1 &&
          state.previouslySelected !== action.payload
        ) {
          arr[state.previouslySelected] = false;
        }

        state.previouslySelected = action.payload;
        state.contactSelect = JSON.stringify(arr);
      }
    },
    deselectContact: (state, action) => {
      console.log(action.payload);
      const arr = JSON.parse(state.contactSelect);
      arr[state.previouslySelected] = false;
      state.previouslySelected = -1;
      state.contactSelect = JSON.stringify(arr);
    },
    addContacts: (state, action) => {
      const arr = Array(action.payload).fill(false);
      state.contactSelect = JSON.stringify(arr);
    },
    resetContact: (state, action) => {
      state.contactSelect = "[]";
      state.previouslySelected = -1;
    },
  },
});

export default contactSelectSlice.reducer;
export const { selectContact, addContacts, resetContact, deselectContact } =
  contactSelectSlice.actions;
