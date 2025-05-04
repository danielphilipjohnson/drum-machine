"use client";
import { useState } from "react";
import rawSoundBanks from "@/data/soundBanks";

import EditLayout from "./EditLayout";
import SoundEditor from "./SoundEditor";
import SoundGrid from "./SoundGrid";
import BankSelector from "./BankSelector";

interface Sound {
  keyCode: number;
  keyTrigger: string;
  id: string;
  url: string;
}

interface Bank {
  id: string;
  name: string;
  sounds: Sound[];
}


export const EditPageContent = () => {
  const [selectedBank, setSelectedBank] = useState("Default");
	const transformedBanks: Bank[] = rawSoundBanks.map((bank) => ({
		id: bank.soundBanksName.toLowerCase().replace(/\s+/g, "-"),
		name: bank.soundBanksName,
		sounds: bank.soundFiles.map(({ soundFileName, ...rest }) => ({
			...rest,
			id: soundFileName,
		})),
	}));

  const [banks, setBanks] = useState<Bank[]>(transformedBanks);

  const [currentSound, setCurrentSound] = useState<Sound | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(
    null,
  );

  const currentBank =
    banks.find((bank) => bank.name === selectedBank) || banks[0];

  const handleSelectSound = (sound: Sound) => {
    setCurrentSound({ ...sound });

    if (previewAudio) {
      previewAudio.pause();
      previewAudio.src = "";
    }

    const audio = new Audio(sound.url);
    setPreviewAudio(audio);
  };

  const handlePlayPreview = () => {
    if (previewAudio) {
      previewAudio.currentTime = 0;
      previewAudio.play();
    }
  };

	const handleUpdateSound = (field: keyof Sound, value: string) => {
    setCurrentSound((prev) => {
      if (!prev) return null;
      return { ...prev, [field]: value };
    });
    setIsDirty(true);
  };

  const handleSaveChanges = () => {
    if (!currentSound || !isDirty) return;

    const updatedBanks = banks.map((bank) => {
      if (bank.name === selectedBank) {
        const updatedSounds = bank.sounds.map((sound) =>
          sound.keyTrigger === currentSound.keyTrigger ? currentSound : sound,
        );
        return { ...bank, sounds: updatedSounds };
      }
      return bank;
    });

    setBanks(updatedBanks);
    setIsDirty(false);

    // In a real app, you would save to localStorage, API, etc.
    // localStorage.setItem('drumBanks', JSON.stringify(updatedBanks));

    alert("Changes saved successfully!");
  };

  // Handle creating a new bank
	const handleCreateBank = () => {
		const bankName = prompt("Enter a name for the new sound bank:");
		if (!bankName) return;

		const defaultSounds: Sound[] = [
			{ keyCode: 81, keyTrigger: "Q", id: "Empty-Q", url: "/audio/Heater-1.mp3" },
			{ keyCode: 87, keyTrigger: "W", id: "Empty-W", url: "/audio/Heater-1.mp3" },
			{ keyCode: 69, keyTrigger: "E", id: "Empty-E", url: "/audio/Heater-1.mp3" },
			{ keyCode: 65, keyTrigger: "A", id: "Empty-A", url: "/audio/Heater-1.mp3" },
			{ keyCode: 83, keyTrigger: "S", id: "Empty-S", url: "/audio/Heater-1.mp3" },
			{ keyCode: 68, keyTrigger: "D", id: "Empty-D", url: "/audio/Heater-1.mp3" },
			{ keyCode: 90, keyTrigger: "Z", id: "Empty-Z", url: "/audio/Heater-1.mp3" },
			{ keyCode: 88, keyTrigger: "X", id: "Empty-X", url: "/audio/Heater-1.mp3" },
			{ keyCode: 67, keyTrigger: "C", id: "Empty-C", url: "/audio/Heater-1.mp3" },
		];

		const newBank: Bank = {
			id: bankName.toLowerCase().replace(/\s+/g, "-"),
			name: bankName,
			sounds: defaultSounds,
		};

		setBanks([...banks, newBank]);
		setSelectedBank(bankName);
	};


	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file || !currentSound) return;

		const fakeUploadedUrl = URL.createObjectURL(file);

		handleUpdateSound("url", fakeUploadedUrl);
		handleUpdateSound("id", file.name.replace(/\.[^/.]+$/, ""));

		if (previewAudio) {
			previewAudio.pause();
			previewAudio.src = fakeUploadedUrl;
		}
	};


  return (
      <EditLayout>
        <BankSelector
          banks={banks}
          selectedBank={selectedBank}
          onSelect={setSelectedBank}
          onCreate={handleCreateBank}
        />
        <SoundGrid
          sounds={currentBank.sounds}
          currentSound={currentSound}
          onSelect={handleSelectSound}
        />
        <SoundEditor
          sound={currentSound}
          isDirty={isDirty}
          onPlay={handlePlayPreview}
          onChange={handleUpdateSound}
          onUpload={handleFileUpload}
          onSave={handleSaveChanges}
        />
      </EditLayout>
  );
};


export default EditPageContent;