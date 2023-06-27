import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

import "./styles.css";

// ...

function Board(props) {
  const socketRef = useRef();
  const canvasRef = useRef(null);
  const [canvasContent, setCanvasContent] = useState("");
  const [isErasing, setIsErasing] = useState(false);
  const [savedImages, setSavedImages] = useState([]);
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [isCursorOnCanvas, setIsCursorOnCanvas] = useState(false);
  const { name } = props;

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:3001");

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

      image.onload = function () {
        ctx.drawImage(image, 0, 0);
        isDrawing = false;
      };

      image.src = data;
    });

    drawOnCanvas();
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.strokeStyle = isErasing ? "white" : props.color;
    ctx.lineWidth = props.size;
  }, [props.color, props.size, isErasing]);

  const drawOnCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const sketch = document.querySelector("#sketch");
    const sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = parseInt(sketch_style.getPropertyValue("height"));

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

    ctx.lineWidth = props.size;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = isErasing ? "white" : props.color;

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

  const handleSaveImage = () => {
    const canvas = canvasRef.current;
    const image = new Image();
    image.src = canvas.toDataURL("image/png");
    setSavedImages((prevImages) => [...prevImages, image]);
  };

  const handleErase = () => {
    setIsErasing(!isErasing);
  };

  return (
    <div className="sketch" id="sketch">
      <canvas
        className={`board bg-white border border-gray-300 ${
          isCursorOnCanvas ? "canvas-cursor" : ""
        }`}
        id="board"
        ref={canvasRef}
      ></canvas>
      {isCursorOnCanvas && ( // Display name only when the cursor is on the canvas
        <div
          className="cursor-indicator"
          style={{ top: cursorY, left: cursorX }}
        >
          {name && <span>{name}</span>}
        </div>
      )}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClearBoard}
        >
          Clear Board
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSaveImage}
        >
          Save Image
        </button>
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
    </div>
  );
}

export default Board;
