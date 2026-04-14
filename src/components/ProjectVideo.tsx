import { useEffect, useRef, useState } from "react";

interface ProjectVideoProps {
  src: string;
  title: string;
  label: string;
}

/**
 * Lazy video — only loads & plays when the element enters the viewport.
 * On mobile / low-spec devices this prevents all 5 videos from preloading
 * simultaneously, which was the main source of bandwidth/CPU lag.
 */
export default function ProjectVideo({ src, title, label }: ProjectVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          // Once visible, disconnect — no need to observe further
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !isVisible) return;

    // Only set src after entering viewport to avoid network requests
    if (!video.src && src) {
      video.src = src;
      video.load();
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked — fine for mobile, the poster shows
      });
    }
  }, [isVisible, src]);

  return (
    <video
      ref={ref}
      autoPlay={false} // managed via JS above
      loop
      muted
      playsInline
      preload="none" // don't load until IntersectionObserver fires
      aria-label={label}
      title={title}
      className="aspect-video h-full w-full rounded-t-md bg-primary object-cover transition-transform duration-500 group-hover:scale-[1.02]"
    />
  );
}
