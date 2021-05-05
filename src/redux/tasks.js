import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.unshift(action.payload);
    },
    remove: (state, action) => {
      return state.filter((e) => e.uID !== action.payload);
    },

    // return state.filter((e, i) => i !== action.payload);
    complete: (state, action) => {
      let arr = [...state];
      const index = arr.findIndex((e) => e.uID === action.payload);
      if (arr[index].status === "Completed") {
        arr[index].status = "Uncomplete";
      } else {
        arr[index].status = "Completed";
      }
      state = arr;
    },
  },
});

export const { addTask, remove, complete } = taskSlice.actions;
export default taskSlice.reducer;
