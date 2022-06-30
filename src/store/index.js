import { createSlice, configureStore } from "@reduxjs/toolkit";
const initialState = { holidays: {}, country: "PK" };
export const holidaySlice = createSlice({
  name: "holidayData",
  initialState,
  reducers: {
    holidaysFetched: (state, payload) => {
      state.holidays = payload.payload.response.holidays;
    },
    selectedCountry: (state, payload) => {
      state.country = payload.payload;
    },
  },
});

const store = configureStore({
  reducer: holidaySlice.reducer,
});

export const fetchHolidays = holidaySlice.actions;

export default store;
