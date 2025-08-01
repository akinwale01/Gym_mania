'use client';

import { useRef, useState, useEffect } from 'react';
import { PlayIcon, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false); // ✅ Tracks if video was ever played

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setShowOverlay(false);
      setHasPlayedOnce(true);
    };

    const handlePause = () => setIsPlaying(false);

    const handleEnded = () => {
      video.pause();
      video.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
      setShowOverlay(true);
      setHasPlayedOnce(false); // ✅ Show center overlay again
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    setVolume(video.volume);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Pause video when out of view
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && isPlaying) {
            video.pause();
            setIsPlaying(false);
            setShowOverlay(true); // Overlay will only show controls if already played
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.unobserve(container);
  }, [isPlaying]);

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleFirstClickPlay = () => {
    togglePlay();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    const video = videoRef.current;
    if (video) {
      video.currentTime = time;
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="relative w-full flex py-5">
      <div
        ref={containerRef}
        className="relative w-full h-[600px] group sm:rounded-xl overflow-hidden shadow-lg bg-black"
      >
        <video
          ref={videoRef}
          src="/videos/team-gym.mp4"
          className="w-full h-full object-full"
          onClick={handleFirstClickPlay}
        />

        {/* ✅ Show center overlay only before first play */}
        {showOverlay && !hasPlayedOnce && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white z-10">
            <button
              onClick={handleFirstClickPlay}
              className="bg-white rounded-full p-3 hover:bg-blue-900 transition cursor-pointer"
              aria-label="Play video"
            >
              <PlayIcon className="w-7 h-7 text-black" />
            </button>

            <p className="text-[20px] md:text-2xl font-black mt-5 font-bitcount-grid-double uppercase">
              Watch To Know More
            </p>
          </div>
        )}

        {/* Controls */}
        <div
          className={`
            absolute bottom-0 left-0 right-0 z-10 px-4 py-2 flex flex-col
            bg-gradient-to-t from-black/80 to-transparent
            transition-opacity duration-500 ease-in-out
            ${showOverlay ? 'opacity-0 pointer-events-none' : isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
          `}
        >
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            step={0.1}
            className="w-full mb-2 accent-orange-600 cursor-pointer"
          />

          <div className="flex items-center justify-between text-white text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <button onClick={togglePlay} aria-label="Play/Pause">
                {isPlaying ? <Pause className="w-5 h-5" /> : <PlayIcon className="w-5 h-5 cursor-pointer" />}
              </button>
              <span>{formatTime(currentTime)}</span>
            </div>

            <div className="flex items-center gap-3">
              <span>{formatTime(duration)}</span>

              <button
                onClick={() => {
                  const video = videoRef.current;
                  if (video) {
                    const newMuted = !video.muted;
                    video.muted = newMuted;
                    setIsMuted(newMuted);
                  }
                }}
                aria-label="Toggle mute"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 cursor-pointer" />}
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => {
                  const vol = parseFloat(e.target.value);
                  setVolume(vol);
                  const video = videoRef.current;
                  if (video) {
                    video.volume = vol;
                    video.muted = vol === 0;
                    setIsMuted(vol === 0);
                  }
                }}
                className="w-20 accent-orange-600"
              />

              <button onClick={toggleFullscreen} aria-label="Toggle fullscreen">
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5 cursor-pointer" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}