interface SearchResultCardProps {
  soundFileName: string;
  bank: string;
  url: string;
}

const SearchResultCard = ({
  soundFileName,
  bank,
  url,
}: SearchResultCardProps) => {
  return (
    <div className="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition-colors">
      <h3 className="text-zinc-300 font-semibold mb-1">{soundFileName}</h3>
      <p className="text-zinc-500 text-sm mb-3">Bank: {bank}</p>
      <audio src={url} controls className="w-full" />
    </div>
  );
};

export default SearchResultCard;
