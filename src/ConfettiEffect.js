import React, { useEffect, useRef } from "react";
import "./App.css";

const ConfettiEffect = () => {
  const overlayRef = useRef(null);
  const isMouseDown = useRef(false);

  useEffect(() => {
    const overlay = overlayRef.current;

    const handleMouseDown = (event) => {
      if (overlay.style.opacity !== "0") {
        overlay.style.opacity = "0";
        setTimeout(() => {
          overlay.style.display = "none";
        }, 500);
      }
      isMouseDown.current = true;
      spawnConfetti(event.clientX, event.clientY);
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    const handleMouseMove = (event) => {
      if (isMouseDown.current) {
        spawnConfetti(event.clientX, event.clientY);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const spawnConfetti = (x, y) => {
    for (let i = 0; i < 8; i++) {
      createConfetti(x, y);
    }
  };

  const createConfetti = (x, y) => {
    const colors = [
      "#ff1900 ",
      "#077aee",
      "#07f369",
      "#ffd500",
      "#ad07ef",
      "#ffffff",
      "#00ffd9",
      "#3cff00",
      "#ff00f2",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.backgroundColor = randomColor;
    confetti.style.left = x + "px";
    confetti.style.top = y + "px";

    document.body.appendChild(confetti);

    let angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 2;
    const rotationSpeed = (Math.random() - 0.5) * 10;

    let xVelocity = velocity * Math.cos(angle);
    let yVelocity = velocity * Math.sin(angle);
    const gravity = 0.1;

    const animateConfetti = () => {
      xVelocity *= 0.99;
      yVelocity += gravity;
      x += xVelocity;
      y += yVelocity;

      const currentRotation =
        parseFloat(
          confetti.style.transform.replace("rotate(", "").replace("deg)", "")
        ) || 0;
      confetti.style.transform = `rotate(${
        currentRotation + rotationSpeed
      }deg)`;

      confetti.style.left = x + "px";
      confetti.style.top = y + "px";

      if (y < window.innerHeight) {
        requestAnimationFrame(animateConfetti);
      } else {
        confetti.remove();
      }
    };

    requestAnimationFrame(animateConfetti);
  };

  return (
    <>
      <div className="newYork">
        Happy New <br /> Year
      </div>
      <div className="overlay" ref={overlayRef}></div>
    </>
  );
};

export default ConfettiEffect;
