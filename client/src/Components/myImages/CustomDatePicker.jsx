import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CustomDatePicker({
  selectedDate,
  handleStartDateChange,
  handleEndDateChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateClick = () => {
    setIsOpen(!isOpen);
  };

  const handleDayClick = (day) => {
    if (handleStartDateChange) {
      handleStartDateChange(day);
    } else if (handleEndDateChange) {
      handleEndDateChange(day);
    }
    setIsOpen(false);
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

  return (
    <div className="mt-4">
      <div className="relative">
        <input
          type="text"
          value={selectedDate ? formatDate(selectedDate) : ""}
          onChange={() => {}}
          onFocus={handleDateClick}
          className="border rounded px-4 py-2 w-full cursor-pointer"
        />
        {isOpen && (
          <div className="absolute bg-white rounded shadow-md mt-2">
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
