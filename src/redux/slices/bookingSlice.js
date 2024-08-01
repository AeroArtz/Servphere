import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const bookingSlice = createSlice({
  name: "Booking",
  initialState,
  reducers: {
    updateBooking,
  },
});

export const { setActiveIndex, updateCardStatusToDone } =
  HomeStepperSlice.actions;

export default HomeStepperSlice.reducer;
