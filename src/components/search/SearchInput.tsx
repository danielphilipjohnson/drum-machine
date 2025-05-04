import { Search as SearchIcon } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="relative mb-8">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for sounds..."
        className="w-full bg-zinc-800 border border-zinc-700 text-zinc-300 p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon size={20} className="text-zinc-500" />
      </div>
    </div>
  );
};

export default SearchInput;
