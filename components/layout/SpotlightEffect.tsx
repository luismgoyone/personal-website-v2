"use client";

import { useEffect, useRef } from "react";

const GLOW_RADIUS = 600;

export function SpotlightEffect() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let x = 0;
    let y = 0;

    const update = () => {
      frame = 0;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x - GLOW_RADIUS}px, ${y - GLOW_RADIUS}px, 0)`;
      }
    };
    const handleMouseMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="spotlight-overlay" aria-hidden="true">
      <div ref={glowRef} className="spotlight-glow" />
    </div>
  );
}
