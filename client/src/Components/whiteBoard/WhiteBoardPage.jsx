import { useEffect, useState } from "react";
import React from "react";
import Board from "../board/Board";
import Container from "../container/Container";
import io from "socket.io-client";
import Filter from "bad-words";

const filter = new Filter(); // Create an instance of the bad-words filter

const socket = io.connect("http://localhost:3001");

socket.on("connect", () => {
  console.log("Socket connection successful in app");
});

socket.on("connect_error", (error) => {
  console.log("Socket connection failed:", error);
});

function WhiteBoardPage(props) {
  const { role, name, roomCode, setCurrentPage } = props;
  // Room State
  // Messages States
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  const joinRoom = () => {
    if (roomCode !== "") {
      socket.emit("join_room", roomCode);
    }
  };

  const handleDisconnect = () => {
    socket.emit("leave_room", roomCode); // Send leave room event to the server
    // You can add additional logic here, such as resetting room state or redirecting to another page
    setCurrentPage("MySchedulePage"); // Change the current page to "MySchedulePage"
  };

  // const sendMessage = () => {
  //   const newMessage = { message, name }; // Create a new message object with the user's name
  //   socket.emit("send_message", { message: newMessage, roomCode, name });
  //   setMessage(""); // Clear the input field after sending the message
  //   setMessages((prevMessages) => [...prevMessages, newMessage]);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() !== "") {
      const newMessage = { message: filter.clean(message), name }; // Clean the message before sending
      socket.emit("send_message", { message: newMessage, roomCode, name });
      setMessage(""); // Clear the input field after sending the message
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  socket.on("receive_message", (data) => {
    setMessages((prevMessages) => [...prevMessages, data.message]);
  });

  socket.on("start_drawing", (data) => {
    console.log(data.username);
  });

  socket.on("stop_drawing", () => {});

  useEffect(() => {
    joinRoom();

    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const shouldDisplayChat = screenWidth >= 1120;
      setDisplayChat(shouldDisplayChat);
    };

    handleResize(); // Set initial display value

    window.addEventListener("resize", handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up the event listener on component unmount
    };
  }, []);

  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState("10");

  const [displayChat, setDisplayChat] = useState(false);

  const changeColor = (e) => {
    setColor(e.target.value);
  };

  const changeSize = (e) => {
    setSize(e.target.value);
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    console.log('Screen size:', window.innerWidth);
  }, [window.innerWidth]);

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold mx-6 mb-6 mt-20">Whiteboard</h1>
      </div>
      <div className="w-full flex">
        <div className={`w-${displayChat ? '3/4' : 'full'} flex justify-center items-center`}>
          <div>
            
              <Board
                color={color}
                size={size}
                name={name}
                width={450}
                height={450}
                role="Teacher"
                changeColor={changeColor}
                changeSize={changeSize}
              />
            
          </div>
        </div>

        {displayChat && (
          <div className="w-1/4 fixed right-0 bottom-0 flex flex-col-reverse mr-4">
            <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white border border-gray-300 rounded my-20 flex flex-col">
              <div className="py-2 px-4 bg-gray-200 font-bold border-b border-gray-300">
                Chat
              </div>
              <div className="px-4 py-2 overflow-y-auto h-80">
                <h1 className="text-3xl font-bold mt-4">Messages:</h1>
                {messages.map((msg, index) => (
                  <div key={index}>
                    {msg.name}: {msg.message}
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-stretch w-full border-t border-gray-300 px-4 py-2">
                <form onSubmit={handleSubmit} className="flex">
                  <input
                    className="flex-grow border border-gray-300 rounded p-2 mr-2"
                    placeholder="Message..."
                    value={message}
                    onChange={handleInputChange}
                  />
                  <button
                    className="bg-customLightOrange text-white py-1 px-4 rounded"
                    type="submit"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center my-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDisconnect}
        >
          Disconnect and Close
        </button>
      </div>
    </div>
  );
}

export default WhiteBoardPage;
