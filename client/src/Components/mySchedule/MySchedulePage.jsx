import React, { useState } from "react";
import WhiteBoardPage from "../whiteBoard/WhiteBoardPage";

function MySchedulePage(role) {
  const [currentPage, setCurrentPage] = useState("MySchedulePage"); // Initial page is set to 'MySchedule'

  const classes = [
    {
      day: "Monday",
      startTime: new Date(0, 0, 0, 9, 0), // 9:00 AM
      endTime: new Date(0, 0, 0, 10, 0), // 10:00 AM
      duration: 1,
      title: "M Class",
      roomCode: 21,
    },
    {
      day: "Tuesday",
      startTime: new Date(0, 0, 0, 7, 0), // 7:00 AM
      endTime: new Date(0, 0, 0, 9, 0), // 9:00 AM
      duration: 2,
      title: "Tu Class",
      roomCode: 22,
    },
    {
      day: "Tuesday",
      startTime: new Date(0, 0, 0, 11, 0), // 11:00 AM
      endTime: new Date(0, 0, 0, 13, 0), // 1:00 PM
      duration: 2,
      title: "Tu Class",
      roomCode: 23,
    },
    {
      day: "Tuesday",
      startTime: new Date(0, 0, 0, 13, 0), // 11:00 AM
      endTime: new Date(0, 0, 0, 19, 0), // 5:00 PM
      duration: 6,
      title: "Tu Class",
      roomCode: 24,
    },

    {
      day: "Wednesday",
      startTime: new Date(0, 0, 0, 8, 0), // 8:00 AM
      endTime: new Date(0, 0, 0, 10, 0), // 10:00 AM
      duration: 2,
      title: "We Class",
      roomCode: 25,
    },
    {
      day: "Thursday",
      startTime: new Date(0, 0, 0, 9, 0), // 9:00 AM
      endTime: new Date(0, 0, 0, 11, 0), // 11:00 AM
      duration: 2,
      title: "Th Class",
      roomCode: 26,
    },
    {
      day: "Friday",
      startTime: new Date(0, 0, 0, 17, 0), // 5:00 PM
      endTime: new Date(0, 0, 0, 19, 0), // 7:00 PM
      duration: 2,
      title: "Fr Class",
      roomCode: 27,
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
    console.log(`Joining ${classItem.roomCode}`);
    setCurrentPage("WhiteBoardPage");
  };

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
      classItem.startTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      }) <= currentTime &&
      classItem.endTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      }) >= currentTime
  );
  

  return (
    <div>
      {currentPage === "WhiteBoardPage" ? (
        <WhiteBoardPage role={role} name = {"Ishan Phadte"} roomCode={currentClass.roomCode}/>
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
              const rowStart =
                rowStartDict[
                  classItem.startTime.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                  })
                ];
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
                      Time:{" "}
                      {classItem.startTime.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      })}{" "}
                      -{" "}
                      {classItem.endTime.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </div>
                    <div>
                      Duration: {classItem.duration} hour
                      {classItem.duration > 1 ? "s" : ""}
                    </div>
                  </div>
                  {classItem === currentClass && (
                    <button
                      className="join-class-button"
                      onClick={() => handleJoinClass(classItem)}
                    >
                      Join Class
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          {currentClass ? (
            <div className="current-class-info bg-gray-200 p-4 mt-4">
              <div className="font-bold mb-2">Currently Attending:</div>
              <div className="font-bold">{currentClass.title}</div>
              <div>
                Time:{" "}
                {currentClass.startTime.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                })}{" "}
                -{" "}
                {currentClass.endTime.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
              <div>
                Duration: {currentClass.duration} hour
                {currentClass.duration > 1 ? "s" : ""}
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
                onClick={() => handleJoinClass(currentClass)}
              >
                Join Class
              </button>
            </div>
          ) : (
            <div className="no-class-info bg-gray-200 p-4 mt-4">
              <div className="font-bold">No class at the moment.</div>
              <div>Take a break or plan ahead!</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MySchedulePage;
