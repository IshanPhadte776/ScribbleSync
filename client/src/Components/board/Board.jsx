import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

import "./styles.css";

// ...

function Board(props) {
  const socketRef = useRef();
  const canvasRef = useRef(null);
  const [canvasContent, setCanvasContent] = useState("");
  const [isErasing, setIsErasing] = useState(false);
  const [savedImages] = useState([]);
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [isCursorOnCanvas, setIsCursorOnCanvas] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [imageAttributes, setImageAttributes] = useState({
    imageName: "",
    subject: "",
    type: "",
  });


  const {name, userType } = props;


  const [canvasWidth, setCanvasWidth] = useState(props.width);
  const [canvasHeight, setCanvasHeight] = useState(props.height);

  
  const [color] = useState("#000000");
  const [size] = useState("10");

  console.log(canvasContent)

  // const changeColor = (e) => {
  //   setColor(e.target.value);
  //   console.log(color);
  // };

  // const changeSize = (e) => {
  //   setSize(e.target.value);
  //   console.log(size);
  // };

  useEffect(() => {
    socketRef.current = io.connect("https://whiteboard-application-final.onrender.com/");

    socketRef.current.on("connect", () => {
      console.log("Socket connection successful in board");
    });

    socketRef.current.on("clear-board", () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setCanvasContent("");
      setIsErasing(true);
    });

    socketRef.current.on("canvas-data", (data) => {
      let isDrawing = false;

      if (isDrawing) return;
      isDrawing = true;

      const image = new Image();
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Update the canvas size based on props
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      image.onload = function () {
        ctx.drawImage(image, 0, 0);
        isDrawing = false;
      };

      image.src = data;
    });

    drawOnCanvas();
  });



  const drawOnCanvas = () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return; // Exit the function if the canvas ref is null
    }

    const ctx = canvas.getContext("2d");

    // const sketch = document.querySelector("#sketch");
    // const sketch_style = getComputedStyle(sketch);

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const mouse = { x: 0, y: 0 };
    const last_mouse = { x: 0, y: 0 };

    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;

        setIsCursorOnCanvas(true); // Cursor is on the canvas
      },
      false
    );

    canvas.addEventListener(
      "mouseleave",
      function () {
        setIsCursorOnCanvas(false); // Cursor is outside the canvas
      },
      false
    );

    ctx.lineWidth = size;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = isErasing ? "white" : color;


    canvas.addEventListener(
      "mousedown",
      function (e) {
        canvas.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      function () {
        canvas.removeEventListener("mousemove", onPaint, false);
      },
      false
    );

    const onPaint = () => {

        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();

    };
  };

  useEffect(() => {
    const handleResize = () => {
      setCanvasWidth(window.innerWidth);
      setCanvasHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const base64ImageData = canvasRef.current.toDataURL("image/png");
      socketRef.current.emit("canvas-data", base64ImageData);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener("mousemove", handleMouseMove);
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCursorX(x);
    setCursorY(y);
  };

  const handleClearBoard = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasContent("");
    socketRef.current.emit("clear-board");
  };

  const handleErase = () => {
    setIsErasing(!isErasing);
  };

  const handleSaveImage = () => {
    setPopupVisible(true);
  };

  const handlePopupSave = () => {
    if (
      imageAttributes.imageName.trim() !== "" &&
      imageAttributes.subject.trim() !== "" &&
      imageAttributes.type.trim() !== ""
    ) {
      const canvas = canvasRef.current;
      const imageData = canvas.toDataURL("image/png");

      fetch("http://localhost:3001/saveImage2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageData,
          imageName: imageAttributes.imageName,
          subject: imageAttributes.subject,
          type: imageAttributes.type,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            console.log("Image saved successfully");
          } else {
            console.error("Failed to save image");
          }
        })
        .catch((error) => {
          console.error("Failed to save image:", error);
        });

      setPopupVisible(false);
      setImageAttributes({
        imageName: "",
        subject: "",
        type: "",
      });
    }
  };

  const handlePopupCancel = () => {
    setPopupVisible(false);
    setImageAttributes({
      imageName: "",
      subject: "",
      type: "",
    });
  };


  return (
    <div className="sketch " id="sketch">
      <div className="canvas-container flex justify-center items-center">
        <canvas
          className={`board bg-white border border-gray-300 ${
            isCursorOnCanvas ? "canvas-cursor" : ""
          }`}
          id="board"
          ref={canvasRef}
        ></canvas>
      </div>

      <div
        className="cursor-indicator flex justify-center"
        style={{ top: cursorY, left: cursorX }}
      >
        <span>
          Now Editing: {isCursorOnCanvas ? (name ? name : "None") : "None"}
        </span>
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        <button
          className="bg-customLightOrange hover:bg-customOrange text-white font-bold py-2 px-4 rounded"
          onClick={handleClearBoard}
        >
          Clear Board
        </button>
        {userType === "Teacher" && (
            <button
              className="bg-customLightOrange hover:bg-customOrange text-white font-bold py-2 px-4 rounded"
              onClick={handleSaveImage}
            >
              Save Image
            </button>
          )}

        <button
          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
            isErasing ? "bg-gray-500" : ""
          }`}
          onClick={handleErase}
        >
          {isErasing ? "Stop Erasing" : "Erase"}
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <div className="grid grid-cols-2 gap-4">
                        {/* eslint-disable jsx-a11y/img-redundant-alt */}

          {savedImages.map((image, index) => (
            
            <img
              key={index}
              src={image.src}
              alt={`Saved Image ${index + 1}`}
              className="max-w-xs max-h-48"
            />
          ))}
        </div>
      </div>

      {/* <div className="tools-section flex justify-center items-center my-4 ">
        {userType === "Teacher" && (
          <div>
            <button onClick = {handleEnableEditingForStudents }className="bg-customLightOrange hover:bg-customOrange text-white font-bold py-2 px-4 rounded mx-4">
              Allow Editing
            </button>
            <button onClick = {handleDisableEditingForStudents }   className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Disable Editing
            </button>
          </div>
        )}
      </div> */}

      {popupVisible && (
  <div className="popup my-4 border border-gray-300 rounded-lg shadow-lg">
    <h2 className="flex justify-center">Enter Image Details</h2>
    <div className="flex flex-col">
      <label htmlFor="image-name" className="mb-2 mx-2">
        Image Name:
      </label>
      <input
        type="text"
        id="image-name"
        placeholder="Image Name"
        value={imageAttributes.imageName}
        onChange={(e) =>
          setImageAttributes({
            ...imageAttributes,
            imageName: e.target.value,
          })
        }
        className="block border border-gray-300 rounded-lg p-2 mx-2 my-2"
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="subject" className="mb-2 mx-2">
        Subject:
      </label>
      <input
        type="text"
        id="subject"
        placeholder={props.classSubject}
        value={imageAttributes.subject}
        onChange={(e) =>
          setImageAttributes({
            ...imageAttributes,
            subject: e.target.value,
          })
        }
        className="block border border-gray-300 rounded-lg p-2 mx-2 my-2"
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="type" className="mb-2 mx-2">
        Type:
      </label>
      <select
  id="type"
  value={imageAttributes.type}
  onChange={(e) =>
    setImageAttributes({
      ...imageAttributes,
      type: e.target.value,
    })
  }
  className="block border border-gray-300 rounded-lg p-2 mx-2 my-2"
>
  <option value="Homework">Homework</option>
  <option value="Notes">Notes</option>
  <option value="Lecture">Lecture</option>
  <option value="Test">Test</option>
  <option value="Bonus">Bonus</option>

</select>

    </div>
    <div className="flex justify-center my-4">
      <button
        className="bg-customLightOrange hover:bg-customOrange text-white font-bold py-2 px-4 rounded mr-2"
        onClick={handlePopupSave}
      >
        Save
      </button>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        onClick={handlePopupCancel}
      >
        Cancel
      </button>
    </div>
  </div>
)}



      {/* <div className="flex justify-center items-center">
        <div className="mr-4">
          <label htmlFor="brush-size" className="mr-2">
            Select Brush Size:
          </label>
          <select
            id="brush-size"
            value={size}
            onChange={changeSize}
            className="border border-gray-300 rounded p-2"
          >
            <option>1</option>
            <option>5</option>
            <option>10</option>
          </select>
        </div>
        <div className="flex items-center">
          <label htmlFor="brush-color" className="mr-2">
            Select Brush Color:
          </label>
          <input
            type="color"
            id="brush-color"
            value={color}
            onChange={changeColor}
            className="w-10 h-10"
          />
        </div>
      </div> */}
    </div>
  );
}

export default Board;
