import { Sound } from "@/type/sound";
import { Volume2, Save, Upload } from "lucide-react";

interface SoundEditorProps {
  sound: Sound | null;
  isDirty: boolean;
  onPlay: () => void;
  onChange: (field: keyof Sound, value: string) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const SoundEditor = ({
  sound,
  isDirty,
  onPlay,
  onChange,
  onUpload,
  onSave,
}: SoundEditorProps) => {
  if (!sound) {
    return (
      <div className="bg-zinc-800 rounded-lg p-4 shadow-lg text-zinc-500 text-center p-8">
        Select a sound to edit
      </div>
    );
  }

  return (
    <div className="bg-zinc-800 rounded-lg p-4 shadow-lg">
      <h2 className="text-lg font-semibold text-zinc-300 mb-4">Sound Editor</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-zinc-400 text-sm mb-1">Key</label>
          <div className="bg-zinc-700 p-3 rounded text-center text-2xl font-bold text-zinc-300">
            {sound.keyTrigger}
          </div>
        </div>

        <div>
          <label htmlFor="sound-id" className="block text-zinc-400 text-sm mb-1">
            Sound Name
          </label>
          <input
            id="sound-id"
            type="text"
            value={sound.id}
            onChange={(e) => onChange("id", e.target.value)}
            placeholder="e.g. Snare"
            className="w-full bg-zinc-700 text-zinc-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

        <div>
          <label className="block text-zinc-400 text-sm mb-1">Sound File</label>
          <div className="flex items-center space-x-2">
            <button
              onClick={onPlay}
              className="p-2 bg-zinc-700 rounded hover:bg-zinc-600 text-zinc-300"
              aria-label="Play sound"
            >
              <Volume2 size={18} />
            </button>

            <div className="flex-1 truncate bg-zinc-700 p-2 rounded text-zinc-400 text-sm">
              {sound.url.split("/").pop()}
            </div>

            <label className="p-2 bg-zinc-700 rounded hover:bg-zinc-600 text-zinc-300 cursor-pointer">
              <Upload size={18} />
              <input
                title="Upload Sound"
                type="file"
                className="hidden"
                accept="audio/*"
                onChange={onUpload}
              />
            </label>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={onSave}
            disabled={!isDirty}
            className={`
              w-full p-3 rounded-md flex items-center justify-center space-x-2
              ${
                isDirty
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
              }
            `}
          >
            <Save size={18} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoundEditor;
