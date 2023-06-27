import { useEffect, useState } from "react";
import React from "react";
import Board from "../board/Board";
import Container from "../container/Container";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

socket.on("connect", () => {
  console.log("Socket connection successful in app");
});

socket.on("connect_error", (error) => {
  console.log("Socket connection failed:", error);
});

function WhiteBoardPage(props) {
  const { role, name, roomCode } = props;
  // Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");


  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  const joinRoom = () => {
    if (roomCode !== "") {
      socket.emit("join_room", roomCode);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, roomCode,name });
  };

  socket.on("receive_message", (data) => {
    setMessageReceived(data.name + ": " + data.message);
  });


  socket.on("start_drawing", (data) => {
    console.log(data.username);
  });

  socket.on("stop_drawing", () => {});

  useEffect(() => {
    // Call joinRoom once on render
    joinRoom();
  }, []);

  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState("5");

  const changeColor = (e) => {
    setColor(e.target.value);
  };

  const changeSize = (e) => {
    setSize(e.target.value);
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="board-container flex justify-center">
          <Board color={color} size={size} name={name} />
        </div>

        <div className="brushsize-container">
          Select Brush Size: &nbsp;
          <select
            value={size}
            onChange={changeSize}
            className="ml-2 border border-gray-300 rounded p-2"
          >
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
            <option>25</option>
            <option>30</option>
          </select>
        </div>

        <div className="tools-section flex justify-center items-center">
          <div className="color-picker-container">
            Select Brush Color: &nbsp;
            <input
              type="color"
              value={color}
              onChange={changeColor}
              className="ml-2"
            />
          </div>
          {role === "Teacher" && (
            <div>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Allow Editing
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Disable Editing
              </button>
            </div>
          )}
        </div>

        <div className="fixed bottom-4 right-4 w-64 h-full bg-white border border-gray-300 rounded">
          <div className="py-2 px-4 bg-gray-200 font-bold border-b border-gray-300">
            Chat
          </div>
          <div className="px-4 py-2 h-40 overflow-y-scroll">
            <h1 className="text-3xl font-bold mt-4">Message:</h1>
            {messageReceived}
          </div>
          <div className="flex flex-col items-stretch border-t border-gray-300 px-4 py-2">
            <input
              className="border border-gray-300 rounded p-2 mb-2"
              placeholder="Message..."
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
            <button
              className="bg-blue-500 text-white py-1 px-4 rounded"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhiteBoardPage;
