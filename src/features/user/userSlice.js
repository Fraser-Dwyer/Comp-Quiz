import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  name: "",
  id: 0,
  topic_chosen: "Principles of Programming",
  question: 1,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state) => {
      state.count = 1;
    },
    addUserName: (state, action) => {
      state.name = action.payload;
    },
    removeUser: (state) => {
      state.count = 0;
    },
    addUserID: (state, action) => {
      state.id = action.payload;
    },
    changeTopic: (state, action) => {
      state.topic_chosen = action.payload;
      state.question = 1;
    },
    changeQuestionNumber: (state, action) => {
      state.question = action.payload;
    },
  },
});

export const {
  addUser,
  addUserName,
  removeUser,
  addUserID,
  changeTopic,
  changeQuestionNumber,
} = userSlice.actions;
export default userSlice.reducer;
