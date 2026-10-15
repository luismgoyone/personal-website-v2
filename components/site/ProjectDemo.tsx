"use client";

import { useEffect, useRef } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// A silent looping clip from public/demos/<name>.mp4 (see scripts/encode-demo.sh).
// Inline it plays only while on screen, and not at all under reduced motion.
// Clicking opens it near full size in a dialog with controls, since the
// inline copy is too small to read.
export function ProjectDemo({ name, label }: { name: string; label: string }) {
  const inline = useRef<HTMLVideoElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const large = useRef<HTMLVideoElement>(null);
  const src = `${basePath}/demos/${name}.mp4`;
  const poster = `${basePath}/demos/${name}.jpg`;

  useEffect(() => {
    const video = inline.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !dialog.current?.open) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function open() {
    inline.current?.pause();
    dialog.current?.showModal();
    const video = large.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }

  function onClose() {
    large.current?.pause();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) inline.current?.play().catch(() => {});
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`Watch full size: ${label}`}
        className="group relative mt-1 mb-3 block w-full cursor-zoom-in overflow-hidden rounded-lg border border-line bg-surface"
      >
        <video
          ref={inline}
          src={src}
          poster={poster}
          width={1280}
          height={800}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          className="block h-auto w-full"
        />
        <span className="absolute right-2.5 bottom-2.5 rounded-md bg-black/70 px-2 py-1 font-mono text-xs text-white opacity-90 transition-opacity group-hover:opacity-100">
          ⤢ Watch full size
        </span>
      </button>

      <dialog
        ref={dialog}
        aria-label={label}
        onClose={onClose}
        // A click on the backdrop lands on the dialog itself; close then.
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-auto w-[min(1280px,96vw)] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-black/80"
      >
        <video
          ref={large}
          src={src}
          poster={poster}
          width={1280}
          height={800}
          muted
          loop
          playsInline
          controls
          preload="none"
          className="block h-auto max-h-[88vh] w-full rounded-lg"
        />
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          className="mt-3 ml-auto block rounded-md px-2 py-1 font-mono text-sm text-white/80 hover:text-white"
        >
          Close (Esc)
        </button>
      </dialog>
    </>
  );
}
