import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import homeImage from "../../SavedImages/image1.png";

function MyImagesPage() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");

  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch all images
    fetch("http://localhost:3001/images")
      .then((response) => response.json())
      .then((data) => {
        if (data.images) {
          setImages(data.images);
        }

      })
      .catch((error) => {
        console.error("Failed to fetch images:", error);
      });
  }, []);

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



  console.log(images)




  return (
    <div>
      <div>
        {/* Render the images */}
        {images.map((image, index) => (
          <img key={index} src={image.imageData} alt="Saved Image" />
        ))}
      </div>



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
        <label>Type:</label>
        <Select
          options={typeOptions}
          value={typeOptions.find((option) => option.value === type)}
          onChange={handleTypeChange}
        />
      </div>

      {/* <button onClick={handleSearch}>Search</button> */}
    </div>
  );
}

export default MyImagesPage;
