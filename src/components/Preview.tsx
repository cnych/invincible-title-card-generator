import React, { useEffect, useState, useRef } from "react";
import type { EditorState } from "../types";
import { useDeviceInfo } from "../utils";
import { effectPresets } from "../presets";

export function Preview(props: {
  state: EditorState;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { state, canvasRef } = props;
  const [_canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const device = useDeviceInfo();

  const canvasDimensions = state.generating
    ? {
        width: 1920,
        height: 1080,
      }
    : _canvasDimensions;

  // Initialize audio object
  useEffect(() => {
    audioRef.current = new Audio('/sounds/hmm.mp3');
    audioRef.current.preload = 'auto';
    audioRef.current.volume = 0.7;
    
    if (audioRef.current) {
      audioRef.current.onended = () => setIsPlayingSound(false);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Play sound effect
  const playSound = () => {
    if (audioRef.current) {
      // Reset and play
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      
      audioRef.current.play()
        .then(() => {
          setIsPlayingSound(true);
        })
        .catch(error => {
          console.error('Failed to play sound:', error);
          setIsPlayingSound(false);
        });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        setCanvasDimensions({
          width: canvasRef.current.clientWidth,
          height: canvasRef.current.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef]);

  return (
    <div className="bg-slate-900 rounded-xl aspect-video w-full md:w-2/3 md:h-auto select-none relative flex-grow">
      {/* Sound effect button */}
      <button
        onClick={playSound}
        disabled={isPlayingSound}
        className={`cursor-pointer absolute top-3 right-3 z-20 p-2 rounded-full transition-all ${
          isPlayingSound ? 'bg-yellow-600' : 'bg-yellow-500 hover:bg-yellow-400'
        } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
        title="Play Sound"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className={`w-6 h-6 ${isPlayingSound ? 'text-gray-100' : 'text-gray-900'}`}
        >
          <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
          <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
        </svg>
      </button>

      {state.generating && (
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center z-10">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400 mb-2"></div>
            <span className="text-yellow-400">Generating...</span>
          </div>
        </div>
      )}
      <div
        className="relative flex flex-col items-center justify-center gap-[5%] h-full"
        ref={canvasRef}
        style={{
          width: !state.generating ? "100%" : "1920px",
          height: !state.generating ? "100%" : "1080px",
          background: state.background,
        }}
      >
        <div
          className={`woodblock w-full outline-0 bg-transparent text-center ${(device.os === "ios" || device.browser === "safari") && state.generating ? "" : "curved-text"}`}
          style={{
            lineHeight: 0.8,
            fontSize: `${(canvasDimensions.width / 100) * state.fontSize}px`,
            color: state.color,
            WebkitTextStroke: `${state.outline}px ${state.outlineColor}`,
            marginTop: state.showCredits ? "5%" : "0",
          }}
        >
          {state.text}
        </div>
        {state.effect && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity:
                effectPresets.find((e) => e.value === state.effect)?.opacity ||
                1,
              background: state.effect,
            }}
          />
        )}
        {state.showCredits && (
          <div
            style={{
              color: state.color,
            }}
            className="text-center"
          >
            <div
              style={{
                fontSize: `${(canvasDimensions.width / 100) * 1.9}px`,
                fontWeight: canvasDimensions.width * 0.3,
              }}
            >
              {state.smallSubtitle}
            </div>
            <div
              style={{
                fontSize: `${(canvasDimensions.width / 100) * 3}px`,
                fontWeight: canvasDimensions.width * 0.3,
              }}
            >
              {state.subtitle}
            </div>
          </div>
        )}
        {state.showWatermark && (
          <div
            className="absolute bottom-0 right-0 text-white opacity-50 whitespace-nowrap"
            style={{
              fontSize: `${(canvasDimensions.width / 100) * 1.5}px`,
              padding: `${(canvasDimensions.width / 100) * 1}px`,
            }}
          >
            Made with invincibletitlecardgenerator.com
          </div>
        )}
      </div>
    </div>
  );
}