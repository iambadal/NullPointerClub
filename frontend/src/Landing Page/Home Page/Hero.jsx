import React, { useEffect } from "react";
import "./styles/Hero.css";

const Hero = () => {
  useEffect(() => {
    const image = document.querySelector(".rotatable-image");

    if (!image) return;

    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotationX = 0;
    let rotationY = 0;

    const setIsDragging = (v) => {
      isDragging = v;
    };

    const onMouseDown = (e) => {
      setIsDragging(true);
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseUp = () => setIsDragging(false);

    const onMouseMove = (e) => {
      if (!isDragging) return;

      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      rotationY += dx * 0.4;
      rotationX -= dy * 0.4;
      rotationX = Math.min(Math.max(rotationX, -40), 40);

      image.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    };

    image.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      image.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section className="home-hero">
      {/* LEFT */}
      <div className="welcome">
        <h1>Welcome,Hackers🚩</h1>
        <p>Host. Hack. Capture the Flag.</p>

        <div className="cta">
          <a href="/ctf/create">Create a CTF</a>
          <a href="/ctf/join">Enter an Event</a>
        </div>

        <div className="terminal-line">
          <span className="typed-text">
            -&gt; initializing_hacker_space
          </span>
          <span className="cursor"></span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hero-image-container">
        <img
          src="/images/Home-images/cat.png"
          alt="Hacker Cat"
          className="rotatable-image"
        />
      </div>

      {/* BACKGROUND EFFECTS */}
      <div className="ambient-bg">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="dot"></span>
        ))}
        <span className="line1"></span>
        <span className="line2"></span>
      </div>
    </section>
  );
};

export default Hero;