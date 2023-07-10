import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import homeImage from "../../SavedImages/image1.png";
import CustomDatePicker from "./CustomDatePicker";

function MyImagesPage() {
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);

  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const [imageNameSearched, setImageNameSearched] = useState("");

  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);

  const [uniqueSubjects, setUniqueSubjects] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState("");

  //const [openedCalendar, setOpenedCalendar] = useState("None");

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
          setFilteredImages(data.images);
          setUniqueSubjects(getUniqueSubjects(data.images));
        }
      })
      .catch((error) => {
        console.error("Failed to fetch images:", error);
      });
  }, []);

  // const handleStartDateChange = (date) => {
  //   setStartDate(date);
  // };

  // const handleEndDateChange = (date) => {
  //   setEndDate(date);
  // };

  const handleTypeChange = (selectedOption) => {
    setType(selectedOption.value);
  };

  const handleClearAllFilters = () => {
    setSubject("");
    setType("");
    // setStartDate(null);
    // setEndDate(null);
    setSelectedSubject("");
    setFilteredImages(images);
  };

  // const handleClearStartDate = () => {
  //   setStartDate(null);
  // };

  // const handleClearEndDate = () => {
  //   setEndDate(null);
  // };

  const handleSearch = () => {
    // Filter images based on selected subject and type
    let filteredImages = images;

    console.log(imageNameSearched)

    console.log(images[0].imageName)
    console.log(images[1].imageName)
    console.log(images[2].imageName == imageNameSearched)

    if (selectedSubject !== "All" && selectedSubject !== "") {
      filteredImages = filteredImages.filter(
        (image) => image.subject === selectedSubject
      );
    }

    if (type !== "") {
      filteredImages = filteredImages.filter((image) => image.type === type);
    }

    if (imageNameSearched !== "") {
      filteredImages = filteredImages.filter(
        (image) => image.imageName === imageNameSearched
      );
    }

    // Update the filteredImages state with the filtered images
    setFilteredImages(filteredImages);
  };

  const typeOptions = [
    { value: "", label: "All" }, // Added "All" option
    { value: "Homework", label: "Homework" },
    { value: "Notes", label: "Notes" },
    { value: "Lecture", label: "Lecture" },
    { value: "Test", label: "Test" },
    { value: "Bonus", label: "Bonus" },
  ];

  const getUniqueSubjects = (images) => {
    const subjects = images.map((image) => image.subject);
    const uniqueSubjects = [...new Set(subjects)];
    return ["All", ...uniqueSubjects];
  };

  return (
    <div className="grid grid-cols-4 mt-20">
      <div className="col-span-1 mx-4 my-4">
        <div>
          {/* <div className="flex items-center">
            <h3 className="text-lg font-semibold mr-2">Start</h3>

            <button
              onClick={handleClearStartDate}
              className="ml-2 px-2 py-2 bg-customBrown text-white rounded hover:bg-customRed"
            >
              Clear
            </button>
          </div> */}
          {/* <CustomDatePicker
            selectedDate={startDate}
            handleStartDateChange={handleStartDateChange}
            thisCalender={"Start"}
          /> */}

          {/* <div className="flex items-center mt-4">
          <h3 className="text-lg font-semibold px-1">End</h3>

            <button
              onClick={handleClearStartDate}
              className="ml-2 px-1 py-2 bg-customBrown text-white rounded hover:bg-customRed"
            >
              Clear
            </button>
          </div>

          <CustomDatePicker
            selectedDate={endDate}
            handleEndDateChange={handleEndDateChange}
            thisCalender={"End"}
          /> */}


          <div className="mt-4">
            <label className="text-lg font-semibold">Type:</label>
            <Select
              options={typeOptions}
              value={typeOptions.find((option) => option.value === type)}
              onChange={handleTypeChange}
              className="w-full"
              classNamePrefix="select"
            />
          </div>

          <div className="mt-4">
            <label className="text-lg font-semibold">Image Name:</label>
            <div className="flex">
              <input
                type="text"
                className="border rounded px-4 py-2 w-full"
                value={imageNameSearched}
                onChange={(e) => setImageNameSearched(e.target.value)}
              />
              <button
                onClick={() => setImageNameSearched("")}
                className="ml-2 px-4 py-2 bg-customBrown text-white rounded hover:bg-customRed"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-4">
            <h3>Subjects:</h3>
            <ul>
              {uniqueSubjects.map((subject, index) => (
                <li
                  key={index}
                  onClick={() => handleSubjectClick(subject)}
                  className={`flex items-center ${
                    selectedSubject === subject ? "text-indigo-600" : ""
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      selectedSubject === subject
                        ? "bg-indigo-600"
                        : "bg-gray-300"
                    }`}
                  />
                  <span>
                    {subject === "All" ? (
                      `All (${images.length} entries)`
                    ) : (
                      <>
                        {subject} (
                        {
                          images.filter((image) => image.subject === subject)
                            .length
                        }{" "}
                        entries)
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleSearch}
            className="mt-4 mr-4 px-4 py-2 bg-customLightOrange text-white rounded hover:bg-customOrange"
          >
            Search
          </button>

          <button
            onClick={handleClearAllFilters}
            className="mt-4 px-4 py-2 bg-customBrown text-white rounded hover:bg-customRed"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      <div className="col-span-3">
        <div className="grid grid-cols-3 gap-4">
          {filteredImages.map((image, index) => (
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
      </div>
    </div>
  );
}

export default MyImagesPage;
