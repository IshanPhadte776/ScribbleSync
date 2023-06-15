import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

import './styles.css';

function Board(props) {
  const socketRef = useRef();
  const canvasRef = useRef(null);
  const [canvasContent, setCanvasContent] = useState('');
  const [isErasing, setIsErasing] = useState(false);
  const [savedImages, setSavedImages] = useState([]); // State to store the saved images

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:3001");

    socketRef.current.on("connect", () => {
      console.log("Socket connection successful in board");
    });

    socketRef.current.on('erase-board', () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setCanvasContent('');
      setIsErasing(true);
    });

    socketRef.current.on("canvas-data", (data) => {
      let isDrawing = false;

      if (isDrawing) return;
      isDrawing = true;

      const image = new Image();
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      image.onload = function () {
        ctx.drawImage(image, 0, 0);
        isDrawing = false;
      };

      image.src = data;
    });

    drawOnCanvas();
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = props.color;
    ctx.lineWidth = props.size;
  }, [props.color, props.size]);

  const drawOnCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const sketch = document.querySelector('#sketch');
    const sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));

    const mouse = { x: 0, y: 0 };
    const last_mouse = { x: 0, y: 0 };

    canvas.addEventListener('mousemove', function (e) {
      last_mouse.x = mouse.x;
      last_mouse.y = mouse.y;

      mouse.x = e.pageX - this.offsetLeft;
      mouse.y = e.pageY - this.offsetTop;
    }, false);

    ctx.lineWidth = props.size;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = props.color;

    canvas.addEventListener('mousedown', function (e) {
      canvas.addEventListener('mousemove', onPaint, false);
    }, false);

    canvas.addEventListener('mouseup', function () {
      canvas.removeEventListener('mousemove', onPaint, false);
    }, false);

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

  const handleEraseBoard = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasContent('');
    socketRef.current.emit("erase-board");
  };

  const handleSaveImage = () => {
    const canvas = canvasRef.current;
    const image = new Image();
    image.src = canvas.toDataURL("image/png");
    setSavedImages(prevImages => [...prevImages, image]);
  };

  return (
    <div className="sketch" id="sketch">
      <canvas className="board" id="board" ref={canvasRef}></canvas>
      <button onClick={handleEraseBoard}>Erase Board</button>
      <button onClick={handleSaveImage}>Save Image</button>
      <div className="saved-images">
        {savedImages.map((image, index) => (
          <img key={index} src={image.src} alt={`Saved Image ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}

export default Board;
