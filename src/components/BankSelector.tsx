import React, { useState } from "react";

interface Bank {
  soundBanksName: string;
}

interface BankSelectorProps {
  updateSoundBankAndDisplay: (index: number) => void;
  bankSets?: Bank[];
}

const BankSelector = ({
  updateSoundBankAndDisplay,
  bankSets = [],
}: BankSelectorProps) => {
  const [currentBankIndex, setCurrentBankIndex] = useState(0);

  const handleBankChange = (index: number) => {
    setCurrentBankIndex(index);
    if (updateSoundBankAndDisplay) {
      updateSoundBankAndDisplay(index);
    }
  };

  return (
    <div className="mt-6">
      <label className="block text-zinc-300 text-sm mb-2">Sound Bank</label>
      <div className="grid grid-cols-2 gap-2">
        {bankSets.map((bank, index) => (
          <button
            key={bank.soundBanksName}
            onClick={() => handleBankChange(index)}
            className={`
              py-2 px-4 rounded border 
              ${
                index === currentBankIndex
                  ? "bg-indigo-600 text-white border-indigo-700"
                  : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700"
              }
              transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50
            `}
          >
            {bank.soundBanksName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BankSelector;
