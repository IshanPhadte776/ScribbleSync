import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CustomDatePicker({
  selectedDate,
  handleStartDateChange,
  handleEndDateChange,
  thisCalender,
}) {
  const calendarRef = useRef(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateClick = () => {
    if (thisCalender === "Start") {
      setIsCalendarOpen(true);
    } else if (thisCalender === "End") {
      setIsCalendarOpen(true);
    }
  };

  const handleDayClick = (day) => {
    if (handleStartDateChange && thisCalender === "Start") {
      handleStartDateChange(day);
      setIsCalendarOpen(false);
    } else if (handleEndDateChange && thisCalender === "End") {
      handleEndDateChange(day);
      setIsCalendarOpen(false);
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    return `${month} ${day}, ${year}`;
  };

  const disableAfterToday = (date) => {
    const today = new Date();
    return date > today ? true : false;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target)
      ) {
        setIsCalendarOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mt-4" ref={calendarRef}>
      <div className="relative">
        <input
          type="text"
          value={selectedDate ? formatDate(selectedDate) : ""}
          onChange={() => {}}
          onFocus={handleDateClick}
          className="border rounded px-4 py-2 w-full cursor-pointer"
        />
        {isCalendarOpen && (
          <div className="absolute bg-white rounded shadow-md mt-2 z-50">
            <Calendar
              onChange={handleDayClick}
              value={selectedDate}
              tileDisabled={disableAfterToday}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomDatePicker;
