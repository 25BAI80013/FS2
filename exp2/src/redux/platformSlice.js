import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    "Instagram",
    "LinkedIn",
    "Twitter",
    "Facebook",
  ],
};

const platformSlice = createSlice({
  name: "platforms",
  initialState,
  reducers: {},
});

export default platformSlice.reducer;