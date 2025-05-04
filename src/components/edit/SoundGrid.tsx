import { Sound } from "@/type/sound";

interface SoundGridProps {
  sounds: Sound[];
  currentSound: Sound | null;
  onSelect: (sound: Sound) => void;
}

const SoundGrid = ({ sounds, currentSound, onSelect }: SoundGridProps) => {
  return (
    <div className="bg-zinc-800 rounded-lg p-4 shadow-lg">
      <h2 className="text-lg font-semibold text-zinc-300 mb-4">Sounds</h2>
      <div className="grid grid-cols-3 gap-2">
        {sounds.map((sound) => (
          <button
            key={sound.keyTrigger}
            onClick={() => onSelect(sound)}
            className={`p-4 rounded-lg ${
              currentSound?.keyTrigger === sound.keyTrigger
                ? "bg-indigo-600 text-white"
                : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
            } flex flex-col items-center justify-center`}
          >
            <span className="text-2xl font-bold">{sound.keyTrigger}</span>
            <span className="text-xs mt-1 truncate w-full text-center">
              {sound.id}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SoundGrid;
