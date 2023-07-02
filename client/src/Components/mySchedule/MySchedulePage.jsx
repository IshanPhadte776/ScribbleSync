import React, { useState } from "react";
import WhiteBoardPage from "../whiteBoard/WhiteBoardPage";

function MySchedulePage(role) {
  const [currentPage, setCurrentPage] = useState("MySchedulePage"); // Initial page is set to 'MySchedule'

  const dummyClass = {
    day: "Dummy Day",
    startTime: new Date(),
    endTime: new Date(),
    duration: 1,
    title: "Dummy Class",
    roomCode: 43,
  };

  const classes = [
    {
      day: "Monday",
      startTime: new Date(0, 0, 0, 9, 0), // 9:00 AM
      endTime: new Date(0, 0, 0, 10, 0), // 10:00 AM
      duration: 1,
      title: "Math",
      roomCode: 21,
    },
    {
      day: "Tuesday",
      startTime: new Date(0, 0, 0, 7, 0), // 7:00 AM
      endTime: new Date(0, 0, 0, 9, 0), // 9:00 AM
      duration: 2,
      title: "Science",
      roomCode: 22,
    },
    {
      day: "Tuesday",
      startTime: new Date(0, 0, 0, 11, 0), // 11:00 AM
      endTime: new Date(0, 0, 0, 13, 0), // 1:00 PM
      duration: 2,
      title: "English",
      roomCode: 23,
    },

    {
      day: "Wednesday",
      startTime: new Date(0, 0, 0, 8, 0), // 8:00 AM
      endTime: new Date(0, 0, 0, 10, 0), // 10:00 AM
      duration: 2,
      title: "Geo",
      roomCode: 25,
    },
    {
      day: "Thursday",
      startTime: new Date(0, 0, 0, 9, 0), // 9:00 AM
      endTime: new Date(0, 0, 0, 11, 0), // 11:00 AM
      duration: 2,
      title: "Gym",
      roomCode: 26,
    },
    {
      day: "Friday",
      startTime: new Date(0, 0, 0, 13, 0), // 5:00 PM
      endTime: new Date(0, 0, 0, 15, 0), // 7:00 PM
      duration: 2,
      title: "English",
      roomCode: 27,
    },
    {
      day: "Friday",
      startTime: new Date(0, 0, 0, 15, 0), // 5:00 PM
      endTime: new Date(0, 0, 0, 17, 0), // 7:00 PM
      duration: 2,
      title: "English",
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
        <WhiteBoardPage
          role={role}
          name={"Ishan Phadte"}
          // roomCode={currentClass.roomCode}
          roomCode={43}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <div>
          <div className="flex justify-center">
            <h1 className="text-4xl font-bold mx-6 mb-6 mt-20">My Schedule</h1>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-1 mx-2">
              <div className="grid grid-rows-48  " style={{ height: "100%" }}>
                {[...Array(25)].map((_, index) => {
                  const hour = Math.floor(index / 2) + 7;
                  const minute = index % 2 === 0 ? "00" : "30";

                  const period = hour < 12 ? "AM" : "PM";
                  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

                  const timeLabel = `${formattedHour
                    .toString()
                    .padStart(2, "0")}:${minute} ${period}`;

                  if (hour >= 19) {
                    return null; // Stop rendering elements beyond 7 PM
                  }

                  return (
                    <div
                      key={index}
                      style={{ height: "64px" }}
                      className="flex items-center justify-center"
                    >
                      <div style={{ marginTop: "-64px" }}>{timeLabel} - </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="col-span-11">
              <div className="grid grid-cols-5 gap-4 mx-4 schedule-grid border border-black">
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

                  const rowHeight = `${rowSpan * 60}px`; // Calculate the height based on rowSpan

                  return (
                    <div
                      key={index}
                      className={`class bg-customPink text-white p-2 rounded-lg mx-2  border border-black ${
                        classItem === currentClass ? "current-class" : ""
                      }`}
                      style={{
                        gridColumn: `${colStart} / span ${colSpan}`,
                        gridRow: `${rowStart} / span ${rowSpan}`,
                        height: rowHeight,
                      }}
                    >
                      <div className="class-content flex flex-col justify-center items-center h-full">
                        <div className="font-bold mb-1 text-xs md:text-sm lg:text-base whitespace-normal md:whitespace-nowrap truncate md:truncate-2-lines">
                          {classItem.title}
                        </div>

                        <div className="text-center text-xs md:text-sm lg:text-base">
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
            </div>
          </div>

          {currentClass ? (
            <div className="current-class-info bg-gray-200 p-2 mt-4">
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
              <button
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
                onClick={() => handleJoinClass(dummyClass)}
              >
                Join Class
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MySchedulePage;
