// src/redux/slices/doctorSlice.js
import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    list: [],
  },
  reducers: {
    setDoctorList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setDoctorList } = doctorSlice.actions;
export default doctorSlice.reducer;
