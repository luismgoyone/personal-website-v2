"use client";

import { useEffect, useRef } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// A silent looping clip from public/demos/<name>.mp4 (see scripts/encode-demo.sh).
// Plays only while on screen; with reduced motion it stays on the poster until
// the reader presses play.
export function ProjectDemo({ name, label }: { name: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.controls = true;
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      aria-label={label}
      src={`${basePath}/demos/${name}.mp4`}
      poster={`${basePath}/demos/${name}.jpg`}
      width={1280}
      height={800}
      muted
      loop
      playsInline
      preload="none"
      className="mt-1 mb-3 h-auto w-full rounded-lg border border-line bg-surface"
    />
  );
}
