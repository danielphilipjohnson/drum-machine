"use client";
import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface VolumeControlProps {
  changeVolume: (volume: number) => void;
  initialVolume?: number;
}

const VolumeControl = ({ changeVolume, initialVolume = 0.5 }: VolumeControlProps) => {
  const [volume, setVolume] = useState(initialVolume * 100);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(initialVolume * 100);

  useEffect(() => {
    if (changeVolume) {
      changeVolume(isMuted ? 0 : volume / 100);
    }
  }, [volume, isMuted, changeVolume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);

    if (newVolume === 0 && !isMuted) {
      setIsMuted(true);
    } else if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(previousVolume || 50);
    } else {
      setPreviousVolume(volume);
      setIsMuted(true);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <label className="text-zinc-300 text-sm">Volume</label>
        <span className="text-zinc-400 text-sm">
          {isMuted ? "Muted" : volume}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleMute}
          className="text-zinc-400 hover:text-zinc-200 transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <input
          type="range"
          min="0"
          max="100"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="flex-grow h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          aria-label="Volume control"
        />
      </div>
    </div>
  );
};

export default VolumeControl;
