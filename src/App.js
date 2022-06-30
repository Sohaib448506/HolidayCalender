import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import HolidayData from "./HolidayData";
import { useSelector, useDispatch } from "react-redux";
import { fetchHolidays } from "./store/index";
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function App() {
  const events = [];
  const dispatch = useDispatch();
  const [country, setCountry] = useState("PK");

  const [allEvents, setAllEvents] = useState(events);
  const { currentState } = useSelector((state) => ({
    currentState: state.holidays,
  }));

  useEffect(() => {
    if (currentState.length > 0) {
      currentState.map((item) => {
        events.push({
          title: `${item.name}`,
          start: new Date(
            item.date.datetime.year,
            item.date.datetime.month - 1,
            item.date.datetime.day
          ),
          end: new Date(
            item.date.datetime.year,
            item.date.datetime.month - 1,
            item.date.datetime.day
          ),
        });
      });
      setAllEvents(events);
    }
  }, [currentState, country]);

  function handleAddEvent() {
    dispatch(fetchHolidays.selectedCountry(country));
  }

  return (
    <div className="App">
      <h1>Holiday Calendar</h1>
      <label>Choose Country: </label>
      <select
        name="country"
        id="country"
        value={country}
        onChange={(country) => setCountry(country.target.value)}
        style={{ padding: "10px", margin: "10px" }}
      >
        <option value="PK">Pakistan</option>
        <option value="US">America</option>
      </select>
      <div>
        <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Fetch Calender
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
      <HolidayData />
    </div>
  );
}

export default App;
