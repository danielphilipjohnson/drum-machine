import { Bank } from "@/type/sound";

interface BankSelectorProps {
  banks: Bank[];
  selectedBank: string;
  onSelect: (bankName: string) => void;
  onCreate: () => void;
}

const BankSelector = ({ banks, selectedBank, onSelect, onCreate }: BankSelectorProps) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-zinc-300 text-sm">Sound Bank</label>
        <button
          onClick={onCreate}
          className="text-sm text-indigo-400 hover:underline"
        >
          + Create New
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {banks.map((bank) => (
          <button
            key={bank.id}
            onClick={() => onSelect(bank.name)}
            className={`
              py-2 px-4 rounded border
              ${bank.name === selectedBank
                ? "bg-indigo-600 text-white border-indigo-700"
                : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700"
              }
              transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50
            `}
          >
            {bank.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BankSelector;
