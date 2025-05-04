import { useEffect, useState, useRef } from "react";

interface DrumButtonProps {
  id: string;
  keyTrigger: string;
  keyCode: number;
  soundId: string;
  source: string;
  audioVolume: number;
  updateDisplaySoundFileName: (soundId: string, source: string) => void;
  onSoundPlay: (isActive: boolean) => void;
}

const DrumButton = ({
  id,
  keyTrigger,
  keyCode,
  soundId,
  source,
  audioVolume = 1,
  updateDisplaySoundFileName,
  onSoundPlay,
}: DrumButtonProps) => {
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getGradientClass = () => {
    const colors = [
      "from-amber-500 to-orange-600", // 0, 1
      "from-cyan-500 to-teal-600", // 2, 3
      "from-yellow-400 to-amber-500", // 4, 5
      "from-blue-600 to-indigo-700", // 6, 7
      "from-rose-500 to-pink-600", // 8
    ];

    const colorIndex = Math.floor(+id / 2);
    return colors[Math.min(colorIndex, colors.length - 1)];
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.keyCode === keyCode) {
        playSound();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [keyCode, audioVolume]);

  useEffect(() => {
    if (audioRef.current) {
      const handleEnded = () => {
        setIsActive(false);
        if (onSoundPlay) {
          onSoundPlay(false);
        }
      };

      audioRef.current.addEventListener("ended", handleEnded);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("ended", handleEnded);
        }
      };
    }
  }, [onSoundPlay]);

  const playSound = () => {
    if (audioRef.current) {
      // Visual feedback
      setIsActive(true);

      // Update display
      if (updateDisplaySoundFileName) {
        updateDisplaySoundFileName(soundId, source);
      }

      // Notify about sound playing
      if (onSoundPlay) {
        onSoundPlay(true);
      }

      // Play sound
      audioRef.current.volume = audioVolume;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.error("Error playing sound:", err);
        setIsActive(false);
        if (onSoundPlay) {
          onSoundPlay(false);
        }
      });
    }
  };

  return (
    <div className="drum-button-container">
      <button
        id={soundId}
        onClick={playSound}
        className={`
          w-32 h-32 md:w-36 md:h-36 rounded-lg 
          shadow-lg bg-gradient-to-br ${getGradientClass()}
          flex items-center justify-center font-bold text-4xl text-white
          hover:shadow-xl transform transition-all
          ${isActive ? "scale-95 shadow-inner" : "scale-100"}
          focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50
        `}
        aria-label={`Drum pad ${keyTrigger}: ${soundId}`}
      >
        {keyTrigger}
        <audio
          id={keyTrigger}
          ref={audioRef}
          src={source}
          className="hidden"
          preload="auto"
        />
      </button>
      <p className="text-xs text-center mt-1 text-zinc-400">{soundId}</p>
    </div>
  );
};

export default DrumButton;
