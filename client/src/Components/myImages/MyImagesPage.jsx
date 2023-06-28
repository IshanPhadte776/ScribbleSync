import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import homeImage from "../../SavedImages/image1.png";


function MyImagesPage() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleTypeChange = (selectedOption) => {
    setType(selectedOption.value);
  };

  const handleSearch = () => {
    // Perform search based on the selected filters
    console.log("Searching...");
    console.log("Date Range:", dateRange);
    console.log("Subject:", subject);
    console.log("Type:", type);
  };

  const typeOptions = [
    { value: "Homework", label: "Homework" },
    { value: "Notes", label: "Notes" },
    { value: "Lecture", label: "Lecture" },
    { value: "Test", label: "Test" },
    { value: "Bonus", label: "Bonus" },
  ];



  return (
    <div>
      <div>
        <label>Date Range:</label>
        <DatePicker
          selected={dateRange[0]}
          onChange={handleDateChange}
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          selectsRange
          isClearable
        />
      </div>

      <div>
        <label>Subject:</label>
        <input type="text" value={subject} onChange={handleSubjectChange} />
      </div>

      <div>
        {/* Render the images */}
        {Array.from({ length: 10 }, (_, index) => (
          <img
            key={index}
            // src={`/SavedImages/image${index + 1}.png`}
            src={'../../../../SavedImages/image1.png'}
            alt="Saved Image"
          />
        ))}
      </div>

      <img src={homeImage} alt="Saved Image" />

      <div>
        <label>Type:</label>
        <Select
          options={typeOptions}
          value={typeOptions.find((option) => option.value === type)}
          onChange={handleTypeChange}
        />
      </div>

      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default MyImagesPage;
