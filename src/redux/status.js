import { createSlice } from "@reduxjs/toolkit";

export const statusSlice = createSlice({
  name: "status",
  initialState: "All",
  reducers: {
    changeStatus: (state, action) => {
      return action.payload;
    },
  },
});

export const { changeStatus } = statusSlice.actions;
export default statusSlice.reducer;
