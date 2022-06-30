import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHolidays } from "./store/index";
const HolidayData = () => {
  const dispatch = useDispatch();

  const { country } = useSelector((state) => ({
    country: state.country,
  }));

  useMemo(async () => {
    const dataSending = await fetch(
      `https://calendarific.com/api/v2/holidays?&api_key=b18eefa40e86a94bb4eacacc594af04eb69aac2a&country=${country}&year=2022`
    );
    const data = await dataSending.json();
    dispatch(fetchHolidays.holidaysFetched(data));
  }, [country]);
  return <div></div>;
};

export default HolidayData;
