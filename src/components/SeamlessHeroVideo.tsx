import React, { useRef, useState, useEffect, useCallback } from "react";

interface SeamlessHeroVideoProps {
  src: string;
  poster?: string;
  crossfadeDuration?: number; // In seconds (default: 1.2)
  objectPosition?: string;
}

export default function SeamlessHeroVideo({
  src,
  poster,
  crossfadeDuration = 1.2,
  objectPosition = "object-center"
}: SeamlessHeroVideoProps) {
  const videoRefA = useRef<HTMLVideoElement | null>(null);
  const videoRefB = useRef<HTMLVideoElement | null>(null);
  const [activePlayer, setActivePlayer] = useState<"A" | "B">("A");
  const isFadingRef = useRef<boolean>(false);
  const activePlayerRef = useRef<"A" | "B">("A");

  useEffect(() => {
    activePlayerRef.current = activePlayer;
  }, [activePlayer]);

  // Initial playback start
  useEffect(() => {
    const vA = videoRefA.current;
    const vB = videoRefB.current;
    if (vA) {
      vA.muted = true;
      vA.defaultMuted = true;
      vA.currentTime = 0;
      vA.play().catch(() => {});
    }
    if (vB) {
      vB.muted = true;
      vB.defaultMuted = true;
      vB.currentTime = 0;
    }
  }, [src]);

  const triggerCrossfade = useCallback(() => {
    if (isFadingRef.current) return;
    isFadingRef.current = true;

    const currentIsA = activePlayerRef.current === "A";
    const outgoing = currentIsA ? videoRefA.current : videoRefB.current;
    const incoming = currentIsA ? videoRefB.current : videoRefA.current;

    if (incoming) {
      incoming.muted = true;
      incoming.currentTime = 0;
      const playPromise = incoming.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }

    // Switch active video to trigger CSS opacity crossfade
    const nextPlayer = currentIsA ? "B" : "A";
    setActivePlayer(nextPlayer);

    // Once the crossfade transition finishes, pause and reset the outgoing video
    setTimeout(() => {
      if (outgoing) {
        outgoing.pause();
        outgoing.currentTime = 0;
      }
      isFadingRef.current = false;
    }, crossfadeDuration * 1000);
  }, [crossfadeDuration]);

  // Continuous frame check to trigger crossfade before video ends
  useEffect(() => {
    let animId: number;

    const checkTime = () => {
      const currentIsA = activePlayerRef.current === "A";
      const current = currentIsA ? videoRefA.current : videoRefB.current;

      if (current && current.duration && !isNaN(current.duration) && !current.paused) {
        const timeLeft = current.duration - current.currentTime;
        if (timeLeft <= crossfadeDuration && !isFadingRef.current) {
          triggerCrossfade();
        }
      }

      animId = requestAnimationFrame(checkTime);
    };

    animId = requestAnimationFrame(checkTime);
    return () => cancelAnimationFrame(animId);
  }, [crossfadeDuration, triggerCrossfade]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950 pointer-events-none select-none">
      {/* Background Poster Fallback during initial stream buffering */}
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover ${objectPosition} z-0`}
        />
      )}

      {/* Video A */}
      <video
        ref={videoRefA}
        src={src}
        poster={poster}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={triggerCrossfade}
        className={`absolute inset-0 w-full h-full object-cover ${objectPosition} transition-opacity ease-in-out ${
          activePlayer === "A" ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
        style={{
          transitionDuration: `${crossfadeDuration}s`
        }}
      />

      {/* Video B */}
      <video
        ref={videoRefB}
        src={src}
        muted
        playsInline
        preload="auto"
        onEnded={triggerCrossfade}
        className={`absolute inset-0 w-full h-full object-cover ${objectPosition} transition-opacity ease-in-out ${
          activePlayer === "B" ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
        style={{
          transitionDuration: `${crossfadeDuration}s`
        }}
      />

      {/* Natural cinematic overlay for readability while keeping video luminous */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 z-20 pointer-events-none" />
    </div>
  );
}
