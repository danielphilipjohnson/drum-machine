"use client";
import { useState } from "react";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import PadBank from "../components/PadBank";
import Display from "../components/Display";
import soundBanks from "../data/soundBanks";

export default function Home() {
  const [displayText, setDisplayText] = useState("Select a sound");
  const [currentBankIndex, setCurrentBankIndex] = useState(0);
  const [currentBankName, setCurrentBankName] = useState(
    soundBanks[0].soundBanksName,
  );
  const [volume, setVolume] = useState(0.5);
  const [audioSettings, setAudioSettings] = useState({
    tune: 50,
    gain: 50,
    pan: 50,
  });
  const [currentSoundUrl, setCurrentSoundUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const updateDisplaySoundFileName = (name: string, url: string) => {
    setDisplayText(name);
    setCurrentSoundUrl(url);
  };

  const updateSoundBankAndDisplay = (bankIndex: number) => {
    setCurrentBankIndex(bankIndex);
    setCurrentBankName(soundBanks[bankIndex].soundBanksName);
    setDisplayText(`Bank: ${soundBanks[bankIndex].soundBanksName}`);
    setCurrentSoundUrl(""); // Reset current sound when changing banks
  };

  const handleSoundPlay = (isActive: boolean) => {
    setIsPlaying(isActive);
  };

  const handleBankChange = (bankName: string) => {
    const bankIndex = soundBanks.findIndex(
      (bank) => bank.soundBanksName === bankName,
    );
    if (bankIndex !== -1) {
      updateSoundBankAndDisplay(bankIndex);
    }
  };

  return (
    <>
      <Head>
        <title>Next.js Drum Machine</title>
        <meta
          name="description"
          content="A modern, responsive drum machine built with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        onSoundBankChange={handleBankChange}
        currentBank={currentBankName}
      >
        <main className="flex-1 p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Display
              text={displayText}
              changeVolume={setVolume}
              updateSoundBankAndDisplay={updateSoundBankAndDisplay}
              bankSets={soundBanks}
              audioSettings={audioSettings}
              onSettingsChange={setAudioSettings}
              currentSoundUrl={currentSoundUrl}
              isPlaying={isPlaying}
            />
          </div>

          <div className="lg:col-span-2">
            <PadBank
              currentBankSet={soundBanks[currentBankIndex]}
              updateDisplaySoundFileName={updateDisplaySoundFileName}
              audioVolume={volume}
              onSoundPlay={handleSoundPlay}
            />
          </div>
        </main>
      </Layout>
    </>
  );
}
