import React, { useState, useEffect, useRef } from 'react';
import { Play, Circle, ChevronDown, Plus, Minus } from 'lucide-react';
import Logo from '../ui/Logo';

const Navbar = ({
  onSoundBankChange,
  currentBank = "Default",
  onBpmChange
}: {
  onSoundBankChange: (bank: string) => void;
  currentBank?: string;
  onBpmChange?: (bpm: number) => void;
}) => {
  const [bpm, setBpm] = useState(130);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isEditingBpm, setIsEditingBpm] = useState(false);
  const bpmInputRef = useRef<HTMLInputElement>(null);

  const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onSoundBankChange) {
      onSoundBankChange(e.target.value);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleBpmChange = (newBpm: number) => {
    // Clamp BPM between 40 and 240
    const clampedBpm = Math.max(40, Math.min(240, newBpm));
    setBpm(clampedBpm);

    // Notify parent component if callback provided
    if (onBpmChange) {
      onBpmChange(clampedBpm);
    }
  };

  const incrementBpm = () => {
    handleBpmChange(bpm + 1);
  };

  const decrementBpm = () => {
    handleBpmChange(bpm - 1);
  };

  const startEditingBpm = () => {
    setIsEditingBpm(true);
  };

  const handleBpmInputBlur = () => {
    setIsEditingBpm(false);
  };

  const handleBpmInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = parseInt(e.currentTarget.value);
      if (!isNaN(value)) {
        handleBpmChange(value);
      }
      setIsEditingBpm(false);
    } else if (e.key === 'Escape') {
      setIsEditingBpm(false);
    }
  };

  useEffect(() => {
    if (isEditingBpm && bpmInputRef.current) {
      bpmInputRef.current.focus();
      bpmInputRef.current.select();
    }
  }, [isEditingBpm]);

  return (
    <nav className="bg-zinc-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          <Logo />

          <div className="flex items-center space-x-3">
            <div className="relative">
              <select
                title="Sound Bank"
                className="appearance-none bg-zinc-900 border border-zinc-700 text-zinc-300 py-2 px-4 pr-8 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleBankChange}
                value={currentBank}
              >
                <option value="Default">Club - Default</option>
                <option value="Extra">Extra</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
                <ChevronDown size={16} />
              </div>
            </div>

            <div className="flex items-stretch h-10">
              <button
                onClick={decrementBpm}
                className="flex items-center justify-center w-10 rounded-l bg-zinc-900 text-zinc-400 border border-zinc-700 hover:bg-zinc-700 transition-colors"
                aria-label="Decrease BPM"
              >
                <Minus size={14} />
              </button>

              <div
                className="flex items-center bg-zinc-900 text-zinc-300 px-3 border-t border-b border-zinc-700 cursor-pointer"
                onClick={startEditingBpm}
              >
                {isEditingBpm ? (
                  <input
                    ref={bpmInputRef}
                    type="number"
                    value={bpm}
                    onChange={(e) => setBpm(parseInt(e.target.value) || bpm)}
                    onBlur={handleBpmInputBlur}
                    onKeyDown={handleBpmInputKeyDown}
                    className="w-16 h-8 bg-zinc-800 text-zinc-300 text-center outline-none rounded"
                    min="40"
                    max="240"
                  />
                ) : (
                  <span title="Click to edit BPM">{bpm} BPM</span>
                )}
              </div>

              <button
                onClick={incrementBpm}
                className="flex items-center justify-center w-10 rounded-r bg-zinc-900 text-zinc-400 border border-zinc-700 hover:bg-zinc-700 transition-colors"
                aria-label="Increase BPM"
              >
                <Plus size={14} />
              </button>
            </div>
            <button
              onClick={togglePlay}
              className={`p-2 rounded ${isPlaying ? 'bg-green-600 text-white' : 'bg-zinc-900 text-zinc-400'} border border-zinc-700 hover:bg-zinc-700 transition-colors`}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <Play size={18} />
            </button>

            <button
              onClick={toggleRecording}
              className={`p-2 rounded ${isRecording ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-400'} border border-zinc-700 hover:bg-zinc-700 transition-colors`}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
              <Circle size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;