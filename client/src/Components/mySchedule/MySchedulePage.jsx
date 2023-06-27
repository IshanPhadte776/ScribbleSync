import React, { useState } from "react";
import WhiteBoardPage from "../whiteBoard/WhiteBoardPage";
//import WhiteBoardPage from "./whiteboard/WhiteBoardPage";

function MySchedulePage() {
  const [currentPage, setCurrentPage] = useState("MySchedulePage"); // Initial page is set to 'MySchedule'

  const classes = [
    {
      day: "Monday",
      startTime: "9:00 AM",
      endTime: "10:00 AM",
      duration: 1,
      title: "M Class",
    },
    {
      day: "Tuesday",
      startTime: "7:00 AM",
      endTime: "9:00 AM",
      duration: 2,
      title: "Tu Class",
    },
    {
      day: "Tuesday",
      startTime: "9:00 AM",
      endTime: "11:00 AM",
      duration: 2,
      title: "Tu Class",
    },
    {
      day: "Wednesday",
      startTime: "8:00 AM",
      endTime: "10:00 AM",
      duration: 2,
      title: "We Class",
    },
    {
      day: "Thursday",
      startTime: "9:00 AM",
      endTime: "11:00 AM",
      duration: 2,
      title: "Th Class",
    },
    {
      day: "Friday",
      startTime: "5:00 PM",
      endTime: "7:00 PM",
      duration: 2,
      title: "Fr Class",
    },
    {
      day: "Tuesday",
      startTime: "12:00 AM",
      endTime: "2:00 AM",
      duration: 2,
      title: "Fr Class",
    },
  ];

  const rowStartDict = {
    "7:00 AM": 1,
    "7:30 AM": 2,
    "8:00 AM": 3,
    "8:30 AM": 4,
    "9:00 AM": 5,
    "9:30 AM": 6,
    "10:00 AM": 7,
    "10:30 AM": 8,
    "11:00 AM": 9,
    "11:30 AM": 10,
    "12:00 PM": 11,
    "12:30 PM": 12,
    "1:00 PM": 13,
    "1:30 PM": 14,
    "2:00 PM": 15,
    "2:30 PM": 16,
    "3:00 PM": 17,
    "3:30 PM": 18,
    "4:00 PM": 19,
    "4:30 PM": 20,
    "5:00 PM": 21,
    "5:30 PM": 22,
    "6:00 PM": 23,
    "6:30 PM": 24,
  };

  const handleJoinClass = (classItem) => {
    // Handle joining the class
    console.log(`Joining ${classItem.title}`);
    setCurrentPage("WhiteBoardPage")
  };

  // Get the current time and day of the week
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  const currentDay = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  // Find the currently occurring class
  const currentClass = classes.find(
    (classItem) =>
      classItem.day === currentDay &&
      classItem.startTime <= currentTime &&
      classItem.endTime >= currentTime
  );

  return (
    <div>
      {currentPage === "WhiteBoardPage" ? (
        <WhiteBoardPage />
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">My Schedule</h1>
          <div className="grid grid-cols-5 gap-4 schedule-grid">
            {/* Add vertical lines */}
            <div className="vertical-line" />
            <div className="vertical-line" />
            <div className="vertical-line" />
            <div className="vertical-line" />
            <div className="vertical-line" />
            <div className="vertical-line" />

            {/* Add horizontal lines */}
            {[...Array(25)].map((_, index) => (
              <div key={index} className="horizontal-line" />
            ))}

            {classes.map((classItem, index) => {
              const rowStart = rowStartDict[classItem.startTime];
              const rowSpan = classItem.duration * 2;

              let colStart;
              switch (classItem.day) {
                case "Monday":
                  colStart = 1;
                  break;
                case "Tuesday":
                  colStart = 2;
                  break;
                case "Wednesday":
                  colStart = 3;
                  break;
                case "Thursday":
                  colStart = 4;
                  break;
                case "Friday":
                  colStart = 5;
                  break;
                default:
                  colStart = 1;
                  break;
              }

              const colSpan = 1;

              const rowHeight = `${rowSpan * 50}px`; // Calculate the height based on rowSpan

              return (
                <div
                  key={index}
                  className={`class bg-blue-500 text-white p-4 rounded-lg border border-black ${
                    classItem === currentClass ? "current-class" : ""
                  }`}
                  style={{
                    gridColumn: `${colStart} / span ${colSpan}`,
                    gridRow: `${rowStart} / span ${rowSpan}`,
                    height: rowHeight,
                  }}
                >
                  <div className="class-content">
                    <div className="font-bold mb-1">{classItem.title}</div>
                    <div>
                      Time: {classItem.startTime} - {classItem.endTime}
                    </div>
                    <div>
                      Duration: {classItem.duration} hour
                      {classItem.duration > 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {currentClass ? (
            <div className="current-class-info bg-gray-200 p-4 rounded-lg">
              <h2 className="text-lg font-bold mb-2">
                Currently occurring class:
              </h2>
              <div className="class-title text-xl font-bold">
                {currentClass.title}
              </div>
              <div className="class-time text-gray-700">
                Time: {currentClass.startTime} - {currentClass.endTime}
              </div>
              <div className="class-duration text-gray-700">
                Duration: {currentClass.duration} hour
                {currentClass.duration > 1 ? "s" : ""}
              </div>
              <button
                className="join-class-button bg-blue-500 text-white px-4 py-2 rounded mt-4"
                onClick={() => handleJoinClass(currentClass)}
              >
                Join Class
              </button>
            </div>
          ) : (
            <div className="no-class-info bg-gray-200 p-4 rounded-lg text-gray-700">
              No class is occurring right now.
            </div>

          )}
        </div>
      )}
    </div>
  );
}

export default MySchedulePage;
