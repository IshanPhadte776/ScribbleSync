import React from 'react'

function Extra() {
  return (
    <div>
              {/* <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Send Message
      </button>

        // Will display image below the board
  // const handleSaveImage = () => {
  //   const canvas = canvasRef.current;
  //   const image = new Image();
  //   image.src = canvas.toDataURL("image/png");
  //   setSavedImages((prevImages) => [...prevImages, image]);
  // };

  // const handleSaveImage = () => {
  //   console.log("Starting handleSaveImage");

  //   const canvas = canvasRef.current;
  //   console.log("Canvas:", canvas);

  //   const imageData = canvas.toDataURL("image/png");
  //   console.log("Image Data:", imageData);

  // //This line is cool
  //   console.log("Image Data JSON:", JSON.stringify({ imageData }));
  //   console.log("Sending request to server...");

  //   fetch("http://localhost:3001/saveImage", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "http://localhost:3000, http://localhost:3002, http://localhost:3003"
  //     },
  //     body: JSON.stringify({ imageData }),

  //   })
  //     .then((response) => {
  //       console.log("Received response from server");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Received data from server");
  //       if (data.success) {
  //         console.log("Image saved successfully");
  //       } else {
  //         console.error("Failed to save image");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Failed to save image:", error);
  //     });
  // };

      <h1 className="text-3xl font-bold mt-4">Message:</h1>

      {messageReceived} */
      
      }


      
    </div>
  )
}

export default Extra