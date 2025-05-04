import DrumButton from "./DrumButton";

interface PadBankProps {
  currentBankSet: {
    soundFiles: {
      keyCode: number;
      keyTrigger: string;
      id: string;
      url: string;
    }[];
  };
  updateDisplaySoundFileName: (soundId: string, source: string) => void;
  audioVolume: number;
  onSoundPlay?: (isActive: boolean) => void;
}

const PadBank = ({
  currentBankSet,
  updateDisplaySoundFileName,
  audioVolume = 1,
  onSoundPlay = () => {},
}: PadBankProps) => {
  if (!currentBankSet || !currentBankSet.soundFiles) {
    return (
      <div className="bg-zinc-800 p-6 rounded-lg">
        <p className="text-zinc-400">No sound bank loaded</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-3 gap-4 md:gap-6">
        {currentBankSet.soundFiles.map((drumObj, i) => (
          <DrumButton
            key={drumObj.keyTrigger}
            id={i.toString()}
            audioVolume={audioVolume}
            soundId={drumObj.id}
            keyCode={drumObj.keyCode}
            keyTrigger={drumObj.keyTrigger}
            source={drumObj.url}
            updateDisplaySoundFileName={updateDisplaySoundFileName}
            onSoundPlay={onSoundPlay}
          />
        ))}
      </div>
    </div>
  );
};

export default PadBank;
