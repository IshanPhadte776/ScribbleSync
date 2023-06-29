import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import homeImage from "../../SavedImages/image1.png";
import CustomDatePicker from "./CustomDatePicker";

function MyImagesPage() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");

  const [images, setImages] = useState([]);
  const [uniqueSubjects, setUniqueSubjects] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState('');

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  useEffect(() => {
    // Fetch all images
    fetch("http://localhost:3001/images")
      .then((response) => response.json())
      .then((data) => {
        if (data.images) {
          setImages(data.images);
          setUniqueSubjects(getUniqueSubjects(data.images));
        }
      })
      .catch((error) => {
        console.error("Failed to fetch images:", error);
      });
  }, []);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
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
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
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

  const getUniqueSubjects = (images) => {
    const subjects = images.map((image) => image.subject);
    return [...new Set(subjects)];
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="border rounded p-4">
            <img src={image.imageData} alt="Saved Image" className="w-full" />
            <div>
              <p className="font-semibold">Name: {image.imageName}</p>
              <p>Subject: {image.subject}</p>
              <p>Type: {image.type}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3>Start Date</h3>
        <CustomDatePicker
          selectedDate={startDate}
          handleStartDateChange={handleStartDateChange}
        />

        <h3>End Date</h3>
        <CustomDatePicker
          selectedDate={endDate}
          handleEndDateChange={handleEndDateChange}
        />
      </div>

      <div className="mt-4">
        <label className="block mb-2">Type:</label>
        <Select
          options={typeOptions}
          value={typeOptions.find((option) => option.value === type)}
          onChange={handleTypeChange}
          className="w-full"
          classNamePrefix="select"
        />
      </div>

      <div className="mt-4">
        <label className="block mb-2">Image Name:</label>
        <input type="text" className="border rounded px-4 py-2 w-full" />
      </div>

    <div className="mt-4">
      <h3>Subjects:</h3>
      <ul>
        {uniqueSubjects.map((subject, index) => (
          <li
            key={index}
            onClick={() => handleSubjectClick(subject)}
            className={`flex items-center ${selectedSubject === subject ? 'text-indigo-600' : ''}`}
          >
            <div className={`w-3 h-3 rounded-full mr-2 ${selectedSubject === subject ? 'bg-indigo-600' : 'bg-gray-300'}`} />
            <span>{subject} ({images.filter((image) => image.subject === subject).length} entries)</span>
          </li>
        ))}
      </ul>
    </div>

      <button
        onClick={handleSearch}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
}

export default MyImagesPage;
