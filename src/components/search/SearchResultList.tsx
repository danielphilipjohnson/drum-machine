import SearchResultCard from "./SearchResultCard";

interface SearchResult {
  id: string;
  soundFileName: string;
  bank: string;
  url: string;
}

interface SearchResultListProps {
  results: SearchResult[];
}

const SearchResultList = ({ results }: SearchResultListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((result) => (
        <SearchResultCard
          key={result.id + result.url}
          soundFileName={result.soundFileName}
          bank={result.bank}
          url={result.url}
        />
      ))}
    </div>
  );
};

export default SearchResultList;
