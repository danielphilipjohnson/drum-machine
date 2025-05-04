import VolumeControl from "./VolumeControl";
import BankSelector from "./BankSelector";
import WebAudioVisualizer from "./WaveformVisualizer";
import { SliderControl } from "./ui/SliderControl";

interface Bank {
  soundBanksName: string;
}

interface DisplayProps {
  text?: string;
  changeVolume: (volume: number) => void;
  updateSoundBankAndDisplay: (index: number) => void;
  bankSets: Bank[];
  audioSettings: { tune: number; gain: number; pan: number };
  onSettingsChange: (settings: {
    tune: number;
    gain: number;
    pan: number;
  }) => void;
  currentSoundUrl: string;
  isPlaying: boolean;
}

const Display = ({
  text = "No Sound Selected",
  changeVolume,
  updateSoundBankAndDisplay,
  bankSets,
  audioSettings = { tune: 50, gain: 50, pan: 50 },
  onSettingsChange,
  currentSoundUrl = "",
  isPlaying = false,
}: DisplayProps) => {
  const handleSettingChange = (
    setting: "tune" | "gain" | "pan",
    value: number,
  ) => {
    if (onSettingsChange) {
      onSettingsChange({
        ...audioSettings,
        [setting]: value,
      });
    }
  };

  return (
    <div className="bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-zinc-950 p-3 border-b border-zinc-800">
        <h2 className="text-red-600 font-bold">{text}</h2>
      </div>

      <WebAudioVisualizer
        isPlaying={isPlaying}
        activeSoundUrl={currentSoundUrl}
      />

      <div className="p-4">
        {/* Tune Control */}
        <SliderControl
          label="Tune"
          value={audioSettings.tune}
          onChange={(e) =>
            handleSettingChange("tune", parseInt(e.target.value))
          }
        />

        {/* Gain Control */}
        <SliderControl
          label="Gain"
          value={audioSettings.gain}
          onChange={(e) =>
            handleSettingChange("gain", parseInt(e.target.value))
          }
        />

        {/* Pan Control */}
        <SliderControl
          label="Pan"
          value={audioSettings.pan}
          min={0}
          max={100}
          onChange={(e) => handleSettingChange("pan", parseInt(e.target.value))}
        />

        <VolumeControl changeVolume={changeVolume} />

        {bankSets && (
          <BankSelector
            updateSoundBankAndDisplay={updateSoundBankAndDisplay}
            bankSets={bankSets}
          />
        )}
      </div>
    </div>
  );
};

export default Display;
