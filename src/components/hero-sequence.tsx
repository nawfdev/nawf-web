"use client";

import { useEffect, useRef, useState } from "react";

interface HeroSequenceProps {
  /** e.g. "/hero/frame" for files named frame-001.webp, frame-002.webp, ... */
  basePath: string;
  frameCount: number;
  extension?: string;
  className?: string;
  children?: React.ReactNode;
}

function frameSrc(basePath: string, index: number, extension: string) {
  return `${basePath}-${String(index).padStart(3, "0")}.${extension}`;
}

export function HeroSequence({
  basePath,
  frameCount,
  extension = "webp",
  className,
  children,
}: HeroSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)"
    );
    setIsDesktop(mql.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    let cancelled = false;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = frameSrc(basePath, i, extension);
      images.push(img);
    }
    imagesRef.current = images;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    }

    function draw() {
      if (cancelled || !ctx || !canvas) return;
      const scrollTop = window.scrollY;
      const containerEl = container;
      if (!containerEl) return;
      const { top, height } = containerEl.getBoundingClientRect();
      const scrolled = scrollTop - (scrollTop + top);
      const progress = Math.min(Math.max(scrolled / (height - window.innerHeight), 0), 1);
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(progress * frameCount)
      );
      const img = images[frameIndex];
      if (img && img.complete && img.naturalWidth > 0) {
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.naturalWidth / img.naturalHeight;
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > canvasRatio) {
          drawHeight = canvas.height;
          drawWidth = drawHeight * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
        } else {
          drawWidth = canvas.width;
          drawHeight = drawWidth / imgRatio;
          offsetY = (canvas.height - drawHeight) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    }

    function onScroll() {
      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelled = true;
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isDesktop, basePath, frameCount, extension]);

  // Mobile / reduced-motion fallback: a single static frame, no scroll-jacking.
  if (isDesktop === false) {
    return (
      <div className={className ?? "relative h-[70vh] w-full overflow-hidden rounded-3xl"}>
        <img
          src={frameSrc(basePath, 1, extension)}
          alt=""
          className="absolute inset-0 h-full w-full scale-105 object-cover animate-[kenburns_20s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-black/30" />
        {children && <div className="relative flex h-full items-end p-6">{children}</div>}
        <style>{`
          @keyframes kenburns {
            0%, 100% { transform: scale(1.05) translate(0, 0); }
            50% { transform: scale(1.12) translate(-1%, -1%); }
          }
        `}</style>
      </div>
    );
  }

  // Desktop: tall scroll-driven sequence, canvas pinned via sticky.
  return (
    <div ref={containerRef} className="relative h-[300vh]" aria-hidden={isDesktop === null}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas className="absolute inset-0 h-full w-full" ref={canvasRef} />
        <div className="absolute inset-0 bg-black/20" />
        {children && (
          <div className="relative flex h-full items-end p-6 sm:p-12">{children}</div>
        )}
      </div>
    </div>
  );
}
